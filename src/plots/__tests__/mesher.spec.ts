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

/** How many faces point the given way. */
function countFaces(
  mesh: { faceCount: number; normals: Int8Array },
  matches: (nx: number, ny: number, nz: number) => boolean
): number {
  let total = 0
  for (let face = 0; face < mesh.faceCount; face++) {
    const offset = face * 4 * 3
    if (matches(mesh.normals[offset], mesh.normals[offset + 1] / 127, mesh.normals[offset + 2])) {
      total++
    }
  }
  return total
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

describe('meshColumn changes', () => {
  const solid = (sizeY: number, fill: (x: number, y: number, z: number) => number) =>
    synthetic(2, sizeY, 2, fill)

  /** How many vertices are tagged as arriving, and as leaving. */
  function tally(mesh: ReturnType<typeof meshColumn>) {
    let arriving = 0
    let leaving = 0
    for (const change of mesh.changes) {
      if (change > 0) arriving++
      if (change < 0) leaving++
    }
    return { arriving, leaving }
  }

  it('tags nothing when there is nothing to compare with', () => {
    const mesh = meshColumn(solid(2, (_x, y) => (y === 0 ? 1 : 0)))
    expect(mesh.changes.length).toBe(mesh.faceCount * 4)
    expect(tally(mesh)).toEqual({ arriving: 0, leaving: 0 })
  })

  it('tags the blocks that have appeared since last time', () => {
    const before = solid(2, (_x, y) => (y === 0 ? 1 : 0))
    const after = solid(2, () => 1)

    const mesh = meshColumn(after, undefined, before)
    expect(tally(mesh).arriving).toBeGreaterThan(0)
    expect(tally(mesh).leaving).toBe(0)
    // Only the new layer moves; the one that was already there stays put.
    expect(tally(mesh).arriving).toBeLessThan(mesh.faceCount * 4)
  })

  it('draws the blocks that have gone one last time, tagged the other way', () => {
    const before = solid(2, () => 1)
    const after = solid(2, (_x, y) => (y === 0 ? 1 : 0))

    const mesh = meshColumn(after, undefined, before)
    const plain = meshColumn(after)

    expect(tally(mesh).leaving).toBeGreaterThan(0)
    // The mesh carries the blocks that have gone as well as the ones that stay.
    expect(mesh.faceCount).toBeGreaterThan(plain.faceCount)
  })

  it('treats a cut moving as blocks arriving and leaving', () => {
    const column = solid(4, () => 1)

    const cutDown = meshColumn(column, 2, column, 4)
    expect(tally(cutDown).leaving).toBeGreaterThan(0)

    const cutUp = meshColumn(column, 4, column, 2)
    expect(tally(cutUp).arriving).toBeGreaterThan(0)
  })

  it('fades a moving cut rather than growing every block of it', () => {
    const column = solid(4, () => 1)
    const faded = meshColumn(column, 2, column, 4, 'fade')

    // A fading vertex carries no block to grow from, only which way it is going.
    for (const change of faded.changes) {
      if (change !== 0) expect(Math.abs(change)).toBe(1)
    }

    // And it is drawn in a range of its own, after the solid and the blended,
    // because the opaque pass has no alpha to fade with.
    const fading = faded.indices.length - faded.opaqueIndexCount - faded.blendedIndexCount
    expect(fading).toBeGreaterThan(0)
  })

  it('still grows a block placed on its own', () => {
    const before = solid(2, (_x, y) => (y === 0 ? 1 : 0))
    const mesh = meshColumn(solid(2, () => 1), undefined, before, undefined, 'grow')

    let grown = 0
    for (const change of mesh.changes) if (Math.abs(change) > 1.5) grown++
    expect(grown).toBeGreaterThan(0)
    // Nothing fades, so nothing lands in the fading range.
    expect(mesh.indices.length - mesh.opaqueIndexCount - mesh.blendedIndexCount).toBe(0)
  })

  it('locates each moving vertex at the block it belongs to', () => {
    const before = solid(2, (_x, y) => (y === 0 ? 1 : 0))
    const mesh = meshColumn(solid(2, () => 1), undefined, before)

    // The tag packs the block's own middle, biased to stay positive; every
    // vertex of a moving block must carry the same one.
    const tags = new Set<number>()
    for (const change of mesh.changes) if (change !== 0) tags.add(Math.abs(change))
    // Four blocks in the layer that arrived.
    expect(tags.size).toBe(4)
  })

  it('keeps the face an arriving block will cover, until it has landed', () => {
    // A block placed on top of another: the lower block's top face is about to
    // be covered, but the new block is drawn part way in, so dropping the face
    // straight away would leave a hole to see through until it lands.
    const before = solid(2, (_x, y) => (y === 0 ? 1 : 0))
    const after = solid(2, () => 1)

    const withHistory = meshColumn(after, undefined, before)
    const plain = meshColumn(after)

    const topsOf = (mesh: ReturnType<typeof meshColumn>) =>
      countFaces(mesh, (_nx, ny) => ny === 1)

    // Four blocks arrive, and the four faces they cover are still drawn.
    expect(topsOf(withHistory)).toBe(topsOf(plain) + 4)
    // Those four faces and nothing else: blocks arriving together are as solid
    // to each other as any pair, so the layer keeps its insides hidden.
    expect(withHistory.faceCount).toBe(plain.faceCount + 4)
  })

  it('leaves a plot that has changed shape alone', () => {
    const before = synthetic(2, 2, 2, () => 1)
    const after = synthetic(3, 2, 3, () => 1)
    expect(tally(meshColumn(after, undefined, before))).toEqual({ arriving: 0, leaving: 0 })
  })
})

describe('meshColumn ceiling', () => {
  it('leaves a column shorter than the ceiling alone', () => {
    const full = meshColumn(synthetic(2, 4, 2, (_x, y) => (y < 2 ? 1 : 0)))
    expect(meshColumn(synthetic(2, 4, 2, (_x, y) => (y < 2 ? 1 : 0)), 4).faceCount).toBe(
      full.faceCount
    )
  })

  it('drops everything at or above the cut', () => {
    // Two stacked blocks cut to one: a lone block is six faces, minus the
    // bottom one, which is never generated on the floor of a column.
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y < 2 ? 1 : 0)), 1)
    expect(mesh.faceCount).toBe(5)
    expect(mesh.occupiedHeight).toBe(1)
  })

  it('caps the cut with the top faces the buried blocks never had', () => {
    // Solid all the way up: uncut, the middle layer has no top face at all,
    // because the layer above it was in the way.
    const solid = (sizeY: number) => synthetic(2, sizeY, 2, () => 1)
    const up = meshColumn(solid(3), 2)

    const tops = countFaces(up, (nx, ny, nz) => ny === 1 && nx === 0 && nz === 0)
    // One per block of the cut layer, and the layer is two by two.
    expect(tops).toBe(4)
  })

  it('treats the space above the cut as sky, not as rock', () => {
    // Ambient occlusion darkens a face with a block standing next to it.
    // Cutting that block away has to brighten the face again, which only
    // happens if the cut is part of the bounds rather than a filter applied to
    // the faces afterwards.
    // A floor with one block standing beside it on the next layer up, which
    // darkens the near corners of the floor's top faces.
    const shape = (x: number, y: number, z: number) =>
      y === 0 || (y === 1 && x === 1 && z === 0) ? 1 : 0

    const under = meshColumn(synthetic(2, 3, 2, shape))
    const cut = meshColumn(synthetic(2, 3, 2, shape), 1)

    const topAt = (mesh: ReturnType<typeof meshColumn>) => {
      for (let face = 0; face < mesh.faceCount; face++) {
        const offset = face * 4 * 3
        if (mesh.normals[offset + 1] !== 127) continue
        if (mesh.positions[offset] !== -1 || mesh.positions[offset + 2] !== -1) continue
        return faceBrightness(mesh, face)
      }
      return 0
    }

    expect(topAt(cut)).toBeGreaterThan(topAt(under))
  })

  it('reads a ceiling of zero as nothing to draw', () => {
    expect(meshColumn(synthetic(2, 3, 2, () => 1), 0).faceCount).toBe(0)
  })
})

