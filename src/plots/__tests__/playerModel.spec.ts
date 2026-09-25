import { describe, it, expect } from 'vitest'
import { Box3, BoxGeometry, MeshBasicMaterial } from 'three'
import { boxUvs, buildPlayer, isSlim, normaliseSkin, type SkinPixels } from '../playerModel'

const RED = [255, 0, 0, 255]
const BLUE = [0, 0, 255, 255]
const CLEAR = [0, 0, 0, 0]

/** A skin painted one flat, opaque grey all over. */
function opaque(width = 64, height = 64): SkinPixels {
  const data = new Uint8ClampedArray(width * height * 4).fill(128)
  for (let i = 3; i < data.length; i += 4) data[i] = 255
  return { data, width, height }
}

function paint(skin: SkinPixels, x: number, y: number, rgba: number[]): void {
  skin.data.set(rgba, (y * skin.width + x) * 4)
}

function read(skin: SkinPixels, x: number, y: number): number[] {
  const at = (y * skin.width + x) * 4
  return [...skin.data.subarray(at, at + 4)]
}

/** Where each corner of one face of a textured box samples the skin, in pixels. */
function corners(geometry: BoxGeometry, face: number) {
  const position = geometry.getAttribute('position')
  const uv = geometry.getAttribute('uv')
  return [0, 1, 2, 3].map((corner) => {
    const i = face * 4 + corner
    return {
      at: [position.getX(i), position.getY(i), position.getZ(i)],
      pixel: [uv.getX(i) * 64, (1 - uv.getY(i)) * 64]
    }
  })
}

function textured(u: number, v: number, w: number, h: number, d: number): BoxGeometry {
  const geometry = new BoxGeometry(w, h, d)
  geometry.getAttribute('uv').array.set(boxUvs(u, v, w, h, d))
  return geometry
}

// BoxGeometry's faces, in the order it builds them.
const PLUS_X = 0
const MINUS_X = 1
const TOP = 2
const BOTTOM = 3
const FRONT = 4
const BACK = 5

describe('boxUvs', () => {
  const head = textured(0, 0, 8, 8, 8)

  it('puts the face on the front, the right way up and the right way round', () => {
    // Seen from the front, the player's right is on the viewer's left (-x).
    for (const { at, pixel } of corners(head, FRONT)) {
      expect(pixel).toEqual([at[0] < 0 ? 8 : 16, at[1] > 0 ? 8 : 16])
    }
  })

  it('wraps the sides round from the front: right, left and back in turn', () => {
    // The player's right side joins the face along its front edge (+z).
    for (const { at, pixel } of corners(head, MINUS_X)) {
      expect(pixel).toEqual([at[2] > 0 ? 8 : 0, at[1] > 0 ? 8 : 16])
    }
    for (const { at, pixel } of corners(head, PLUS_X)) {
      expect(pixel).toEqual([at[2] > 0 ? 16 : 24, at[1] > 0 ? 8 : 16])
    }
    // The back is seen from behind, where the player's left (+x) is on the left.
    for (const { at, pixel } of corners(head, BACK)) {
      expect(pixel).toEqual([at[0] > 0 ? 24 : 32, at[1] > 0 ? 8 : 16])
    }
  })

  it('lays the top with its front edge against the face below it in the texture', () => {
    for (const { at, pixel } of corners(head, TOP)) {
      expect(pixel).toEqual([at[0] < 0 ? 8 : 16, at[2] > 0 ? 8 : 0])
    }
  })

  it('samples the bottom from its own square', () => {
    const xs = corners(head, BOTTOM).map((c) => c.pixel[0])
    const ys = corners(head, BOTTOM).map((c) => c.pixel[1])
    expect([Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]).toEqual([
      16, 24, 0, 8
    ])
  })

  it('narrows a slim arm to three pixels, front and back', () => {
    const arm = textured(40, 16, 3, 12, 4)
    const span = (face: number) => corners(arm, face).map((c) => c.pixel[0])
    expect(Math.min(...span(FRONT))).toBe(44)
    expect(Math.max(...span(FRONT))).toBe(47)
    expect(Math.min(...span(BACK))).toBe(51)
    expect(Math.max(...span(BACK))).toBe(54)
  })
})

