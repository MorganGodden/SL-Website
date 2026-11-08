#!/usr/bin/env node
/* eslint-env node */
/**
 * Bakes a Minecraft resource pack's flat item textures into the icon sheet the
 * Collection Log draws with, plus the table of which tile each item is.
 *
 *   npm run build:item-icons -- <pack.zip>
 *
 * Only `textures/item/`: an item that is a block in the hand - stone, planks,
 * stairs - takes its icon from the block atlas at runtime instead, which
 * already holds every block face. Run rarely, from the same pack as the block
 * atlas; both outputs are committed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Bitmap, decodePng, encodePng } from './lib/png.mjs'
import { readZip } from './lib/zip.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SHEET_PATH = join(ROOT, 'src/assets/textures/items.png')
const TABLE_PATH = join(ROOT, 'src/plots/itemIcons.generated.ts')
const TEXTURES_DIR = 'assets/minecraft/textures/'
const ITEM_DIR = `${TEXTURES_DIR}item/`
const TILE = 16
const COLUMNS = 32

/** The colour the game gives an item with nothing on it to say otherwise. */
const WATER = 0x385dc6
const LEATHER = 0xa06540

/** Items whose icon is a texture of another name: one frame of an animated dial, or a shared picture. */
const ALIASES = {
  clock: 'clock_00',
  compass: 'compass_16',
  recovery_compass: 'recovery_compass_16',
  crossbow: 'crossbow_standby'
}

/**
 * Items the game draws from layers, bottom first. A layer given with a colour
 * is greyscale in the pack and tinted as the game tints an undyed, plain one.
 */
const LAYERED = {
  potion: [['potion_overlay', WATER], 'potion'],
  splash_potion: [['potion_overlay', WATER], 'splash_potion'],
  lingering_potion: [['potion_overlay', WATER], 'lingering_potion'],
  tipped_arrow: [['tipped_arrow_head', WATER], 'tipped_arrow_base'],
  leather_helmet: [['leather_helmet', LEATHER], 'leather_helmet_overlay'],
  leather_chestplate: [['leather_chestplate', LEATHER]],
  leather_leggings: [['leather_leggings', LEATHER], 'leather_leggings_overlay'],
  leather_boots: [['leather_boots', LEATHER], 'leather_boots_overlay'],
  leather_horse_armor: [['leather_horse_armor', LEATHER], 'leather_horse_armor_overlay'],
  firework_star: ['firework_star', ['firework_star_overlay', 0x8a8a8a]],
  filled_map: ['filled_map', ['filled_map_markings', 0x46402e]]
}

const DYES = [
  'white',
  'orange',
  'magenta',
  'light_blue',
  'yellow',
  'lime',
  'pink',
  'gray',
  'light_gray',
  'cyan',
  'purple',
  'blue',
  'brown',
  'green',
  'red',
  'black'
]

/** The top of a shulker's lid, in the 64x64 entity sheet: a 16x12x16 box mapped from (0, 0). */
const SHULKER_LID = [16, 0, 16, 16]

/**
 * Blocks the block atlas has no tile for under their own name, drawn from the
 * face that says what they are. A name with a folder is under `textures/`; one
 * with a `rect` is cut out of an entity sheet, as its piece of a 64px sheet.
 */
const FACES = {
  dispenser: 'block/dispenser_front',
  dropper: 'block/dropper_front',
  cartography_table: 'block/cartography_table_side1',
  calibrated_sculk_sensor: 'block/calibrated_sculk_sensor_top',
  shulker_box: { from: 'entity/shulker/shulker', rect: SHULKER_LID },
  ...Object.fromEntries(
    DYES.map((dye) => [
      `${dye}_shulker_box`,
      { from: `entity/shulker/shulker_${dye}`, rect: SHULKER_LID }
    ])
  )
}

/** A recipe layer, whichever way it was written: a name, [name, tint], or { from, rect }. */
function layerOf(layer) {
  if (typeof layer === 'string') return { from: layer }
  if (Array.isArray(layer)) return { from: layer[0], tint: layer[1] }
  return layer
}

