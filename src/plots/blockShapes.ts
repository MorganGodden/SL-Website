/**
 * The shape of a block, for blocks that are not cubes.
 *
 * A voxel mesher draws a cube per block, which is right for stone and wrong for
 * everything a builder decorates with: a fence drawn as a cube is a wall, and a
 * flower drawn as a cube is a bush the size of a block. This module answers one
 * question - what boxes does this block fill? - and the mesher draws them.
 *
 * Boxes are given in sixteenths, the units Minecraft's own models use, so they
 * can be read straight across from the game's model files. A box's faces are
 * textured from the same tile the corresponding cube face would use, over the
 * part of the tile the box actually covers, which is what makes a slab show the
 * bottom half of its texture down its side.
 *
 * It runs inside the decode worker, so it must stay free of anything DOM.
 */
import { blockProperty } from './blockIds'

/** A box in block space: 0 to 1 on each axis, +x east, +y up, +z south. */
export interface ShapeBox {
  x0: number
  y0: number
  z0: number
  x1: number
  y1: number
  z1: number
}

/** What to draw for one block. */
export interface BlockShape {
  /** The boxes it fills. Empty when `cross` is set. */
  boxes: readonly ShapeBox[]
  /**
   * Crossed diagonal planes rather than boxes, for plants.
   *
   * They are drawn from both sides and lit flat: a flower has no inside, and
   * shading one by the blocks around it only makes it look grubby.
   */
  cross: boolean
  /** Whether it fills its block, which is what lets its neighbours cull. */
  full: boolean
}

/** What a shape needs to know about the blocks around it. */
export interface ShapeContext {
  /** The neighbour's palette entry, or null outside the column. */
  entry(dx: number, dy: number, dz: number): string | null
  /** Whether the neighbour fills its whole block. */
  solid(dx: number, dy: number, dz: number): boolean
}

const CUBE: ShapeBox = { x0: 0, y0: 0, z0: 0, x1: 1, y1: 1, z1: 1 }
const FULL: BlockShape = { boxes: [CUBE], cross: false, full: true }
const CROSS: BlockShape = { boxes: [], cross: true, full: false }
const EMPTY: BlockShape = { boxes: [], cross: false, full: false }

/** A box in sixteenths, the way a Minecraft model writes one. */
function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): ShapeBox {
  return { x0: x0 / 16, y0: y0 / 16, z0: z0 / 16, x1: x1 / 16, y1: y1 / 16, z1: z1 / 16 }
}

function shape(boxes: readonly ShapeBox[]): BlockShape {
  return { boxes, cross: false, full: false }
}

/**
 * A quarter turn clockwise seen from above, about the block's centre.
 *
 * Shapes are written facing one way and turned to the way they are placed,
 * which is how the game's own models are built: one model, four blockstates.
 */
function turn(target: ShapeBox, turns: number): ShapeBox {
  let result = target
  for (let i = 0; i < (((turns % 4) + 4) % 4); i++) {
    result = {
      x0: 1 - result.z1,
      x1: 1 - result.z0,
      y0: result.y0,
      y1: result.y1,
      z0: result.x0,
      z1: result.x1
    }
  }
  return result
}

/** Flips a box over, for the upside-down half of stairs and trapdoors. */
function flip(target: ShapeBox): ShapeBox {
  return {
    x0: target.x0,
    x1: target.x1,
    y0: 1 - target.y1,
    y1: 1 - target.y0,
    z0: 1 - target.z1,
    z1: 1 - target.z0
  }
}

/** Compass directions in turn order: each is a quarter turn past the last. */
const COMPASS = ['east', 'south', 'west', 'north'] as const

/** Quarter turns from the direction a shape is written for to the one it faces. */
function turnsTo(facing: string | null, written: (typeof COMPASS)[number]): number {
  const from = COMPASS.indexOf(written)
  const to = COMPASS.indexOf((facing ?? written) as (typeof COMPASS)[number])
  return to === -1 ? 0 : to - from
}

/** The four horizontal directions, as the offsets and property names share. */
const SIDES = [
  { name: 'north', dx: 0, dz: -1 },
  { name: 'east', dx: 1, dz: 0 },
  { name: 'south', dx: 0, dz: 1 },
  { name: 'west', dx: -1, dz: 0 }
] as const