describe('meshColumn block shapes', () => {
  const SLAB = ['minecraft:air', 'minecraft:stone', 'minecraft:oak_slab[type=bottom]']

  /** The y each vertex of one face sits at. */
  function faceHeights(mesh: ReturnType<typeof meshColumn>, faceIndex: number): number[] {
    const heights: number[] = []
    for (let v = 0; v < 4; v++) heights.push(mesh.positions[faceIndex * 12 + v * 3 + 1])
    return heights
  }

  it('draws a slab as half a block', () => {
    // Stone floor with a slab on it, so the slab's own floor is covered.
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 0 ? 1 : y === 1 ? 2 : 0), SLAB))

    const slabTops: number[] = []
    for (let face = 0; face < mesh.faceCount; face++) {
      const heights = faceHeights(mesh, face)
      if (mesh.normals[face * 12 + 1] === 127 && heights[0] > 1) slabTops.push(heights[0])
    }

    // One top face, halfway up the layer the slab is in.
    expect(slabTops).toEqual([1.5])
  })

  it('leaves the block under a slab its own top face', () => {
    // Coplanar faces would z-fight, so exactly one of the two survives: the
    // slab's underside goes, because the block below it is a full one.
    const mesh = meshColumn(synthetic(1, 3, 1, (_x, y) => (y === 0 ? 1 : y === 1 ? 2 : 0), SLAB))

    const bottoms = countFaces(mesh, (_nx, ny) => ny === -1)
    const tops = countFaces(mesh, (_nx, ny) => ny === 1)
    expect(bottoms).toBe(0)
    expect(tops).toBe(2)
  })

  it('does not let half a block hide the one behind it', () => {
    // A slab beside a stone block: the stone's side face is in the open above
    // the slab, so it has to be drawn.
    const beside = meshColumn(
      synthetic(2, 2, 1, (x, y) => (y === 0 ? (x === 0 ? 1 : 2) : 0), SLAB)
    )
    const walled = meshColumn(synthetic(2, 2, 1, (_x, y) => (y === 0 ? 1 : 0), SLAB))

    // Two full blocks hide the face between them; a slab cannot.
    expect(countFaces(beside, (nx) => nx === 127)).toBeGreaterThan(
      countFaces(walled, (nx) => nx === 127)
    )
  })

  it('samples the part of the tile a box actually covers', () => {
    const mesh = meshColumn(synthetic(1, 2, 1, (_x, y) => (y === 0 ? 2 : 0), SLAB))

    // A side face of a bottom slab shows the bottom half of its texture.
    for (let face = 0; face < mesh.faceCount; face++) {
      if (mesh.normals[face * 12] !== 127) continue
      const vs = [0, 1, 2, 3].map((v) => mesh.uvs[face * 8 + v * 2 + 1])
      const tile = tileBounds(faceTilesForEntry('minecraft:oak_slab').tiles[2])
      expect(Math.min(...vs)).toBeCloseTo(tile.v0)
      expect(Math.max(...vs)).toBeCloseTo((tile.v0 + tile.v1) / 2)
      return
    }
    throw new Error('no east-facing slab side was drawn')
  })

  it('draws a plant as crossed planes, lit flat', () => {
    const mesh = meshColumn(
      synthetic(1, 2, 1, (_x, y) => (y === 1 ? 1 : 0), ['minecraft:air', 'minecraft:poppy'])
    )

    // Two planes, each drawn from both sides.
    expect(mesh.faceCount).toBe(4)
    // Nothing on a plant is shaded by its neighbours.
    for (let face = 0; face < mesh.faceCount; face++) {
      expect(faceBrightness(mesh, face)).toBeCloseTo(faceBrightness(mesh, 0))
    }
    // The planes lie across the block rather than along its faces.
    expect(countFaces(mesh, (nx, ny, nz) => ny === 0 && nx !== 0 && nz !== 0)).toBe(4)
  })

  it('draws a fence as a post and its rails', () => {
    const post = 'minecraft:oak_fence[north=false,east=false,south=false,west=false]'
    const joined = 'minecraft:oak_fence[north=true,east=false,south=false,west=false]'
    const alone = meshColumn(synthetic(1, 2, 1, (_x, y) => (y === 1 ? 1 : 0), ['minecraft:air', post]))
    const reaching = meshColumn(
      synthetic(1, 2, 1, (_x, y) => (y === 1 ? 1 : 0), ['minecraft:air', joined])
    )

    // Six faces for the post, and six for each of the two rails.
    expect(alone.faceCount).toBe(6)
    expect(reaching.faceCount).toBe(18)
  })

  it('fills a waterlogged block with water round its shape', () => {
    const logged = ['minecraft:air', 'minecraft:oak_slab[type=bottom,waterlogged=true]']
    const dry = ['minecraft:air', 'minecraft:oak_slab[type=bottom,waterlogged=false]']

    const wet = meshColumn(synthetic(1, 2, 1, (_x, y) => (y === 1 ? 1 : 0), logged))
    const plain = meshColumn(synthetic(1, 2, 1, (_x, y) => (y === 1 ? 1 : 0), dry))

    // The slab as before, and a block of water drawn round it.
    expect(wet.faceCount).toBe(plain.faceCount + 6)
    // The water is blended, so it is drawn after everything solid.
    expect(wet.indices.length - wet.opaqueIndexCount).toBe(6 * 6)
  })

  it('does not draw water against the block standing in it', () => {
    // A water block beside a waterlogged one: the face between them is inside
    // one body of water and must not be drawn.
    const palette = [
      'minecraft:air',
      'minecraft:water[level=0]',
      'minecraft:oak_fence[north=false,east=false,south=false,west=false,waterlogged=true]'
    ]
    const apart = meshColumn(synthetic(3, 2, 1, (x, y) => (y === 1 && x === 0 ? 1 : 0), palette))
    const together = meshColumn(
      synthetic(3, 2, 1, (x, y) => (y === 1 ? (x === 0 ? 1 : x === 1 ? 2 : 0) : 0), palette)
    )

    const waterFaces = (mesh: ReturnType<typeof meshColumn>) =>
      (mesh.indices.length - mesh.opaqueIndexCount) / 6

    // The fence brings its own water with it, so the pair has more water faces
    // than the lone block; but the wall between them is gone, so it has fewer
    // than two separate blocks of water would.
    expect(waterFaces(together)).toBeLessThan(waterFaces(apart) * 2)
  })

  it('drops liquid a notch below the top of its block', () => {
    const water = ['minecraft:air', 'minecraft:water[level=0]']
    const mesh = meshColumn(synthetic(1, 2, 1, (_x, y) => (y === 0 ? 1 : 0), water))

    for (let face = 0; face < mesh.faceCount; face++) {
      if (mesh.normals[face * 12 + 1] !== 127) continue
      expect(faceHeights(mesh, face)[0]).toBeCloseTo(14 / 16)
      return
    }
    throw new Error('the water had no surface')
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
