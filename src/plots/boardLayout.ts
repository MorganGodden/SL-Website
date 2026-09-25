/**
 * Board layout maths, kept separate from the scene so it can be tested without
 * a live server and without a GPU.
 *
 * The board is an unbounded lattice of plots that repeats in both directions.
 * With only a handful of plots published the pattern simply repeats sooner —
 * the board is always full, which is the point.
 */

import { Plane, Ray, Vector3, type Matrix4 } from 'three'

/** Blocks of floor between one plot and the next, in both directions. */
export const PLOT_GAP = 2

/**
 * The plot width assumed before a single column has been decoded.
 *
 * Plot size is a server setting (`plots.middle-chunks`), published as `sizeX`
 * and `sizeZ` on every payload, so this is only the guess the first frame is
 * laid out with. {@link boardPitch} replaces it as soon as a column arrives,
 * and {@link rescaleScroll} keeps the board where it was when it does. It is
 * the plugin's own default so that the usual case never has to correct itself.
 */
export const ASSUMED_PLOT_WIDTH = 32

/** The footprint of one decoded plot, in blocks. */
export interface PlotFootprint {
  sizeX: number
  sizeZ: number
}

/**
 * How wide a lattice cell has to be to hold every plot on the board.
 *
 * The widest side of the widest plot, not the newest: plots are sized by the
 * server that published them, and a board can legitimately hold a mix - a
 * server that changed the setting still serves the old size for any plot
 * nobody has revisited since. Sizing to the newest would let a small plot
 * arriving late shrink the lattice under the large ones already on it, which
 * overlaps them. Every plot is drawn about its own centre, so one narrower than
 * the cell simply sits in a roomier gap.
 *
 * Both axes count, because a plot that is not square is turned by half turns
 * and so needs its long side to fit whichever way it faces.
 */
export function widestPlot(plots: Iterable<PlotFootprint>): number {
  let widest = 0
  for (const plot of plots) {
    widest = Math.max(widest, plot.sizeX, plot.sizeZ)
  }
  return widest > 0 ? widest : ASSUMED_PLOT_WIDTH
}

/** The lattice pitch for a plot width: the plot plus the floor around it. */
export function boardPitch(plotWidth: number): number {
  return plotWidth + PLOT_GAP
}

/**
 * Where the board has scrolled to, restated for a new pitch.
 *
 * The scroll is a world distance, but what it means is "this lattice cell is
 * under the camera". Re-pitching the lattice without restating it would leave
 * the scroll naming a different cell, so the board would jump the moment a
 * wider plot arrived - and it arrives asynchronously, mid-drift. Scaling keeps
 * the cell, and with it whatever the viewer was looking at.
 */
export function rescaleScroll(value: number, oldPitch: number, newPitch: number): number {
  if (oldPitch <= 0 || newPitch <= 0) return value
  return (value / oldPitch) * newPitch
}

/**
 * Direction of the automatic drift in world space.
 *
 * The lattice sits on the world axes so that neighbouring plots meet edge to
 * edge rather than corner to corner. An isometric camera projects a world axis
 * onto a screen diagonal, so drifting along one is a diagonal scroll.
 */
export const SCROLL_DIRECTION = { x: 1, z: 0 } as const

/**
 * How high the camera stands over the board, in radians.
 *
 * Lower than isometric on purpose. A flatter camera puts more of the plaza on
 * screen for the same view height, which is what gives the board its distance
 * and what the depth of field has to work with; the isometric 35.26 degrees -
 * the angle you get looking down (1, 1, 1) - showed barely two plots of it.
 * Half way between that and the 20 degrees this was first tried at: any flatter
 * and the plots flatten into ribbons and start hiding one another.
 */
export const CAMERA_ELEVATION = (27.5 * Math.PI) / 180

/**
 * How much a floor-plane step towards the top of the screen is foreshortened
 * by that tilt.
 *
 * Everything that turns a screen measurement into a world one goes through
 * this, so the camera and the lattice cannot drift apart: change the elevation
 * and the drag, the cull margin and the focus framing all follow.
 */
export const SCREEN_UP_ON_FLOOR = 1 / Math.sin(CAMERA_ELEVATION)

/** A displacement on the floor plane. */
export interface WorldDelta {
  x: number
  z: number
}

