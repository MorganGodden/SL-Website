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

/**
 * Plot size is a server setting (`plots.middle-chunks`), so 16 was never a
 * property of the format and 32 is not either. These build payloads the way the
 * plugin does, at sizes it can legitimately publish.
 */
function packBits(indices: number[], bitsPerIndex: number): string {
  const bytes = new Uint8Array(Math.ceil((indices.length * bitsPerIndex) / 8))
  indices.forEach((value, n) => {
    for (let b = 0; b < bitsPerIndex; b++) {
      if ((value >>> b) & 1) {
        const bit = n * bitsPerIndex + b
        bytes[bit >>> 3] |= 1 << (bit & 7)
      }
    }
  })
  return btoa(String.fromCharCode(...bytes))
}

function sized(sizeX: number, sizeY: number, sizeZ: number): PlotSnapshot {
  const palette = ['minecraft:air', 'minecraft:stone', 'minecraft:grass_block']
  const indices: number[] = []
  for (let y = 0; y < sizeY; y++) {
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        // A pattern that differs per axis, so a transposed stride shows up.
        indices.push(y === 0 ? 1 : x === z ? 2 : 0)
      }
    }
  }
  return {
    formatVersion: 1,
    playerUuid: 'u',
    playerName: 'n',
    plotIndex: 0,
    capturedAt: 0,
    sizeX,
    sizeY,
    sizeZ,
    minY: 48,
    order: 'x-fastest,then-z,then-y',
    bitsPerIndex: 2,
    palette,
    data: packBits(indices, 2)
  }
}

describe('decoding a plot of any published size', () => {
  it('reads the footprint from the payload rather than assuming one', () => {
    for (const side of [16, 32, 48]) {
      const column = decodeSnapshot(sized(side, 6, side))

      expect(column.sizeX).toBe(side)
      expect(column.sizeZ).toBe(side)
      expect(column.indices.length).toBe(side * 6 * side)

      const at = (x: number, layer: number, z: number) =>
        column.baseIds[column.indices[(layer * column.sizeZ + z) * column.sizeX + x]]

      expect(at(0, 0, 0)).toBe('minecraft:stone')
      expect(at(side - 1, 0, side - 1)).toBe('minecraft:stone')
      // x varies fastest: the diagonal is grass and everything off it is air.
      expect(at(side - 1, 3, side - 1)).toBe('minecraft:grass_block')
      expect(at(side - 1, 3, 0)).toBe('minecraft:air')
    }
  })

  it('accepts a plot that is not square', () => {
    const column = decodeSnapshot(sized(32, 4, 16))
    expect(column.sizeX).toBe(32)
    expect(column.sizeZ).toBe(16)
    expect(column.indices.length).toBe(32 * 4 * 16)
  })
})