/** Plants and the like, drawn as crossed planes. */
const CROSS_BLOCKS = new Set([
  'minecraft:grass',
  'minecraft:short_grass',
  'minecraft:tall_grass',
  'minecraft:fern',
  'minecraft:large_fern',
  'minecraft:dead_bush',
  'minecraft:seagrass',
  'minecraft:sugar_cane',
  'minecraft:cobweb',
  'minecraft:sweet_berry_bush',
  'minecraft:nether_wart',
  'minecraft:wheat',
  'minecraft:carrots',
  'minecraft:potatoes',
  'minecraft:beetroots',
  'minecraft:dandelion',
  'minecraft:poppy',
  'minecraft:blue_orchid',
  'minecraft:allium',
  'minecraft:azure_bluet',
  'minecraft:oxeye_daisy',
  'minecraft:cornflower',
  'minecraft:lily_of_the_valley',
  'minecraft:wither_rose',
  'minecraft:torchflower',
  'minecraft:sunflower',
  'minecraft:lilac',
  'minecraft:rose_bush',
  'minecraft:peony',
  'minecraft:pitcher_plant',
  'minecraft:spore_blossom',
  'minecraft:hanging_roots',
  'minecraft:glow_lichen',
  'minecraft:bamboo',

  // Later additions to the game, and the ones a builder reaches for on a
  // themed plot. Anything drawn as a plant belongs here rather than being
  // left to default to a cube of its own texture.
  'minecraft:bush',
  'minecraft:firefly_bush',
  'minecraft:short_dry_grass',
  'minecraft:tall_dry_grass',
  'minecraft:cactus_flower',
  'minecraft:open_eyeblossom',
  'minecraft:closed_eyeblossom',
  'minecraft:kelp',
  'minecraft:kelp_plant',
  'minecraft:tall_seagrass',
  'minecraft:small_dripleaf',
  'minecraft:pointed_dripstone',
  'minecraft:sculk_vein',
  'minecraft:resin_clump',
  'minecraft:pale_hanging_moss',
  // A stem is a vine on the ground until its fruit grows; the game draws both
  // states as crossed planes. The suffix cannot do this one: a crimson stem
  // and a mushroom stem are solid blocks.
  'minecraft:melon_stem',
  'minecraft:pumpkin_stem',
  'minecraft:attached_melon_stem',
  'minecraft:attached_pumpkin_stem'
])

/** Suffixes that make a block a plant whatever it is made of. */
const CROSS_SUFFIXES = [
  '_sapling',
  '_tulip',
  '_mushroom',
  '_fungus',
  '_roots',
  '_sprouts',
  '_propagule',
  '_crop',
  '_vines',
  '_vines_plant',
  // Coral and its fans, alive or dead. `_coral_block` is a cube and does not
  // end in either.
  '_coral',
  '_fan'
]

/**
 * Plants that lie flat on the ground: one texture, one sixteenth thick, drawn
 * the way a carpet is.
 */
const FLAT_BLOCKS = new Set([
  'minecraft:lily_pad',
  'minecraft:leaf_litter',
  'minecraft:pink_petals',
  'minecraft:wildflowers',
  'minecraft:frogspawn',
  'minecraft:tripwire'
])

/** Thin uprights: chains, rods and the like. */
const POSTS = new Set([
  'minecraft:chain',
  'minecraft:end_rod',
  'minecraft:lightning_rod',
  'minecraft:candle'
])

/**
 * Suffixes of the thin uprights that come in families: a candle of every dye,
 * a chain of every copper weathering, a banner of every colour. Each was
 * drawn as a full cube of its own texture until it was named here.
 */
const POST_SUFFIXES = ['_candle', '_chain', '_banner', '_rod']

/**
 * Blocks that are a fixed pile of boxes whatever state they carry.
 *
 * Read off the game's own models and rounded to axis-aligned boxes: the parts
 * of a model that are turned or tilted are squared up here, which at a plot's
 * scale reads as the block it is rather than as the cube it was.
 */