/**
 * A screen-space drag turned into a displacement on the floor plane.
 *
 * The board scrolls on two axes, but the axes the user pushes against are the
 * screen's, not the world's: dragging left should move the board left however
 * the isometric camera happens to be oriented. Screen-right lies along the
 * world diagonal (x - z) at full scale; screen-down lies along (x + z),
 * foreshortened, so covering a pixel vertically takes sqrt(3) times as much
 * world distance as covering one horizontally.
 *
 * With `unitsPerPixel` taken from the camera this is exact, so a drag tracks
 * the cursor rather than merely following it.
 */
export function screenDeltaToWorld(
  dxPixels: number,
  dyPixels: number,
  unitsPerPixel: number
): WorldDelta {
  const right = (dxPixels * unitsPerPixel) / Math.SQRT2
  const down = (dyPixels * unitsPerPixel * SCREEN_UP_ON_FLOOR) / Math.SQRT2
  return { x: right + down, z: down - right }
}

/** One plot drawn at one place on the lattice. */
export interface BoardCell {
  /** Index into the ordered player list. Repeats across the lattice. */
  playerIndex: number
  /**
   * Lattice coordinates of the cell.
   *
   * Unlike the world position, these do not move with the scroll: they are the
   * only stable name a particular plot on the board has, which is what lets the
   * scene tell "still the same plot" from "the board slid a plot along".
   */
  gx: number
  gz: number
  /** World position of the plot's centre. */
  x: number
  z: number
  /** Quarter turns about the vertical axis, 0-3. */
  turn: number
}

function greatestCommonDivisor(a: number, b: number): number {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const t = y
    y = x % y
    x = t
  }
  return x
}

/**
 * How far to advance through the player list when stepping one row.
 *
 * Stepping by one would lay identical players along every diagonal, which reads
 * as obvious banding. A stride coprime with the player count walks the whole
 * list along both axes instead, so no two neighbours are the same plot.
 */
export function pickStride(playerCount: number): number {
  if (playerCount <= 2) return 1
  for (let stride = 2; stride < playerCount; stride++) {
    if (greatestCommonDivisor(stride, playerCount) === 1) return stride
  }
  return 1
}

/**
 * Which way round the plot in a lattice cell faces.
 *
 * A hash of the cell rather than `Math.random`: the lattice is laid out afresh
 * every frame, so a plot drawing a new number each time would spin on the spot.
 * Quarter turns only, because a plot has to stay square in the shaft it sits
 * in — this is the repetition-breaker for a board that repeats, not a tilt.
 */
export function turnForCell(gx: number, gz: number): number {
  let hash = Math.imul(gx, 0x27d4eb2d) ^ Math.imul(gz, 0x165667b1)
  hash = Math.imul(hash ^ (hash >>> 15), 0x2c1b3c6d)
  hash ^= hash >>> 13
  hash = Math.imul(hash, 0x85ebca6b)
  return (hash >>> 16) & 3
}

/** Which player belongs in a lattice cell. */
export function playerForCell(
  gx: number,
  gz: number,
  playerCount: number,
  stride: number
): number {
  if (playerCount <= 0) return 0
  const raw = gx + gz * stride
  return ((raw % playerCount) + playerCount) % playerCount
}

/** Positive modulo, for placing the repeating floor under a negative scroll. */
export function wrapDistance(value: number, period: number): number {
  if (period <= 0) return 0
  return ((value % period) + period) % period
}

/**
 * How much of the floor plane the camera can see.
 *
 * An isometric camera turns the floor into a rotated rectangle, not a circle
 * and not an axis-aligned box: `across` bounds |x - z| (the screen-horizontal
 * direction) and `depth` bounds |x + z| (the screen-vertical one). Culling on
 * the real shape rather than a circumscribing circle is the difference between
 * placing ninety plots and placing two hundred and thirty.
 */
export interface ViewExtent {
  /** Bounds |x - z|, the screen-horizontal direction. */
  across: number
  /** Bounds (x + z) towards the bottom of the screen. */
  near: number
  /**
   * Bounds -(x + z) towards the top of the screen. Larger than `near`, because
   * anything built on a plot projects upwards: a tall tower one cell past the
   * top edge is still visible and would otherwise pop in.
   */
  far: number
}

