/**
 * Board layout maths, kept separate from the scene so it can be tested without
 * a live server and without a GPU.
 *
 * The board is an unbounded lattice of plots that repeats in both directions.
 * With only a handful of plots published the pattern simply repeats sooner —
 * the board is always full, which is the point.
 */

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