const FIXED_BOXES: Record<string, readonly ShapeBox[]> = {
  'minecraft:enchanting_table': [box(0, 0, 0, 16, 12, 16)],
  'minecraft:daylight_detector': [box(0, 0, 0, 16, 6, 16)],
  'minecraft:repeater': [box(0, 0, 0, 16, 2, 16)],
  'minecraft:comparator': [box(0, 0, 0, 16, 2, 16)],
  'minecraft:stonecutter': [box(0, 0, 0, 16, 9, 16)],
  'minecraft:dragon_egg': [box(1, 0, 1, 15, 16, 15)],
  'minecraft:conduit': [box(5, 5, 5, 11, 11, 11)],
  'minecraft:decorated_pot': [box(1, 0, 1, 15, 16, 15)],
  'minecraft:turtle_egg': [box(5, 0, 5, 11, 7, 11)],
  'minecraft:campfire': [box(0, 0, 0, 16, 4, 16)],
  'minecraft:soul_campfire': [box(0, 0, 0, 16, 4, 16)],
  'minecraft:brewing_stand': [box(7, 0, 7, 9, 14, 9), box(2, 0, 2, 14, 2, 14)],
  'minecraft:lectern': [box(0, 0, 0, 16, 2, 16), box(4, 2, 4, 12, 15, 12)],
  'minecraft:grindstone': [
    box(2, 4, 4, 14, 16, 12),
    box(2, 0, 5, 4, 4, 11),
    box(12, 0, 5, 14, 4, 11)
  ],
  'minecraft:big_dripleaf': [box(0, 11, 0, 16, 15, 16), box(5, 0, 5, 11, 11, 11)],
  'minecraft:big_dripleaf_stem': [box(5, 0, 5, 11, 16, 11)],
  // A pot for a floor, four walls and nothing in the middle.
  'minecraft:cauldron': [
    box(0, 0, 0, 16, 3, 16),
    box(0, 3, 0, 2, 16, 16),
    box(14, 3, 0, 16, 16, 16),
    box(2, 3, 0, 14, 16, 2),
    box(2, 3, 14, 14, 16, 16)
  ],
  'minecraft:hopper': [
    box(0, 10, 0, 16, 16, 16),
    box(4, 4, 4, 12, 10, 12),
    box(6, 0, 6, 10, 4, 10)
  ],
  'minecraft:anvil': [
    box(2, 0, 2, 14, 4, 14),
    box(4, 4, 5, 12, 10, 11),
    box(3, 10, 0, 13, 16, 16)
  ],
  'minecraft:scaffolding': [
    box(0, 14, 0, 16, 16, 16),
    box(0, 0, 0, 2, 14, 2),
    box(14, 0, 0, 16, 14, 2),
    box(0, 0, 14, 2, 14, 16),
    box(14, 0, 14, 16, 14, 16)
  ],
  'minecraft:bell': [box(5, 4, 5, 11, 12, 11), box(4, 12, 4, 12, 16, 12)],
  'minecraft:end_portal_frame': [box(0, 0, 0, 16, 13, 16)],
  'minecraft:heavy_core': [box(4, 0, 4, 12, 8, 12)],
  'minecraft:sniffer_egg': [box(1, 0, 1, 15, 16, 15)],
  'minecraft:sculk_sensor': [box(0, 0, 0, 16, 8, 16)],
  'minecraft:calibrated_sculk_sensor': [box(0, 0, 0, 16, 8, 16)],
  'minecraft:sculk_shrieker': [box(0, 0, 0, 16, 8, 16)],
  // The chorus plant is a knobbly thing; its arms reach for its neighbours,
  // which at this size is a lump in the middle of the block either way.
  'minecraft:chorus_plant': [box(3, 3, 3, 13, 13, 13)],
  'minecraft:chorus_flower': [box(2, 2, 2, 14, 14, 14)],
  // Another pot for a floor and four walls, one sixteenth thinner than the
  // cauldron's.
  'minecraft:composter': [
    box(0, 0, 0, 16, 2, 16),
    box(0, 2, 0, 2, 16, 16),
    box(14, 2, 0, 16, 16, 16),
    box(2, 2, 0, 14, 16, 2),
    box(2, 2, 14, 14, 16, 16)
  ]
}

/** The cauldrons and anvils that are the same shape with something in them. */
const ALIASES: Record<string, string> = {
  'minecraft:water_cauldron': 'minecraft:cauldron',
  'minecraft:lava_cauldron': 'minecraft:cauldron',
  'minecraft:powder_snow_cauldron': 'minecraft:cauldron',
  'minecraft:chipped_anvil': 'minecraft:anvil',
  'minecraft:damaged_anvil': 'minecraft:anvil'
}

export type ShapeKind =
  | 'full'
  | 'slab'
  | 'stairs'
  | 'fence'
  | 'gate'
  | 'wall'
  | 'pane'
  | 'cross'
  | 'torch'
  | 'wall_torch'
  | 'lantern'
  | 'wire'
  | 'plate'
  | 'carpet'
  | 'snow'
  | 'trapdoor'
  | 'door'
  | 'chest'
  | 'button'
  | 'liquid'
  | 'shaved'
  | 'cactus'
  | 'panel'
  | 'post'
  | 'sign'
  | 'pot'
  | 'boxed'
  | 'cake'
  | 'bed'
  | 'head'
  | 'rail'
  | 'pickle'
  | 'lever'
  | 'piston_head'
  | 'shelf'
  | 'portal'