/** Every plot the camera can see, on the floor plane. */
export function layoutGrid(
  playerCount: number,
  spacing: number,
  scrollX: number,
  scrollZ: number,
  extent: ViewExtent
): BoardCell[] {
  if (playerCount <= 0 || spacing <= 0 || extent.across <= 0) return []
  if (extent.near <= 0 || extent.far <= 0) return []

  const stride = pickStride(playerCount)
  const cells: BoardCell[] = []

  // The two bounds together cap |x| and |z|.
  const reach = (extent.across + Math.max(extent.near, extent.far)) / 2
  const firstX = Math.floor((scrollX - reach) / spacing)
  const lastX = Math.ceil((scrollX + reach) / spacing)
  const firstZ = Math.floor((scrollZ - reach) / spacing)
  const lastZ = Math.ceil((scrollZ + reach) / spacing)

  for (let gx = firstX; gx <= lastX; gx++) {
    for (let gz = firstZ; gz <= lastZ; gz++) {
      const x = gx * spacing - scrollX
      const z = gz * spacing - scrollZ
      if (Math.abs(x - z) > extent.across) continue
      const depth = x + z
      if (depth > extent.near || -depth > extent.far) continue
      cells.push({
        playerIndex: playerForCell(gx, gz, playerCount, stride),
        gx,
        gz,
        x,
        z,
        turn: turnForCell(gx, gz)
      })
    }
  }

  return cells
}

/** One drawn copy of a plot, as picking sees it. */
export interface PickTarget {
  /** Where the copy stands: moves and quarter turns only. */
  toWorld: Matrix4
  /** The inverse of `toWorld`. */
  toLocal: Matrix4
  sizeX: number
  sizeY: number
  sizeZ: number
  /** 1 for each block that is not air, indexed `(y * sizeZ + z) * sizeX + x`: see `solidBlocks`. */
  solid: ArrayLike<number>
}

const floorPlane = new Plane(new Vector3(0, 1, 0))
const floorCrossing = new Vector3()
const localRay = new Ray()
const hitPoint = new Vector3()
const crossingHere = new Vector3()

/**
 * Which drawn copy a ray picks, as an index into `targets`, or null for none.
 *
 * Each copy is walked along the ray block by block and hit at the first block
 * that is not air, which is exact for whole cubes without testing a single
 * triangle. The nearest hit wins.
 *
 * Most of a plot stands below the floor, and down there it can only be seen
 * down its own shaft: a hit below `floorY` counts only if the ray came down
 * through the floor inside that copy's footprint, since anywhere else the floor
 * is in front of it. Null entries are copies not drawn.
 */
export function pickColumn(
  ray: Ray,
  targets: readonly (PickTarget | null)[],
  floorY: number
): number | null {
  floorPlane.constant = -floorY
  const crossing = ray.intersectPlane(floorPlane, floorCrossing)

  let picked: number | null = null
  let nearest = Infinity
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]
    if (!target) continue
    localRay.copy(ray).applyMatrix4(target.toLocal)
    const t = marchBlocks(localRay, target)
    if (t === null) continue

    hitPoint.copy(localRay.origin).addScaledVector(localRay.direction, t)
    hitPoint.applyMatrix4(target.toWorld)
    if (hitPoint.y < floorY) {
      if (!crossing) continue
      crossingHere.copy(crossing).applyMatrix4(target.toLocal)
      const downOwnShaft =
        Math.abs(crossingHere.x) <= target.sizeX / 2 && Math.abs(crossingHere.z) <= target.sizeZ / 2
      if (!downOwnShaft) continue
    }

    const distance = hitPoint.distanceToSquared(ray.origin)
    if (distance < nearest) {
      nearest = distance
      picked = i
    }
  }
  return picked
}

/**
 * Where along one axis a ray is over the span `[0, size]`, as distances along
 * it, or null if it never is.
 */
function overSpan(position: number, direction: number, size: number): [number, number] | null {
  if (direction === 0) return position >= 0 && position <= size ? [-Infinity, Infinity] : null
  const a = -position / direction
  const b = (size - position) / direction
  return [Math.min(a, b), Math.max(a, b)]
}

/**
 * How far along a ray in a plot's own frame it first meets a block, or null.
 *
 * The frame is the mesher's: centred on the origin in x and z, standing on
 * y = 0. Blocks are visited in the order the ray passes through them, so the
 * air under a tree's leaves lets the ray through to whatever is behind it.
 */
