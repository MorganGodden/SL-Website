import { describe, it, expect } from 'vitest'
import { meshColumn, findSurfaceLevel } from '../mesher'
import { decodeSnapshot, parseBaseId } from '../decode'
import { faceTilesForEntry, tileBounds } from '../blockAtlas'
import type { DecodedColumn, PlotSnapshot } from '../types'
import realColumn from './fixtures/column.json'

/** Builds a column by hand so face counts can be reasoned about exactly. */
function synthetic(
  sizeX: number,
  sizeY: number,
  sizeZ: number,
  fill: (x: number, y: number, z: number) => number,
  palette: string[] = ['minecraft:air', 'minecraft:stone']
): DecodedColumn {
  const indices = new Uint16Array(sizeX * sizeY * sizeZ)
  for (let y = 0; y < sizeY; y++)
    for (let z = 0; z < sizeZ; z++)
      for (let x = 0; x < sizeX; x++)
        indices[y * sizeX * sizeZ + z * sizeX + x] = fill(x, y, z)

  return {
    playerUuid: 'u', playerName: 'n', plotIndex: 0, capturedAt: 0,
    sizeX, sizeY, sizeZ, minY: 48,
    indices,
    // Air deliberately at index 0 here, but nothing may depend on that.
    palette,
    baseIds: palette.map(parseBaseId),
    occupies: Uint8Array.from(palette, (id) => (id === 'minecraft:air' ? 0 : 1))
  }
}

/** Average brightness of one face's four vertices. */
function faceBrightness(mesh: { colours: Float32Array }, faceIndex: number): number {
  let total = 0
  const offset = faceIndex * 4 * 3
  for (let i = 0; i < 12; i++) total += mesh.colours[offset + i]
  return total / 12
}

describe('meshColumn', () => {
  it('emits nothing for an empty column', () => {
    const mesh = meshColumn(synthetic(4, 4, 4, () => 0))
    expect(mesh.faceCount).toBe(0)
    expect(mesh.positions.length).toBe(0)
    expect(mesh.indices.length).toBe(0)
  })

  it('emits 5 faces for a single block, omitting the hidden bottom', () => {
    const mesh = meshColumn(synthetic(1, 1, 1, () => 1))
    expect(mesh.faceCount).toBe(5)
  })

  it('emits 6 faces for a floating block', () => {
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0)))
    expect(mesh.faceCount).toBe(6)
  })

  it('skips faces between two solid blocks', () => {
    const mesh = meshColumn(synthetic(1, 4, 1, (_x, y) => (y === 1 || y === 2 ? 1 : 0)))
    expect(mesh.faceCount).toBe(10)
  })

  it('emits only the shell of a solid cube, not its interior', () => {
    const n = 5
    const mesh = meshColumn(synthetic(n, n, n, () => 1))
    expect(mesh.faceCount).toBe(5 * n * n)
  })

  it('produces four vertices and six indices per face', () => {
    const mesh = meshColumn(synthetic(3, 3, 3, () => 1))
    expect(mesh.positions.length).toBe(mesh.faceCount * 4 * 3)
    expect(mesh.normals.length).toBe(mesh.faceCount * 4 * 3)
    expect(mesh.colours.length).toBe(mesh.faceCount * 4 * 3)
    expect(mesh.indices.length).toBe(mesh.faceCount * 6)
  })

  it('keeps every index inside the vertex range', () => {
    const mesh = meshColumn(synthetic(4, 4, 4, (x, y, z) => ((x + y + z) % 2 ? 1 : 0)))
    const vertices = mesh.positions.length / 3
    for (const i of mesh.indices) expect(i).toBeLessThan(vertices)
  })
})

