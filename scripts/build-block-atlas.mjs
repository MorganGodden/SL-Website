#!/usr/bin/env node
/* eslint-env node */
/**
 * Bakes a Minecraft resource pack into the block atlas the plot renderer draws
 * with, plus the lookup table that says which tile each block's faces use.
 *
 *   npm run build:block-atlas -- <pack.zip | pack directory>
 *
 * Run rarely — only when the pack changes or a block is added to the spec — so
 * both outputs are committed. The pack itself is not: it is 34MB, and only the
 * few hundred tiles the board can actually draw end up in the atlas.
 *
 * Tiles are padded by replicating their edge pixels, which is what keeps one
 * block's texture from bleeding into its neighbour's when the GPU samples a
 * mip level of the atlas.
 */
import { readFileSync, writeFileSync, existsSync, statSync, readdirSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Bitmap, decodePng, encodePng } from './lib/png.mjs'
import { readZip } from './lib/zip.mjs'
import { blockSpecs, facesOf, tintsOf } from './lib/blockTextures.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ATLAS_PATH = join(ROOT, 'src/assets/textures/blocks.png')
const TABLE_PATH = join(ROOT, 'src/plots/blockAtlas.generated.ts')
const TEXTURE_DIR = 'assets/minecraft/textures/block'

/** Every tile is a 16x16 block face, whatever resolution the pack ships. */
const TILE = 16
/**
 * Transparent margin around each tile, filled by repeating its edge pixels.
 *
 * Half a tile, which keeps neighbouring tiles apart for the first four mip
 * levels — far past the point where a block is a single pixel on screen.
 */
const PADDING = 8
const CELL = TILE + PADDING * 2
/** Atlas width in tiles. Sixteen keeps the image 512px wide. */
const COLUMNS = 16

const RENDER_CLASSES = { opaque: 0, cutout: 1, translucent: 2 }

/** Below this, a texture is treated as greyscale and a biome tint applies. */
const TINTABLE_SATURATION = 0.25

function main() {
  const source = process.argv[2]
  if (!source) {
    console.error('usage: build-block-atlas <pack.zip | pack directory>')
    process.exit(1)
  }

  const pack = openPack(resolve(source))
  const specs = blockSpecs()

  const tiles = []
  const tileIds = new Map()
  const blocks = {}
  const missing = []

  // Tile 0 is plain white: blocks with no texture keep their flat colour, and
  // multiplying it by a white tile leaves it exactly as it was.
  tiles.push(whiteTile())
  tileIds.set('#white', 0)

  for (const [blockId, spec] of Object.entries(specs)) {
    const faces = facesOf(spec)
    const tints = tintsOf(spec)
    const render = RENDER_CLASSES[spec.render ?? 'opaque']

    const resolved = {}
    let failed = null
    for (const slot of ['top', 'bottom', 'side']) {
      const candidates = [faces[slot]].flat()
      const name = candidates.find((candidate) => pack.has(candidate)) ?? null
      if (name === null) {
        failed = candidates.join(' / ')
        break
      }

      const key = `${name}|${tints[slot]}|${render}|${spec.frame ?? 0}`
      let tile = tileIds.get(key)
      if (tile === undefined) {
        const texture = pack.texture(name)
        tile = tiles.length
        tiles.push(bake(texture, tints[slot], render, spec.frame ?? 0))
        tileIds.set(key, tile)
      }
      resolved[slot] = tile
    }

    if (failed) {
      missing.push(`${blockId} (no ${failed})`)
      continue
    }
    blocks[blockId] = [resolved.top, resolved.bottom, resolved.side, render]
  }

  const rows = Math.ceil(tiles.length / COLUMNS)
  const atlas = pack_(tiles, rows)

  mkdirSync(dirname(ATLAS_PATH), { recursive: true })
  writeFileSync(ATLAS_PATH, encodePng(atlas))
  writeFileSync(TABLE_PATH, generateTable(blocks, tiles.length, rows))

  console.log(`atlas  ${atlas.width}x${atlas.height}, ${tiles.length} tiles -> ${rel(ATLAS_PATH)}`)
  console.log(`blocks ${Object.keys(blocks).length} mapped -> ${rel(TABLE_PATH)}`)
  if (missing.length) {
    console.log(`\nskipped ${missing.length} block(s) this pack has no texture for:`)
    for (const entry of missing) console.log(`  ${entry}`)
  }
}

const rel = (path) => path.slice(ROOT.length + 1)

