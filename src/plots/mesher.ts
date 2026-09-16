import { faceTilesForEntry, RenderClass, tileBounds } from './blockAtlas'
import { colourForBlock } from './blockColours'
import type { DecodedColumn } from './types'

/**
 * Geometry buffers for one column, ready to become a BufferGeometry.
 * Every array is transferable, so they cross the worker boundary by handover
 * rather than by copy.
 */
export interface ColumnMesh {
  positions: Float32Array
  /** Face normals, one per vertex. Uploaded as a normalised attribute. */
  normals: Int8Array
  /**
   * Linear-space RGB with ambient occlusion already multiplied in.
   *
   * Linear rather than sRGB bytes because the scene is lit: three.js treats a
   * vertex colour attribute as being in the working (linear) space, and 8-bit
   * linear would band visibly across the AO gradients.
   */
  colours: Float32Array
  /** Atlas texture coordinates, one pair per vertex. */
  uvs: Float32Array
  indices: Uint32Array
  /**
   * Where the blended draw starts in `indices`.
   *
   * Everything before it is opaque or alpha tested and is drawn first;
   * everything after it is glass, ice and water, which have to be drawn over
   * the scene they are seen through. One geometry, two draw ranges.
   */
  opaqueIndexCount: number
  faceCount: number
  /**
   * Layers above the highest occupied block are empty air. Framing on this
   * rather than `sizeY` keeps a mostly-air column from rendering tiny.
   */
  occupiedHeight: number
  /**
   * Layer index of the natural ground surface — the grass layer. The board
   * floor sits flush with the top of it, so the column descends into the floor.
   */
  surfaceLevel: number
  sizeX: number
  sizeY: number
  sizeZ: number
  minY: number
}

/**
 * Ambient occlusion strength per corner, indexed by how many of the three
 * neighbouring blocks are solid (3 = fully open, 0 = tucked into a corner).
 * Baked per vertex rather than screen-space: voxel AO is exact, costs nothing
 * at runtime, and gives the contact shading that makes cube edges readable.
 */
const AO_LEVELS = [0.42, 0.64, 0.84, 1.0]

/** Blocks that make up natural terrain, used to find the ground surface. */
const NATURAL_GROUND = new Set([
  'minecraft:grass_block',
  'minecraft:dirt',
  'minecraft:coarse_dirt',
  'minecraft:rooted_dirt',
  'minecraft:podzol',
  'minecraft:mycelium',
  'minecraft:sand',
  'minecraft:red_sand',
  'minecraft:gravel',
  'minecraft:stone',
  'minecraft:snow_block',
  'minecraft:snow',
  'minecraft:moss_block',
  'minecraft:clay'
])

interface FaceDef {
  normal: readonly [number, number, number]
  /** First in-plane axis, used for AO sampling. */
  t1: readonly [number, number, number]
  /** Second in-plane axis, used for AO sampling. */
  t2: readonly [number, number, number]
  /** Vertex positions as offsets from the block origin, in emit order. */
  offsets: readonly (readonly [number, number, number])[]
  /**
   * Which end of (t1, t2) each emitted vertex sits at, in the same order.
   * Doubles as the corner of the atlas tile that vertex samples.
   */
  corners: readonly (readonly [0 | 1, 0 | 1])[]
}

/**
 * The six cube faces, wound counter-clockwise seen from outside.
 *
 * `t1`/`t2` describe the face's own plane so that ambient occlusion can be
 * sampled generically instead of being hand-written six times.
 */
const FACES: readonly FaceDef[] = [
  {
    // +Y
    normal: [0, 1, 0], t1: [1, 0, 0], t2: [0, 0, 1],
    offsets: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]],
    corners: [[0, 0], [0, 1], [1, 1], [1, 0]]
  },
  {
    // -Y
    normal: [0, -1, 0], t1: [1, 0, 0], t2: [0, 0, 1],
    offsets: [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]],
    corners: [[0, 1], [0, 0], [1, 0], [1, 1]]
  },
  {
    // +X
    normal: [1, 0, 0], t1: [0, 0, 1], t2: [0, 1, 0],
    offsets: [[1, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 1]],
    corners: [[1, 0], [0, 0], [0, 1], [1, 1]]
  },
  {
    // -X
    normal: [-1, 0, 0], t1: [0, 0, 1], t2: [0, 1, 0],
    offsets: [[0, 0, 0], [0, 0, 1], [0, 1, 1], [0, 1, 0]],
    corners: [[0, 0], [1, 0], [1, 1], [0, 1]]
  },
  {
    // +Z
    normal: [0, 0, 1], t1: [1, 0, 0], t2: [0, 1, 0],
    offsets: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]],
    corners: [[0, 0], [1, 0], [1, 1], [0, 1]]
  },
  {
    // -Z
    normal: [0, 0, -1], t1: [1, 0, 0], t2: [0, 1, 0],
    offsets: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]],
    corners: [[1, 0], [0, 0], [0, 1], [1, 1]]
  }
]

