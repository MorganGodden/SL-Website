import { resolveBlockId } from './blockIds'

/**
 * Block colour lookup.
 *
 * The board draws textured blocks wherever the atlas has a tile for them (see
 * blockAtlas.ts). These colours are what everything else gets: a block no
 * resource pack texture was baked for is drawn flat, in a colour picked to sit
 * sensibly next to its neighbours. They are also what the board falls back to
 * in full if the atlas image ever fails to load.
 *
 * Keyed on the BASE identifier only — `minecraft:stone_slab[type=top]` and
 * `minecraft:stone_slab[type=bottom]` are the same colour, and property order
 * is not guaranteed by the format.
 */
const BLOCK_COLOURS: Record<string, number> = {
  // Terrain
  'minecraft:bedrock': 0x565656,
  'minecraft:stone': 0x8f8f8f,
  'minecraft:cobblestone': 0x9a9a9a,
  'minecraft:deepslate': 0x4c4c50,
  'minecraft:cobbled_deepslate': 0x565659,
  'minecraft:andesite': 0x9c9c9c,
  'minecraft:polished_andesite': 0xa8a8a8,
  'minecraft:diorite': 0xdedede,
  'minecraft:granite': 0xb0796a,
  'minecraft:tuff': 0x6c6f62,
  'minecraft:polished_tuff': 0x7b7e72,
  'minecraft:calcite': 0xe4e4de,
  'minecraft:dirt': 0x86603c,
  'minecraft:coarse_dirt': 0x7b5a39,
  'minecraft:rooted_dirt': 0x91674a,
  'minecraft:grass_block': 0x6a9a3d,
  'minecraft:podzol': 0x5c4020,
  'minecraft:mycelium': 0x6f6265,
  'minecraft:sand': 0xdbd3a0,
  'minecraft:sandstone': 0xd9d0a3,
  'minecraft:red_sand': 0xa95821,
  'minecraft:gravel': 0x8a8686,
  'minecraft:clay': 0xa0a7b4,
  'minecraft:obsidian': 0x14101f,

  // Snow and ice — the season's palette
  'minecraft:snow': 0xf4fafd,
  'minecraft:snow_block': 0xf4fafd,
  'minecraft:powder_snow': 0xf7fcff,
  'minecraft:ice': 0xa5c8f0,
  'minecraft:packed_ice': 0x8fb8e8,
  'minecraft:blue_ice': 0x74a8e6,

  // Liquids
  'minecraft:water': 0x3f6fd8,
  'minecraft:lava': 0xe25822,

  // Ores
  'minecraft:coal_ore': 0x4a4a4a,
  'minecraft:deepslate_coal_ore': 0x3d3d41,
  'minecraft:iron_ore': 0xc4a893,
  'minecraft:deepslate_iron_ore': 0x9a8574,
  'minecraft:copper_ore': 0xc07b46,
  'minecraft:gold_ore': 0xe9c65a,
  'minecraft:deepslate_gold_ore': 0xbfa04a,
  'minecraft:redstone_ore': 0xd04a4a,
  'minecraft:lapis_ore': 0x4a6bbf,
  'minecraft:diamond_ore': 0x5fd6d3,
  'minecraft:deepslate_diamond_ore': 0x4fb3b0,
  'minecraft:emerald_ore': 0x3fbf6a,
  'minecraft:ancient_debris': 0x5c4038,

  // Wood
  'minecraft:oak_log': 0x9a7a4a,
  'minecraft:oak_planks': 0xbc9862,
  'minecraft:birch_log': 0xd8d3c0,
  'minecraft:birch_planks': 0xe0d5a8,
  'minecraft:birch_door': 0xe0d5a8,
  'minecraft:spruce_log': 0x5c4523,
  'minecraft:spruce_planks': 0x81613a,
  'minecraft:dark_oak_planks': 0x4b3418,
  'minecraft:oak_leaves': 0x4a7a2a,
  'minecraft:spruce_leaves': 0x3d5c2e,

  // Built blocks
  'minecraft:bricks': 0x96574a,
  'minecraft:nether_bricks': 0x2e171b,
  'minecraft:red_nether_bricks': 0x62070a,
  'minecraft:stone_bricks': 0x8a8a84,
  'minecraft:glass': 0xd6ecf2,
  'minecraft:glowstone': 0xf2d086,
  'minecraft:sea_lantern': 0xd4e5df,
  'minecraft:torch': 0xf5c542,
  'minecraft:piston': 0xa08a63,
  'minecraft:sticky_piston': 0x8fa063,
  'minecraft:crafting_table': 0x8a5f36,
  'minecraft:furnace': 0x767676,
  'minecraft:chest': 0xa9853f,
  'minecraft:white_wool': 0xeaeef0,
  'minecraft:netherrack': 0x6e3634,
  'minecraft:soul_sand': 0x51392c
}

/**
 * Deterministic muted colour for anything genuinely unmapped.
 *
 * Better than one flat grey: an unmapped block stays visually distinct from its
 * neighbours, so a build made of blocks nobody has mapped is still legible.
 * Saturation and lightness are pinned so a stray block can never come out
 * garish against the snow palette.
 */
function fallbackColour(baseId: string): number {
  let hash = 0
  for (let i = 0; i < baseId.length; i++) {
    hash = (hash * 31 + baseId.charCodeAt(i)) | 0
  }
  const hue = Math.abs(hash) % 360
  return hslToRgb(hue / 360, 0.22, 0.56)
}

function hslToRgb(h: number, s: number, l: number): number {
  const k = (n: number) => (n + h * 12) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const to255 = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255)
  return (to255(f(0)) << 16) | (to255(f(8)) << 8) | to255(f(4))
}

/**
 * Resolves a base id to a mapped colour, following shape suffixes back to the
 * material they are made of. Returns null when nothing matches.
 */
function lookup(baseId: string): number | null {
  const id = resolveBlockId(baseId, (candidate) => BLOCK_COLOURS[candidate] !== undefined)
  return id === null ? null : BLOCK_COLOURS[id]
}

const resolved = new Map<string, number>()

/** Colour for a base block identifier, as 0xRRGGBB. */
export function colourForBlock(baseId: string): number {
  const cached = resolved.get(baseId)
  if (cached !== undefined) return cached

  const colour = lookup(baseId) ?? fallbackColour(baseId)
  resolved.set(baseId, colour)
  return colour
}

/** True when a block resolves to a mapped colour rather than a generated one. */
export function hasMappedColour(baseId: string): boolean {
  return lookup(baseId) !== null
}
