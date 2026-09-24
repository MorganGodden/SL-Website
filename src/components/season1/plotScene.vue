<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import Slider from 'primevue/slider'
import { PlotRenderer, type RenderSlot } from '@/plots/plotRenderer'
import { PlotBoard, type BoardStatus } from '@/plots/plotBoard'
import { resolvePlot } from '@/plots/plotLink'
import { plotsConfigured } from '@/plots/plotsClient'
import {
  ASSUMED_PLOT_WIDTH,
  SCROLL_DIRECTION,
  boardPitch,
  layoutGrid,
  pickStride,
  rescaleScroll,
  screenDeltaToWorld,
  widestPlot
} from '@/plots/boardLayout'
import type { DecodeSuccess } from '@/plots/decode.worker'
import type { LeaderboardEntry } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

const props = defineProps<{
  /** Leaderboard rows, joined to columns on playerUuid. */
  rows: LeaderboardEntry[]
  /**
   * Whether something is covering the board.
   *
   * A covered board is still a board - it goes on drifting behind whatever is
   * over it - but it stops answering the pointer: nothing hovers, nothing is
   * dragged and nothing is picked up. A click on it asks for the cover to go.
   */
  covered?: boolean
}>()

const emit = defineEmits<{
  status: [BoardStatus]
  /** The plot that has taken the stage, or null when one is let go of. */
  focused: [{ uuid: string; name: string } | null]
  /** The board was clicked while something was covering it. */
  dismiss: []
  /** Escape was pressed and the board had no use for it. */
  escape: []
  /** Which players the board is actually drawing a plot for. */
  plots: [string[]]
}>()

/**
 * Picking a plot is not only the board's to do: the leaderboard over it names
 * the same players, and a row there is a way of pointing at a plot.
 */
defineExpose({ focusPlayer })

/**
 * World units per second of automatic scrolling. A plot is twenty units across,
 * so the board moves by roughly one plot every fifteen seconds: enough that a
 * display left running keeps showing new builds, slow enough to read a name.
 */
const SCROLL_SPEED = 1.3
/** How long a manual scrub suspends the automatic scroll. */
const RESUME_AFTER_MS = 4000
/**
 * How far a pointer must travel before a press counts as a drag.
 *
 * A press that never moves this far is a poke at the board, and should not be
 * treated as the visitor asking for room to look around.
 */
const DRAG_SLOP_PX = 6
/**
 * Wheel notches are reported in pixels but are much coarser than a drag, so a
 * notch is deliberately worth less than the distance it claims.
 */
const WHEEL_SCALE = 0.45
/**
 * How long the pointer must rest on one plot before its card appears.
 *
 * Without it, sweeping across a board full of plots flickers a card per plot.
 * The wait runs again for every plot, so a card only ever belongs to a plot the
 * pointer actually settled on.
 */
const HOVER_DELAY_MS = 220
/** How far a hovered plot rises out of its shaft, in blocks. */
const HOVER_LIFT = 2
/**
 * Time constant of that rise. The plot moves most of the way within about two
 * of these and settles within four, so it reads as a lift rather than a jump
 * while still keeping up with a pointer sweeping across the board.
 */
const LIFT_TAU_MS = 52
/** Lift below which a plot is treated as back down and stops being animated. */
const LIFT_EPSILON = 0.01
/**
 * Time constant of a plot coming forward when it is clicked, and how close to
 * the end of that it has to get before it is called done.
 *
 * Slower than the hover lift: this one is a change of scene rather than a
 * flick of feedback, and the board fading out behind it has to keep up.
 */
const FOCUS_TAU_MS = 95
const FOCUS_EPSILON = 0.002
/**
 * Time constant of the board washing out behind a plot that has been picked.
 *
 * Slower than the camera's own, which is the whole point of having two: the
 * camera sets off first and the board only starts to go once it is clearly on
 * its way, so the move reads as going somewhere rather than as a light being
 * switched off. Slower on the way back as well, so the board comes back after
 * the camera has pulled out rather than before it.
 */
const VEIL_TAU_MS = 240
/**
 * Radians the view of a focused plot turns per pixel dragged.
 *
 * A drag across the width of a phone comes to most of a full turn, which is
 * enough to get round the back of a build without a second grab.
 */
const SPIN_PER_PIXEL = 0.011
/** Layers one notch of the wheel moves the cut by. */
const SLICE_PER_NOTCH = 1
/**
 * How far the view may be brought in or pushed back, as a factor of the framing
 * the board picks for itself.
 *
 * Deliberately a narrow band: the board is a field of plots at a set size, and
 * letting it be zoomed far in or far out turns it into either one plot or a
 * carpet of dots, neither of which is what it is for.
 */
const ZOOM_MIN = 0.82
const ZOOM_MAX = 1.3
/**
 * Zoom per pixel of wheel travel, eased so a mouse notch and a trackpad's
 * gentler stream of events both feel like the same gesture.
 */
const ZOOM_PER_PIXEL = 0.0012
/**
 * How far the board pulls back while something is covering it, and how quickly.
 *
 * Kept apart from the zoom the visitor sets: the two are multiplied, so the
 * board stands back from whatever is over it without forgetting how far in
 * they had brought it.
 */