/** sRGB byte to linear float, the exact transfer function three.js expects. */
function srgbToLinear(byte: number): number {
  const c = byte / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

/**
 * Classic voxel corner occlusion: a corner darkens with each of its three
 * neighbours that is solid, and two solid sides fully occlude it regardless of
 * the diagonal.
 */
function cornerAO(side1: boolean, side2: boolean, corner: boolean): number {
  if (side1 && side2) return 0
  return 3 - (Number(side1) + Number(side2) + Number(corner))
}

/**
 * Builds a mesh containing only exposed faces.
 *
 * Air is skipped, and so is any face hidden behind a solid block. Only the
 * middle chunk is ever captured, so the column is free-standing and every face
 * on the four sides is exposed.
 *
 * Faces are emitted into two draw ranges: opaque and alpha-tested blocks
 * first, then the blended ones, which have to come after the scene behind them
 * has been drawn.
 */
export function meshColumn(column: DecodedColumn): ColumnMesh {
  const { sizeX, sizeY, sizeZ, minY, indices, occupies, baseIds, palette } = column

  const strideZ = sizeX
  const strideY = sizeX * sizeZ
  const at = (x: number, y: number, z: number) => indices[y * strideY + z * strideZ + x]
  const inBounds = (x: number, y: number, z: number) =>
    x >= 0 && x < sizeX && y >= 0 && y < sizeY && z >= 0 && z < sizeZ

  // Which atlas tiles each palette entry's faces sample, resolved once. Keyed
  // on the full entry, not the base id: a log's state says which way it lies.
  const faces = palette.map(faceTilesForEntry)

  /**
   * Blocks that hide what is behind them, which is what face culling and
   * ambient occlusion both mean by "solid". Glass and leaves are solid enough
   * to stand on but you can see past them, so neither may occlude.
   */
  const blocks = Uint8Array.from(faces, (tiles, index) =>
    occupies[index] === 1 && tiles.render === RenderClass.Opaque ? 1 : 0
  )
  const occludes = (x: number, y: number, z: number) =>
    inBounds(x, y, z) && blocks[at(x, y, z)] === 1

  /**
   * Whether a face against this neighbour can be dropped.
   *
   * Beyond anything opaque, a run of the same blended block is dropped too:
   * the inside of a pond or a wall of ice two thick has no visible surface
   * between its blocks, and drawing those faces would darken it at every seam.
   */
  const hidden = (x: number, y: number, z: number, self: number) => {
    if (!inBounds(x, y, z)) return false
    const neighbour = at(x, y, z)
    if (occupies[neighbour] !== 1) return false
    if (blocks[neighbour] === 1) return true
    return (
      faces[neighbour].render === RenderClass.Translucent && baseIds[neighbour] === baseIds[self]
    )
  }

  // Colour per palette index, resolved once and converted once. A textured
  // block carries plain white and takes its colour from the atlas; only blocks
  // the atlas has no tile for carry a colour of their own.
  const paletteLinear = baseIds.map((id, index) => {
    if (faces[index].textured) return [1, 1, 1] as const
    const hex = colourForBlock(id)
    return [
      srgbToLinear((hex >> 16) & 0xff),
      srgbToLinear((hex >> 8) & 0xff),
      srgbToLinear(hex & 0xff)
    ] as const
  })

  // Tile bounds are shared by every face that samples the tile, so they are
  // worked out once per tile rather than once per face.
  const bounds = new Map<number, ReturnType<typeof tileBounds>>()
  const boundsFor = (tile: number) => {
    let entry = bounds.get(tile)
    if (!entry) {
      entry = tileBounds(tile)
      bounds.set(tile, entry)
    }
    return entry
  }

  const positions: number[] = []
  const normals: number[] = []
  const colours: number[] = []
  const uvs: number[] = []
  const opaqueIndices: number[] = []
  const blendedIndices: number[] = []
  let vertexCount = 0
  let occupiedHeight = 0

  // Centre the column on the origin in XZ so it can be placed by its centre.
  const offsetX = -sizeX / 2
  const offsetZ = -sizeZ / 2

  for (let y = 0; y < sizeY; y++) {
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        const paletteIndex = at(x, y, z)
        if (occupies[paletteIndex] !== 1) continue
        if (y + 1 > occupiedHeight) occupiedHeight = y + 1

        const [lr, lg, lb] = paletteLinear[paletteIndex]
        const block = faces[paletteIndex]
        const blended = block.render === RenderClass.Translucent
        const indexBuffer = blended ? blendedIndices : opaqueIndices

        for (let f = 0; f < 6; f++) {
          const face = FACES[f]
          const [nx, ny, nz] = face.normal

          // The bottom of the column rests on the plot floor and is never
          // visible, so it is not generated at all.
          if (ny === -1 && y === 0) continue
          if (hidden(x + nx, y + ny, z + nz, paletteIndex)) continue

          const [t1x, t1y, t1z] = face.t1
          const [t2x, t2y, t2z] = face.t2
          const tile = boundsFor(block.tiles[f])
          const ao: number[] = []

          for (let v = 0; v < 4; v++) {
            const [a, b] = face.corners[v]
            const su = a * 2 - 1
            const sv = b * 2 - 1

            // All three samples sit in the layer just outside this face.
            const bx = x + nx
            const by = y + ny
            const bz = z + nz

            const side1 = occludes(bx + t1x * su, by + t1y * su, bz + t1z * su)
            const side2 = occludes(bx + t2x * sv, by + t2y * sv, bz + t2z * sv)
            const corner = occludes(
              bx + t1x * su + t2x * sv,
              by + t1y * su + t2y * sv,
              bz + t1z * su + t2z * sv
            )
            ao.push(cornerAO(side1, side2, corner))
          }

          for (let v = 0; v < 4; v++) {
            const [ox, oy, oz] = face.offsets[v]
            const [a, b] = face.corners[v]
            positions.push(x + ox + offsetX, y + oy, z + oz + offsetZ)
            normals.push(nx * 127, ny * 127, nz * 127)
            // The corner of the face is the corner of its tile: t1 runs along
            // the tile's u, t2 along its v, which stands the texture upright on
            // every side face.
            uvs.push(a ? tile.u1 : tile.u0, b ? tile.v1 : tile.v0)
            const shade = AO_LEVELS[ao[v]]
            colours.push(lr * shade, lg * shade, lb * shade)
          }

          // Split the quad along whichever diagonal keeps the AO gradient
          // smooth; the wrong diagonal produces a visible crease at corners.
          const base = vertexCount
          if (ao[0] + ao[2] > ao[1] + ao[3]) {
            indexBuffer.push(base, base + 1, base + 3, base + 1, base + 2, base + 3)
          } else {
            indexBuffer.push(base, base + 1, base + 2, base, base + 2, base + 3)
          }
          vertexCount += 4
        }
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: Int8Array.from(normals),
    colours: Float32Array.from(colours),
    uvs: Float32Array.from(uvs),
    indices: Uint32Array.from([...opaqueIndices, ...blendedIndices]),
    opaqueIndexCount: opaqueIndices.length,
    faceCount: vertexCount / 4,
    occupiedHeight,
    surfaceLevel: findSurfaceLevel(column),
    sizeX,
    sizeY,
    sizeZ,
    minY
  }
}

/**
 * Layer index of the natural ground surface.
 *
 * Taken as the most common height of the topmost natural terrain block, so a
 * player's buildings and excavations do not drag the board's floor up and down
 * as they play. Grass is preferred, since that is the plot's surface layer.
 */
export function findSurfaceLevel(column: DecodedColumn): number {
  const { sizeX, sizeY, sizeZ, indices, occupies, baseIds } = column
  const strideZ = sizeX
  const strideY = sizeX * sizeZ

  const grassHeights = new Map<number, number>()
  const groundHeights = new Map<number, number>()
  const anyHeights = new Map<number, number>()
  const bump = (map: Map<number, number>, key: number) => map.set(key, (map.get(key) ?? 0) + 1)

  for (let z = 0; z < sizeZ; z++) {
    for (let x = 0; x < sizeX; x++) {
      let topGrass = -1
      let topGround = -1
      let topAny = -1
      for (let y = sizeY - 1; y >= 0; y--) {
        const palette = indices[y * strideY + z * strideZ + x]
        if (occupies[palette] !== 1) continue
        const id = baseIds[palette]
        if (topAny === -1) topAny = y
        if (topGround === -1 && NATURAL_GROUND.has(id)) topGround = y
        if (id === 'minecraft:grass_block') {
          topGrass = y
          break
        }
      }
      if (topGrass !== -1) bump(grassHeights, topGrass)
      if (topGround !== -1) bump(groundHeights, topGround)
      if (topAny !== -1) bump(anyHeights, topAny)
    }
  }

  const mode = (map: Map<number, number>): number | null => {
    let best: number | null = null
    let bestCount = 0
    for (const [height, count] of map) {
      if (count > bestCount) {
        best = height
        bestCount = count
      }
    }
    return best
  }

  return mode(grassHeights) ?? mode(groundHeights) ?? mode(anyHeights) ?? 0
}
