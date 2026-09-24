import {
  SUPPORTED_FORMAT_VERSION,
  SUPPORTED_ORDER,
  type DecodedColumn,
  type PlotSnapshot
} from './types'

/**
 * Block ids that take up no space and are never meshed.
 *
 * Deliberately keyed on the base identifier, and deliberately not "palette
 * index 0" — air is wherever the plugin happened to put it. In the first real
 * payload air was index 4 and index 0 was bedrock.
 */
const EMPTY_BLOCKS = new Set([
  'minecraft:air',
  'minecraft:cave_air',
  'minecraft:void_air'
])

/**
 * Strips the block state properties from a palette entry.
 *
 * `minecraft:stone_slab[type=top,waterlogged=false]` -> `minecraft:stone_slab`.
 * Property order is explicitly not guaranteed by the format, so nothing may
 * match against a whole entry.
 */
export function parseBaseId(paletteEntry: string): string {
  const bracket = paletteEntry.indexOf('[')
  return bracket === -1 ? paletteEntry : paletteEntry.slice(0, bracket)
}

/** Decodes standard, padded base64 into bytes. */
function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

/**
 * Unpacks the little-endian bit stream into one palette index per block.
 *
 * FORMAT.md's reference decoder walks bit by bit, which is `blocks x
 * bitsPerIndex` iterations. This keeps a rolling accumulator instead and reads
 * whole bytes, which is the same stream read the same way — the unit test
 * checks it against the reference implementation on a real payload.
 */
export function unpackIndices(
  bytes: Uint8Array,
  count: number,
  bitsPerIndex: number
): Uint16Array {
  const out = new Uint16Array(count)
  const mask = (1 << bitsPerIndex) - 1

  let accumulator = 0
  let bitsBuffered = 0
  let bytePos = 0

  for (let n = 0; n < count; n++) {
    while (bitsBuffered < bitsPerIndex) {
      // Reading past the end yields 0, which matches the zero-padded final byte.
      accumulator = (accumulator | ((bytes[bytePos++] ?? 0) << bitsBuffered)) >>> 0
      bitsBuffered += 8
    }
    out[n] = accumulator & mask
    accumulator = accumulator >>> bitsPerIndex
    bitsBuffered -= bitsPerIndex
  }

  return out
}

/**
 * Decodes a snapshot payload.
 *
 * Throws on anything unexpected rather than rendering garbage — failing loudly
 * is the entire point of `formatVersion`.
 */
export function decodeSnapshot(payload: PlotSnapshot): DecodedColumn {
  if (payload.formatVersion !== SUPPORTED_FORMAT_VERSION) {
    throw new Error(
      `unsupported snapshot format ${payload.formatVersion} ` +
        `(this client understands ${SUPPORTED_FORMAT_VERSION})`
    )
  }
  if (payload.order !== SUPPORTED_ORDER) {
    throw new Error(
      `unsupported iteration order "${payload.order}" ` +
        `(this client understands "${SUPPORTED_ORDER}")`
    )
  }

  const { sizeX, sizeY, sizeZ, minY, bitsPerIndex, palette } = payload

  for (const [name, value] of [
    ['sizeX', sizeX],
    ['sizeY', sizeY],
    ['sizeZ', sizeZ],
    ['bitsPerIndex', bitsPerIndex]
  ] as const) {
    if (!Number.isInteger(value) || value < 1) {
      throw new Error(`snapshot has invalid ${name}: ${value}`)
    }
  }
  if (!Number.isInteger(minY)) throw new Error(`snapshot has invalid minY: ${minY}`)
  // A plot's palette is the handful of blocks it is built from, orders of
  // magnitude below 2^16 at any plot size, so a wider index means something has
  // changed structurally and the Uint16Array below would truncate.
  if (bitsPerIndex > 16) {
    throw new Error(`bitsPerIndex ${bitsPerIndex} exceeds the supported maximum of 16`)
  }
  if (!Array.isArray(palette) || palette.length === 0) {
    throw new Error('snapshot has an empty palette')
  }

  const count = sizeX * sizeY * sizeZ
  const bytes = base64ToBytes(payload.data)
  const expectedBytes = Math.ceil((count * bitsPerIndex) / 8)
  if (bytes.length !== expectedBytes) {
    throw new Error(
      `snapshot data is ${bytes.length} bytes, expected ${expectedBytes} ` +
        `for ${count} blocks at ${bitsPerIndex} bits`
    )
  }

  const indices = unpackIndices(bytes, count, bitsPerIndex)

  const baseIds = palette.map(parseBaseId)
  const occupies = Uint8Array.from(baseIds, (id) => (EMPTY_BLOCKS.has(id) ? 0 : 1))

  return {
    playerUuid: payload.playerUuid,
    playerName: payload.playerName,
    plotIndex: payload.plotIndex,
    capturedAt: payload.capturedAt,
    sizeX,
    sizeY,
    sizeZ,
    minY,
    indices,
    palette,
    baseIds,
    occupies
  }
}