const COVERED_ZOOM = 0.9
const COVER_TAU_MS = 110

/**
 * A drawn copy of a plot, tagged with the lattice cell it sits in.
 *
 * The renderer only needs somewhere to put the geometry; the scene also needs
 * to recognise the cell again on the next frame, which the world position
 * cannot do because the scroll moves it.
 */
interface HoverSlot extends RenderSlot {
  key: string
}

interface ColumnRecord {
  playerUuid: string
  playerName: string
  plotIndex: number
  occupiedHeight: number
  surfaceLevel: number
  /** Footprint in blocks, as published. The lattice is sized from these. */
  sizeX: number
  sizeZ: number
  /** World y of layer 0, so a cut can be named by the height it stands at. */
  minY: number
}

/** The one plot under the pointer, and where to put its card. */
interface Label {
  name: string
  score: string | null
  rank: number | null
  medal: string | null
  x: number
  y: number
}

/** What the focused plot's own controls need to know about it. */
interface FocusState {
  name: string
  score: string | null
  /** Layers currently drawn, from 1 to `layers`. */
  cut: number
  /** Layers the plot has anything in at all. */
  layers: number
  /** World y of the topmost layer still drawn. */
  worldY: number
}

const canvas = ref<HTMLCanvasElement | null>(null)
const message = ref<string | null>('Connecting...')
const hovered = shallowRef<Label | null>(null)
/** Non-null while a plot is on the stage, which is what puts its controls up. */
const focus = shallowRef<FocusState | null>(null)

let renderer: PlotRenderer | null = null
let board: PlotBoard | null = null
let resizeObserver: ResizeObserver | null = null
let frameHandle: number | null = null

const columns = new Map<string, ColumnRecord>()
/** The player list in display order; the board repeats over it. */
let order: string[] = []
let plotWidth = ASSUMED_PLOT_WIDTH
let spacing = boardPitch(plotWidth)
/**
 * Quarter turns only keep a plot inside its shaft while its footprint is
 * square, which every plot published so far is. A rectangular one is turned by
 * half turns instead rather than left sticking out over the floor.
 */
let squarePlots = true
let tallest = 24

/** Where the board has drifted to, on both floor axes. */
const scroll = { x: 0, z: 0 }
/** Pointer position in CSS pixels relative to the canvas, or null when away. */
let pointer: { x: number; y: number } | null = null
/** The lattice cell the pointer is resting on, or null while it is over none. */
let hoverKey: string | null = null
/** When the pointer landed on that cell. */
let hoverSince = 0
/**
 * Cells that are part way out of their shafts, hovered or still settling back.
 *
 * Only cells actually off the ground are held, and each is dropped again once
 * it lands, so a cell that scrolls away mid-lift is not left behind here: the
 * board runs for hours and the lattice coordinates it is keyed by never repeat.
 */
const lifts: { key: string; height: number }[] = []
/** Last frame's drawn copies, so a tap can pick without waiting for a frame. */
let lastSlots: HoverSlot[] = []
/**
 * The cell holding the stage, kept until it has finished going back so that
 * letting a plot go is animated rather than a cut.
 */
let focusKey: string | null = null
/** 1 while the camera is going in to the focused plot, 0 while it comes out. */
let focusTarget = 0
let focusProgress = 0
/** The same journey, trailing behind: how far the board has washed out. */
let veilProgress = 0
/** How far the focused plot has been spun, in radians. */
let focusSpin = 0
/**
 * How far the view has been zoomed, shared by the board and the plot on it.
 *
 * One level rather than one each: the two views are a moment apart, and a plot
 * that jumped to a different zoom the instant it was picked up would read as
 * the board having moved rather than as the plot coming forward.
 */
let zoom = 1
/** How far the board has stood back for whatever is covering it, 0 to 1. */
let coverEase = 0
/** Pointers currently down, and the span between them while pinching. */
const contacts = new Map<number, { x: number; y: number }>()
let pinchSpan = 0
/**
 * The cut the focused plot is meshed at, and the one it should be meshed at.
 *
 * They differ while a re-mesh is in flight: the cut can be dragged through a
 * dozen layers in the time one of them is meshed, and only the layer it lands
 * on is worth drawing. Everything in between is skipped rather than queued.
 */
let sliceDrawn = 0
let sliceWanted = 0
let slicing = false
let lastFrameAt = 0
let manualUntil = 0
/**
 * Set whenever something changes that the last drawn frame does not show, so a
 * board sitting still is not redrawn sixty times a second for the whole event.
 */
let needsRender = true

/**
 * Display order: leaderboard rank first, then anyone with a plot but no
 * leaderboard row (a player who joined before scoring picked them up).
 */
function recomputeOrder(): void {
  const rankOf = new Map(props.rows.map((row) => [row.playerUuid, row.rank]))
  order = [...columns.keys()].sort((a, b) => {
    const ra = rankOf.get(a)
    const rb = rankOf.get(b)
    if (ra !== undefined && rb !== undefined) return ra - rb
    if (ra !== undefined) return -1
    if (rb !== undefined) return 1
    return (columns.get(a)?.plotIndex ?? 0) - (columns.get(b)?.plotIndex ?? 0)
  })
  // This is the board's answer to "whose plot can be pointed at": the
  // leaderboard over it lists players the board may have nothing to show for.
  emit('plots', order)
  needsRender = true
}

