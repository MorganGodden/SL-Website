/**
 * Block textures: which tile of the atlas each face of a block samples.
 *
 * The atlas itself and the table behind this are baked from a Minecraft
 * resource pack by `npm run build:block-atlas`; nothing here parses a pack at
 * runtime. This module is the part the mesher needs: palette entry in, six
 * face tiles out, with the block's state taken into account.
 *
 * It runs inside the decode worker, so it must stay free of anything DOM.
 */
import {
  ATLAS_CELL,
  ATLAS_COLUMNS,
  ATLAS_HEIGHT,
  ATLAS_PADDING,
  ATLAS_TILE,
  ATLAS_WIDTH,
  BLOCK_TILES,
  RenderClass,
  WHITE_TILE,
  type BlockTiles
} from './blockAtlas.generated'
import { blockProperty, resolveBlockId } from './blockIds'

export { RenderClass, WHITE_TILE }

/** How a block's six faces are drawn, in the mesher's face order. */
export interface FaceTiles {
  /** Tile index per face: +Y, -Y, +X, -X, +Z, -Z. */
  tiles: Uint16Array
  render: RenderClass
  /** False when no tile was found and the flat block colour should show. */
  textured: boolean
}

/** Every face on the plain white tile: the block keeps its flat colour. */
const UNTEXTURED: FaceTiles = {
  tiles: new Uint16Array(6).fill(WHITE_TILE),
  render: RenderClass.Opaque,
  textured: false
}

const hasTiles = (id: string) => BLOCK_TILES[id] !== undefined

/**
 * True when the atlas has a texture for this block, following the same shape
 * suffixes the colour table does.
 */
export function hasTexture(baseId: string): boolean {
  return resolveBlockId(baseId, hasTiles) !== null
}

const resolved = new Map<string, FaceTiles>()

/**
 * Face tiles for a full palette entry, e.g. `minecraft:oak_log[axis=x]`.
 *
 * Cached on the whole entry rather than the base id, because the state is part
 * of the answer: a log lying on its side shows its rings at the ends, not on
 * top, and grass under snow is white down its sides.
 */
export function faceTilesForEntry(paletteEntry: string): FaceTiles {
  const cached = resolved.get(paletteEntry)
  if (cached) return cached

  const faces = build(paletteEntry)
  resolved.set(paletteEntry, faces)
  return faces
}

function build(paletteEntry: string): FaceTiles {
  const bracket = paletteEntry.indexOf('[')
  const baseId = bracket === -1 ? paletteEntry : paletteEntry.slice(0, bracket)

  // Some states are their own texture: snow lying on the ground is a state of
  // the block underneath it, and the upper half of a tall plant is a different
  // picture from its lower half. The atlas carries those as entries of their
  // own, keyed by the state that selects them.
  const stated =
    (blockProperty(paletteEntry, 'snowy') === 'true'
      ? (BLOCK_TILES[`${baseId}[snowy=true]`] ?? null)
      : null) ??
    (blockProperty(paletteEntry, 'half') === 'upper'
      ? (BLOCK_TILES[`${baseId}[half=upper]`] ?? null)
      : null)

  const id = stated === null ? resolveBlockId(baseId, hasTiles) : null
  const entry: BlockTiles | null = stated ?? (id === null ? null : BLOCK_TILES[id])
  if (entry === null) return UNTEXTURED

  const [top, bottom, side, render] = entry
  const tiles = new Uint16Array(6)
  tiles.fill(side)

  // A pillar's axis says which pair of faces its end grain is on. The texture
  // on the four long faces should turn with it too; it is not, because the
  // mesher has no per-face rotation and a rotated bark texture reads the same
  // at the size a plot is drawn.
  switch (blockProperty(paletteEntry, 'axis')) {
    case 'x':
      tiles[2] = top
      tiles[3] = bottom
      break
    case 'z':
      tiles[4] = top
      tiles[5] = bottom
      break
    default:
      tiles[0] = top
      tiles[1] = bottom
  }

  return { tiles, render, textured: true }
}

/** The area of the atlas one tile occupies, in texture coordinates. */
export interface TileBounds {
  u0: number
  v0: number
  u1: number
  v1: number
}

/**
 * Where a tile sits in the atlas image, in pixels from its top left.
 *
 * For lifting a tile back out of the atlas: anything sampling the atlas on the
 * GPU wants `tileBounds` instead.
 */
export function tilePixelRect(tile: number): { x: number; y: number; size: number } {
  const column = tile % ATLAS_COLUMNS
  const row = Math.floor(tile / ATLAS_COLUMNS)

  return {
    x: column * ATLAS_CELL + ATLAS_PADDING,
    y: row * ATLAS_CELL + ATLAS_PADDING,
    size: ATLAS_TILE
  }
}

/**
 * Texture coordinates of a tile.
 *
 * The bounds are the tile's exact edges, with no inset: the padding around it
 * repeats its edge pixels, so a sampler reaching past the edge reads the same
 * colour it would have read anyway.
 *
 * Images are loaded with their first row at v = 1, so v is measured down from
 * the top of the atlas.
 */
export function tileBounds(tile: number): TileBounds {
  const column = tile % ATLAS_COLUMNS
  const row = Math.floor(tile / ATLAS_COLUMNS)

  const left = column * ATLAS_CELL + ATLAS_PADDING
  const top = row * ATLAS_CELL + ATLAS_PADDING

  return {
    u0: left / ATLAS_WIDTH,
    u1: (left + ATLAS_TILE) / ATLAS_WIDTH,
    v0: 1 - (top + ATLAS_TILE) / ATLAS_HEIGHT,
    v1: 1 - top / ATLAS_HEIGHT
  }
}