/** Reads textures out of either a pack archive or an unpacked pack folder. */
function openPack(source) {
  if (!existsSync(source)) throw new Error(`no such pack: ${source}`)

  if (statSync(source).isDirectory()) {
    // Accept either the pack root or the block texture folder itself.
    const base = existsSync(join(source, TEXTURE_DIR)) ? join(source, TEXTURE_DIR) : source
    if (!readdirSync(base).some((file) => file.endsWith('.png'))) {
      throw new Error(`no block textures under ${base}`)
    }
    return {
      has: (name) => existsSync(join(base, `${name}.png`)),
      texture: (name) => decodePng(readFileSync(join(base, `${name}.png`)))
    }
  }

  const zip = readZip(readFileSync(source))
  return {
    has: (name) => zip.has(`${TEXTURE_DIR}/${name}.png`),
    texture: (name) => decodePng(zip.read(`${TEXTURE_DIR}/${name}.png`))
  }
}

function whiteTile() {
  const tile = new Bitmap(TILE, TILE)
  tile.data.fill(255)
  return tile
}

/**
 * Turns one texture file into a tile: first frame, 16x16, tinted if the pack
 * left it greyscale for the game to tint, and with its transparency resolved
 * the way its render class needs.
 */
function bake(texture, tint, render, frame) {
  let image = texture

  // An animated texture is its frames stacked vertically, square each.
  if (image.height > image.width && image.height % image.width === 0) {
    const frames = image.height / image.width
    image = image.crop(0, image.width * Math.min(frame, frames - 1), image.width, image.width)
  }
  if (image.width !== TILE || image.height !== TILE) image = resample(image, TILE, TILE)
  else image = image.crop(0, 0, TILE, TILE)

  if (tint && isGreyscale(image)) applyTint(image, tint)

  if (render === RENDER_CLASSES.opaque) flatten(image)
  else {
    // Filtering blends colour across the alpha edge, so transparent texels are
    // given their nearest opaque neighbour's colour rather than left black,
    // which is what would otherwise show as a dark fringe around every leaf.
    bleed(image)
    if (render === RENDER_CLASSES.cutout) {
      for (let i = 3; i < image.data.length; i += 4) image.data[i] = image.data[i] < 128 ? 0 : 255
    }
  }

  return image
}

/** Box filter down (or nearest up) to the tile size. */
function resample(image, width, height) {
  const out = new Bitmap(width, height)
  const scaleX = image.width / width
  const scaleY = image.height / height

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const x0 = Math.floor(x * scaleX)
      const y0 = Math.floor(y * scaleY)
      const x1 = Math.max(x0 + 1, Math.floor((x + 1) * scaleX))
      const y1 = Math.max(y0 + 1, Math.floor((y + 1) * scaleY))

      let r = 0, g = 0, b = 0, a = 0, weight = 0
      for (let sy = y0; sy < y1; sy++) {
        for (let sx = x0; sx < x1; sx++) {
          const p = image.pixel(sx, sy)
          // Weight colour by coverage, so a mostly transparent sample cannot
          // drag the colour of an opaque one towards black.
          r += p[0] * p[3]
          g += p[1] * p[3]
          b += p[2] * p[3]
          a += p[3]
          weight += 255
        }
      }
      out.set(x, y, a === 0
        ? [0, 0, 0, 0]
        : [Math.round(r / a), Math.round(g / a), Math.round(b / a), Math.round(a / (weight / 255))])
    }
  }
  return out
}

/** True when nothing in the texture is meaningfully coloured. */
function isGreyscale(image) {
  let peak = 0
  for (let i = 0; i < image.data.length; i += 4) {
    if (image.data[i + 3] === 0) continue
    const r = image.data[i]
    const g = image.data[i + 1]
    const b = image.data[i + 2]
    const max = Math.max(r, g, b)
    if (max === 0) continue
    peak = Math.max(peak, (max - Math.min(r, g, b)) / max)
  }
  return peak < TINTABLE_SATURATION
}

function applyTint(image, tint) {
  const tr = ((tint >> 16) & 0xff) / 255
  const tg = ((tint >> 8) & 0xff) / 255
  const tb = (tint & 0xff) / 255
  for (let i = 0; i < image.data.length; i += 4) {
    image.data[i] = Math.round(image.data[i] * tr)
    image.data[i + 1] = Math.round(image.data[i + 1] * tg)
    image.data[i + 2] = Math.round(image.data[i + 2] * tb)
  }
}

/**
 * Composites a partly transparent texture onto its own average colour and makes
 * it opaque.
 *
 * Blocks the board treats as solid must not have holes: glass panes in a wall
 * of stone would show the sky through the stone behind them. The average of the
 * texture's own opaque pixels is the least surprising thing to fill with.
 */