/**
 * What kind of shape a block has, from its identifier alone.
 *
 * Suffixes are tested longest first: a `_wall_torch` is a torch, not a wall,
 * and a `_trapdoor` is not a door.
 */
export function kindOf(baseId: string): ShapeKind {
  if (CROSS_BLOCKS.has(baseId)) return 'cross'
  if (FIXED_BOXES[ALIASES[baseId] ?? baseId] !== undefined) return 'boxed'
  if (FLAT_BLOCKS.has(baseId) || baseId.endsWith('_petals')) return 'carpet'
  for (const suffix of CROSS_SUFFIXES) {
    if (baseId.endsWith(suffix)) return 'cross'
  }
  if (POSTS.has(baseId)) return 'post'

  // A cake with a candle in it is still a cake, and a banner on a wall hangs
  // flat against it rather than standing up, so both are answered before the
  // families they otherwise belong to.
  if (baseId === 'minecraft:candle_cake' || baseId.endsWith('_candle_cake')) return 'cake'
  if (baseId.endsWith('_wall_banner')) return 'panel'
  for (const suffix of POST_SUFFIXES) {
    if (baseId.endsWith(suffix)) return 'post'
  }

  if (baseId === 'minecraft:water' || baseId === 'minecraft:lava') return 'liquid'
  if (baseId === 'minecraft:redstone_wire') return 'wire'
  if (baseId === 'minecraft:snow') return 'snow'
  if (baseId === 'minecraft:cactus') return 'cactus'
  if (baseId === 'minecraft:farmland' || baseId === 'minecraft:dirt_path') return 'shaved'
  if (baseId === 'minecraft:ladder' || baseId === 'minecraft:vine') return 'panel'
  if (baseId === 'minecraft:flower_pot' || baseId.startsWith('minecraft:potted_')) return 'pot'
  // A sea lantern and a jack o'lantern are cubes that happen to be named after
  // a lantern; the hanging kind is everything else, copper ones included.
  if (baseId === 'minecraft:sea_lantern' || baseId === 'minecraft:jack_o_lantern') return 'full'
  if (baseId === 'minecraft:lantern' || baseId.endsWith('_lantern')) return 'lantern'
  if (baseId === 'minecraft:item_frame' || baseId === 'minecraft:glow_item_frame') return 'panel'
  if (baseId === 'minecraft:nether_portal') return 'portal'
  // A hook is a small thing on a wall, which is the shape a wall torch is.
  if (baseId === 'minecraft:tripwire_hook') return 'wall_torch'
  if (baseId.endsWith('_shelf')) return 'shelf'
  if (baseId === 'minecraft:cake') return 'cake'
  if (baseId === 'minecraft:sea_pickle') return 'pickle'
  if (baseId === 'minecraft:lever') return 'lever'
  if (baseId === 'minecraft:piston_head') return 'piston_head'
  if (baseId.endsWith('_bed')) return 'bed'
  if (baseId.endsWith('_rail') || baseId === 'minecraft:rail') return 'rail'
  if (baseId.endsWith('_head') || baseId.endsWith('_skull')) return 'head'
  // Amethyst is a spray of points, which reads the way a plant does.
  if (baseId.endsWith('amethyst_cluster') || baseId.endsWith('_amethyst_bud')) return 'cross'
  if (baseId.endsWith('_chest')) return 'chest'
  if (baseId === 'minecraft:chest') return 'chest'

  if (baseId.endsWith('_wall_torch') || baseId === 'minecraft:wall_torch') return 'wall_torch'
  if (baseId.endsWith('_torch') || baseId === 'minecraft:torch') return 'torch'
  if (baseId.endsWith('_wall_sign') || baseId.endsWith('_hanging_sign')) return 'sign'
  if (baseId.endsWith('_sign')) return 'sign'
  if (baseId.endsWith('_fence_gate')) return 'gate'
  if (baseId.endsWith('_fence')) return 'fence'
  if (baseId.endsWith('_wall')) return 'wall'
  if (baseId.endsWith('_pane') || baseId.endsWith('_bars')) return 'pane'
  if (baseId.endsWith('_slab')) return 'slab'
  if (baseId.endsWith('_stairs')) return 'stairs'
  if (baseId.endsWith('_trapdoor')) return 'trapdoor'
  if (baseId.endsWith('_door')) return 'door'
  if (baseId.endsWith('_pressure_plate')) return 'plate'
  if (baseId.endsWith('_button')) return 'button'
  if (baseId.endsWith('_carpet')) return 'carpet'

  return 'full'
}