function frame(now: number): void {
  frameHandle = requestAnimationFrame(frame)
  if (!renderer || order.length === 0) return

  const deltaMs = lastFrameAt === 0 ? 0 : Math.min(now - lastFrameAt, 100)
  lastFrameAt = now

  // The board always repeats, so it always has somewhere to scroll to. It does
  // not scroll at all while a plot is being looked at: the rest of the board
  // has faded out, and the plot on the stage is not going anywhere.
  const drifting = now > manualUntil && !holding()
  if (drifting) {
    // The drift runs along a world axis, which an isometric camera shows as a
    // screen diagonal. Scrubbing is free to leave that axis.
    scroll.x += (SCROLL_SPEED * SCROLL_DIRECTION.x * deltaMs) / 1000
    scroll.z += (SCROLL_SPEED * SCROLL_DIRECTION.z * deltaMs) / 1000
  } else if (!needsRender) {
    return
  }
  needsRender = false

  // Blocks that have just been placed or broken are growing in or shrinking
  // away, which the board has to keep drawing until they have settled.
  if (renderer.settling) needsRender = true

  applyCover(deltaMs)
  renderer.setScroll(scroll.x, scroll.z)

  const cells = layoutGrid(order.length, spacing, scroll.x, scroll.z, renderer.viewExtent)

  const renderSlots: HoverSlot[] = []
  for (const cell of cells) {
    const uuid = order[cell.playerIndex]
    if (!columns.has(uuid)) continue
    renderSlots.push({
      uuid,
      x: cell.x,
      z: cell.z,
      turn: squarePlots ? cell.turn : cell.turn & 2,
      key: `${cell.gx}:${cell.gz}`
    })
  }

  renderer.syncPlots(renderSlots)
  lastSlots = renderSlots
  // Picking first, then lifting: the pick decides what is hovered, and it has
  // to test the plots where they rest rather than where the lift has taken
  // them. The card is placed last of all, so it rides up with its plot.
  let picked: number | null = null
  if (props.covered) {
    // Nothing under a cover is hoverable, and a plot left lit under one would
    // stay lit for as long as it was there.
    clearHover()
  } else if (!holding()) {
    picked = pickHover(renderSlots, now)
  } else {
    // Nothing on the board behind the focused plot is hoverable, and the plot
    // itself is no longer where the ray would look for it.
    clearHover()
  }

  applyLifts(renderSlots, deltaMs)
  applyGlint(renderSlots)
  applyFocus(renderSlots, deltaMs)
  showCard(renderSlots, picked, now)
  renderer.renderNow()
}

/**
 * Eases every lifted cell towards where it belongs and hands the heights to the
 * renderer.
 *
 * Exponential easing rather than a fixed duration: a plot that is caught on the
 * way down turns around from wherever it had got to, which is what a pointer
 * sweeping back over a plot it has just left should look like.
 */
function applyLifts(slots: HoverSlot[], deltaMs: number): void {
  if (!renderer) return
  if (hoverKey !== null && !lifts.some((lift) => lift.key === hoverKey)) {
    lifts.push({ key: hoverKey, height: 0 })
  }
  if (lifts.length === 0) return

  const step = reduceMotion() ? 1 : 1 - Math.exp(-deltaMs / LIFT_TAU_MS)

  for (let i = lifts.length - 1; i >= 0; i--) {
    const lift = lifts[i]
    const target = lift.key === hoverKey ? HOVER_LIFT : 0
    lift.height += (target - lift.height) * step

    if (Math.abs(target - lift.height) < LIFT_EPSILON) {
      lift.height = target
      // Down and staying down: nothing left to animate or to raise.
      if (target === 0) lifts.splice(i, 1)
    }
  }

  // A board sitting still only redraws when something has changed. A plot off
  // the ground is either still moving or is glinting, and both need frames.
  if (lifts.length > 0) needsRender = true

  for (let i = 0; i < slots.length; i++) {
    const lift = lifts.find((entry) => entry.key === slots[i].key)
    if (lift) renderer.setLift(i, lift.height)
  }
}

/**
 * Puts the enchanted glint on the hovered plot, in step with its lift.
 *
 * Tying it to the lift rather than to the hover itself means it arrives and
 * leaves with the plot rather than snapping on under it.
 */
function applyGlint(slots: HoverSlot[]): void {
  if (!renderer) return

  // A plot on the stage has been picked already, and a glint on the board
  // behind it would only pull the eye back off it.
  const key = !holding() ? hoverKey : null
  const lift = key === null ? undefined : lifts.find((entry) => entry.key === key)
  if (!lift) {
    renderer.setGlint(null, 0)
    return
  }

  const index = slots.findIndex((slot) => slot.key === key)
  renderer.setGlint(index === -1 ? null : index, lift.height / HOVER_LIFT)
}

/**
 * Eases the camera in to the clicked plot, or back out to the board once it has
 * been let go, with the board washing out a beat behind it either way.
 */