function flatten(image) {
  let r = 0, g = 0, b = 0, weight = 0
  for (let i = 0; i < image.data.length; i += 4) {
    const a = image.data[i + 3]
    r += image.data[i] * a
    g += image.data[i + 1] * a
    b += image.data[i + 2] * a
    weight += a
  }
  const average = weight === 0
    ? [128, 128, 128]
    : [Math.round(r / weight), Math.round(g / weight), Math.round(b / weight)]

  for (let i = 0; i < image.data.length; i += 4) {
    const a = image.data[i + 3] / 255
    for (let c = 0; c < 3; c++) {
      image.data[i + c] = Math.round(image.data[i + c] * a + average[c] * (1 - a))
    }
    image.data[i + 3] = 255
  }
}

/** Spreads colour outwards into fully transparent texels, alpha untouched. */
function bleed(image) {
  const known = new Uint8Array(image.width * image.height)
  for (let i = 0; i < known.length; i++) known[i] = image.data[i * 4 + 3] > 0 ? 1 : 0

  for (let pass = 0; pass < TILE; pass++) {
    const filled = known.slice()
    let changed = false

    for (let y = 0; y < image.height; y++) {
      for (let x = 0; x < image.width; x++) {
        if (known[y * image.width + x]) continue

        let r = 0, g = 0, b = 0, n = 0
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= image.width || ny >= image.height) continue
          if (!known[ny * image.width + nx]) continue
          const p = image.pixel(nx, ny)
          r += p[0]
          g += p[1]
          b += p[2]
          n++
        }
        if (n === 0) continue

        const at = (y * image.width + x) * 4
        image.data[at] = Math.round(r / n)
        image.data[at + 1] = Math.round(g / n)
        image.data[at + 2] = Math.round(b / n)
        filled[y * image.width + x] = 1
        changed = true
      }
    }

    known.set(filled)
    if (!changed) break
  }
}

/** Lays the tiles out in a grid, each one padded with its own edge pixels. */
function pack_(tiles, rows) {
  const atlas = new Bitmap(COLUMNS * CELL, rows * CELL)

  tiles.forEach((tile, index) => {
    const originX = (index % COLUMNS) * CELL + PADDING
    const originY = Math.floor(index / COLUMNS) * CELL + PADDING

    for (let y = -PADDING; y < TILE + PADDING; y++) {
      for (let x = -PADDING; x < TILE + PADDING; x++) {
        atlas.set(originX + x, originY + y, tile.pixel(x, y))
      }
    }
  })

  return atlas
}

function generateTable(blocks, tileCount, rows) {
  const entries = Object.entries(blocks)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([id, tuple]) => `  '${id}': [${tuple.join(', ')}]`)
    .join(',\n')

  return `/**
 * GENERATED FILE - do not edit.
 *
 * Written by \`npm run build:block-atlas\` from a Minecraft resource pack; see
 * that script and src/assets/textures/CREDITS.md. Regenerate rather than patch.
 */

/** Size of one block face in the atlas, in pixels. */
export const ATLAS_TILE = ${TILE}
/** Edge-replicated margin around each tile, which stops mip-level bleeding. */
export const ATLAS_PADDING = ${PADDING}
/** Tile pitch: a tile plus its margin on both sides. */
export const ATLAS_CELL = ${CELL}
export const ATLAS_COLUMNS = ${COLUMNS}
export const ATLAS_ROWS = ${rows}
export const ATLAS_WIDTH = ${COLUMNS * CELL}
export const ATLAS_HEIGHT = ${rows * CELL}
/** Number of tiles laid out, including the white tile at index 0. */
export const ATLAS_TILE_COUNT = ${tileCount}

/**
 * The plain white tile. Blocks with no texture sample it and keep the flat
 * colour the mesher put in their vertices.
 */
export const WHITE_TILE = 0

/**
 * How a block's faces are drawn.
 *
 * A plain object rather than a TypeScript enum: the build compiles each module
 * on its own, which rules out \`const enum\`, and a real enum would still be a
 * runtime object in every bundle that imports this one.
 */
export const RenderClass = {
  /** Hides what is behind it; its texture was flattened to fully opaque. */
  Opaque: 0,
  /** Hard-edged holes, drawn in the opaque pass by alpha testing. */
  Cutout: 1,
  /** Blended, drawn after everything else. */
  Translucent: 2
} as const

export type RenderClass = (typeof RenderClass)[keyof typeof RenderClass]

/** \`[top, bottom, side, renderClass]\` tile indices for one block. */
export type BlockTiles = readonly [number, number, number, RenderClass]

export const BLOCK_TILES: Record<string, BlockTiles> = {
${entries}
}
`
}

main()