/** The identifier without its block state, e.g. `minecraft:oak_fence`. */
function baseOf(paletteEntry: string): string {
  const bracket = paletteEntry.indexOf('[')
  return bracket === -1 ? paletteEntry : paletteEntry.slice(0, bracket)
}

/**
 * Whether a block's shape is the same wherever it is placed.
 *
 * Fences reach for their neighbours and water pools against them, so those have
 * to be worked out per block; everything else can be worked out once for the
 * whole palette and reused for every block in it.
 */
export function shapeIsFixed(paletteEntry: string): boolean {
  const kind = kindOf(baseOf(paletteEntry))
  if (kind === 'liquid') return false
  if (kind === 'fence' || kind === 'pane' || kind === 'wall') {
    // Their connections are usually in the block state, and only blocks whose
    // state left them out have to look around at their neighbours.
    return SIDES.every((side) => blockProperty(paletteEntry, side.name) !== null)
  }
  return true
}

/** Whether a block fills its whole block space, and so hides what is behind it. */
export function isFullCube(paletteEntry: string): boolean {
  const base = baseOf(paletteEntry)
  switch (kindOf(base)) {
    case 'full':
      return true
    case 'slab':
      return blockProperty(paletteEntry, 'type') === 'double'
    case 'snow':
      return Number(blockProperty(paletteEntry, 'layers') ?? 1) >= 8
    default:
      return false
  }
}

/** The boxes one block fills. */
export function shapeFor(paletteEntry: string, context: ShapeContext): BlockShape {
  const base = baseOf(paletteEntry)
  const kind = kindOf(base)

  switch (kind) {
    case 'cross':
      return CROSS
    case 'slab':
      return slabShape(paletteEntry)
    case 'stairs':
      return stairShape(paletteEntry)
    case 'fence':
      return fenceShape(paletteEntry, context)
    case 'gate':
      return gateShape(paletteEntry)
    case 'wall':
      return wallShape(paletteEntry, context)
    case 'pane':
      return paneShape(paletteEntry, context)
    case 'torch':
      return shape([box(7, 0, 7, 9, 10, 9)])
    case 'wall_torch':
      // Written against the west wall, pointing east.
      return shape([turn(box(1, 3, 7, 4, 13, 9), turnsTo(facingOf(paletteEntry), 'east'))])
    case 'lantern':
      return blockProperty(paletteEntry, 'hanging') === 'true'
        ? shape([box(5, 1, 5, 11, 8, 11), box(6, 8, 6, 10, 16, 10)])
        : shape([box(5, 0, 5, 11, 7, 11), box(6, 7, 6, 10, 9, 10)])
    case 'wire':
      return shape([box(0, 0, 0, 16, 1, 16)])
    case 'plate':
      return shape([box(1, 0, 1, 15, 1, 15)])
    case 'carpet':
      return shape([box(0, 0, 0, 16, 1, 16)])
    case 'snow':
      return snowShape(paletteEntry)
    case 'trapdoor':
      return trapdoorShape(paletteEntry)
    case 'door':
      return doorShape(paletteEntry)
    case 'chest':
      return chestShape(paletteEntry)
    case 'button':
      return buttonShape(paletteEntry)
    case 'liquid':
      return liquidShape(paletteEntry, base, context)
    case 'shaved':
      return shape([box(0, 0, 0, 16, 15, 16)])
    case 'cactus':
      return shape([box(1, 0, 1, 15, 16, 15)])
    case 'panel':
      // Written for a ladder on the south wall, which is `facing=north`.
      return shape([turn(box(0, 0, 13, 16, 16, 16), turnsTo(facingOf(paletteEntry), 'north'))])
    case 'post':
      return shape([box(6, 0, 6, 10, 16, 10)])
    case 'sign':
      return signShape(paletteEntry, base)
    case 'pot':
      return shape([box(5, 0, 5, 11, 6, 11)])
    case 'boxed':
      return shape(FIXED_BOXES[ALIASES[base] ?? base])
    case 'cake':
      return cakeShape(paletteEntry)
    case 'pickle':
      return pickleShape(paletteEntry)
    case 'bed':
      // Mattress and pillow together; the legs are below the eye at this size.
      return shape([box(0, 3, 0, 16, 9, 16)])
    case 'head':
      return shape([box(4, 0, 4, 12, 8, 12)])
    case 'rail':
      return shape([box(0, 0, 0, 16, 1, 16)])
    case 'lever':
      return leverShape(paletteEntry)
    case 'piston_head':
      return pistonHeadShape(paletteEntry)
    case 'shelf':
      // A board on the wall behind it, written the way the ladder above is:
      // facing north puts the block it hangs on to the south.
      return shape([turn(box(0, 5, 8, 16, 11, 16), turnsTo(facingOf(paletteEntry), 'north'))])
    case 'portal':
      // A sheet across the frame, turned by the axis it stands along rather
      // than by a facing: a portal has no front.
      return shape([
        turn(box(0, 0, 6, 16, 16, 10), blockProperty(paletteEntry, 'axis') === 'z' ? 1 : 0)
      ])
    default:
      return FULL
  }
}