describe('isSlim', () => {
  it('takes a transparent pixel in the strip slim arms leave unused as slim', () => {
    const skin = opaque()
    expect(isSlim(skin)).toBe(false)
    paint(skin, 54, 25, CLEAR)
    expect(isSlim(skin)).toBe(true)
  })

  it('takes the unused strips filled black on both arms as slim', () => {
    const skin = opaque()
    const strips = [
      [50, 16, 2, 4],
      [54, 20, 2, 12],
      [42, 48, 2, 4],
      [46, 52, 2, 12]
    ]
    for (const [x0, y0, w, h] of strips) {
      for (let y = y0; y < y0 + h; y++)
        for (let x = x0; x < x0 + w; x++) paint(skin, x, y, [0, 0, 0, 255])
    }
    expect(isSlim(skin)).toBe(true)
  })
})

describe('normaliseSkin', () => {
  it('mirrors an old skin’s right leg into its left, face by face', () => {
    const old = opaque(64, 32)
    paint(old, 4, 20, RED) // right leg, front, top left
    paint(old, 0, 20, BLUE) // right leg, outer side, top left
    paint(old, 0, 0, CLEAR)

    const { pixels, slim } = normaliseSkin(old)
    expect(pixels.height).toBe(64)
    expect(slim).toBe(false)
    // Flipped, so the top left comes out top right.
    expect(read(pixels, 23, 52)).toEqual(RED)
    // The outer side is on the other side of a left leg.
    expect(read(pixels, 27, 52)).toEqual(BLUE)
  })

  it('clears the hat of an old skin with no transparency anywhere', () => {
    const old = opaque(64, 32)
    expect(read(normaliseSkin(old).pixels, 40, 8)[3]).toBe(0)
    // One transparent pixel is enough to say the hat was painted on purpose.
    paint(old, 0, 0, CLEAR)
    expect(read(normaliseSkin(old).pixels, 40, 8)[3]).toBe(255)
  })

  it('clears every outer layer of an opaque modern skin, and nothing under it', () => {
    const skin = opaque()
    const { pixels } = normaliseSkin(skin)
    expect(read(pixels, 20, 36)[3]).toBe(0) // jacket front
    expect(read(pixels, 52, 52)[3]).toBe(0) // left sleeve
    expect(read(pixels, 20, 20)[3]).toBe(255) // body front
    expect(read(pixels, 36, 52)[3]).toBe(255) // left arm front
    // Worked on a copy: the skin handed in is left as it was.
    expect(read(skin, 20, 36)[3]).toBe(255)
  })

  it('refuses anything that is not a skin', () => {
    expect(() => normaliseSkin(opaque(32, 32))).toThrow()
  })
})

describe('buildPlayer', () => {
  const material = new MeshBasicMaterial()

  it('stands 32 tall, centred on the origin, with arms 4 past the body', () => {
    const bounds = new Box3().setFromObject(buildPlayer(material, null, false).root)
    expect(bounds.min.y).toBeCloseTo(-16)
    expect(bounds.max.y).toBeCloseTo(16)
    expect(bounds.max.x).toBeCloseTo(8)
    expect(bounds.min.x).toBeCloseTo(-8)
  })

  it('gives slim arms a pixel less', () => {
    const bounds = new Box3().setFromObject(buildPlayer(material, null, true).root)
    expect(bounds.max.x).toBeCloseTo(7)
  })

  it('adds the outer layer only when there is a material for it', () => {
    const meshes = (outer: MeshBasicMaterial | null) => {
      let count = 0
      buildPlayer(material, outer, false).root.traverse((o) => void ('isMesh' in o && count++))
      return count
    }
    expect(meshes(null)).toBe(6)
    expect(meshes(material)).toBe(12)
  })
})
