/**
 * Which resource pack textures each block is built from.
 *
 * Minecraft answers this with a block model per block state, and resource packs
 * almost never ship models — they only replace textures, and rely on the game's
 * own models. Rather than carry a copy of vanilla's model tree, this derives the
 * faces from the naming conventions those models follow (`X`, `X_top`,
 * `X_side`, `X_bottom`), with an override for every block that breaks them.
 *
 * Faces are reduced to three: top, bottom and side. Nothing here needs a block
 * with four distinct sides, and the ones that have them in-game (furnaces,
 * crafting tables) are only ever seen from far enough away that their front
 * would be a curiosity.
 */

/**
 * Suffixes the convention uses for a block's individual faces. `_end` is the
 * pair of faces at the ends of a pillar, which the game names once.
 */
const FACE_SUFFIXES = ['_top', '_bottom', '_side', '_end']

/**
 * Shapes the board resolves back to the material they are made of, the same
 * walk `src/plots/blockIds.ts` does at runtime — keep the two in step.
 *
 * A sweep of the pack must leave these alone: packs ship `oak_fence_side` and
 * `stone_slab_top` as pictures of a whole fence or of the slab the game had
 * ten versions ago, and a fence post sampling a picture of a fence is worse
 * than the planks it samples today.
 */
const SHAPE_SUFFIXES = [
  '_slab',
  '_stairs',
  '_wall',
  '_fence_gate',
  '_fence',
  '_pressure_plate',
  '_button',
  '_sign',
  '_carpet',
  '_pane'
]

/**
 * Every block the pack has textures for, read off the texture names alone.
 *
 * The curated list below covers the blocks the board was built around, and
 * nothing else: a builder placing something outside it got a flat colour,
 * which is what "the block came out wrong" looks like. This sweeps the whole
 * `block/` folder instead, groups the names by the same `X` / `X_top` /
 * `X_side` / `X_bottom` / `X_end` convention the overrides are written against,
 * and produces a spec for every group that looks like a block.
 *
 * These are only a floor: `blockSpecs()` is applied over the top, so every
 * curated face, tint and render class still wins. A group with no texture of
 * its own name and only one face is a fragment of some other block's model
 * (`beehive_front`, `lectern_base`), not a block, and is passed over.
 */
export function autoSpecs(textureNames) {
  const have = new Set(textureNames)
  const bases = new Set(
    textureNames.map((name) => {
      const suffix = FACE_SUFFIXES.find((end) => name.endsWith(end) && name.length > end.length)
      return suffix === undefined ? name : name.slice(0, -suffix.length)
    })
  )

  const specs = {}
  for (const base of bases) {
    if (SHAPE_SUFFIXES.some((suffix) => base.endsWith(suffix))) continue

    const face = (suffix) => (have.has(base + suffix) ? base + suffix : null)
    const plain = have.has(base) ? base : null
    if (plain === null && FACE_SUFFIXES.filter((s) => have.has(base + s)).length < 2) continue

    const top = face('_top') ?? face('_end') ?? plain
    const side = face('_side') ?? plain ?? top
    const bottom = face('_bottom') ?? face('_end') ?? plain ?? top

    specs[`minecraft:${base}`] = {
      top: top ?? side,
      bottom: bottom ?? side,
      side,
      // No spec said how this one is drawn, so the baker reads it off the
      // texture's own transparency.
      auto: true
    }
  }

  // Doors, trapdoors and bars are the shapes that break the rule above: the
  // pack draws the block's own face rather than a picture of the whole thing,
  // which is exactly what the curated wooden doors already use.
  for (const name of textureNames) {
    if (name.endsWith('_door_bottom')) {
      const door = name.slice(0, -'_bottom'.length)
      specs[`minecraft:${door}`] = { all: name, auto: true }
      if (have.has(`${door}_top`)) {
        specs[`minecraft:${door}[half=upper]`] = { all: `${door}_top`, auto: true }
      }
    } else if (name.endsWith('_trapdoor') || name.endsWith('_bars')) {
      specs[`minecraft:${name}`] = { all: name, auto: true }
    }
  }

  return specs
}

/** Biome tints, as the game applies them to greyscale textures. */
export const TINTS = {
  grass: 0x91bd59,
  foliage: 0x77ab2f,
  spruce: 0x619961,
  birch: 0x80a755,
  water: 0x3f76e4,
  /**
   * Dead and dried plants: leaf litter and the dry grasses, which the game
   * colours from the biome's dry foliage rather than its foliage. This is the
   * default the game falls back to, and the one knob to turn if the litter on
   * a plot reads too green or too brown.
   */
  dryFoliage: 0xada373
}

