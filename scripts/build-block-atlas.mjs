#!/usr/bin/env node
/* eslint-env node */
/**
 * Bakes a Minecraft resource pack into the block atlas the plot renderer draws
 * with, plus the lookup table that says which tile each block's faces use.
 *
 *   npm run build:block-atlas -- <pack.zip | pack directory>
 *
 * Run rarely — only when the pack changes — so both outputs are committed. The
 * pack itself is not: it is 34MB of textures at whatever resolution it ships,
 * against an atlas of 16x16 tiles.
 *
 * Every block texture in the pack is baked, not a chosen list: a block nobody
 * wrote a spec for is exactly the one a builder is about to place.
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
import { autoSpecs, blockSpecs, facesOf, tintsOf } from './lib/blockTextures.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ATLAS_PATH = join(ROOT, 'src/assets/textures/blocks.png')
const TABLE_PATH = join(ROOT, 'src/plots/blockAtlas.generated.ts')
const TEXTURES_DIR = 'assets/minecraft/textures'
const TEXTURE_DIR = `${TEXTURES_DIR}/block`

/** Every tile is a 16x16 block face, whatever resolution the pack ships. */
const TILE = 16
/**
 * Transparent margin around each tile, filled by repeating its edge pixels.
 *
 * A quarter of a tile, which keeps neighbouring tiles apart for the first two
 * mip levels: past that a block is a couple of pixels on screen, and the
 * margin costs more in atlas area than the bleed costs in looks.
 */
const PADDING = 4
const CELL = TILE + PADDING * 2

/**
 * Atlas width in tiles: whichever power of two leaves the grid closest to
 * square, so that neither side of the image passes the 2048px a modest GPU
 * guarantees now that the whole pack is baked.
 */
const columnsFor = (tiles) => Math.max(16, 2 ** Math.round(Math.log2(Math.sqrt(tiles))))

const RENDER_CLASSES = { opaque: 0, cutout: 1, translucent: 2 }

/**
 * How far from either end of the alpha range a texel is still read as fully
 * opaque or fully clear, when a block's render class is being guessed from its
 * texture. Without it one stray anti-aliased pixel would make a solid block
 * translucent, and a translucent block does not hide what is behind it.
 */
const ALPHA_EDGE = 8

/**
 * How much of a texture has to be half-transparent before the block is drawn
 * as see-through. A handful of soft texels is an edge, not a window, and a
 * block wrongly called translucent stops hiding what is behind it.
 */
const TRANSLUCENT_SHARE = 0.25

/** Below this, a texture is treated as greyscale and a biome tint applies. */
const TINTABLE_SATURATION = 0.25

function main() {
  const source = process.argv[2]
  if (!source) {
    console.error('usage: build-block-atlas <pack.zip | pack directory>')
    process.exit(1)
  }

  const pack = openPack(resolve(source))
  // Every block the pack has a texture for, with the curated specs over the
  // top: a block the board has never seen still gets its own texture.
  const specs = { ...autoSpecs(pack.list()), ...blockSpecs() }

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
    let render = RENDER_CLASSES[spec.render ?? 'opaque']

    const names = {}
    let failed = null
    for (const slot of ['top', 'bottom', 'side']) {
      const candidates = [faces[slot]].flat()
      const found = candidates.find((candidate) => pack.has(sourceOf(candidate))) ?? null
      if (found === null) {
        failed = candidates.map(sourceOf).join(' / ')
        break
      }
      names[slot] = found
    }

    if (failed) {
      missing.push(`${blockId} (no ${failed})`)
      continue
    }

    // Nothing said how a swept-up block is drawn, so its own transparency says
    // it: solid through, holes in it, or see-through.
    if (spec.auto) {
      render = renderClassOf(Object.values(names).map((name) => pack.texture(sourceOf(name))))
    }

    const resolved = {}
    for (const slot of ['top', 'bottom', 'side']) {
      const name = names[slot]
      const key = `${JSON.stringify(name)}|${tints[slot]}|${render}|${spec.frame ?? 0}`
      let tile = tileIds.get(key)
      if (tile === undefined) {
        const texture = carve(pack.texture(sourceOf(name)), name)
        tile = tiles.length
        tiles.push(bake(texture, tints[slot], render, spec.frame ?? 0))
        tileIds.set(key, tile)
      }
      resolved[slot] = tile
    }
    blocks[blockId] = [resolved.top, resolved.bottom, resolved.side, render]
  }

  const columns = columnsFor(tiles.length)
  const rows = Math.ceil(tiles.length / columns)
  const atlas = pack_(tiles, columns, rows)

  mkdirSync(dirname(ATLAS_PATH), { recursive: true })
  writeFileSync(ATLAS_PATH, encodePng(atlas))
  writeFileSync(TABLE_PATH, generateTable(blocks, tiles.length, columns, rows))

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

  // A plain name is a block texture; a name with a folder in it is a path
  // under `textures/`, which is where the entity sheets live.
  const path = (name) => (name.includes('/') ? `${TEXTURES_DIR}/${name}` : `${TEXTURE_DIR}/${name}`)

  // Decoding is the slow part and every texture is now asked for twice, once
  // to read its transparency and once to bake it.
  const memo = (pack) => {
    const decoded = new Map()
    return {
      ...pack,
      texture: (name) => {
        let image = decoded.get(name)
        if (image === undefined) {
          image = pack.texture(name)
          decoded.set(name, image)
        }
        return image
      }
    }
  }

  /** The name of every block texture, which is what a full sweep works from. */
  const blockNames = (files) =>
    files.filter((file) => file.endsWith('.png')).map((file) => file.slice(0, -4))

  if (statSync(source).isDirectory()) {
    // Accept either the pack root or the block texture folder itself.
    const root = existsSync(join(source, TEXTURE_DIR)) ? source : null
    const base = root ? join(source, TEXTURE_DIR) : source
    if (!readdirSync(base).some((file) => file.endsWith('.png'))) {
      throw new Error(`no block textures under ${base}`)
    }
    const file = (name) =>
      name.includes('/') ? join(root ?? source, path(name)) : join(base, `${name}.png`)
    return memo({
      has: (name) => existsSync(file(name)),
      texture: (name) => decodePng(readFileSync(file(name))),
      list: () => blockNames(readdirSync(base))
    })
  }

  const zip = readZip(readFileSync(source))
  return memo({
    has: (name) => zip.has(`${path(name)}.png`),
    texture: (name) => decodePng(zip.read(`${path(name)}.png`)),
    list: () =>
      blockNames(
        [...zip.names()]
          .filter((entry) => entry.startsWith(`${TEXTURE_DIR}/`))
          .map((entry) => entry.slice(TEXTURE_DIR.length + 1))
          .filter((entry) => !entry.includes('/'))
      )
  })
}

