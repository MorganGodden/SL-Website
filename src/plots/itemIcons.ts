/**
 * Item icons for the Collection Log: where in which sheet an item's picture is.
 *
 * A flat item - a diamond, a door, a potion - has its own tile in items.png,
 * baked by `npm run build:item-icons`. An item that is a block in the hand has
 * none there, and takes the side of its block from the plot board's own atlas
 * instead, following the same shape suffixes the board does, so stairs and
 * slabs show their material.
 */
import itemsUrl from '@/assets/textures/items.png'
import blocksUrl from '@/assets/textures/blocks.png'
import {
  ITEM_ICONS,
  ITEM_ICON_COLUMNS,
  ITEM_ICON_ROWS,
  ITEM_ICON_TILE
} from './itemIcons.generated'
import {
  ATLAS_CELL,
  ATLAS_COLUMNS,
  ATLAS_HEIGHT,
  ATLAS_PADDING,
  ATLAS_TILE,
  ATLAS_WIDTH,
  BLOCK_TILES
} from './blockAtlas.generated'
import { resolveBlockId } from './blockIds'

/** One tile of a sheet: its top-left corner, and the sheet's size, in the sheet's pixels. */
export interface IconSpot {
  url: string
  x: number
  y: number
  sheetWidth: number
  sheetHeight: number
}

/** Both sheets use 16px tiles; a spot is scaled from this. */
const TILE = ITEM_ICON_TILE
/** In the atlas's per-block order: top, bottom, side. The side is what a block looks like held. */
const SIDE = 2

const resolved = new Map<string, IconSpot | null>()

/** The picture for an item id such as `diamond_sword`, or null if there is none. */
export function itemIcon(id: string): IconSpot | null {
  let spot = resolved.get(id)
  if (spot === undefined) {
    spot = lookUp(id)
    resolved.set(id, spot)
  }
  return spot
}

function lookUp(id: string): IconSpot | null {
  // Waxing a copper block does not change how it looks.
  if (id.startsWith('waxed_')) return lookUp(id.slice('waxed_'.length))
  const tile = ITEM_ICONS[id]
  if (tile !== undefined) {
    return {
      url: itemsUrl,
      x: (tile % ITEM_ICON_COLUMNS) * TILE,
      y: Math.floor(tile / ITEM_ICON_COLUMNS) * TILE,
      sheetWidth: ITEM_ICON_COLUMNS * TILE,
      sheetHeight: ITEM_ICON_ROWS * TILE
    }
  }
  const has = (key: string) => BLOCK_TILES[key] !== undefined
  // Wood and hyphae are bark all round: the side of the log or stem they are made from.
  const block =
    resolveBlockId(`minecraft:${id}`, has) ??
    resolveBlockId(`minecraft:${id.replace(/_wood$/, '_log').replace(/_hyphae$/, '_stem')}`, has)
  if (block === null) return null
  const face = BLOCK_TILES[block][SIDE]
  return {
    url: blocksUrl,
    x: (face % ATLAS_COLUMNS) * ATLAS_CELL + ATLAS_PADDING,
    y: Math.floor(face / ATLAS_COLUMNS) * ATLAS_CELL + ATLAS_PADDING,
    sheetWidth: ATLAS_WIDTH,
    sheetHeight: ATLAS_HEIGHT
  }
}

/** CSS that draws a spot `size` pixels square, as an element's background. */
export function iconStyle(spot: IconSpot, size: number): Record<string, string> {
  const scale = size / ATLAS_TILE
  return {
    backgroundImage: `url(${spot.url})`,
    backgroundSize: `${spot.sheetWidth * scale}px ${spot.sheetHeight * scale}px`,
    backgroundPosition: `${-spot.x * scale}px ${-spot.y * scale}px`
  }
}
