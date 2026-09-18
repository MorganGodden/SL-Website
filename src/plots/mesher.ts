import { faceTilesForEntry, RenderClass, tileBounds } from './blockAtlas'
import {
  isFullCube,
  shapeFor,
  shapeIsFixed,
  type BlockShape,
  type ShapeBox,
  type ShapeContext
} from './blockShapes'
import { blockProperty } from './blockIds'
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
  /**
   * Which block each vertex belongs to and what is happening to it, or 0 for a
   * block that was already there and is staying.
   *
   * Packed as a sign and a block: positive for a block that has just appeared,
   * negative for one that has just gone, and the magnitude locates the block it
   * belongs to so the renderer can grow or shrink it about its own middle. One
   * number rather than four, because it is carried by every vertex of every
   * plot on the board.
   */
  changes: Float32Array
  indices: Uint32Array
  /**
   * Where the blended draw starts in `indices`.
   *
   * Everything before it is opaque or alpha tested and is drawn first;
   * everything after it is glass, ice and water, which have to be drawn over
   * the scene they are seen through. One geometry, two draw ranges.
   */
  opaqueIndexCount: number
  /**
   * How many indices after the opaque range are blended.
   *
   * Whatever is left after those two is fading in or out, and is drawn last of
   * all, blended against the scene but shaded like the solid blocks it is.
   */
  blendedIndexCount: number
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

/**
 * How high water sits in a block with air above it.
 *
 * The same drop the liquid shape uses, so a waterlogged fence in a pond has its
 * surface flush with the water beside it rather than a notch above or below.
 */
const LIQUID_SURFACE = 14 / 16

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

/**
 * The neighbourhood of a block whose shape does not depend on one.
 *
 * Shapes are asked for once per palette entry where they can be, and those are
 * exactly the ones that never look around themselves.
 */
const NOWHERE: ShapeContext = {
  entry: () => null,
  solid: () => false
}

/**
 * The two crossed planes a plant is drawn as.
 *
 * Drawn from both sides, because a plant has no inside and the materials cull
 * back faces, and lit flat, because shading a flower by the blocks around it
 * only makes it look grubby.
 */
function emitCross(
  x: number,
  y: number,
  z: number,
  tile: { u0: number; u1: number; v0: number; v1: number },
  quad: (corners: number[], ao: number[]) => void,
  normals: number[],
  uvs: number[]
): void {
  // Corner to corner across the block, one plane each way.
  const planes = [
    { x0: 0, z0: 0, x1: 1, z1: 1, nx: -90, nz: 90 },
    { x0: 1, z0: 0, x1: 0, z1: 1, nx: 90, nz: 90 }
  ]

  const open = [3, 3, 3, 3]

  for (const plane of planes) {
    for (const back of [false, true]) {
      const side = back ? -1 : 1
      const [ax, az, bx, bz] = back
        ? [plane.x1, plane.z1, plane.x0, plane.z0]
        : [plane.x0, plane.z0, plane.x1, plane.z1]

      for (let v = 0; v < 4; v++) {
        // Bottom of the near edge, bottom of the far edge, then back over the
        // top of them, which winds the quad the right way round.
        const far = v === 1 || v === 2
        const up = v >= 2
        normals.push(plane.nx * side, 0, plane.nz * side)
        uvs.push(far === back ? tile.u0 : tile.u1, up ? tile.v1 : tile.v0)
      }

      quad(
        [
          x + ax, y, z + az,
          x + bx, y, z + bz,
          x + bx, y + 1, z + bz,
          x + ax, y + 1, z + az
        ],
        open
      )
    }
  }
}

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
 *
 * `ceiling` cuts the column off after that many layers. Everything at or above
 * it is treated as air rather than merely skipped, which is what makes the cut
 * a surface: the blocks below it grow the top faces they never had, exactly as
 * though nothing had ever been built on them. Clipping the finished mesh
 * instead would open it up, since a voxel mesh has no faces inside solid rock.
 */
/**
 * How long a block takes to grow in or shrink away, in seconds.
 *
 * Shared with the renderer, which is what actually animates it; a block is only
 * tagged here.
 */
export const CHANGE_SECONDS = 0.18

/**
 * How a change is shown.
 *
 * `grow` is for blocks placed and broken one at a time: each grows from its own
 * middle, which says "this block". `fade` is for a cut moving through the plot,
 * where whole layers come and go at once: growing each of their blocks
 * separately reads as a scatter rather than as one layer lifting off, so they
 * fade together instead.
 */