function applyFocus(slots: HoverSlot[], deltaMs: number): void {
  if (!renderer || (focusKey === null && focusProgress === 0 && veilProgress === 0)) return

  const reduced = reduceMotion()
  const step = reduced ? 1 : 1 - Math.exp(-deltaMs / FOCUS_TAU_MS)
  const wash = reduced ? 1 : 1 - Math.exp(-deltaMs / VEIL_TAU_MS)
  focusProgress += (focusTarget - focusProgress) * step
  veilProgress += (focusTarget - veilProgress) * wash

  // The plot is only let go of once both have arrived: the wash is the one
  // still moving by then, and dropping the focus out from under it would take
  // the board back in a single frame.
  if (
    Math.abs(focusTarget - focusProgress) < FOCUS_EPSILON &&
    Math.abs(focusTarget - veilProgress) < FOCUS_EPSILON
  ) {
    focusProgress = focusTarget
    veilProgress = focusTarget
    // Back in its cell: the stage is free, and the board can drift again.
    if (focusTarget === 0) focusKey = null
  } else {
    needsRender = true
  }

  const index = focusKey === null ? -1 : slots.findIndex((slot) => slot.key === focusKey)
  renderer.setFocus(index === -1 ? null : index, focusProgress, veilProgress)
}

/**
 * Whether a plot is actually being held, as opposed to still going back.
 *
 * `focusKey` outlives a release: it is kept until the camera has pulled out and
 * the sky has faded, so that the way back can be animated at all. The board
 * itself has no reason to wait for that - the moment the plot is let go it is
 * the board again, and drags, hovers and clicks belong to it.
 */
function holding(): boolean {
  return focusTarget === 1
}

/** Takes the focused plot back to its cell, whole and the way round it was. */
function releaseFocus(): void {
  if (focusKey === null || focusTarget === 0) return
  focusTarget = 0
  focus.value = null
  focusSpin = 0
  sliceWanted = 0
  renderer?.setFocusSpin(0)
  renderer?.setFocusColumn(null)
  needsRender = true
  // Announced on the way out rather than on landing: whatever moved aside for
  // the plot can come back while it is still travelling.
  emit('focused', null)
}

/**
 * Cuts the focused plot off after `cut` layers.
 *
 * The plot is re-meshed rather than clipped, so that the cut comes back with a
 * surface on it. That is worker work, and only one is asked for at a time: a
 * cut dragged through twenty layers meshes the layer it started on, then the
 * one the visitor has arrived at by the time that comes back.
 */
function setSlice(cut: number): void {
  const column = focusedColumn()
  if (!column || !focus.value) return

  const clamped = Math.round(Math.min(Math.max(cut, 1), column.occupiedHeight))
  focus.value = { ...focus.value, cut: clamped, worldY: column.minY + clamped - 1 }
  sliceWanted = clamped
  void runSlice()
}

/** The record for whichever player is on the stage. */
function focusedColumn(): ColumnRecord | undefined {
  if (focusKey === null) return undefined
  const slot = lastSlots.find((entry) => entry.key === focusKey)
  return slot ? columns.get(slot.uuid) : undefined
}

async function runSlice(): Promise<void> {
  if (slicing) return
  const column = focusedColumn()
  if (!board || !renderer || !column || sliceWanted === sliceDrawn) return

  slicing = true
  try {
    while (sliceWanted !== sliceDrawn && focusKey !== null) {
      const wanted = sliceWanted
      // A plot cut at its own height is the plot, so the whole geometry it is
      // already sharing with the rest of the board is used rather than a
      // second copy of it.
      // Even going back to the whole plot goes through the worker, so that the
      // layers coming back fade in like every other move of the cut, and so
      // that the next move is compared against what is actually on screen.
      renderer.setFocusColumn(await board.slice(column.playerUuid, wanted, sliceDrawn))
      sliceDrawn = wanted
      needsRender = true
    }
  } catch (error) {
    // A plot can be dropped by the board while its slice is being meshed.
    console.warn('[plots] slice failed:', error)
  } finally {
    slicing = false
  }
}

/**
 * Brings the view in or pushes it back by a factor, within the band the board
 * allows.
 */
function zoomBy(factor: number): void {
  if (!renderer) return
  const next = Math.min(Math.max(zoom * factor, ZOOM_MIN), ZOOM_MAX)
  if (Math.abs(next - zoom) < 0.0005) return

  zoom = next
  pushZoom()
  needsRender = true
}

/** The zoom the visitor set, less however far the board has stood back. */
function pushZoom(): void {
  renderer?.setZoom(zoom * (1 - coverEase * (1 - COVERED_ZOOM)))
}

/**
 * Eases the board back while something covers it, and forward again when it
 * goes: a panel arriving over a board that does not move reads as a sticker on
 * the screen rather than as something in front of it.
 */
function applyCover(deltaMs: number): void {
  const target = props.covered ? 1 : 0
  if (coverEase === target) return

  const step = reduceMotion() ? 1 : 1 - Math.exp(-deltaMs / COVER_TAU_MS)
  coverEase += (target - coverEase) * step
  if (Math.abs(target - coverEase) < 0.002) coverEase = target
  else needsRender = true

  pushZoom()
}

