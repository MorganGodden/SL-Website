/**
 * Types for the sl-plugin chunk snapshot format.
 *
 * The contract is authored in the plugin repository as FORMAT.md and is
 * normative. Nothing here may assume a dimension, a `minY`, a bit width or a
 * palette layout — every one of those is read from the payload.
 */

/** The only format version this client understands. */
export const SUPPORTED_FORMAT_VERSION = 1

/** The only iteration order this client understands. */
export const SUPPORTED_ORDER = 'x-fastest,then-z,then-y'

/** One entry of `GET /plots` — the change index. */
export interface PlotIndexEntry {
  playerUuid: string
  playerName: string
  plotIndex: number
  lastUpdated: number
  /** SHA-256 hex, UNQUOTED here. The `ETag` header on a column is QUOTED. */
  etag: string
}

/** The body of `GET /plots/{uuid}`. */
export interface PlotSnapshot {
  formatVersion: number
  playerUuid: string
  playerName: string
  plotIndex: number
  capturedAt: number
  sizeX: number
  sizeY: number
  sizeZ: number
  minY: number
  order: string
  bitsPerIndex: number
  palette: string[]
  data: string
}

/** A decoded column: palette indices plus the geometry needed to address them. */
export interface DecodedColumn {
  playerUuid: string
  playerName: string
  plotIndex: number
  capturedAt: number
  sizeX: number
  sizeY: number
  sizeZ: number
  /** World y of layer 0. Address layers as `minY + layer`, never as y. */
  minY: number
  /** One palette index per block, `((y - minY) * sizeZ + z) * sizeX + x`. */
  indices: Uint16Array
  /** Raw palette entries, e.g. `minecraft:stone_slab[type=top]`. */
  palette: string[]
  /** Base identifier of each palette entry, e.g. `minecraft:stone_slab`. */
  baseIds: string[]
  /** Per palette index: 1 when the block occupies space, 0 when it is air. */
  occupies: Uint8Array
}