describe('meshColumn normals', () => {
  it('emits one unit-length axis normal per vertex', () => {
    const mesh = meshColumn(synthetic(2, 3, 2, (_x, y) => (y === 1 ? 1 : 0)))
    for (let v = 0; v < mesh.normals.length; v += 3) {
      const n = [mesh.normals[v], mesh.normals[v + 1], mesh.normals[v + 2]]
      // Exactly one axis set, to +/-127, which normalises to +/-1.
      expect(n.filter((c) => c !== 0)).toHaveLength(1)
      expect(Math.abs(n.find((c) => c !== 0)!)).toBe(127)
    }
  })

  it('agrees with the face it belongs to', () => {
    // A single floating block: its top face must point up.
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0)))
    const upward: number[] = []
    for (let f = 0; f < mesh.faceCount; f++) {
      const v = f * 4 * 3
      if (mesh.normals[v + 1] === 127) upward.push(f)
    }
    expect(upward).toHaveLength(1)

    // ...and that face's vertices all sit at the block's top.
    const o = upward[0] * 4 * 3
    for (let i = 0; i < 4; i++) expect(mesh.positions[o + i * 3 + 1]).toBe(2)
  })
})

describe('meshColumn ambient occlusion', () => {
  it('leaves a fully exposed face unshaded and uniform', () => {
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0)))
    const first = mesh.colours[0]
    for (let i = 0; i < mesh.colours.length; i += 3) {
      expect(mesh.colours[i]).toBeCloseTo(first, 6)
    }
  })

  it('darkens a face that has a neighbour overhanging one edge', () => {
    const open = meshColumn(synthetic(3, 4, 3, (x, y, z) => (x === 1 && y === 1 && z === 1 ? 1 : 0)))
    const occluded = meshColumn(
      synthetic(3, 4, 3, (x, y, z) =>
        (x === 1 && y === 1 && z === 1) || (x === 2 && y === 2 && z === 1) ? 1 : 0
      )
    )

    const topOf = (mesh: ReturnType<typeof meshColumn>) => {
      for (let f = 0; f < mesh.faceCount; f++) {
        const v = f * 4 * 3
        // The top face of the block at y === 1, ignoring the second block.
        if (mesh.normals[v + 1] === 127 && mesh.positions[v + 1] === 2) return f
      }
      return -1
    }

    const a = topOf(open)
    const b = topOf(occluded)
    expect(a).toBeGreaterThanOrEqual(0)
    expect(b).toBeGreaterThanOrEqual(0)
    expect(faceBrightness(occluded, b)).toBeLessThan(faceBrightness(open, a))
  })

  it('darkens an inside corner more than an open face', () => {
    // An L of blocks creates a concave corner, which must read darker.
    const mesh = meshColumn(
      synthetic(4, 4, 4, (x, y, z) =>
        y === 1 && ((x === 1 && z <= 2) || (z === 1 && x <= 2)) ? 1 : 0
      )
    )
    const brightness: number[] = []
    for (let f = 0; f < mesh.faceCount; f++) brightness.push(faceBrightness(mesh, f))
    // Some faces must be darker than the brightest, i.e. AO actually varies.
    const max = Math.max(...brightness)
    const min = Math.min(...brightness)
    expect(min).toBeLessThan(max * 0.95)
  })

  it('emits colours in linear space, not sRGB bytes', () => {
    const mesh = meshColumn(synthetic(1, 1, 1, () => 1))
    for (const c of mesh.colours) {
      expect(c).toBeGreaterThanOrEqual(0)
      expect(c).toBeLessThanOrEqual(1)
    }
  })
})