/** The span between the two fingers of a pinch. */
function span(): number {
  const [first, second] = [...contacts.values()]
  if (!first || !second) return 0
  return Math.hypot(first.x - second.x, first.y - second.y)
}

/** Whether the visitor has asked for less movement. */
function reduceMotion(): boolean {
  return (
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * Finds the plot under the pointer, if any, and returns which drawn copy it is.
 *
 * Picking runs per frame rather than per pointer event because the board moves
 * underneath a still cursor.
 */
function pickHover(slots: HoverSlot[], now: number): number | null {
  if (!renderer || !pointer) {
    clearHover()
    return null
  }

  const index = renderer.pickSlot(pointer.x, pointer.y)
  const slot = index === null ? null : slots[index]
  if (index === null || !slot || !columns.has(slot.uuid)) {
    clearHover()
    return null
  }

  // Restarting on the cell rather than on the player: the same player is drawn
  // at many places on a repeating lattice, and moving between two copies of
  // them is still moving between two plots.
  if (slot.key !== hoverKey) {
    hoverKey = slot.key
    hoverSince = now
    // The card that was up belongs to the plot just left, so it goes now and
    // fades out while the new one is waiting its turn.
    hovered.value = null
  }

  return index
}

/**
 * Names and scores belong to whichever plot the pointer is over.
 *
 * The lattice fills the screen with plots, and a card on every one of them
 * buries the builds they are meant to identify. The plot itself rises straight
 * away; only the card is held back, so the board still answers the pointer
 * during the wait.
 */
function showCard(slots: HoverSlot[], index: number | null, now: number): void {
  if (!renderer || index === null) return

  const slot = slots[index]
  const column = columns.get(slot.uuid)
  if (!column) return

  if (now - hoverSince < HOVER_DELAY_MS) {
    // A board sitting still renders only when something changed, so the frame
    // that is meant to reveal the card has to be asked for.
    needsRender = true
    return
  }

  const projected = renderer.projectSlot(index)
  if (!projected) {
    clearHover()
    return
  }

  const entry = props.rows.find((row) => row.playerUuid === slot.uuid)
  hovered.value = {
    // The leaderboard name wins when there is one; the payload name is
    // captured at publish time and may be stale.
    name: entry?.playerName ?? column.playerName,
    score: entry ? entry.score.toLocaleString() : null,
    rank: entry?.rank ?? null,
    medal: entry ? getMedalEmoji(entry.rank) : null,
    x: projected.x,
    y: projected.y
  }
}

function clearHover(): void {
  hoverKey = null
  hoverSince = 0
  hovered.value = null
}

/**
 * Re-sizes the lattice to the plots actually on the board.
 *
 * Plot size is a server setting and is published per plot, so this is driven by
 * the widest one decoded rather than by any constant here. It runs on every
 * mesh because a wider plot can arrive at any time - a board that is all one
 * size settles on the first one and never moves again.
 */
function resizeLattice(): void {
  if (!renderer) return

  const plots = [...columns.values()]
  const width = widestPlot(plots)
  const pitch = boardPitch(width)
  if (width === plotWidth && pitch === spacing) return

  // Hold the board still: the scroll names a cell, and the cell just changed
  // size underneath it.
  scroll.x = rescaleScroll(scroll.x, spacing, pitch)
  scroll.z = rescaleScroll(scroll.z, spacing, pitch)

  plotWidth = width
  spacing = pitch
  squarePlots = plots.every((plot) => plot.sizeX === plot.sizeZ)
  renderer.setGrid(spacing, plotWidth)
}

function onMesh(mesh: DecodeSuccess): void {
  if (!renderer) return
  needsRender = true

  columns.set(mesh.playerUuid, {
    playerUuid: mesh.playerUuid,
    playerName: mesh.playerName,
    plotIndex: mesh.plotIndex,
    occupiedHeight: mesh.occupiedHeight,
    surfaceLevel: mesh.surfaceLevel,
    minY: mesh.minY,
    sizeX: mesh.sizeX,
    sizeZ: mesh.sizeZ
  })

  resizeLattice()

  // The floor is flush with the plots' grass layer, so the columns descend into
  // it. Taken from the median across plots so one player's terracing does not
  // tilt the whole board.
  const surfaces = [...columns.values()].map((c) => c.surfaceLevel).sort((a, b) => a - b)
  if (surfaces.length) {
    renderer.setFloorLevel(surfaces[Math.floor(surfaces.length / 2)])
  }

  // Re-framed every time, not only when something gets taller: the framing
  // depends on the floor level, which is not known until the first plot has
  // been decoded. Measured across the current plots rather than kept as a
  // high-water mark, so the view tightens again if the tallest build is razed.
  const heights = [...columns.values()].map((c) => c.occupiedHeight)
  tallest = Math.max(...heights, renderer.floorLevel + 4)
  renderer.frame(tallest)

  // setColumn disposes the previous geometry for this player.
  renderer.setColumn(mesh.playerUuid, mesh)
  recomputeOrder()
  message.value = null
}

function onRemoved(uuid: string): void {
  needsRender = true
  renderer?.removeColumn(uuid)
  columns.delete(uuid)
  recomputeOrder()
}

function onStatus(status: BoardStatus): void {
  emit('status', status)
  if (columns.size === 0) {
    message.value =
      status.state === 'stale'
        ? 'Waiting for the server...'
        : status.plotCount === 0 && status.state === 'live'
          ? 'No plots published yet'
          : 'Connecting...'
  } else {
    message.value = null
  }
}

/**
 * Manual scrubbing suspends the automatic scroll briefly.
 *
 * Both floor axes move, so the board can be pushed anywhere on the lattice
 * rather than only back and forth along the drift.
 */
function scrub(dxPixels: number, dyPixels: number): void {
  if (!renderer) return
  // Negated: the board moves with the gesture, so the world slides the other
  // way underneath it.
  const delta = screenDeltaToWorld(-dxPixels, -dyPixels, renderer.unitsPerPixel)
  scroll.x += delta.x
  scroll.z += delta.z
  manualUntil = performance.now() + RESUME_AFTER_MS
  needsRender = true
}

function onWheel(event: WheelEvent): void {
  event.preventDefault()
  if (props.covered) return

  // A pinch on a trackpad arrives as a wheel event with ctrl held, which is
  // also how a mouse asks to zoom. The plain wheel is already spoken for.
  if (event.ctrlKey || event.metaKey) {
    zoomBy(Math.exp(-event.deltaY * ZOOM_PER_PIXEL))
    return
  }

  // Over a focused plot the wheel takes the cut up and down, which is the only
  // thing on screen there is to scroll through.
  if (focus.value) {
    const notches = Math.sign(event.deltaY) * SLICE_PER_NOTCH
    setSlice(focus.value.cut - notches)
    return
  }

  scrub(-event.deltaX * WHEEL_SCALE, -event.deltaY * WHEEL_SCALE)
}

/** Pointer position relative to the canvas, which the card is placed against. */
function trackPointer(event: PointerEvent): void {
  const bounds = canvas.value?.getBoundingClientRect()
  if (!bounds) return
  pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
  needsRender = true
}

let dragging = false
let dragX = 0
let dragY = 0
/** Distance travelled since the press, which tells a drag from a click. */
let dragDistance = 0
function onPointerDown(event: PointerEvent): void {
  if (props.covered) return
  contacts.set(event.pointerId, { x: event.clientX, y: event.clientY })
  if (contacts.size > 1) {
    // A second finger turns the gesture into a pinch: whatever the first one
    // had started doing stops there rather than being dragged along with it.
    dragging = false
    pinchSpan = span()
    return
  }

  dragging = true
  dragX = event.clientX
  dragY = event.clientY
  dragDistance = 0
  trackPointer(event)
  ;(event.target as Element).setPointerCapture?.(event.pointerId)
}
function onPointerMove(event: PointerEvent): void {
  if (props.covered) return
  if (contacts.has(event.pointerId)) {
    contacts.set(event.pointerId, { x: event.clientX, y: event.clientY })
  }

  if (contacts.size > 1) {
    const reach = span()
    if (pinchSpan > 0 && reach > 0) zoomBy(reach / pinchSpan)
    pinchSpan = reach
    return
  }

  trackPointer(event)
  if (!dragging) return

  const dx = event.clientX - dragX
  const dy = event.clientY - dragY
  dragX = event.clientX
  dragY = event.clientY
  dragDistance += Math.hypot(dx, dy)

  if (holding()) {
    // The board is frozen behind the focused plot, so a drag turns the view of
    // it instead of scrubbing what is no longer moving.
    //
    // Subtracted, because what actually moves is the camera: dragging right
    // swings it left around the plot, which is what carries the plot's right
    // side towards the viewer - the plot follows the hand rather than fleeing
    // it, the way turning something on a table does.
    focusSpin -= dx * SPIN_PER_PIXEL
    renderer?.setFocusSpin(focusSpin)
    needsRender = true
    return
  }

  scrub(dx, dy)
}
/**
 * A press that never became a drag is a click, and a click is a choice of plot.
 *
 * Any click while a plot is on the stage puts it back, wherever it lands: there
 * is nothing else on a faded board to click on.
 */
function onPointerUp(event: PointerEvent): void {
  // The one thing a covered board answers: a click asks for the cover to go.
  if (props.covered) {
    emit('dismiss')
    return
  }

  contacts.delete(event.pointerId)
  pinchSpan = 0

  const clicked = dragging && dragDistance <= DRAG_SLOP_PX
  dragging = false
  if (!clicked) return

  if (holding()) {
    releaseFocus()
    return
  }

  // A click on bare floor picks nothing and is left alone.
  const slot = slotUnderPointer()
  if (!slot) return
  takeFocus(slot.key, slot.uuid)
}

/**
 * Every player the board can show, by uuid and by whichever names they answer
 * to - the leaderboard's and the one captured with the plot.
 */
function boardPlayers(): { uuid: string; name: string }[] {
  return order.flatMap((uuid) => {
    const names = [
      props.rows.find((row) => row.playerUuid === uuid)?.playerName,
      columns.get(uuid)?.playerName
    ]
    return names.filter((name): name is string => !!name).map((name) => ({ uuid, name }))
  })
}

/**
 * Puts a named player's plot on the stage, the way clicking it would. The
 * player is named by uuid or by name, since a shared link carries a name.
 *
 * The lattice draws every player at many cells, so the copy nearest the middle
 * of the screen is the one brought forward. A board with more plots than the
 * view holds may not be drawing them anywhere, in which case the cell holding
 * them is brought to the middle first.
 *
 * Answers whether the board had that player at all: a link can name a plot
 * that has not been published yet, or one the board has since dropped.
 */
function focusPlayer(idOrName: string): boolean {
  const uuid = resolvePlot(idOrName, boardPlayers())
  const index = uuid === null ? -1 : order.indexOf(uuid)
  if (uuid === null || index === -1 || spacing <= 0) return false
  // Asking for a second plot while one is up is a change of mind, not a
  // dismissal: the one on the stage goes back and the new one comes forward.
  if (focusKey !== null) releaseFocus()

  const drawn = lastSlots.filter((entry) => entry.uuid === uuid)
  if (drawn.length) {
    const nearest = drawn.reduce((a, b) =>
      Math.hypot(a.x, a.z) <= Math.hypot(b.x, b.z) ? a : b
    )
    takeFocus(nearest.key, uuid)
    return true
  }

  // The row the board is already on is kept and the column solved for, so it
  // travels the short way to the nearest cell holding this player rather than
  // back to the lattice origin.
  const count = order.length
  const gz = Math.round(scroll.z / spacing)
  const here = Math.round(scroll.x / spacing)
  const wanted = (((index - gz * pickStride(count)) % count) + count) % count
  let step = (((wanted - here) % count) + count) % count
  if (step * 2 > count) step -= count
  const gx = here + step

  scroll.x = gx * spacing
  scroll.z = gz * spacing
  manualUntil = performance.now() + RESUME_AFTER_MS
  needsRender = true
  // The cell is not drawn until the next frame; the stage is keyed by the cell
  // rather than by that frame's slot, so it finds it when it is.
  takeFocus(`${gx}:${gz}`, uuid)
  return true
}

/** Puts a plot on the stage, facing as it stood and cut at nothing. */
function takeFocus(key: string, uuid: string): void {
  const column = columns.get(uuid)
  if (!column) return

  focusKey = key
  focusTarget = 1
  focusSpin = 0
  renderer?.setFocusSpin(0)

  sliceDrawn = column.occupiedHeight
  sliceWanted = sliceDrawn
  // The leaderboard name wins over the one captured at publish time, the same
  // way the hover card picks one: a payload's name can be stale, or a bare uuid.
  const entry = props.rows.find((row) => row.playerUuid === uuid)
  focus.value = {
    name: entry?.playerName ?? column.playerName,
    score: entry ? entry.score.toLocaleString() : null,
    cut: sliceDrawn,
    layers: column.occupiedHeight,
    worldY: column.minY + sliceDrawn - 1
  }

  needsRender = true
  emit('focused', { uuid, name: focus.value.name })
}

/**
 * The drawn copy under the pointer, picked on the spot if hovering has not
 * already
 * answered that.
 *
 * A tap has no hover before it: the press is the first the board hears of where
 * the finger is, and waiting for the next frame to find out would lose taps
 * shorter than one.
 */
function slotUnderPointer(): HoverSlot | null {
  if (hoverKey !== null) return lastSlots.find((slot) => slot.key === hoverKey) ?? null
  if (!renderer || !pointer) return null
  const index = renderer.pickSlot(pointer.x, pointer.y)
  return index === null ? null : (lastSlots[index] ?? null)
}

/**
 * Escape lets the plot go, and the zoom keys work the board, for anyone not
 * reaching for the pointer.
 */
function onKeyDown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    // A plot on the stage has first claim on it; with none up, Escape belongs
    // to whatever is covering the board.
    if (focusKey !== null) releaseFocus()
    else emit('escape')
    return
  }

  if (props.covered) return
  if (event.key === '+' || event.key === '=') zoomBy(1 + ZOOM_PER_PIXEL * 60)
  if (event.key === '-' || event.key === '_') zoomBy(1 - ZOOM_PER_PIXEL * 60)
}
function onPointerLeave(event?: PointerEvent): void {
  if (event) contacts.delete(event.pointerId)
  else contacts.clear()
  pinchSpan = 0
  dragging = false
  pointer = null
  clearHover()
  needsRender = true
}