function facingOf(paletteEntry: string): string | null {
  return blockProperty(paletteEntry, 'facing')
}

function slabShape(paletteEntry: string): BlockShape {
  switch (blockProperty(paletteEntry, 'type')) {
    case 'top':
      return shape([box(0, 8, 0, 16, 16, 16)])
    case 'double':
      return FULL
    default:
      return shape([box(0, 0, 0, 16, 8, 16)])
  }
}

/**
 * Stairs: a slab with a step on top of it.
 *
 * Written the way the game writes them - facing east, right way up - and then
 * turned and, for the upside-down half, rolled over. A corner piece is the same
 * step cut back to a quarter, or grown to three of them.
 */
function stairShape(paletteEntry: string): BlockShape {
  const corner = blockProperty(paletteEntry, 'shape') ?? 'straight'
  const boxes: ShapeBox[] = [box(0, 0, 0, 16, 8, 16)]

  switch (corner) {
    case 'outer_left':
    case 'outer_right':
      boxes.push(box(8, 8, 8, 16, 16, 16))
      break
    case 'inner_left':
    case 'inner_right':
      boxes.push(box(8, 8, 0, 16, 16, 16), box(0, 8, 8, 8, 16, 16))
      break
    default:
      boxes.push(box(8, 8, 0, 16, 16, 16))
  }

  // The left-handed corners are the right-handed ones a quarter turn back.
  const handed = corner.endsWith('_left') ? 3 : 0
  const upside = blockProperty(paletteEntry, 'half') === 'top'

  // Rolling a corner over puts its quarter on the wrong side of the block, and
  // the game turns it back by a quarter; a straight step spans the block that
  // way round, so it needs nothing. This is the game's own rotation table.
  const righted = upside && corner !== 'straight' ? 1 : 0
  const turns = turnsTo(facingOf(paletteEntry), 'east') + handed + righted

  return shape(boxes.map((target) => turn(upside ? flip(target) : target, turns)))
}

/** Fence: a post, and two rails reaching out to whatever it is joined to. */
function fenceShape(paletteEntry: string, context: ShapeContext): BlockShape {
  const boxes: ShapeBox[] = [box(6, 0, 6, 10, 16, 10)]

  SIDES.forEach((side, index) => {
    if (!joined(paletteEntry, context, side, 'fence')) return
    // The rails run past the post's face and stop inside it, which is what the
    // game's own model does: ending them flush would leave two faces in the
    // same plane, one drawn over the other.
    boxes.push(
      turn(box(7, 12, 0, 9, 15, 9), index),
      turn(box(7, 6, 0, 9, 9, 9), index)
    )
  })

  return shape(boxes)
}

/** Fence gate: two posts with the gate hung between them, or swung aside. */
function gateShape(paletteEntry: string): BlockShape {
  const turns = turnsTo(facingOf(paletteEntry), 'south')
  const boxes: ShapeBox[] = [box(0, 5, 7, 2, 16, 9), box(14, 5, 7, 16, 16, 9)]

  // An open gate is drawn as its posts alone: the leaves have swung back
  // against the blocks beside it, where a box would only be in the way.
  if (blockProperty(paletteEntry, 'open') !== 'true') {
    boxes.push(box(2, 6, 7, 14, 9, 9), box(2, 12, 7, 14, 15, 9))
  }

  return shape(boxes.map((target) => turn(target, turns)))
}