function main() {
  const source = process.argv[2]
  if (!source) {
    console.error('usage: build-item-icons <pack.zip>')
    process.exit(1)
  }
  const zip = readZip(readFileSync(resolve(source)))
  const path = (name) =>
    name.includes('/') ? `${TEXTURES_DIR}${name}.png` : `${ITEM_DIR}${name}.png`
  const has = (name) => zip.has(path(name))

  // Every item texture is an icon under its own name, bar the frames of the
  // animated dials and the spawn eggs no one can collect; aliases and layered
  // items are laid over that, and only when the pack has all their parts.
  const recipes = {}
  for (const entry of zip.names()) {
    const name = entry.slice(ITEM_DIR.length, -'.png'.length)
    if (!entry.startsWith(ITEM_DIR) || !entry.endsWith('.png') || name.includes('/')) continue
    if (/^(clock|compass|recovery_compass)_\d+$/.test(name) || name.endsWith('_spawn_egg')) continue
    recipes[name] = [name]
  }
  for (const [id, texture] of Object.entries(ALIASES)) {
    if (has(texture)) recipes[id] = [texture]
  }
  for (const [id, layers] of Object.entries({
    ...LAYERED,
    ...Object.fromEntries(Object.entries(FACES).map(([id, face]) => [id, [face]]))
  })) {
    if (layers.every((layer) => has(layerOf(layer).from))) recipes[id] = layers
  }

  const ids = Object.keys(recipes).sort()
  const rows = Math.ceil(ids.length / COLUMNS)
  const sheet = new Bitmap(COLUMNS * TILE, rows * TILE)
  const table = {}
  ids.forEach((id, tile) => {
    const icon = new Bitmap(TILE, TILE)
    for (const layer of recipes[id]) {
      const { from, tint, rect } = layerOf(layer)
      let image = decodePng(zip.read(path(from)))
      if (rect) {
        const scale = image.width / 64
        image = image.crop(...rect.map((n) => n * scale))
      }
      over(icon, fit(image), tint)
    }
    const x0 = (tile % COLUMNS) * TILE
    const y0 = Math.floor(tile / COLUMNS) * TILE
    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) sheet.set(x0 + x, y0 + y, icon.pixel(x, y))
    }
    table[id] = tile
  })

  mkdirSync(dirname(SHEET_PATH), { recursive: true })
  writeFileSync(SHEET_PATH, encodePng(sheet))
  writeFileSync(TABLE_PATH, generateTable(table, rows))
  console.log(
    `items  ${sheet.width}x${sheet.height}, ${ids.length} icons -> ${SHEET_PATH.slice(ROOT.length + 1)}`
  )
}

/** Frame 0 of an animation, brought to one tile by nearest sampling. */
function fit(image) {
  const side = image.width
  const frame = image.height > side ? image.crop(0, 0, side, side) : image
  if (frame.width === TILE && frame.height === TILE) return frame
  const out = new Bitmap(TILE, TILE)
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      out.set(
        x,
        y,
        frame.pixel(Math.floor((x * frame.width) / TILE), Math.floor((y * frame.height) / TILE))
      )
    }
  }
  return out
}

/** Paints `layer` over `base`, multiplied by `tint` when there is one. */
function over(base, layer, tint) {
  const t =
    tint === undefined
      ? [1, 1, 1]
      : [(tint >> 16) & 0xff, (tint >> 8) & 0xff, tint & 0xff].map((c) => c / 255)
  for (let i = 0; i < base.data.length; i += 4) {
    const a = layer.data[i + 3] / 255
    if (a === 0) continue
    for (let c = 0; c < 3; c++) {
      base.data[i + c] = Math.round(layer.data[i + c] * t[c] * a + base.data[i + c] * (1 - a))
    }
    base.data[i + 3] = Math.round(255 * (a + (base.data[i + 3] / 255) * (1 - a)))
  }
}

function generateTable(table, rows) {
  const entries = Object.entries(table)
    .map(([id, tile]) => `  ${JSON.stringify(id)}: ${tile}`)
    .join(',\n')
  return `/**
 * GENERATED FILE - do not edit.
 *
 * Written by \`npm run build:item-icons\` from a Minecraft resource pack; see
 * that script and src/assets/textures/CREDITS.md. Regenerate rather than patch.
 */

/** Size of one icon in the sheet, in pixels. The sheet has no padding. */
export const ITEM_ICON_TILE = ${TILE}
export const ITEM_ICON_COLUMNS = ${COLUMNS}
export const ITEM_ICON_ROWS = ${rows}

/** Item id, without \`minecraft:\`, to its tile in items.png. */
export const ITEM_ICONS: Record<string, number> = {
${entries}
}
`
}

main()