/** An all-day display should not render while nobody is looking at it. */
function onVisibilityChange(): void {
  if (document.hidden) {
    if (frameHandle !== null) cancelAnimationFrame(frameHandle)
    frameHandle = null
  } else if (frameHandle === null) {
    lastFrameAt = 0
    needsRender = true
    frameHandle = requestAnimationFrame(frame)
  }
}

/**
 * Something covering the board puts back whatever was on the stage.
 *
 * Opening the leaderboard over a focused plot would otherwise leave the plot
 * standing on its backdrop behind the panel, with the board it came from
 * nowhere to be seen.
 */
watch(
  () => props.covered,
  (covered) => {
    if (covered) releaseFocus()
    // The board has to keep drawing while it stands back or comes forward.
    needsRender = true
  }
)

watch(
  () => props.rows,
  () => {
    needsRender = true
    recomputeOrder()
  },
  { deep: false }
)

onMounted(() => {
  if (!canvas.value) return

  renderer = new PlotRenderer(canvas.value)
  renderer.setGrid(spacing, plotWidth)
  renderer.frame(tallest)

  resizeObserver = new ResizeObserver(() => {
    needsRender = true
    renderer?.resize()
  })
  resizeObserver.observe(canvas.value)

  if (!plotsConfigured()) {
    message.value = 'VITE_PLOTS_API_URL is not set'
    return
  }

  // A handle for checking GPU bookkeeping from the console during development;
  // the board runs for hours at a time and a geometry leak is invisible until
  // the tab dies.
  if (import.meta.env.DEV) {
    ;(window as unknown as Record<string, unknown>).__plotRenderer = renderer
  }

  board = new PlotBoard({ onMesh, onRemoved, onStatus })
  board.start()

  document.addEventListener('visibilitychange', onVisibilityChange)
  document.addEventListener('keydown', onKeyDown)
  frameHandle = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
  document.removeEventListener('keydown', onKeyDown)
  if (frameHandle !== null) cancelAnimationFrame(frameHandle)
  frameHandle = null
  resizeObserver?.disconnect()
  resizeObserver = null
  // Both own resources the garbage collector will not reclaim on its own.
  board?.stop()
  board = null
  renderer?.dispose()
  renderer = null
})
</script>

