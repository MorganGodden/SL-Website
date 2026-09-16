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

/** Biome tints, as the game applies them to greyscale textures. */
export const TINTS = {
  grass: 0x91bd59,
  foliage: 0x77ab2f,
  spruce: 0x619961,
  birch: 0x80a755,
  water: 0x3f76e4
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
  'bedrock': { all: 'bedrock' }
}

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
