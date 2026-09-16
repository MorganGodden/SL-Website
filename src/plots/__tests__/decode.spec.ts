import { describe, it, expect } from 'vitest'
import { decodeSnapshot, parseBaseId, unpackIndices } from '../decode'
import type { PlotSnapshot } from '../types'
import realColumn from './fixtures/column.json'

const payload = realColumn as PlotSnapshot

/**
 * FORMAT.md's reference decoder, copied verbatim except that it returns palette
 * indices instead of palette strings so the two can be compared directly.
 * This is the specification of correctness; the fast path must agree with it.
 */
function referenceIndices(p: PlotSnapshot): number[] {
  const { sizeX, sizeY, sizeZ, bitsPerIndex } = p
  const bytes = Uint8Array.from(atob(p.data), (c) => c.charCodeAt(0))
  const count = sizeX * sizeY * sizeZ
  const mask = (1 << bitsPerIndex) - 1
  const out = new Array(count)

  for (let n = 0; n < count; n++) {
    const start = n * bitsPerIndex
    let value = 0
    for (let b = 0; b < bitsPerIndex; b++) {
      const bit = start + b
      if (bytes[bit >>> 3] & (1 << (bit & 7))) value |= 1 << b
    }
    out[n] = value & mask
  }
  return out
}

describe('unpackIndices', () => {
  it('agrees with the FORMAT.md reference decoder on a real payload', () => {
    const bytes = Uint8Array.from(atob(payload.data), (c) => c.charCodeAt(0))
    const count = payload.sizeX * payload.sizeY * payload.sizeZ

    const fast = unpackIndices(bytes, count, payload.bitsPerIndex)
    const reference = referenceIndices(payload)

    expect(fast.length).toBe(count)
    expect(Array.from(fast)).toEqual(reference)
  })

  it('reads a hand-packed stream least-significant-bit first', () => {
    // Two 4-bit indices per byte, low nibble first: 0x21 -> [1, 2].
    expect(Array.from(unpackIndices(new Uint8Array([0x21]), 2, 4))).toEqual([1, 2])
    // 3-bit indices straddle the byte boundary: bits 0-2, 3-5, then 6-7 + bit 0
    // of the next byte. 0b11_010_001 = 0xd1, next byte 0b1 -> [1, 2, 7].
    expect(Array.from(unpackIndices(new Uint8Array([0xd1, 0x01]), 3, 3))).toEqual([1, 2, 7])
  })
})

describe('parseBaseId', () => {
  it('strips block state properties', () => {
    expect(parseBaseId('minecraft:stone_slab[type=top,waterlogged=false]')).toBe(
      'minecraft:stone_slab'
    )
  })

  it('leaves a bare identifier alone', () => {
    expect(parseBaseId('minecraft:air')).toBe('minecraft:air')
  })

  it('is insensitive to property order', () => {
    const a = parseBaseId('minecraft:x[a=1,b=2]')
    const b = parseBaseId('minecraft:x[b=2,a=1]')
    expect(a).toBe(b)
  })
})

describe('decodeSnapshot', () => {
  it('decodes the real column and reads its geometry from the payload', () => {
    const column = decodeSnapshot(payload)

    expect(column.sizeX).toBe(payload.sizeX)
    expect(column.sizeY).toBe(payload.sizeY)
    expect(column.sizeZ).toBe(payload.sizeZ)
    expect(column.minY).toBe(payload.minY)
    expect(column.indices.length).toBe(payload.sizeX * payload.sizeY * payload.sizeZ)
    expect(column.baseIds.length).toBe(payload.palette.length)
  })

  it('does not assume air is palette index 0', () => {
    const column = decodeSnapshot(payload)
    const airIndex = column.baseIds.indexOf('minecraft:air')

    // In the first real payload air was index 4 and index 0 was bedrock.
    expect(airIndex).toBeGreaterThan(-1)
    expect(column.occupies[airIndex]).toBe(0)
    expect(column.occupies[0]).toBe(1)
  })

  it('addresses the bottom layer at minY, not at y=0', () => {
    const column = decodeSnapshot(payload)
    const at = (x: number, layer: number, z: number) =>
      column.indices[(layer * column.sizeZ + z) * column.sizeX + x]

    // Layer 0 is world y=minY, which is bedrock in this world.
    expect(column.baseIds[at(0, 0, 0)]).toBe('minecraft:bedrock')
    expect(column.minY).not.toBe(0)
  })

  it('throws on an unknown format version', () => {
    expect(() => decodeSnapshot({ ...payload, formatVersion: 2 })).toThrow(
      /unsupported snapshot format 2/
    )
  })

  it('throws on an unknown iteration order', () => {
    expect(() => decodeSnapshot({ ...payload, order: 'y-fastest' })).toThrow(
      /unsupported iteration order/
    )
  })

  it('throws when the data length disagrees with the geometry', () => {
    expect(() => decodeSnapshot({ ...payload, sizeY: payload.sizeY + 1 })).toThrow(
      /expected \d+ bytes|snapshot data is/
    )
  })
})