export type ChangeStyle = 'grow' | 'fade'

/** The tag a fading vertex carries, which has no block to grow from. */
const FADE_TAG = 1

/**
 * A block's own middle, packed into one number the renderer can unpack.
 *
 * A column is sixteen blocks across and a few hundred tall, so a bias of
 * thirty-two on the two horizontal axes keeps every coordinate positive and the
 * whole of it inside the range a float carries exactly.
 */
function packOrigin(bx: number, by: number, bz: number): number {
  return Math.round(bx + 32) + Math.round(bz + 32) * 64 + Math.round(by) * 4096
}

/**
 * Blocks in `column` that `other` does not have: newly placed, or newly
 * revealed by a cut moving up.
 *
 * Run one way round it finds what has arrived, and the other way what has gone.
 * Blocks are compared by their full palette entry, so a block replaced by a
 * different one counts as both.
 */
function changedCells(
  column: DecodedColumn,
  ceiling: number | undefined,
  other: DecodedColumn,
  otherCeiling: number | undefined
): Set<number> {
  const cells = new Set<number>()
  if (
    column.sizeX !== other.sizeX ||
    column.sizeY !== other.sizeY ||
    column.sizeZ !== other.sizeZ
  ) {
    // A plot that has changed shape is not a plot with a few blocks moved.
    return cells
  }

  const top = Math.max(0, Math.min(column.sizeY, ceiling ?? column.sizeY))
  const otherTop = Math.max(0, Math.min(other.sizeY, otherCeiling ?? other.sizeY))
  const layer = column.sizeX * column.sizeZ

  for (let cell = 0; cell < column.indices.length; cell++) {
    const y = Math.floor(cell / layer)
    if (y >= top) break

    const here = column.indices[cell]
    if (column.occupies[here] !== 1) continue

    const there = other.indices[cell]
    if (y < otherTop && other.occupies[there] === 1) {
      if (other.palette[there] === column.palette[here]) continue
    }
    cells.add(cell)
  }

  return cells
}

/** Lays one mesh's buffers after another's, keeping the draw ranges apart. */
function merge(first: ColumnMesh, second: ColumnMesh): ColumnMesh {
  const join = <T extends Float32Array | Int8Array>(a: T, b: T): T => {
    const out = new (a.constructor as new (length: number) => T)(a.length + b.length)
    out.set(a, 0)
    out.set(b, a.length)
    return out
  }

  /** The three ranges of a mesh's index buffer, in the order they are drawn. */
  const ranges = (mesh: ColumnMesh) => {
    const blendedEnd = mesh.opaqueIndexCount + mesh.blendedIndexCount
    return [
      mesh.indices.subarray(0, mesh.opaqueIndexCount),
      mesh.indices.subarray(mesh.opaqueIndexCount, blendedEnd),
      mesh.indices.subarray(blendedEnd)
    ]
  }

  const shift = first.positions.length / 3
  const mine = ranges(first)
  const theirs = ranges(second)

  // Each range of the merged buffer is both meshes' share of it, one after the
  // other: the ranges are ranges of this one buffer, so they have to be
  // interleaved rather than concatenated.
  const indices = new Uint32Array(first.indices.length + second.indices.length)
  let at = 0
  for (let range = 0; range < 3; range++) {
    indices.set(mine[range], at)
    at += mine[range].length
    for (const index of theirs[range]) indices[at++] = index + shift
  }

  return {
    ...first,
    positions: join(first.positions, second.positions),
    normals: join(first.normals, second.normals),
    colours: join(first.colours, second.colours),
    uvs: join(first.uvs, second.uvs),
    changes: join(first.changes, second.changes),
    indices,
    opaqueIndexCount: first.opaqueIndexCount + second.opaqueIndexCount,
    blendedIndexCount: first.blendedIndexCount + second.blendedIndexCount,
    faceCount: first.faceCount + second.faceCount
  }
}

/**
 * Builds a mesh of a column, and of whatever has just changed about it.
 *
 * Given what the column looked like last time, the blocks that have appeared
 * since are tagged so they can be shown arriving, and the blocks that have gone
 * are drawn one last time, tagged the other way, so they can leave rather than
 * simply cease to be. A cut moving through the plot changes what is there in
 * the same sense, and is tagged the same way but shown differently: see
 * `ChangeStyle`.
 */