/** Wall: a stouter post, with arms that stop short of the top. */
function wallShape(paletteEntry: string, context: ShapeContext): BlockShape {
  const boxes: ShapeBox[] = []
  if (blockProperty(paletteEntry, 'up') !== 'false') boxes.push(box(4, 0, 4, 12, 16, 12))

  SIDES.forEach((side, index) => {
    const height = blockProperty(paletteEntry, side.name)
    if (height === 'none') return
    if (height === null && !reaches(context, side, 'wall')) return
    boxes.push(turn(box(5, 0, 0, 11, height === 'tall' ? 16 : 14, 8), index))
  })

  return shape(boxes.length > 0 ? boxes : [box(4, 0, 4, 12, 16, 12)])
}

/** Glass panes and iron bars: a thin post with thin arms. */
function paneShape(paletteEntry: string, context: ShapeContext): BlockShape {
  const boxes: ShapeBox[] = [box(7, 0, 7, 9, 16, 9)]

  SIDES.forEach((side, index) => {
    if (!joined(paletteEntry, context, side, 'pane')) return
    // Stopping inside the post rather than against it, as the rails above do.
    boxes.push(turn(box(7, 0, 0, 9, 16, 8), index))
  })

  return shape(boxes)
}

/**
 * Whether a joining block reaches out on this side.
 *
 * The block state says so on every server that sends its properties, and the
 * blocks either side are only looked at when it does not.
 */
function joined(
  paletteEntry: string,
  context: ShapeContext,
  side: (typeof SIDES)[number],
  family: ShapeKind
): boolean {
  const property = blockProperty(paletteEntry, side.name)
  if (property !== null) return property !== 'false' && property !== 'none'
  return reaches(context, side, family)
}

/** What a fence or pane would join itself to, going by what is next door. */
function reaches(
  context: ShapeContext,
  side: (typeof SIDES)[number],
  family: ShapeKind
): boolean {
  if (context.solid(side.dx, 0, side.dz)) return true
  const neighbour = context.entry(side.dx, 0, side.dz)
  if (neighbour === null) return false

  const kind = kindOf(baseOf(neighbour))
  if (family === 'wall') return kind === 'wall' || kind === 'gate'
  return kind === family || kind === 'gate'
}

function snowShape(paletteEntry: string): BlockShape {
  const layers = Number(blockProperty(paletteEntry, 'layers') ?? 1)
  if (layers >= 8) return FULL
  return shape([box(0, 0, 0, 16, Math.max(layers, 1) * 2, 16)])
}

/** Trapdoor: a panel on the floor, the ceiling, or swung out against a wall. */
function trapdoorShape(paletteEntry: string): BlockShape {
  if (blockProperty(paletteEntry, 'open') === 'true') {
    // Written for `facing=north`, which hangs the open panel on the south side.
    return shape([turn(box(0, 0, 13, 16, 16, 16), turnsTo(facingOf(paletteEntry), 'north'))])
  }
  return blockProperty(paletteEntry, 'half') === 'top'
    ? shape([box(0, 13, 0, 16, 16, 16)])
    : shape([box(0, 0, 0, 16, 3, 16)])
}

/** Door: a panel down one side, swung a quarter turn when open. */
function doorShape(paletteEntry: string): BlockShape {
  let turns = turnsTo(facingOf(paletteEntry), 'east')
  if (blockProperty(paletteEntry, 'open') === 'true') {
    turns += blockProperty(paletteEntry, 'hinge') === 'right' ? 3 : 1
  }
  return shape([turn(box(0, 0, 0, 3, 16, 16), turns)])
}

/** Chest: a box a little short of its block, or half of a longer one. */
function chestShape(paletteEntry: string): BlockShape {
  const half = blockProperty(paletteEntry, 'type')
  if (half !== 'left' && half !== 'right') return shape([box(1, 0, 1, 15, 14, 15)])

  // A double chest is joined across the way it faces, and the two halves must
  // meet: the gap a single chest leaves would be a seam down the middle.
  const facing = facingOf(paletteEntry)
  const acrossX = facing === 'north' || facing === 'south' || facing === null
  return shape([
    acrossX ? box(0, 0, 1, 16, 14, 15) : box(1, 0, 0, 15, 14, 16)
  ])
}