/** Woods that follow the log/planks/leaves convention exactly. */
const WOODS = [
  'oak',
  'spruce',
  'birch',
  'jungle',
  'acacia',
  'dark_oak',
  'mangrove',
  'cherry'
]

/** The sixteen dye colours, for the blocks that come one per colour. */
const DYES = [
  'white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray',
  'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black'
]

/**
 * How a block is drawn.
 *
 * `opaque` hides the faces behind it and has its texture flattened onto a solid
 * colour at bake time. `cutout` keeps hard-edged holes and is drawn in the same
 * pass by alpha testing. `translucent` keeps its alpha and is drawn after
 * everything else.
 */
const CUTOUT = 'cutout'
const TRANSLUCENT = 'translucent'

/** Blocks whose faces do not follow the naming convention. */
const OVERRIDES = {
  'grass_block': { top: 'grass_block_top', side: 'grass_block_side', bottom: 'dirt', tint: { top: TINTS.grass } },
  // Snow lying on ground blocks is a block state, not a block, and on a snow
  // themed server it is most of the ground. The runtime looks these up by the
  // state suffix; see blockAtlas.ts.
  'grass_block[snowy=true]': { top: 'grass_block_top', side: 'grass_block_snow', bottom: 'dirt', tint: { top: TINTS.grass } },
  'podzol[snowy=true]': { top: 'podzol_top', side: 'grass_block_snow', bottom: 'dirt' },
  'mycelium[snowy=true]': { top: 'mycelium_top', side: 'grass_block_snow', bottom: 'dirt' },
  'podzol': { top: 'podzol_top', side: 'podzol_side', bottom: 'dirt' },
  'mycelium': { top: 'mycelium_top', side: 'mycelium_side', bottom: 'dirt' },
  'dirt_path': { top: 'dirt_path_top', side: 'dirt_path_side', bottom: 'dirt' },
  'farmland': { top: 'farmland', side: 'dirt', bottom: 'dirt' },
  'snow': { all: 'snow' },
  'snow_block': { all: 'snow' },
  'powder_snow': { all: 'powder_snow' },
  'grass_path': { top: 'dirt_path_top', side: 'dirt_path_side', bottom: 'dirt' },

  'water': { all: 'water_still', tint: { all: TINTS.water }, render: TRANSLUCENT, frame: 0 },
  'lava': { all: 'lava_still', frame: 0 },

  'glass': { all: 'glass', render: TRANSLUCENT },
  'tinted_glass': { all: 'tinted_glass', render: TRANSLUCENT },
  'ice': { all: 'ice', render: TRANSLUCENT },
  'frosted_ice': { all: 'frosted_ice_0', render: TRANSLUCENT },
  'slime_block': { all: 'slime_block', render: TRANSLUCENT },
  'honey_block': { all: 'honey_block_side', top: 'honey_block_top', render: TRANSLUCENT },

  'crafting_table': { top: 'crafting_table_top', side: 'crafting_table_side', bottom: 'oak_planks' },
  'furnace': { top: 'furnace_top', side: 'furnace_side', bottom: 'furnace_top' },
  'blast_furnace': { top: 'blast_furnace_top', side: 'blast_furnace_side', bottom: 'blast_furnace_top' },
  'smoker': { top: 'smoker_top', side: 'smoker_side', bottom: 'smoker_bottom' },
  'loom': { top: 'loom_top', side: 'loom_side', bottom: 'oak_planks' },
  'barrel': { top: 'barrel_top', side: 'barrel_side', bottom: 'barrel_bottom' },
  'bookshelf': { top: 'oak_planks', side: 'bookshelf', bottom: 'oak_planks' },
  'jukebox': { top: 'jukebox_top', side: 'jukebox_side', bottom: 'jukebox_side' },
  'note_block': { all: 'note_block' },
  'tnt': { top: 'tnt_top', side: 'tnt_side', bottom: 'tnt_bottom' },
  'piston': { top: 'piston_top', side: 'piston_side', bottom: 'piston_bottom' },
  'sticky_piston': { top: 'piston_top_sticky', side: 'piston_side', bottom: 'piston_bottom' },
  'observer': { top: 'observer_top', side: 'observer_side', bottom: 'observer_back' },
  'hay_block': { top: 'hay_block_top', side: 'hay_block_side', bottom: 'hay_block_top' },
  'bone_block': { top: 'bone_block_top', side: 'bone_block_side', bottom: 'bone_block_top' },
  'target': { top: 'target_top', side: 'target_side', bottom: 'target_top' },
  'lodestone': { top: 'lodestone_top', side: 'lodestone_side', bottom: 'lodestone_top' },
  'redstone_lamp': { all: 'redstone_lamp' },
  'glowstone': { all: 'glowstone' },
  'sea_lantern': { all: 'sea_lantern' },
  'shroomlight': { all: 'shroomlight' },
  'magma_block': { all: 'magma', frame: 0 },
  'torch': { all: 'torch', render: CUTOUT },
  'soul_torch': { all: 'soul_torch', render: CUTOUT },
  'lantern': { all: 'lantern', render: CUTOUT },
  'soul_lantern': { all: 'soul_lantern', render: CUTOUT },
  'ladder': { all: 'ladder', render: CUTOUT },
  'scaffolding': { top: 'scaffolding_top', side: 'scaffolding_side', bottom: 'scaffolding_bottom', render: CUTOUT },
  'iron_bars': { all: 'iron_bars', render: CUTOUT },

  // The chest is an entity model with its own texture sheet, so the block
  // folder has nothing for it. Its planks read correctly at board scale.
  'chest': { all: 'oak_planks' },
  'trapped_chest': { all: 'oak_planks' },
  'ender_chest': { all: 'obsidian' },

  'sandstone': { top: 'sandstone_top', side: 'sandstone', bottom: 'sandstone_bottom' },
  'red_sandstone': { top: 'red_sandstone_top', side: 'red_sandstone', bottom: 'red_sandstone_bottom' },
  'smooth_sandstone': { all: 'sandstone_top' },
  'smooth_red_sandstone': { all: 'red_sandstone_top' },
  'smooth_stone': { all: 'smooth_stone' },
  'quartz_block': { top: 'quartz_block_top', side: 'quartz_block_side', bottom: 'quartz_block_bottom' },
  'smooth_quartz': { all: 'quartz_block_bottom' },
  // Packs disagree about the pillar side textures: the modern name is
  // `quartz_pillar`, older ones (Pixel Perfection included) keep
  // `quartz_pillar_side`. Candidates are tried in order.
  'quartz_pillar': { top: 'quartz_pillar_top', side: ['quartz_pillar', 'quartz_pillar_side'] },
  'purpur_pillar': { top: 'purpur_pillar_top', side: ['purpur_pillar', 'purpur_pillar_side'] },
  'basalt': { top: 'basalt_top', side: 'basalt_side' },
  'polished_basalt': { top: 'polished_basalt_top', side: 'polished_basalt_side' },
  'deepslate': { top: 'deepslate_top', side: 'deepslate' },
  'muddy_mangrove_roots': { top: 'muddy_mangrove_roots_top', side: 'muddy_mangrove_roots_side' },
  'melon': { top: 'melon_top', side: 'melon_side' },
  'pumpkin': { top: 'pumpkin_top', side: 'pumpkin_side' },
  'carved_pumpkin': { top: 'pumpkin_top', side: 'carved_pumpkin' },
  'jack_o_lantern': { top: 'pumpkin_top', side: 'jack_o_lantern' },
  'mushroom_stem': { all: 'mushroom_stem' },
  'nether_wart_block': { all: 'nether_wart_block' },
  'warped_wart_block': { all: 'warped_wart_block' },
  'ancient_debris': { top: 'ancient_debris_top', side: 'ancient_debris_side' },
  'sponge': { all: 'sponge' },
  'wet_sponge': { all: 'wet_sponge' },
  'dried_kelp_block': { top: 'dried_kelp_top', side: 'dried_kelp_side', bottom: 'dried_kelp_bottom' },
  'sculk_catalyst': { top: 'sculk_catalyst_top', side: 'sculk_catalyst_side', bottom: 'sculk_catalyst_bottom' },
  'bedrock': { all: 'bedrock' },

  // Plants are one texture crossed over itself, so `all` is the whole model.
  // The greyscale ones are tinted by the biome in game and are given the same
  // tint here; the rest carry their own colour.
  'short_grass': { all: ['short_grass', 'grass'], tint: { all: TINTS.grass }, render: CUTOUT },
  'grass': { all: ['short_grass', 'grass'], tint: { all: TINTS.grass }, render: CUTOUT },
  'fern': { all: 'fern', tint: { all: TINTS.grass }, render: CUTOUT },
  'dead_bush': { all: 'dead_bush', render: CUTOUT },
  'seagrass': { all: 'seagrass', tint: { all: TINTS.grass }, render: CUTOUT, frame: 0 },
  'sugar_cane': { all: 'sugar_cane', tint: { all: TINTS.grass }, render: CUTOUT },
  'cobweb': { all: 'cobweb', render: CUTOUT },
  'vine': { all: 'vine', tint: { all: TINTS.foliage }, render: CUTOUT },
  'lily_pad': { all: 'lily_pad', tint: { all: TINTS.foliage }, render: CUTOUT },
  'sweet_berry_bush': { all: 'sweet_berry_bush_stage3', render: CUTOUT },

  // The plants the game colours itself. A pack that paints them in keeps its
  // own colours: the tint is only applied to a texture left greyscale for the
  // game to tint, which is what these are in most packs.
  'bush': { all: 'bush', tint: { all: TINTS.foliage }, render: CUTOUT },
  'leaf_litter': { all: 'leaf_litter', tint: { all: TINTS.dryFoliage }, render: CUTOUT },
  'short_dry_grass': { all: 'short_dry_grass', tint: { all: TINTS.dryFoliage }, render: CUTOUT },
  'tall_dry_grass': { all: 'tall_dry_grass', tint: { all: TINTS.dryFoliage }, render: CUTOUT },
  'tall_seagrass': { all: 'tall_seagrass_bottom', tint: { all: TINTS.grass }, render: CUTOUT },
  'tall_seagrass[half=upper]': {
    all: 'tall_seagrass_top',
    tint: { all: TINTS.grass },
    render: CUTOUT
  },
  'nether_wart': { all: 'nether_wart_stage2', render: CUTOUT },
  'wheat': { all: ['wheat_stage7', 'wheat_stage_full_5', 'wheat_stage6'], render: CUTOUT },
  'carrots': { all: 'carrots_stage3', render: CUTOUT },
  'potatoes': { all: 'potatoes_stage3', render: CUTOUT },
  'beetroots': { all: 'beetroots_stage3', render: CUTOUT },
  'brown_mushroom': { all: 'brown_mushroom', render: CUTOUT },
  'red_mushroom': { all: 'red_mushroom', render: CUTOUT },
  'crimson_fungus': { all: 'crimson_fungus', render: CUTOUT },
  'warped_fungus': { all: 'warped_fungus', render: CUTOUT },
  'crimson_roots': { all: 'crimson_roots', render: CUTOUT },
  'warped_roots': { all: 'warped_roots', render: CUTOUT },
  'bamboo': { all: 'bamboo_stalk', render: CUTOUT },
  'glow_lichen': { all: 'glow_lichen', render: CUTOUT },
  'hanging_roots': { all: 'hanging_roots', render: CUTOUT },
  'spore_blossom': { all: 'spore_blossom', render: CUTOUT },

  // The two-block plants are a different texture top and bottom, which the
  // runtime picks by the `half` the block carries.
  'tall_grass[half=upper]': { all: 'tall_grass_top', tint: { all: TINTS.grass }, render: CUTOUT },
  'tall_grass': { all: 'tall_grass_bottom', tint: { all: TINTS.grass }, render: CUTOUT },
  'large_fern[half=upper]': { all: 'large_fern_top', tint: { all: TINTS.grass }, render: CUTOUT },
  'large_fern': { all: 'large_fern_bottom', tint: { all: TINTS.grass }, render: CUTOUT },
  'sunflower[half=upper]': { all: 'sunflower_front', render: CUTOUT },
  'sunflower': { all: 'sunflower_bottom', render: CUTOUT },
  'lilac[half=upper]': { all: 'lilac_top', render: CUTOUT },
  'lilac': { all: 'lilac_bottom', render: CUTOUT },
  'rose_bush[half=upper]': { all: 'rose_bush_top', render: CUTOUT },
  'rose_bush': { all: 'rose_bush_bottom', render: CUTOUT },
  'peony[half=upper]': { all: 'peony_top', render: CUTOUT },
  'peony': { all: 'peony_bottom', render: CUTOUT },
  'pitcher_plant[half=upper]': { all: ['pitcher_plant_top', 'pitcher_crop_top'], render: CUTOUT },
  'pitcher_plant': { all: ['pitcher_plant_bottom', 'pitcher_crop_bottom'], render: CUTOUT },

  // Redstone dust is drawn flat on the ground, so the crossing piece is the
  // one that reads at board scale. It is greyscale in the pack and coloured by
  // how much power it carries; unpowered red is what a plot mostly shows.
  'redstone_wire': { all: ['redstone_dust_dot', 'redstone_dust_line0'], tint: { all: 0xac0000 }, render: CUTOUT },
  'end_rod': { all: 'end_rod', render: CUTOUT },
  'lightning_rod': { all: 'lightning_rod', render: CUTOUT },
  'chain': { all: ['chain', 'chain_side'], render: CUTOUT },
  'flower_pot': { all: 'flower_pot', render: CUTOUT },

  // The workshop and the odds and ends a builder decorates with. Most of these
  // are drawn as something other than a cube, and all of them looked like a
  // flat colour until the pack was asked for their textures.
  'cake': { top: 'cake_top', side: 'cake_side', bottom: 'cake_bottom' },
  'cauldron': { top: 'cauldron_top', side: 'cauldron_side', bottom: 'cauldron_bottom' },
  'water_cauldron': { top: 'cauldron_top', side: 'cauldron_side', bottom: 'cauldron_bottom' },
  'lava_cauldron': { top: 'cauldron_top', side: 'cauldron_side', bottom: 'cauldron_bottom' },
  'powder_snow_cauldron': { top: 'cauldron_top', side: 'cauldron_side', bottom: 'cauldron_bottom' },
  'anvil': { top: 'anvil_top', side: 'anvil' },
  'chipped_anvil': { top: 'chipped_anvil_top', side: 'anvil' },
  'damaged_anvil': { top: ['damaged_anvil_top', 'chipped_anvil_top'], side: 'anvil' },
  'hopper': { top: 'hopper_top', side: 'hopper_outside', bottom: 'hopper_outside' },
  'lectern': { top: 'lectern_top', side: 'lectern_sides', bottom: 'lectern_base' },
  'stonecutter': { top: 'stonecutter_top', side: 'stonecutter_side', bottom: 'stonecutter_bottom' },
  'grindstone': { all: 'grindstone_side' },
  'bell': { top: 'bell_top', side: 'bell_side', bottom: 'bell_bottom' },
  'brewing_stand': { all: 'brewing_stand', bottom: 'brewing_stand_base', render: CUTOUT },
  'enchanting_table': {
    top: 'enchanting_table_top',
    side: 'enchanting_table_side',
    bottom: 'enchanting_table_bottom'
  },
  'daylight_detector': { top: 'daylight_detector_top', side: 'daylight_detector_side' },
  'daylight_detector[inverted=true]': {
    top: ['daylight_detector_inverted_top', 'daylight_detector_top'],
    side: 'daylight_detector_side'
  },
  'repeater': { all: 'repeater', render: CUTOUT },
  'comparator': { all: 'comparator', render: CUTOUT },
  'dragon_egg': { all: 'dragon_egg' },
  'big_dripleaf': { top: 'big_dripleaf_top', side: 'big_dripleaf_side', render: CUTOUT },
  'big_dripleaf_stem': { all: 'big_dripleaf_stem', render: CUTOUT },
  'sea_pickle': { all: 'sea_pickle', render: CUTOUT },
  'amethyst_cluster': { all: 'amethyst_cluster', render: CUTOUT },
  'large_amethyst_bud': { all: 'large_amethyst_bud', render: CUTOUT },
  'medium_amethyst_bud': { all: 'medium_amethyst_bud', render: CUTOUT },
  'small_amethyst_bud': { all: 'small_amethyst_bud', render: CUTOUT },
  'campfire': { all: 'campfire_log', top: 'campfire_fire', render: CUTOUT },
  'soul_campfire': { all: 'soul_campfire_log', top: 'soul_campfire_fire', render: CUTOUT },
  'lever': { all: 'lever', render: CUTOUT },
  'tripwire_hook': { all: 'tripwire_hook', render: CUTOUT },
  'turtle_egg': { all: 'turtle_egg', render: CUTOUT },
  'piston_head': { top: 'piston_top', side: 'piston_side', bottom: 'piston_inner' },
  'redstone_torch': { all: 'redstone_torch', render: CUTOUT },
  'redstone_wall_torch': { all: 'redstone_torch', render: CUTOUT },
  'redstone_torch[lit=false]': { all: 'redstone_torch_off', render: CUTOUT },
  'beacon': { all: 'beacon', render: TRANSLUCENT },
  'sculk_vein': { all: 'sculk_vein', render: CUTOUT },
  // Named after what they weigh rather than what they are made of, so the walk
  // back from `_pressure_plate` finds nothing.
  'light_weighted_pressure_plate': { all: 'gold_block' },
  'heavy_weighted_pressure_plate': { all: 'iron_block' },
  'item_frame': { all: 'item_frame', render: CUTOUT },
  'glow_item_frame': { all: 'glow_item_frame', render: CUTOUT }
}