describe('meshColumn textures', () => {
  /** The atlas tile every vertex of one face samples, from its uvs. */
  function faceTile(mesh: ReturnType<typeof meshColumn>, faceIndex: number): number {
    const u = mesh.uvs[faceIndex * 4 * 2]
    const v = mesh.uvs[faceIndex * 4 * 2 + 1]
    for (let tile = 0; tile < 4096; tile++) {
      const bounds = tileBounds(tile)
      const inside = (value: number, low: number, high: number) =>
        value >= low - 1e-6 && value <= high + 1e-6
      if (inside(u, bounds.u0, bounds.u1) && inside(v, bounds.v0, bounds.v1)) return tile
    }
    return -1
  }

  it('emits one texture coordinate pair per vertex', () => {
    const mesh = meshColumn(synthetic(3, 3, 3, () => 1))
    expect(mesh.uvs.length).toBe(mesh.faceCount * 4 * 2)
  })

  it('samples the tile its block is mapped to', () => {
    const mesh = meshColumn(synthetic(1, 1, 1, () => 1))
    const stone = faceTilesForEntry('minecraft:stone')
    for (let f = 0; f < mesh.faceCount; f++) {
      expect(faceTile(mesh, f)).toBe(stone.tiles[0])
    }
  })

  it('puts the grass texture on top and the dirt texture underneath', () => {
    const mesh = meshColumn(
      synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0), ['minecraft:air', 'minecraft:grass_block'])
    )
    const grass = faceTilesForEntry('minecraft:grass_block')

    for (let f = 0; f < mesh.faceCount; f++) {
      const up = mesh.normals[f * 4 * 3 + 1]
      const expected = up === 127 ? grass.tiles[0] : up === -127 ? grass.tiles[1] : grass.tiles[2]
      expect(faceTile(mesh, f)).toBe(expected)
    }
  })

  it('keeps every texture coordinate inside the atlas', () => {
    const mesh = meshColumn(
      synthetic(3, 3, 3, (x, y, z) => ((x + y + z) % 3) as number, [
        'minecraft:air',
        'minecraft:oak_log[axis=x]',
        'minecraft:glass'
      ])
    )
    for (const uv of mesh.uvs) {
      expect(uv).toBeGreaterThanOrEqual(0)
      expect(uv).toBeLessThanOrEqual(1)
    }
  })

  it('leaves a textured block white, so the atlas supplies its colour', () => {
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0)))
    // A fully exposed block is unshaded, so white here is exactly 1.
    for (const c of mesh.colours) expect(c).toBe(1)
  })

  it('still colours a block the atlas has no texture for', () => {
    const mesh = meshColumn(
      synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0), [
        'minecraft:air',
        'minecraft:some_block_nobody_baked'
      ])
    )
    expect([...mesh.colours].some((c) => c !== 1)).toBe(true)
  })
})

