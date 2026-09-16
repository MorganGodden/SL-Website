<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import { PlotRenderer, type RenderSlot } from '@/plots/plotRenderer'
import { PlotBoard, type BoardStatus } from '@/plots/plotBoard'
import { plotsConfigured } from '@/plots/plotsClient'
import { PLOT_GAP, SCROLL_DIRECTION, layoutGrid, screenDeltaToWorld } from '@/plots/boardLayout'
import type { DecodeSuccess } from '@/plots/decode.worker'
import type { LeaderboardEntry } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

const props = defineProps<{
  /** Leaderboard rows, joined to columns on playerUuid. */
  rows: LeaderboardEntry[]
}>()

const emit = defineEmits<{ status: [BoardStatus] }>()

/**
 * World units per second of automatic scrolling. A plot is twenty units across,
 * so the board moves by roughly one plot every fifteen seconds: enough that a
 * display left running keeps showing new builds, slow enough to read a name.
 */
const SCROLL_SPEED = 1.3
/** How long a manual scrub suspends the automatic scroll. */
const RESUME_AFTER_MS = 4000
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
const HOVER_DELAY_MS = 300

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

const canvas = ref<HTMLCanvasElement | null>(null)
const message = ref<string | null>('Connecting...')
const hovered = shallowRef<Label | null>(null)

let renderer: PlotRenderer | null = null
let board: PlotBoard | null = null
let resizeObserver: ResizeObserver | null = null
let frameHandle: number | null = null

const columns = new Map<string, ColumnRecord>()
/** The player list in display order; the board repeats over it. */
let order: string[] = []
let spacing = 16 + PLOT_GAP
let plotWidth = 16
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
  needsRender = true
}

function frame(now: number): void {
  frameHandle = requestAnimationFrame(frame)
  if (!renderer || order.length === 0) return

  const deltaMs = lastFrameAt === 0 ? 0 : Math.min(now - lastFrameAt, 100)
  lastFrameAt = now

  // The board always repeats, so it always has somewhere to scroll to.
  const drifting = now > manualUntil
  if (drifting) {
    // The drift runs along a world axis, which an isometric camera shows as a
    // screen diagonal. Scrubbing is free to leave that axis.
    scroll.x += (SCROLL_SPEED * SCROLL_DIRECTION.x * deltaMs) / 1000
    scroll.z += (SCROLL_SPEED * SCROLL_DIRECTION.z * deltaMs) / 1000
  } else if (!needsRender) {
    return
  }
  needsRender = false

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
  updateHover(renderSlots, now)
  renderer.renderNow()
}

/**
 * Names and scores belong to whichever plot the pointer is over.
 *
 * The lattice fills the screen with plots, and a card on every one of them
 * buries the builds they are meant to identify. Picking runs per frame rather
 * than per pointer event because the board moves underneath a still cursor.
 */
function updateHover(slots: HoverSlot[], now: number): void {
  if (!renderer || !pointer) {
    clearHover()
    return
  }

  const index = renderer.pickSlot(pointer.x, pointer.y)
  const slot = index === null ? null : slots[index]
  const column = slot ? columns.get(slot.uuid) : undefined
  if (index === null || !slot || !column) {
    clearHover()
    return
  }

  const projected = renderer.projectSlot(index)
  if (!projected) {
    clearHover()
    return
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

  if (now - hoverSince < HOVER_DELAY_MS) {
    // A board sitting still renders only when something changed, so the frame
    // that is meant to reveal the card has to be asked for.
    needsRender = true
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

function onMesh(mesh: DecodeSuccess): void {
  if (!renderer) return
  needsRender = true

  columns.set(mesh.playerUuid, {
    playerUuid: mesh.playerUuid,
    playerName: mesh.playerName,
    plotIndex: mesh.plotIndex,
    occupiedHeight: mesh.occupiedHeight,
    surfaceLevel: mesh.surfaceLevel
  })

  plotWidth = mesh.sizeX
  squarePlots = mesh.sizeX === mesh.sizeZ
  spacing = mesh.sizeX + PLOT_GAP
  renderer.setGrid(spacing, plotWidth)

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
function onPointerDown(event: PointerEvent): void {
  dragging = true
  dragX = event.clientX
  dragY = event.clientY
  trackPointer(event)
  ;(event.target as Element).setPointerCapture?.(event.pointerId)
}
function onPointerMove(event: PointerEvent): void {
  trackPointer(event)
  if (!dragging) return
  scrub(event.clientX - dragX, event.clientY - dragY)
  dragX = event.clientX
  dragY = event.clientY
}
function onPointerUp(): void {
  dragging = false
}
function onPointerLeave(): void {
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
  frameHandle = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibilityChange)
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
  transition: opacity 180ms ease-out;
}

.plot-card-leave-active {
  transition: opacity 140ms ease-in;
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