export function meshColumn(
  column: DecodedColumn,
  ceiling?: number,
  previous?: DecodedColumn,
  previousCeiling?: number,
  style: ChangeStyle = 'grow'
): ColumnMesh {
  if (!previous) return meshPass(column, ceiling)

  const arriving = changedCells(column, ceiling, previous, previousCeiling)
  const mesh = meshPass(column, ceiling, { changing: arriving, phase: 1, style })

  const departing = changedCells(previous, previousCeiling, column, ceiling)
  if (departing.size === 0) return mesh

  // Drawn from the column as it was, because that is the only place the blocks
  // that have gone still exist.
  const ghosts = meshPass(previous, previousCeiling, {
    changing: departing,
    onlyChanging: true,
    phase: -1,
    style
  })

  return merge(mesh, ghosts)
}

/** What a single pass over a column is asked to draw, and how to tag it. */
interface PassOptions {
  /** Blocks that have just appeared or are about to go, by linear index. */
  changing?: ReadonlySet<number>
  /** Only draw the changing blocks, for the pass that draws what has gone. */
  onlyChanging?: boolean
  /** 1 for blocks arriving, -1 for blocks leaving, 0 when nothing is moving. */
  phase?: number
  /** Whether the changing blocks grow into place or fade. */
  style?: ChangeStyle
}