describe('meshColumn transparency', () => {
  const GLASS = ['minecraft:air', 'minecraft:glass', 'minecraft:stone']

  it('draws blended blocks in their own range, after the solid ones', () => {
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0), GLASS))
    // One floating glass block: every face of it is blended.
    expect(mesh.opaqueIndexCount).toBe(0)
    expect(mesh.indices.length).toBe(mesh.faceCount * 6)
  })

  it('splits a column of glass on stone between the two ranges', () => {
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 0 ? 2 : y === 1 ? 1 : 0), GLASS))
    expect(mesh.opaqueIndexCount).toBeGreaterThan(0)
    expect(mesh.indices.length).toBeGreaterThan(mesh.opaqueIndexCount)
    // Both ranges are whole triangles.
    expect(mesh.opaqueIndexCount % 3).toBe(0)
  })

  it('keeps the face of a solid block that a glass block covers', () => {
    // Glass at y = 1 standing on stone at y = 0. Were the stone's top face
    // dropped the way it is under another solid block, the glass would be a
    // window onto a hole in the world.
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 0 ? 2 : y === 1 ? 1 : 0), GLASS))

    let topOfStone = 0
    for (let f = 0; f < mesh.faceCount; f++) {
      const v = f * 4 * 3
      if (mesh.normals[v + 1] === 127 && mesh.positions[v + 1] === 1) topOfStone++
    }
    expect(topOfStone).toBe(1)

    // The glass keeps five faces of its own: the one resting on the stone is
    // hidden, because the stone behind it is solid.
    expect(mesh.faceCount).toBe(10)
  })

  it('drops the faces between two blocks of the same blended material', () => {
    const pair = meshColumn(synthetic(1, 4, 1, (_x, y) => (y === 1 || y === 2 ? 1 : 0), GLASS))
    // Ten, not twelve: the two faces where the blocks meet are not drawn.
    expect(pair.faceCount).toBe(10)
  })

  it('keeps leaves out of the blended range so they can be alpha tested', () => {
    const mesh = meshColumn(
      synthetic(1, 3, 1, (_x, y) => (y === 1 ? 1 : 0), ['minecraft:air', 'minecraft:oak_leaves'])
    )
    expect(mesh.opaqueIndexCount).toBe(mesh.indices.length)
  })

  it('does not let a see-through block cast ambient occlusion', () => {
    // The same arrangement twice, with the overhang solid in one and glass in
    // the other: only the solid one may darken the face below it.
    const shape = (x: number, y: number, z: number) =>
      x === 1 && y === 1 && z === 1 ? 2 : x === 2 && y === 2 && z === 1 ? 1 : 0

    const glassAbove = meshColumn(synthetic(3, 4, 3, shape, GLASS))
    const alone = meshColumn(
      synthetic(3, 4, 3, (x, y, z) => (x === 1 && y === 1 && z === 1 ? 2 : 0), GLASS)
    )

    const topOf = (mesh: ReturnType<typeof meshColumn>) => {
      for (let f = 0; f < mesh.faceCount; f++) {
        const v = f * 4 * 3
        if (mesh.normals[v + 1] === 127 && mesh.positions[v + 1] === 2) return f
      }
      return -1
    }

    expect(faceBrightness(glassAbove, topOf(glassAbove))).toBeCloseTo(
      faceBrightness(alone, topOf(alone)),
      6
    )
  })
})

describe('findSurfaceLevel', () => {
  const withGrass = (grassLayer: number) =>
    synthetic(
      4, 10, 4,
      (_x, y) => (y < grassLayer ? 1 : y === grassLayer ? 2 : 0),
      ['minecraft:air', 'minecraft:stone', 'minecraft:grass_block']
    )

  it('finds the grass layer', () => {
    expect(findSurfaceLevel(withGrass(5))).toBe(5)
  })

  it('ignores a tower built on top of the grass', () => {
    const column = withGrass(5)
    // One column of stone standing 3 blocks above the surface.
    for (let y = 6; y < 9; y++) column.indices[y * 16 + 1 * 4 + 1] = 1
    expect(findSurfaceLevel(column)).toBe(5)
  })

  it('ignores a hole dug through the surface', () => {
    const column = withGrass(5)
    for (let y = 0; y <= 5; y++) column.indices[y * 16 + 2 * 4 + 2] = 0
    expect(findSurfaceLevel(column)).toBe(5)
  })

  it('falls back to natural ground when the grass is gone', () => {
    const column = synthetic(
      4, 10, 4,
      (_x, y) => (y <= 4 ? 1 : 0),
      ['minecraft:air', 'minecraft:stone']
    )
    expect(findSurfaceLevel(column)).toBe(4)
  })

  it('reads the real column as a plausible surface below its build height', () => {
    const column = decodeSnapshot(realColumn as PlotSnapshot)
    const surface = findSurfaceLevel(column)
    const mesh = meshColumn(column)
    expect(surface).toBeGreaterThan(0)
    expect(surface).toBeLessThanOrEqual(mesh.occupiedHeight)
  })
})

describe('meshColumn on real data', () => {
  it('meshes the real column within the expected face budget', () => {
    const mesh = meshColumn(decodeSnapshot(realColumn as PlotSnapshot))
    expect(mesh.faceCount).toBeGreaterThan(0)
    expect(mesh.faceCount).toBeLessThan(60_000)
    expect(mesh.sizeY).toBe(81)
    expect(mesh.minY).toBe(48)
    expect(mesh.surfaceLevel).toBeGreaterThan(0)
  })
})