/**
 * Faces cut out of the entity sheets.
 *
 * Chests, signs and mob heads are drawn by the game as entities, not as blocks,
 * so the block folder has nothing for them and they fell back to a flat colour.
 * Their sheets carry every face of one model at once, laid out for it: the
 * rectangles below are where each face sits, written against the sheet size the
 * game ships at.
 */
const CHEST_SHEET = { sheet: 64 }
const chest = (file) => ({
  // Lid from above, the front with its lock down the side, and the base.
  top: { ...CHEST_SHEET, from: `entity/chest/${file}`, rect: [14, 0, 14, 14] },
  side: {
    ...CHEST_SHEET,
    from: `entity/chest/${file}`,
    stack: [
      [42, 14, 14, 5],
      [42, 33, 14, 10]
    ]
  },
  bottom: { ...CHEST_SHEET, from: `entity/chest/${file}`, rect: [28, 19, 14, 14] }
})

/**
 * A mob's head, off the front of its skin.
 *
 * Every humanoid skin keeps the head in the same place: the crown at (8,0), the
 * face at (8,8) and the underside at (16,0). `patch` overrides that for the
 * mobs whose texture is not a skin at all.
 */
const head = (file, sheet = 64, patch = null) => ({
  top: { sheet, from: `entity/${file}`, rect: patch ?? [8, 0, 8, 8] },
  side: { sheet, from: `entity/${file}`, rect: patch ?? [8, 8, 8, 8] },
  bottom: { sheet, from: `entity/${file}`, rect: patch ?? [16, 0, 8, 8] }
})

