#!/usr/bin/env node
/* eslint-env node */
/**
 * Bakes the Season 1 gate's background: a patch of grass, sparsely covered in
 * petals, leaf litter and wildflowers, that tiles without a seam.
 *
 *   npm run build:gate-grass
 *
 * Built from blocks.png and its table, so run it again after the atlas is
 * rebuilt. Seeded: the same knobs always give the same picture. The output is
 * committed.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Bitmap, decodePng, encodePng } from './lib/png.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ATLAS_PATH = join(ROOT, 'src/assets/textures/blocks.png')
const TABLE_PATH = join(ROOT, 'src/plots/blockAtlas.generated.ts')
const OUT_PATH = join(ROOT, 'src/assets/textures/gate-grass.png')

/** Blocks across and down. The gate's CSS scales the patch to match. */
const SIZE = 32
/** The grass's average colour. The texture keeps its light and dark, in this green. */
const GRASS = 0x5e9c3e
/** What lies on the grass, and the share of blocks each one covers. */
const COVERINGS = [
  ['pink_petals', 0.04],
  ['leaf_litter', 0.02],
  ['blue_wildflowers', 0.01]
]
const SEED = 1

const table = readFileSync(TABLE_PATH, 'utf8')
const constant = (name) => Number(new RegExp(`export const ${name} = (\\d+)`).exec(table)[1])
const [CELL, PADDING, COLUMNS, TILE] = [
  'ATLAS_CELL',
  'ATLAS_PADDING',
  'ATLAS_COLUMNS',
  'ATLAS_TILE'
].map(constant)
const atlas = decodePng(readFileSync(ATLAS_PATH))

/** A block's top face, cut out of the atlas. */
function top(block) {
  const match = new RegExp(`'minecraft:${block}': \\[(\\d+)`).exec(table)
  if (!match) throw new Error(`${block} is not in the atlas table`)
  const index = Number(match[1])
  return atlas.crop(
    (index % COLUMNS) * CELL + PADDING,
    Math.floor(index / COLUMNS) * CELL + PADDING,
    TILE,
    TILE
  )
}

/** The same face turned a quarter `turns` times, as the game turns grass and flowerbeds. */
function turned(tile, turns) {
  const out = new Bitmap(TILE, TILE)
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      let [sx, sy] = [x, y]
      for (let i = 0; i < turns; i++) [sx, sy] = [sy, TILE - 1 - sx]
      out.set(x, y, tile.pixel(sx, sy))
    }
  }
  return out
}

/** The grass in GRASS: each pixel's lightness against the tile's average, applied to the colour. */
function recoloured(tile) {
  const light = (p) => 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]
  let total = 0
  for (let i = 0; i < TILE * TILE; i++) total += light(tile.data.subarray(i * 4))
  const average = total / (TILE * TILE)
  const rgb = [GRASS >> 16, (GRASS >> 8) & 0xff, GRASS & 0xff]
  const out = new Bitmap(TILE, TILE)
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const k = light(tile.pixel(x, y)) / average
      out.set(x, y, [...rgb.map((c) => Math.min(255, Math.round(c * k))), 255])
    }
  }
  return out
}

/** mulberry32: small, seeded, and plenty random for scattering petals. */
function random(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = random(SEED)
const grass = recoloured(top('grass_block'))
const coverings = COVERINGS.map(([block, share]) => [top(block), share])
const half = TILE / 2
const patch = new Bitmap(SIZE * TILE, SIZE * TILE)

for (let cy = 0; cy < SIZE; cy++) {
  for (let cx = 0; cx < SIZE; cx++) {
    const ground = turned(grass, Math.floor(rand() * 4))
    let roll = rand()
    const covering = coverings.find(([, share]) => (roll -= share) < 0)?.[0]
    // Like the game's flowerbeds: one to four quarters of the texture, then turned.
    const cover = covering && turned(covering, Math.floor(rand() * 4))
    const quarters = 1 + Math.floor(rand() * 4)

    for (let y = 0; y < TILE; y++) {
      for (let x = 0; x < TILE; x++) {
        const below = ground.pixel(x, y)
        const quarter = [0, 1, 3, 2][(y < half ? 0 : 2) + (x < half ? 0 : 1)]
        const over = cover && quarter < quarters ? cover.pixel(x, y) : null
        const a = over ? over[3] / 255 : 0
        const pixel = [0, 1, 2].map((c) =>
          Math.round((over ? over[c] : 0) * a + below[c] * (1 - a))
        )
        patch.set(cx * TILE + x, cy * TILE + y, [...pixel, 255])
      }
    }
  }
}

writeFileSync(OUT_PATH, encodePng(patch))
console.log(`gate grass ${patch.width}x${patch.height} -> ${OUT_PATH.slice(ROOT.length + 1)}`)