function meshPass(
  column: DecodedColumn,
  ceiling?: number,
  options: PassOptions = {}
): ColumnMesh {
  const { sizeX, sizeY, sizeZ, minY, indices, occupies, baseIds, palette } = column

  const top = Math.max(0, Math.min(sizeY, ceiling ?? sizeY))

  const strideZ = sizeX
  const strideY = sizeX * sizeZ
  const at = (x: number, y: number, z: number) => indices[y * strideY + z * strideZ + x]
  // The cut is part of the bounds, so face culling and ambient occlusion both
  // see open sky above it without either having to know about it.
  const inBounds = (x: number, y: number, z: number) =>
    x >= 0 && x < sizeX && y >= 0 && y < top && z >= 0 && z < sizeZ

  // Which atlas tiles each palette entry's faces sample, resolved once. Keyed
  // on the full entry, not the base id: a log's state says which way it lies.
  const faces = palette.map(faceTilesForEntry)

  /**
   * Blocks that hide what is behind them, which is what face culling and
   * ambient occlusion both mean by "solid". Glass and leaves are solid enough
   * to stand on but you can see past them, so neither may occlude, and neither
   * may a fence or a slab: there is nothing behind half a block.
   */
  const blocks = Uint8Array.from(faces, (tiles, index) =>
    occupies[index] === 1 &&
    tiles.render === RenderClass.Opaque &&
    isFullCube(palette[index])
      ? 1
      : 0
  )
  const occludes = (x: number, y: number, z: number) =>
    inBounds(x, y, z) && blocks[at(x, y, z)] === 1

  /**
   * Blocks with water in them: water itself, and anything waterlogged.
   *
   * A fence in a pond is a fence block carrying `waterlogged=true`, not a block
   * of water, so the water round it has to be drawn from the flag rather than
   * from the block's own identity. Both count as water to their neighbours: a
   * pond does not draw a wall of surface against the fence standing in it.
   */
  const isWater = Uint8Array.from(baseIds, (id) => (id === 'minecraft:water' ? 1 : 0))
  const holdsWater = Uint8Array.from(palette, (entry, index) =>
    isWater[index] === 1 || blockProperty(entry, 'waterlogged') === 'true' ? 1 : 0
  )

  /**
   * Whether a face against this neighbour can be dropped.
   *
   * Beyond anything opaque, a run of the same blended block is dropped too:
   * the inside of a pond or a wall of ice two thick has no visible surface
   * between its blocks, and drawing those faces would darken it at every seam.
   */
  /**
   * Blocks that have only just appeared, which do not cover anything yet.
   *
   * A block arriving is drawn part way in, so the face it will eventually hide
   * has to stay: dropping it the moment the block is meshed leaves a hole in
   * the plot for as long as the new block is still see-through. The face is
   * buried the moment it lands, and costs nothing but the drawing of it.
   */
  const arriving = options.phase === 1 ? options.changing : undefined
  /**
   * Whether the block being drawn is itself one of the arriving ones.
   *
   * Two blocks arriving together are as solid to each other as any pair: it is
   * only what was already standing that has to keep the faces they are about to
   * cover, or a layer would be drawn with all of its insides showing.
   */
  let selfArriving = false

  const hidden = (x: number, y: number, z: number, self: number) => {
    if (!inBounds(x, y, z)) return false
    if (!selfArriving && arriving?.has(y * strideY + z * strideZ + x) === true) return false
    const neighbour = at(x, y, z)
    if (occupies[neighbour] !== 1) return false
    if (blocks[neighbour] === 1) return true
    // Water meeting water, whether the other block is water or merely has
    // water in it.
    if (isWater[self] === 1 && holdsWater[neighbour] === 1) return true
    return (
      faces[neighbour].render === RenderClass.Translucent && baseIds[neighbour] === baseIds[self]
    )
  }

  /**
   * The water a waterlogged block is filled with: one tile and one colour,
   * resolved once rather than per block.
   */
  const waterTiles = faceTilesForEntry('minecraft:water')
  const waterLight: readonly [number, number, number] = waterTiles.textured
    ? [1, 1, 1]
    : (() => {
        const hex = colourForBlock('minecraft:water')
        return [
          srgbToLinear((hex >> 16) & 0xff),
          srgbToLinear((hex >> 8) & 0xff),
          srgbToLinear(hex & 0xff)
        ] as const
      })()

  /** What covers a face of the water filling a waterlogged block. */
  const flooded = (x: number, y: number, z: number) => {
    if (!inBounds(x, y, z)) return false
    const neighbour = at(x, y, z)
    return blocks[neighbour] === 1 || holdsWater[neighbour] === 1
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

  /**
   * The shape of each palette entry, for the ones that have the same shape
   * wherever they are placed. A fence reaches for its neighbours and water
   * pools against them, so those are worked out per block instead.
   */
  const fixedShapes = palette.map((entry) =>
    shapeIsFixed(entry) ? shapeFor(entry, NOWHERE) : null
  )

  // The block a shape is being worked out for, so the context below can answer
  // for its neighbours without a closure being built per block.
  let shapeX = 0
  let shapeY = 0
  let shapeZ = 0
  const context: ShapeContext = {
    entry: (dx, dy, dz) =>
      inBounds(shapeX + dx, shapeY + dy, shapeZ + dz)
        ? palette[at(shapeX + dx, shapeY + dy, shapeZ + dz)]
        : null,
    solid: (dx, dy, dz) => occludes(shapeX + dx, shapeY + dy, shapeZ + dz)
  }

  const shapeAt = (x: number, y: number, z: number, paletteIndex: number): BlockShape => {
    const fixed = fixedShapes[paletteIndex]
    if (fixed) return fixed
    shapeX = x
    shapeY = y
    shapeZ = z
    return shapeFor(palette[paletteIndex], context)
  }

  const positions: number[] = []
  const normals: number[] = []
  const colours: number[] = []
  const uvs: number[] = []
  const changes: number[] = []
  const opaqueIndices: number[] = []
  const blendedIndices: number[] = []
  const fadingIndices: number[] = []
  let vertexCount = 0
  let occupiedHeight = 0

  // Centre the column on the origin in XZ so it can be placed by its centre.
  const offsetX = -sizeX / 2
  const offsetZ = -sizeZ / 2

  for (let y = 0; y < top; y++) {
    for (let z = 0; z < sizeZ; z++) {
      for (let x = 0; x < sizeX; x++) {
        const paletteIndex = at(x, y, z)
        if (occupies[paletteIndex] !== 1) continue

        const cell = y * strideY + z * strideZ + x
        const moving = options.changing?.has(cell) === true
        if (options.onlyChanging === true && !moving) continue
        // Where the block's own middle is, for the renderer to grow it from.
        // A sign says which way, and a zero says the block is staying put.
        selfArriving = moving && options.phase === 1
        const fading = moving && options.style === 'fade'
        const change = moving
          ? (options.phase ?? 0) *
            (fading ? FADE_TAG : packOrigin(x + offsetX, y, z + offsetZ) + 2)
          : 0

        if (y + 1 > occupiedHeight) occupiedHeight = y + 1

        const block = faces[paletteIndex]
        const blended = block.render === RenderClass.Translucent
        // A face that is fading has to be drawn where it can be blended: the
        // opaque pass has no alpha to fade with, only a threshold to fall off.
        const indexBuffer = fading && !blended
          ? fadingIndices
          : blended
            ? blendedIndices
            : opaqueIndices

        /** Writes one quad, splitting it along whichever diagonal reads best. */
        const quad = (
          corners: number[],
          ao: number[],
          indexBuffer: number[],
          light: readonly [number, number, number]
        ) => {
          const base = vertexCount
          for (let v = 0; v < 4; v++) {
            positions.push(corners[v * 3], corners[v * 3 + 1], corners[v * 3 + 2])
            const shade = AO_LEVELS[ao[v]]
            colours.push(light[0] * shade, light[1] * shade, light[2] * shade)
            changes.push(change)
          }
          // The wrong diagonal produces a visible crease at corners.
          if (ao[0] + ao[2] > ao[1] + ao[3]) {
            indexBuffer.push(base, base + 1, base + 3, base + 1, base + 2, base + 3)
          } else {
            indexBuffer.push(base, base + 1, base + 2, base, base + 2, base + 3)
          }
          vertexCount += 4
        }

        /** One box of one block, with whatever is covering it and its tiles. */
        const emitBox = (
          part: ShapeBox,
          tileFor: (face: number) => number,
          covered: (nx: number, ny: number, nz: number) => boolean,
          into: number[],
          light: readonly [number, number, number]
        ) => {
          const extent = [part.x0, part.y0, part.z0, part.x1, part.y1, part.z1]

          for (let f = 0; f < 6; f++) {
            const face = FACES[f]
            const [nx, ny, nz] = face.normal

            // The bottom of the column rests on the plot floor and is never
            // visible, so it is not generated at all.
            if (ny === -1 && y === 0 && part.y0 === 0) continue

            // Only a face lying on the block's own boundary can be covered by
            // the block next door. A slab's top is halfway up its block and is
            // in the open however solid the block above it is.
            const flush =
              (nx === 1 && part.x1 === 1) ||
              (nx === -1 && part.x0 === 0) ||
              (ny === 1 && part.y1 === 1) ||
              (ny === -1 && part.y0 === 0) ||
              (nz === 1 && part.z1 === 1) ||
              (nz === -1 && part.z0 === 0)
            if (flush && covered(x + nx, y + ny, z + nz)) continue

            const [t1x, t1y, t1z] = face.t1
            const [t2x, t2y, t2z] = face.t2
            const tile = boundsFor(tileFor(f))
            const ao: number[] = []
            const corners: number[] = []

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

              // The box's own corner, picked out of its extent by the unit
              // cube's offsets: a 0 takes the near side, a 1 the far side.
              const [ox, oy, oz] = face.offsets[v]
              const px = extent[ox * 3]
              const py = extent[oy * 3 + 1]
              const pz = extent[oz * 3 + 2]
              corners.push(x + px + offsetX, y + py, z + pz + offsetZ)
              normals.push(nx * 127, ny * 127, nz * 127)

              // The face samples the part of the tile it actually covers, so a
              // slab shows the bottom half of its texture down its side and a
              // torch shows the strip of its tile the stick is drawn on. The
              // corner's distance along the face's own axes is that part.
              const u = px * t1x + py * t1y + pz * t1z
              const v2 = px * t2x + py * t2y + pz * t2z
              uvs.push(tile.u0 + (tile.u1 - tile.u0) * u, tile.v0 + (tile.v1 - tile.v0) * v2)
            }

            quad(corners, ao, into, light)
          }
        }

        const shape = shapeAt(x, y, z, paletteIndex)
        const light = paletteLinear[paletteIndex]

        if (shape.cross) {
          emitCross(
            x + offsetX,
            y,
            z + offsetZ,
            boundsFor(block.tiles[0]),
            (corners, ao) => quad(corners, ao, indexBuffer, light),
            normals,
            uvs
          )
        } else {
          for (const part of shape.boxes) {
            emitBox(
              part,
              (f) => block.tiles[f],
              (nx, ny, nz) => hidden(nx, ny, nz, paletteIndex),
              indexBuffer,
              light
            )
          }
        }

        // Water in a waterlogged block is a block of water drawn round it, the
        // way the game draws one: the fence stands inside its own pond.
        if (holdsWater[paletteIndex] === 1 && isWater[paletteIndex] === 0) {
          const brimming = inBounds(x, y + 1, z) && holdsWater[at(x, y + 1, z)] === 1
          emitBox(
            { x0: 0, y0: 0, z0: 0, x1: 1, y1: brimming ? 1 : LIQUID_SURFACE, z1: 1 },
            () => waterTiles.tiles[0],
            flooded,
            blendedIndices,
            waterLight
          )
        }
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: Int8Array.from(normals),
    colours: Float32Array.from(colours),
    uvs: Float32Array.from(uvs),
    changes: Float32Array.from(changes),
    indices: Uint32Array.from([...opaqueIndices, ...blendedIndices, ...fadingIndices]),
    opaqueIndexCount: opaqueIndices.length,
    blendedIndexCount: blendedIndices.length,
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