/** The board of a sign, off the front of its sheet. */
const signFace = (wood) => ({
  all: { sheet: 64, from: `entity/signs/${wood}`, rect: [2, 2, 24, 12] }
})

/** The rails, each one flat texture, and each one cut out. */
const RAILS = ['rail', 'powered_rail', 'detector_rail', 'activator_rail']

/** The one-block flowers, every one of them a single texture crossed over. */
const FLOWERS = [
  'dandelion', 'poppy', 'blue_orchid', 'allium', 'azure_bluet', 'oxeye_daisy',
  'cornflower', 'lily_of_the_valley', 'wither_rose', 'torchflower',
  'red_tulip', 'orange_tulip', 'white_tulip', 'pink_tulip'
]

/** Blocks with no override that are simply one texture on every face. */
const SIMPLE = [
  'stone', 'cobblestone', 'mossy_cobblestone', 'andesite', 'polished_andesite',
  'diorite', 'polished_diorite', 'granite', 'polished_granite', 'tuff',
  'polished_tuff', 'chiseled_tuff', 'tuff_bricks', 'calcite', 'dripstone_block',
  'cobbled_deepslate', 'polished_deepslate', 'deepslate_bricks',
  'deepslate_tiles', 'chiseled_deepslate', 'cracked_deepslate_bricks',
  'dirt', 'coarse_dirt', 'rooted_dirt', 'mud', 'packed_mud', 'mud_bricks',
  'moss_block', 'sand', 'red_sand', 'gravel', 'clay', 'obsidian',
  'crying_obsidian', 'netherrack', 'soul_sand', 'soul_soil', 'blackstone',
  'polished_blackstone', 'polished_blackstone_bricks', 'gilded_blackstone',
  'end_stone', 'end_stone_bricks', 'purpur_block', 'prismarine',
  'prismarine_bricks', 'dark_prismarine', 'chiseled_sandstone',
  'cut_sandstone', 'chiseled_red_sandstone', 'cut_red_sandstone',
  'cinnabar', 'cinnabar_bricks', 'polished_cinnabar', 'chiseled_cinnabar',
  'resin_block', 'resin_bricks', 'chiseled_resin_bricks', 'resin_clump',
  'chiseled_stone_bricks', 'cracked_stone_bricks', 'mossy_stone_bricks',
  'stone_bricks', 'bricks', 'nether_bricks', 'red_nether_bricks',
  'cracked_nether_bricks', 'chiseled_nether_bricks', 'chiseled_quartz_block',
  'quartz_bricks', 'amethyst_block', 'budding_amethyst', 'sculk',

  'packed_ice', 'blue_ice',

  'coal_ore', 'deepslate_coal_ore', 'iron_ore', 'deepslate_iron_ore',
  'copper_ore', 'deepslate_copper_ore', 'gold_ore', 'deepslate_gold_ore',
  'redstone_ore', 'deepslate_redstone_ore', 'lapis_ore', 'deepslate_lapis_ore',
  'diamond_ore', 'deepslate_diamond_ore', 'emerald_ore',
  'deepslate_emerald_ore', 'nether_quartz_ore', 'nether_gold_ore',

  'coal_block', 'iron_block', 'gold_block', 'diamond_block', 'emerald_block',
  'lapis_block', 'redstone_block', 'netherite_block', 'copper_block',
  'exposed_copper', 'weathered_copper', 'oxidized_copper', 'cut_copper',
  'exposed_cut_copper', 'weathered_cut_copper', 'oxidized_cut_copper',
  'raw_iron_block', 'raw_copper_block', 'raw_gold_block'
]

