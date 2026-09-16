/* eslint-env node */
/**
 * Minimal PNG reader/writer, enough for Minecraft resource pack textures.
 *
 * Node ships no image codec and the atlas build runs rarely, so a dependency
 * would cost more than it saves. Supported on read: non-interlaced, bit depth 8
 * greyscale / greyscale+alpha / RGB / RGBA, and bit depth 1-8 palette — which
 * is every colour type present in the packs we build from. Written images are
 * always 8-bit RGBA.
 */
import { deflateSync, inflateSync } from 'node:zlib'

const SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

/** Bytes per pixel of the unfiltered scanlines, by colour type. */
const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }

/** An image as tightly packed 8-bit RGBA. */
export class Bitmap {
  constructor(width, height, data = new Uint8Array(width * height * 4)) {
    this.width = width
    this.height = height
    this.data = data
  }

  /** Clamped read, so filtering and padding can sample past the edges. */
  pixel(x, y) {
    const cx = Math.min(Math.max(x, 0), this.width - 1)
    const cy = Math.min(Math.max(y, 0), this.height - 1)
    const at = (cy * this.width + cx) * 4
    return this.data.subarray(at, at + 4)
  }

  set(x, y, rgba) {
    const at = (y * this.width + x) * 4
    this.data.set(rgba, at)
  }

  /** A copy of a sub-rectangle. Used to take frame 0 of an animation. */
  crop(x, y, width, height) {
    const out = new Bitmap(width, height)
    for (let row = 0; row < height; row++) {
      const from = ((y + row) * this.width + x) * 4
      out.data.set(this.data.subarray(from, from + width * 4), row * width * 4)
    }
    return out
  }
}

export function decodePng(buffer) {
  if (!buffer.subarray(0, 8).equals(SIGNATURE)) throw new Error('not a PNG')

  let width = 0
  let height = 0
  let depth = 0
  let colourType = 0
  let palette = null
  let alphas = null
  const idat = []

  for (let at = 8; at + 8 <= buffer.length; ) {
    const length = buffer.readUInt32BE(at)
    const type = buffer.toString('ascii', at + 4, at + 8)
    const body = buffer.subarray(at + 8, at + 8 + length)
    at += 12 + length

    if (type === 'IHDR') {
      width = body.readUInt32BE(0)
      height = body.readUInt32BE(4)
      depth = body[8]
      colourType = body[9]
      if (body[12] !== 0) throw new Error('interlaced PNG is not supported')
    } else if (type === 'PLTE') palette = body
    else if (type === 'tRNS') alphas = body
    else if (type === 'IDAT') idat.push(body)
    else if (type === 'IEND') break
  }

  const channels = CHANNELS[colourType]
  if (channels === undefined) throw new Error(`unsupported colour type ${colourType}`)
  if (depth !== 8 && !(colourType === 3 && depth <= 8)) {
    throw new Error(`unsupported bit depth ${depth} for colour type ${colourType}`)
  }

  const raw = inflateSync(Buffer.concat(idat))
  const bitsPerPixel = channels * depth
  const stride = Math.ceil((width * bitsPerPixel) / 8)
  // Filters work on whole bytes, at a distance of one pixel rounded up.
  const step = Math.max(1, Math.ceil(bitsPerPixel / 8))
  const lines = unfilter(raw, width, height, stride, step)

  return toRgba(lines, width, height, stride, depth, colourType, palette, alphas)
}

/** Reverses the per-scanline filters, producing one flat byte array. */
function unfilter(raw, width, height, stride, step) {
  const out = new Uint8Array(stride * height)
  let read = 0

  for (let y = 0; y < height; y++) {
    const filter = raw[read++]
    const line = out.subarray(y * stride, (y + 1) * stride)
    const prior = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null

    for (let i = 0; i < stride; i++) {
      const x = raw[read + i]
      const a = i >= step ? line[i - step] : 0
      const b = prior ? prior[i] : 0
      const c = prior && i >= step ? prior[i - step] : 0

      switch (filter) {
        case 0: line[i] = x; break
        case 1: line[i] = x + a; break
        case 2: line[i] = x + b; break
        case 3: line[i] = x + ((a + b) >> 1); break
        case 4: line[i] = x + paeth(a, b, c); break
        default: throw new Error(`unknown filter ${filter}`)
      }
    }
    read += stride
  }
  return out
}

function paeth(a, b, c) {
  const p = a + b - c
  const pa = Math.abs(p - a)
  const pb = Math.abs(p - b)
  const pc = Math.abs(p - c)
  if (pa <= pb && pa <= pc) return a
  return pb <= pc ? b : c
}

function toRgba(lines, width, height, stride, depth, colourType, palette, alphas) {
  const image = new Bitmap(width, height)

  for (let y = 0; y < height; y++) {
    const line = lines.subarray(y * stride, (y + 1) * stride)
    for (let x = 0; x < width; x++) {
      let r = 0
      let g = 0
      let b = 0
      let a = 255

      if (colourType === 3) {
        const index = readIndex(line, x, depth)
        r = palette[index * 3]
        g = palette[index * 3 + 1]
        b = palette[index * 3 + 2]
        if (alphas && index < alphas.length) a = alphas[index]
      } else if (colourType === 0 || colourType === 4) {
        r = g = b = line[x * CHANNELS[colourType]]
        if (colourType === 4) a = line[x * 2 + 1]
      } else {
        const at = x * CHANNELS[colourType]
        r = line[at]
        g = line[at + 1]
        b = line[at + 2]
        if (colourType === 6) a = line[at + 3]
      }

      image.set(x, y, [r, g, b, a])
    }
  }
  return image
}

/** Reads one palette index, which may be narrower than a byte. */
function readIndex(line, x, depth) {
  if (depth === 8) return line[x]
  const perByte = 8 / depth
  const byte = line[Math.floor(x / perByte)]
  const shift = 8 - depth * ((x % perByte) + 1)
  return (byte >> shift) & ((1 << depth) - 1)
}

export function encodePng(image) {
  const stride = image.width * 4
  const raw = Buffer.alloc((stride + 1) * image.height)
  for (let y = 0; y < image.height; y++) {
    // Filter 0: the tiles are tiny and flat, so filtering buys almost nothing.
    raw[y * (stride + 1)] = 0
    Buffer.from(image.data.buffer, image.data.byteOffset + y * stride, stride).copy(
      raw,
      y * (stride + 1) + 1
    )
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(image.width, 0)
  header.writeUInt32BE(image.height, 4)
  header[8] = 8
  header[9] = 6

  return Buffer.concat([
    SIGNATURE,
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ])
}

function chunk(type, body) {
  const out = Buffer.alloc(body.length + 12)
  out.writeUInt32BE(body.length, 0)
  out.write(type, 4, 'ascii')
  body.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + body.length)), 8 + body.length)
  return out
}

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(bytes) {
  let c = -1
  for (const byte of bytes) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}