/** Button: a nub on the floor, a wall or the ceiling. */
function buttonShape(paletteEntry: string): BlockShape {
  const face = blockProperty(paletteEntry, 'face') ?? 'wall'
  const turns = turnsTo(facingOf(paletteEntry), 'east')

  if (face === 'floor') return shape([turn(box(5, 0, 6, 11, 2, 10), turns)])
  if (face === 'ceiling') return shape([turn(box(5, 14, 6, 11, 16, 10), turns)])
  return shape([turn(box(0, 6, 5, 2, 10, 11), turns)])
}

/**
 * Liquid: a block of it, one notch down at the surface.
 *
 * The drop is what makes a pond read as a pond rather than as a pane of glass
 * flush with the bank; under more of itself it fills the block, because there
 * is no surface there to sit below.
 */
function liquidShape(paletteEntry: string, base: string, context: ShapeContext): BlockShape {
  const above = context.entry(0, 1, 0)
  if (above !== null && baseOf(above) === base) return FULL

  const level = Number(blockProperty(paletteEntry, 'level') ?? 0)
  // Levels 1 to 7 are the thinning edge of a flow; 8 and up are falling water,
  // which fills its block.
  const height = level === 0 ? 14 : level >= 8 ? 16 : Math.max(16 - level * 2, 2)
  return shape([box(0, 0, 0, 16, height, 16)])
}

/** Sign: a board on a post, or a board against a wall. */
function signShape(paletteEntry: string, base: string): BlockShape {
  if (base.endsWith('_wall_sign')) {
    return shape([turn(box(0, 4, 14, 16, 12, 16), turnsTo(facingOf(paletteEntry), 'north'))])
  }
  if (base.endsWith('_hanging_sign')) {
    return shape([box(1, 0, 7, 15, 10, 9), box(0, 10, 7, 16, 16, 9)])
  }
  return shape([box(7, 0, 7, 9, 9, 9), box(0, 9, 7, 16, 16, 9)])
}

/** Cake: a slab of it, with each bite taken out of the west side. */
function cakeShape(paletteEntry: string): BlockShape {
  const bites = Math.min(Number(blockProperty(paletteEntry, 'bites') ?? 0), 6)
  return shape([box(1 + bites * 2, 0, 1, 15, 8, 15)])
}

/** Sea pickles: one to four of them, stood about the block. */
function pickleShape(paletteEntry: string): BlockShape {
  const count = Math.min(Math.max(Number(blockProperty(paletteEntry, 'pickles') ?? 1), 1), 4)
  const spots = [
    box(6, 0, 6, 10, 6, 10),
    box(2, 0, 8, 6, 5, 12),
    box(9, 0, 2, 13, 5, 6),
    box(9, 0, 9, 13, 4, 13)
  ]
  return shape(spots.slice(0, count))
}

/**
 * Lever: a base plate with the handle standing on it.
 *
 * `face` says what it is fixed to and `facing` which way it points; the handle
 * is left standing rather than thrown, since which way it leans is a detail at
 * a plot's scale.
 */
function leverShape(paletteEntry: string): BlockShape {
  const face = blockProperty(paletteEntry, 'face') ?? 'wall'
  const turns = turnsTo(facingOf(paletteEntry), 'east')

  if (face === 'floor') {
    return shape([turn(box(5, 0, 4, 11, 3, 12), turns), box(7, 3, 7, 9, 10, 9)])
  }
  if (face === 'ceiling') {
    return shape([turn(box(5, 13, 4, 11, 16, 12), turns), box(7, 6, 7, 9, 13, 9)])
  }
  // Written against the west wall, as the wall torch is.
  return shape([
    turn(box(0, 4, 5, 3, 12, 11), turns),
    turn(box(3, 6, 7, 6, 10, 9), turns)
  ])
}

/**
 * Piston head: the face plate and the rod behind it.
 *
 * Its `facing` includes up and down, which a quarter turn cannot express, so
 * those two are written out rather than turned into place.
 */
function pistonHeadShape(paletteEntry: string): BlockShape {
  const facing = facingOf(paletteEntry)
  if (facing === 'up') return shape([box(0, 12, 0, 16, 16, 16), box(6, 0, 6, 10, 12, 10)])
  if (facing === 'down') return shape([box(0, 0, 0, 16, 4, 16), box(6, 4, 6, 10, 16, 10)])

  // Written pointing east: the plate at the far side, the rod reaching back.
  const turns = turnsTo(facing, 'east')
  return shape([
    turn(box(12, 0, 0, 16, 16, 16), turns),
    turn(box(0, 6, 6, 12, 10, 10), turns)
  ])
}

/** Nothing at all, for a block that has no shape to draw. */
export const NOTHING = EMPTY