/** Leaf tints, where the game uses a fixed colour instead of the biome's. */
const LEAF_TINTS = {
  spruce: TINTS.spruce,
  birch: TINTS.birch,
  cherry: null
}

/**
 * The full block list, as `minecraft:` ids mapped to a face spec.
 *
 * A spec is `{ top, side, bottom, tint, render, frame }`; `all` sets the three
 * faces at once and any of them may be overridden individually.
 */
export function blockSpecs() {
  const specs = {}
  const add = (id, spec) => {
    specs[`minecraft:${id}`] = spec
  }

  for (const id of SIMPLE) add(id, { all: id })
  for (const [id, spec] of Object.entries(OVERRIDES)) add(id, spec)
  for (const flower of FLOWERS) add(flower, { all: flower, render: CUTOUT })
  for (const rail of RAILS) add(rail, { all: rail, render: CUTOUT })

  for (const wood of WOODS) {
    add(`${wood}_sapling`, { all: `${wood}_sapling`, render: CUTOUT })
    // Doors and trapdoors have textures of their own; without these they fall
    // back to the planks they are made of and lose their panelling.
    add(`${wood}_door[half=upper]`, { all: `${wood}_door_top`, render: CUTOUT })
    add(`${wood}_door`, { all: `${wood}_door_bottom`, render: CUTOUT })
    add(`${wood}_trapdoor`, { all: `${wood}_trapdoor`, render: CUTOUT })
  }
  add('iron_door[half=upper]', { all: 'iron_door_top', render: CUTOUT })
  add('iron_door', { all: 'iron_door_bottom', render: CUTOUT })
  add('iron_trapdoor', { all: 'iron_trapdoor', render: CUTOUT })
  add('bamboo_door[half=upper]', { all: 'bamboo_door_top', render: CUTOUT })
  add('bamboo_door', { all: 'bamboo_door_bottom', render: CUTOUT })
  add('bamboo_trapdoor', { all: 'bamboo_trapdoor', render: CUTOUT })

  for (const dye of DYES) {
    add(`${dye}_bed`, { all: `${dye}_bed` })
    add(`${dye}_candle`, { all: 'candle', render: CUTOUT })
  }
  add('candle', { all: 'candle', render: CUTOUT })

  // The entity-drawn blocks, cut out of the sheets their models are painted on.
  for (const [id, file] of [
    ['chest', 'normal'],
    ['trapped_chest', 'trapped'],
    ['ender_chest', 'ender']
  ]) {
    add(id, chest(file))
  }

  for (const [id, file, sheet, patch] of [
    ['creeper_head', 'creeper/creeper', 64],
    ['zombie_head', 'zombie/zombie', 64],
    ['skeleton_skull', 'skeleton/skeleton', 64],
    ['wither_skeleton_skull', 'skeleton/wither_skeleton', 64],
    ['piglin_head', 'piglin/piglin', 64],
    ['player_head', 'player/wide/steve', 64],
    // The dragon is not a humanoid skin, so its head is not where a skin keeps
    // one; a patch of its own scales is what reads as a dragon at this size.
    ['dragon_head', 'enderdragon/dragon', 256, [16, 16, 16, 16]]
  ]) {
    add(id, head(file, sheet, patch))
    add(id.replace(/_(head|skull)$/, '_wall_$1'), head(file, sheet, patch))
  }

  for (const wood of [...WOODS, 'crimson', 'warped', 'bamboo']) {
    add(`${wood}_sign`, signFace(wood))
    add(`${wood}_wall_sign`, signFace(wood))
    add(`${wood}_hanging_sign`, signFace(wood))
  }

  // A banner is a sheet of cloth, so the wool of its colour reads better than
  // the pattern sheets the game layers to draw one.
  for (const dye of DYES) {
    add(`${dye}_banner`, { all: `${dye}_wool` })
    add(`${dye}_wall_banner`, { all: `${dye}_wool` })
  }

  add('conduit', { all: { sheet: 32, from: 'entity/conduit/base', rect: [0, 0, 12, 12] } })
  // The pot's own sheet carries its body twice over, without a face for the
  // top; the body reads as terracotta whichever way round it is seen.
  add('decorated_pot', {
    all: { sheet: 32, from: 'entity/decorated_pot/decorated_pot_base', rect: [1, 13, 14, 14] }
  })

  // A pot with something growing out of it is a pot: the plant is drawn by the
  // game on top of the block, and the board has no room for it at this size.
  for (const plant of [...FLOWERS, 'dead_bush', 'cactus', 'bamboo', 'fern', 'red_mushroom', 'brown_mushroom']) {
    add(`potted_${plant}`, { all: 'flower_pot', render: CUTOUT })
  }
  for (const wood of WOODS) add(`potted_${wood}_sapling`, { all: 'flower_pot', render: CUTOUT })

  for (const wood of WOODS) {
    add(`${wood}_planks`, { all: `${wood}_planks` })
    add(`${wood}_log`, { top: `${wood}_log_top`, side: `${wood}_log` })
    add(`stripped_${wood}_log`, {
      top: `stripped_${wood}_log_top`,
      side: `stripped_${wood}_log`
    })
    add(`${wood}_wood`, { all: `${wood}_log` })
    add(`stripped_${wood}_wood`, { all: `stripped_${wood}_log` })
    add(`${wood}_leaves`, {
      all: `${wood}_leaves`,
      render: CUTOUT,
      tint: { all: LEAF_TINTS[wood] === undefined ? TINTS.foliage : LEAF_TINTS[wood] }
    })
  }

  // The nether woods are stems and hyphae, and their leaves do not exist.
  for (const [wood, stem] of [
    ['crimson', 'crimson_stem'],
    ['warped', 'warped_stem']
  ]) {
    add(`${wood}_planks`, { all: `${wood}_planks` })
    add(`${wood}_stem`, { top: `${stem}_top`, side: stem })
    add(`stripped_${wood}_stem`, {
      top: `stripped_${stem}_top`,
      side: `stripped_${stem}`
    })
    add(`${wood}_hyphae`, { all: stem })
  }

  add('bamboo_planks', { all: 'bamboo_planks' })
  add('bamboo_mosaic', { all: 'bamboo_mosaic' })
  add('bamboo_block', { top: 'bamboo_block_top', side: 'bamboo_block' })
  add('azalea_leaves', { all: 'azalea_leaves', render: CUTOUT })
  add('flowering_azalea_leaves', { all: 'flowering_azalea_leaves', render: CUTOUT })

  for (const dye of DYES) {
    add(`${dye}_wool`, { all: `${dye}_wool` })
    add(`${dye}_carpet`, { all: `${dye}_wool` })
    add(`${dye}_concrete`, { all: `${dye}_concrete` })
    add(`${dye}_concrete_powder`, { all: `${dye}_concrete_powder` })
    add(`${dye}_terracotta`, { all: `${dye}_terracotta` })
    add(`${dye}_stained_glass`, { all: `${dye}_stained_glass`, render: TRANSLUCENT })
    add(`${dye}_glazed_terracotta`, { all: `${dye}_glazed_terracotta` })
  }
  add('terracotta', { all: 'terracotta' })

  return specs
}

/**
 * Resolves a spec to the texture name of each face slot. A slot may carry a
 * list of candidates, in which case the first the pack actually has is used.
 */
export function facesOf(spec) {
  return {
    top: spec.top ?? spec.all,
    // A block given only a top and a side is a pillar (logs, basalt, melons);
    // the face at the far end of it is the same as the near one.
    bottom: spec.bottom ?? spec.all ?? spec.top ?? spec.side,
    side: spec.side ?? spec.all
  }
}

/** Resolves a spec to a tint per face slot, or 0 where the face is untinted. */
export function tintsOf(spec) {
  const tint = spec.tint ?? {}
  const pick = (slot) => tint[slot] ?? tint.all ?? 0
  return { top: pick('top'), bottom: pick('bottom'), side: pick('side') }
}
