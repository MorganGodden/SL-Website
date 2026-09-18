/**
 * Reading block identifiers and their states.
 *
 * Both the colour map and the texture atlas are keyed on materials, and both
 * have to answer the same question: a plot contains `andesite_slab`, the table
 * knows about `andesite`, which entry should be used? Keeping that answer in
 * one place is what stops the two drifting apart and a block ending up with
 * andesite's colour and something else's texture.
 */

/**
 * Shape suffixes that do not change what a block is made of.
 *
 * Builders use slabs, stairs and walls constantly, and the plugin sends each as
 * its own block id. Without this an `andesite_slab` would get an unrelated
 * generated colour while the `andesite` beside it stayed grey, which looks like
 * a decoding bug rather than a missing map entry.
 */
const SHAPE_SUFFIXES = [
  '_slab',
  '_stairs',
  '_wall',
  '_fence_gate',
  '_fence',
  '_pressure_plate',
  '_button',
  '_trapdoor',
  '_door',
  '_hanging_sign',
  '_wall_sign',
  '_sign',
  '_carpet',
  '_pane',
  '_bars'
]

/** Strips one shape suffix, e.g. `minecraft:andesite_slab` -> `minecraft:andesite`. */
export function stripShapeSuffix(baseId: string): string | null {
  for (const suffix of SHAPE_SUFFIXES) {
    if (baseId.endsWith(suffix)) return baseId.slice(0, -suffix.length)
  }
  return null
}

/**
 * Finds the id a table should be read at for this block, following shape
 * suffixes back to the material they are made of. Returns null when the table
 * has nothing for it.
 *
 * `has` is the table's own membership test, so the same walk serves any table
 * keyed on block ids.
 */
export function resolveBlockId(baseId: string, has: (id: string) => boolean): string | null {
  if (has(baseId)) return baseId

  const material = stripShapeSuffix(baseId)
  if (material === null) return null

  // `andesite_slab` -> `andesite`
  if (has(material)) return material

  // `birch_door` -> `birch` -> `birch_planks`
  const planks = `${material}_planks`
  if (has(planks)) return planks

  // `copper_slab` -> `copper` -> `copper_block`
  const block = `${material}_block`
  if (has(block)) return block

  // `stone_brick_stairs` -> `stone_brick` -> `stone_bricks`. Every brick family
  // in the game is named in the plural as a block and the singular as a shape,
  // so without this none of them find their own texture.
  const plural = `${material}s`
  if (has(plural)) return plural

  return null
}

/**
 * Reads one block state property out of a palette entry, e.g. `axis` from
 * `minecraft:oak_log[axis=x]`. Returns null when the entry does not carry it.
 *
 * Property order is explicitly not guaranteed by the snapshot format, so this
 * searches for the name rather than assuming a position.
 */
export function blockProperty(paletteEntry: string, name: string): string | null {
  const open = paletteEntry.indexOf('[')
  if (open === -1) return null

  const properties = paletteEntry.slice(open + 1, paletteEntry.lastIndexOf(']'))
  for (const property of properties.split(',')) {
    const equals = property.indexOf('=')
    if (equals === -1) continue
    if (property.slice(0, equals).trim() === name) return property.slice(equals + 1).trim()
  }
  return null
}