<template>
  <div
    class="absolute inset-0 touch-none"
    @wheel="onWheel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerLeave"
    @pointerleave="onPointerLeave"
  >
    <canvas ref="canvas" class="block h-full w-full" />

    <!-- The hovered plot's card, at that plot's top projected into screen space -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <Transition name="plot-card">
        <div
          v-if="hovered"
          data-plot-label
          class="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap text-center"
          :style="{ left: hovered.x + 'px', top: hovered.y + 'px' }"
        >
          <div
            class="rounded-md bg-white/75 px-2 py-1 text-xs shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
          >
            <span v-if="hovered.medal" class="mr-0.5">{{ hovered.medal }}</span>
            <span v-else-if="hovered.rank" class="mr-1 text-slate-400">#{{ hovered.rank }}</span>
            <span class="font-semibold text-slate-700">{{ hovered.name }}</span>
            <span v-if="hovered.score" class="ml-1.5 text-slate-500">{{ hovered.score }}</span>
            <span v-else class="ml-1.5 italic text-slate-400">unranked</span>
          </div>
        </div>
      </Transition>
    </div>

    <!--
      The focused plot's own controls. The board behind it is black by the time
      these are up, so they are laid out for that rather than for the board.
    -->
    <Transition name="plot-card">
      <div
        v-if="focus && !covered"
        class="pointer-events-none absolute inset-0"
        @pointerdown.stop
        @pointerup.stop
      >
        <div class="absolute inset-y-0 right-0 flex items-center p-4 sm:p-6">
          <div
            class="pointer-events-auto flex flex-col items-center gap-3 rounded-xl border border-white/60 bg-white/55 px-3 py-4 backdrop-blur-sm"
          >
            <span class="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Slice
            </span>
            <Slider
              :model-value="focus.cut"
              orientation="vertical"
              :min="1"
              :max="focus.layers"
              class="h-40 sm:h-56"
              aria-label="Slice height"
              @update:model-value="setSlice(Number($event))"
            />
            <span class="text-xs font-semibold tabular-nums text-slate-800">Y {{ focus.worldY }}</span>
            <button
              class="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600 disabled:opacity-40"
              :disabled="focus.cut === focus.layers"
              @click="setSlice(focus.layers)"
            >
              Whole
            </button>
          </div>
        </div>

        <div class="absolute inset-x-0 bottom-6 flex flex-col items-center gap-1 text-center">
          <span class="text-sm font-semibold text-slate-800">
            {{ focus.name }}
            <span v-if="focus.score" class="ml-1 font-normal text-white/50">{{ focus.score }}</span>
          </span>
          <span class="text-[11px] text-slate-600">
            Drag to spin &middot; scroll to slice &middot; pinch to zoom &middot; click anywhere to
            go back
          </span>
        </div>
      </div>
    </Transition>

    <p
      v-if="message"
      class="pointer-events-none absolute inset-x-0 bottom-16 text-center text-sm font-semibold text-slate-400"
    >
      {{ message }}
    </p>

    <!--
      The block textures are someone else's work and are used on their terms.
      Kept quiet, but on the board rather than buried in a credits page.
    -->
    <p class="pointer-events-none absolute bottom-1 right-2 text-[10px] text-slate-400/70">
      Textures: Pixel Perfection by XSSheep &amp; Nova_Wostra
    </p>
  </div>
</template>

<style scoped>
/*
 * The card is already held back for a moment, so it should arrive softly
 * rather than snap into place. It leaves faster than it arrives: a card that
 * lingers is labelling a plot the pointer has already left, and the one for the
 * new plot is waiting behind it.
 */
.plot-card-enter-active {
  transition: opacity 110ms ease-out;
}

.plot-card-leave-active {
  transition: opacity 90ms ease-in;
}

.plot-card-enter-from,
.plot-card-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .plot-card-enter-active,
  .plot-card-leave-active {
    transition: none;
  }
}
</style>