function marchBlocks(ray: Ray, { sizeX, sizeY, sizeZ, solid }: PickTarget): number | null {
  const size = [sizeX, sizeY, sizeZ]
  // Measured from the plot's corner, so block n spans [n, n + 1) on every axis.
  const from = [ray.origin.x + sizeX / 2, ray.origin.y, ray.origin.z + sizeZ / 2]
  const heading = [ray.direction.x, ray.direction.y, ray.direction.z]

  let t = 0
  let leave = Infinity
  for (let axis = 0; axis < 3; axis++) {
    const span = overSpan(from[axis], heading[axis], size[axis])
    if (!span) return null
    t = Math.max(t, span[0])
    leave = Math.min(leave, span[1])
  }
  if (t >= leave) return null

  // The block the ray comes in at, and where it crosses into the next one
  // along each axis.
  const block = [0, 0, 0]
  const step = [0, 0, 0]
  const next = [0, 0, 0]
  for (let axis = 0; axis < 3; axis++) {
    const at = from[axis] + heading[axis] * t
    block[axis] = Math.max(0, Math.min(size[axis] - 1, Math.floor(at)))
    step[axis] = heading[axis] > 0 ? 1 : -1
    next[axis] =
      heading[axis] === 0
        ? Infinity
        : (block[axis] + (heading[axis] > 0 ? 1 : 0) - from[axis]) / heading[axis]
  }

  while (t < leave) {
    if (solid[(block[1] * sizeZ + block[2]) * sizeX + block[0]] === 1) return t
    const axis = next[0] < next[1] ? (next[0] < next[2] ? 0 : 2) : next[1] < next[2] ? 1 : 2
    block[axis] += step[axis]
    if (block[axis] < 0 || block[axis] >= size[axis]) return null
    t = next[axis]
    next[axis] += 1 / Math.abs(heading[axis])
  }
  return null
}

/** Room kept clear along each edge of the canvas, in CSS pixels. */
export interface ScreenInsets {
  left: number
  right: number
  top: number
  bottom: number
}

export const NO_INSETS: ScreenInsets = { left: 0, right: 0, top: 0, bottom: 0 }

/**
 * World units per CSS pixel that fit a focused plot into what the insets leave
 * of the canvas, with `margin` to spare along whichever side it fills first.
 *
 * `across` and `tall` are the plot's extent on screen, in world units. It is
 * fitted to the free rectangle rather than to the canvas: a panel along one
 * edge is room the plot cannot use, and fitting it to the whole canvas would
 * put part of it under the panel.
 */
export function focusUnitsPerPixel(
  across: number,
  tall: number,
  width: number,
  height: number,
  insets: ScreenInsets,
  margin: number
): number {
  const freeWidth = Math.max(width - insets.left - insets.right, 1)
  const freeHeight = Math.max(height - insets.top - insets.bottom, 1)
  return Math.max(across / freeWidth, tall / freeHeight) * margin
}

/**
 * The insets a focused plot can actually be kept clear of, framed at
 * `perPixel` world units per CSS pixel.
 *
 * The camera never pulls out past the board's own framing, so a plot can come
 * out wider or taller than the room the panels leave it - a wide plot on a
 * portrait phone is wider than the whole screen. Kept clear of the panels
 * along that axis anyway, it would only be pushed off the opposite edge, so
 * there it is centred on the screen as it was before there were panels.
 */
export function insetsThatFit(
  across: number,
  tall: number,
  perPixel: number,
  width: number,
  height: number,
  insets: ScreenInsets
): ScreenInsets {
  const fitsAcross = across / perPixel <= width - insets.left - insets.right
  const fitsUp = tall / perPixel <= height - insets.top - insets.bottom
  return {
    left: fitsAcross ? insets.left : 0,
    right: fitsAcross ? insets.right : 0,
    top: fitsUp ? insets.top : 0,
    bottom: fitsUp ? insets.bottom : 0
  }
}

/**
 * An orthographic frustum `halfHeight` tall each way, slid so that whatever the
 * camera looks at lands in the middle of the free rectangle instead of the
 * middle of the canvas.
 *
 * `ease` runs from 0 (centred on the canvas) to 1 (centred in the free space),
 * so the slide can travel with the camera rather than jump ahead of it.
 */
export function insetFrustum(
  halfHeight: number,
  width: number,
  height: number,
  insets: ScreenInsets,
  ease: number
): { left: number; right: number; top: number; bottom: number } {
  const halfWidth = (halfHeight * width) / height
  const perPixel = (halfHeight * 2) / height
  const shiftX = ((insets.left - insets.right) / 2) * perPixel * ease
  const shiftY = ((insets.top - insets.bottom) / 2) * perPixel * ease
  return {
    left: -halfWidth - shiftX,
    right: halfWidth - shiftX,
    top: halfHeight + shiftY,
    bottom: -halfHeight + shiftY
  }
}