/**
 * The render class a texture's own transparency implies: solid through,
 * hard-edged holes, or see-through. Only what the specs do not say outright.
 */
function renderClassOf(textures) {
  let texels = 0
  let partial = 0
  let holes = 0

  for (const texture of textures) {
    for (let i = 3; i < texture.data.length; i += 4) {
      const alpha = texture.data[i]
      texels++
      if (alpha <= ALPHA_EDGE) holes++
      else if (alpha < 255 - ALPHA_EDGE) partial++
    }
  }

  if (partial >= texels * TRANSLUCENT_SHARE) return RENDER_CLASSES.translucent
  return holes + partial > 0 ? RENDER_CLASSES.cutout : RENDER_CLASSES.opaque
}

/** The texture a face is taken from, whether it is the whole file or a part. */
function sourceOf(face) {
  return typeof face === 'string' ? face : face.from
}

/**
 * Cuts a face out of a texture that holds more than one.
 *
 * Chests, signs and mob heads are entity models: one sheet carries every face
 * of the model, laid out for that model alone. A block's tile is one face, so
 * the face has to be cut out by hand. Rectangles are written against the sheet
 * size the game ships and scaled to whatever the pack ships, so a pack at four
 * times the resolution carves the same pieces.
 *
 * `stack` takes several pieces and puts them one above another, which is how a
 * chest's side is made: the lid's band of it sits on top of the base's.
 */
function carve(image, face) {
  if (typeof face === 'string') return image

  const scale = image.width / face.sheet
  const pieces = (face.stack ?? [face.rect]).map(([x, y, width, height]) =>
    image.crop(x * scale, y * scale, width * scale, height * scale)
  )
  if (pieces.length === 1) return pieces[0]

  const width = Math.max(...pieces.map((piece) => piece.width))
  const height = pieces.reduce((total, piece) => total + piece.height, 0)
  const out = new Bitmap(width, height)
  let top = 0
  for (const piece of pieces) {
    for (let y = 0; y < piece.height; y++) {
      for (let x = 0; x < piece.width; x++) out.set(x, top + y, piece.pixel(x, y))
    }
    top += piece.height
  }
  return out
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
function pack_(tiles, columns, rows) {
  const atlas = new Bitmap(columns * CELL, rows * CELL)

  tiles.forEach((tile, index) => {
    const originX = (index % columns) * CELL + PADDING
    const originY = Math.floor(index / columns) * CELL + PADDING

    for (let y = -PADDING; y < TILE + PADDING; y++) {
      for (let x = -PADDING; x < TILE + PADDING; x++) {
        atlas.set(originX + x, originY + y, tile.pixel(x, y))
      }
    }
  })

  return atlas
}

function generateTable(blocks, tileCount, columns, rows) {
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
export const ATLAS_COLUMNS = ${columns}
export const ATLAS_ROWS = ${rows}
export const ATLAS_WIDTH = ${columns * CELL}
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
