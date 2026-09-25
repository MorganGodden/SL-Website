/**
 * A Minecraft player, built from their skin.
 *
 * The skin is the standard 64 by 64 layout: every body part is a box whose six
 * faces are laid out around one corner of the texture, with a second, slightly
 * larger box over it for the outer layer (hat, jacket, sleeves, trousers). The
 * layout, the legacy conversion and the slim-arm test all follow skinview3d and
 * skinview-utils, which follow the game.
 *
 * The pixel work is done on plain arrays so it can be tested without a canvas.
 */

import {
  BoxGeometry,
  CanvasTexture,
  DoubleSide,
  Group,
  Mesh,
  MeshLambertMaterial,
  NearestFilter,
  SRGBColorSpace,
  ShaderChunk,
  type Material
} from 'three'

/** RGBA pixels, row by row. `ImageData` is one. */
export interface SkinPixels {
  data: Uint8ClampedArray
  width: number
  height: number
}

/** A skin ready to be drawn: always 64 by 64, and which arms it was drawn for. */
export interface Skin {
  pixels: SkinPixels
  slim: boolean
}

const SIZE = 64

function offset(pixels: SkinPixels, x: number, y: number): number {
  return (y * pixels.width + x) * 4
}

/** Every pixel in a rectangle, as offsets into the data. */
function* area(pixels: SkinPixels, x0: number, y0: number, w: number, h: number) {
  for (let y = y0; y < y0 + h; y++) {
    for (let x = x0; x < x0 + w; x++) yield offset(pixels, x, y)
  }
}

function hasTransparency(pixels: SkinPixels, x0: number, y0: number, w: number, h: number) {
  for (const at of area(pixels, x0, y0, w, h)) if (pixels.data[at + 3] !== 255) return true
  return false
}

function isAll(pixels: SkinPixels, x0: number, y0: number, w: number, h: number, value: number) {
  for (const at of area(pixels, x0, y0, w, h)) {
    const d = pixels.data
    if (d[at] !== value || d[at + 1] !== value || d[at + 2] !== value || d[at + 3] !== 255) {
      return false
    }
  }
  return true
}

/**
 * Whether a skin was drawn for the three-pixel arms.
 *
 * A slim skin leaves a strip of each arm's texture unused, and painters leave
 * that strip transparent - or, in some editors, solid black or solid white.
 *
 * ponytail: reads the pixels, not the model the player picked. A player who
 * wears a slim-painted skin on the classic model is drawn slim here and with
 * black-striped arms in game. Mojang's profile has the real answer but sends no
 * CORS headers; have the plugin publish it with the plot if this ever matters.
 */
export function isSlim(pixels: SkinPixels): boolean {
  const strips: [number, number, number, number][] = [
    [50, 16, 2, 4],
    [54, 20, 2, 12],
    [42, 48, 2, 4],
    [46, 52, 2, 12]
  ]
  return (
    strips.some((s) => hasTransparency(pixels, ...s)) ||
    strips.every((s) => isAll(pixels, ...s, 0)) ||
    strips.every((s) => isAll(pixels, ...s, 255))
  )
}

/**
 * The faces of the right leg and arm, and where their mirror images go.
 *
 * A 64 by 32 skin predates separate left limbs, and the game draws the left
 * ones as the right ones reflected: each face flipped, and the outer and inner
 * sides swapped over.
 */
const LEGACY_MIRRORS: [number, number, number, number, number, number][] = [
  [4, 16, 4, 4, 20, 48], // leg top
  [8, 16, 4, 4, 24, 48], // leg bottom
  [0, 20, 4, 12, 24, 52], // leg outer
  [4, 20, 4, 12, 20, 52], // leg front
  [8, 20, 4, 12, 16, 52], // leg inner
  [12, 20, 4, 12, 28, 52], // leg back
  [44, 16, 4, 4, 36, 48], // arm top
  [48, 16, 4, 4, 40, 48], // arm bottom
  [40, 20, 4, 12, 40, 52], // arm outer
  [44, 20, 4, 12, 36, 52], // arm front
  [48, 20, 4, 12, 32, 52], // arm inner
  [52, 20, 4, 12, 44, 52] // arm back
]

/** Where the outer layer lives: the hat, then the rest of it on a 64 by 64 skin. */
const HAT: [number, number, number, number][] = [[32, 0, 32, 16]]
const OUTER_LAYER: [number, number, number, number][] = [
  ...HAT,
  [0, 32, 64, 16],
  [0, 48, 16, 16],
  [48, 48, 16, 16]
]

/**
 * Brings any skin the skin service hands back to the one layout the model
 * reads, or throws for something that is not a skin at all.
 *
 * Old skins are 64 by 32 and get their left limbs mirrored in. A skin without a
 * single transparent pixel was painted before the outer layer existed, or in an
 * editor that filled it in; left alone, that fill is a box drawn round the
 * player, so it is cleared, as the game does.
 */
export function normaliseSkin(source: SkinPixels): Skin {
  const legacy = source.height === SIZE / 2
  if (source.width !== SIZE || (source.height !== SIZE && !legacy)) {
    throw new Error(`not a skin: ${source.width}x${source.height}`)
  }

  const pixels: SkinPixels = {
    data: new Uint8ClampedArray(SIZE * SIZE * 4),
    width: SIZE,
    height: SIZE
  }
  pixels.data.set(source.data)

  if (legacy) {
    for (const [sx, sy, w, h, dx, dy] of LEGACY_MIRRORS) {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const from = offset(pixels, sx + x, sy + y)
          pixels.data.set(
            pixels.data.subarray(from, from + 4),
            offset(pixels, dx + w - 1 - x, dy + y)
          )
        }
      }
    }
  }

  if (!hasTransparency(source, 0, 0, source.width, source.height)) {
    for (const face of legacy ? HAT : OUTER_LAYER) {
      for (const at of area(pixels, ...face)) pixels.data[at + 3] = 0
    }
  }
  return { pixels, slim: isSlim(pixels) }
}

/**
 * Texture coordinates for one box of the skin, in the order `BoxGeometry` lays
 * out its faces: +x, -x, +y, -y, +z, -z, four corners each.
 *
 * The model faces +z, so +x is the player's left. The box's faces sit in the
 * texture as a strip of sides (right, front, left, back) under a top and a
 * bottom, all starting from the corner (`u`, `v`).
 */
export function boxUvs(u: number, v: number, w: number, h: number, d: number): Float32Array {
  // A face's corners: bottom left, bottom right, top right, top left, as the
  // texture is read with its first row at the top.
  const face = (x1: number, y1: number, x2: number, y2: number) => [
    [x1 / SIZE, 1 - y2 / SIZE],
    [x2 / SIZE, 1 - y2 / SIZE],
    [x2 / SIZE, 1 - y1 / SIZE],
    [x1 / SIZE, 1 - y1 / SIZE]
  ]
  const top = face(u + d, v, u + d + w, v + d)
  const bottom = face(u + d + w, v, u + d + 2 * w, v + d)
  const right = face(u, v + d, u + d, v + d + h)
  const front = face(u + d, v + d, u + d + w, v + d + h)
  const left = face(u + d + w, v + d, u + 2 * d + w, v + d + h)
  const back = face(u + 2 * d + w, v + d, u + 2 * d + 2 * w, v + d + h)

  // BoxGeometry wants top left, top right, bottom left, bottom right, except
  // underneath, which is read the other way up.
  const upright = (f: number[][]) => [f[3], f[2], f[0], f[1]]
  return new Float32Array(
    [
      upright(left),
      upright(right),
      upright(top),
      [bottom[0], bottom[1], bottom[3], bottom[2]],
      upright(front),
      upright(back)
    ].flat(2)
  )
}

/** A box of the given size, textured from the skin at (`u`, `v`). */
function box(
  size: [number, number, number],
  grow: number,
  uv: [number, number],
  material: Material
): Mesh {
  const [w, h, d] = size
  const geometry = new BoxGeometry(w + grow, h + grow, d + grow)
  geometry.getAttribute('uv').array.set(boxUvs(uv[0], uv[1], w, h, d))
  return new Mesh(geometry, material)
}

export interface PlayerModel {
  root: Group
  /** Pivoted at the shoulder, for the idle sway. */
  leftArm: Group
  rightArm: Group
}

/**
 * The player, 32 units tall and centred on the origin, facing +z.
 *
 * `outer` is the overlay layer's material. Leave it out for a bare silhouette,
 * which is what stands in while the skin is on its way.
 */
export function buildPlayer(inner: Material, outer: Material | null, slim: boolean): PlayerModel {
  const root = new Group()
  const arm = slim ? 3 : 4

  const part = (
    size: [number, number, number],
    innerUv: [number, number],
    outerUv: [number, number],
    outerGrow: number,
    parent: Group,
    x: number,
    y: number
  ) => {
    const meshes = [box(size, 0, innerUv, inner)]
    if (outer) meshes.push(box(size, outerGrow, outerUv, outer))
    for (const mesh of meshes) {
      mesh.position.set(x, y, 0)
      parent.add(mesh)
    }
  }

  part([8, 8, 8], [0, 0], [32, 0], 1, root, 0, 12)
  part([8, 12, 4], [16, 16], [16, 32], 0.5, root, 0, 2)
  // Legs a hair apart, so their inner faces are not drawn on top of each other.
  part([4, 12, 4], [0, 16], [0, 32], 0.5, root, -1.9, -10)
  part([4, 12, 4], [16, 48], [0, 48], 0.5, root, 1.9, -10)

  // Arms hang from a pivot near the top of the shoulder, where the game turns them.
  const rightArm = new Group()
  const leftArm = new Group()
  rightArm.position.set(-4 - arm / 2, 6, 0)
  leftArm.position.set(4 + arm / 2, 6, 0)
  part([arm, 12, 4], [40, 16], [40, 32], 0.5, rightArm, 0, -4)
  part([arm, 12, 4], [32, 48], [48, 48], 0.5, leftArm, 0, -4)
  root.add(rightArm, leftArm)

  return { root, leftArm, rightArm }
}

/** Pixels onto a canvas, as a texture sampled the way the game samples a skin. */
function toTexture(pixels: SkinPixels): CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = pixels.width
  canvas.height = pixels.height
  canvas
    .getContext('2d')!
    .putImageData(new ImageData(pixels.data, pixels.width, pixels.height), 0, 0)
  const texture = new CanvasTexture(canvas)
  texture.magFilter = NearestFilter
  texture.minFilter = NearestFilter
  texture.generateMipmaps = false
  texture.colorSpace = SRGBColorSpace
  return texture
}

/**
 * Samples the skin only from inside the face being drawn.
 *
 * Antialiasing shades a pixel on a face's outline once, for all of its
 * samples, from the middle of the pixel - which can lie just outside the face,
 * where its texture coordinates carry on into the next part of the skin. A face
 * of the outer layer, mostly clear, then gets a hairline of whatever is painted
 * beside it in the texture, floating off the player along its edge. Centroid
 * sampling takes the coordinates from inside the face instead.
 */
function sampleInside(material: MeshLambertMaterial): MeshLambertMaterial {
  const centroid = (chunk: string) =>
    chunk.replace('varying vec2 vMapUv;', 'centroid varying vec2 vMapUv;')
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <uv_pars_vertex>',
      centroid(ShaderChunk.uv_pars_vertex)
    )
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <uv_pars_fragment>',
      centroid(ShaderChunk.uv_pars_fragment)
    )
  }
  material.customProgramCacheKey = () => 'skin-centroid'
  return material
}

/**
 * The two materials a skin is drawn with.
 *
 * The inner layer is solid whatever its pixels say, as it is in the game: a
 * stray transparent pixel there would otherwise punch a hole through the
 * player. The outer layer keeps its transparency and shows both sides, so the
 * inside of a hat brim is there when you look up under it.
 */
export function skinMaterials(skin: Skin): {
  inner: MeshLambertMaterial
  outer: MeshLambertMaterial
} {
  const solid = new Uint8ClampedArray(skin.pixels.data)
  for (let i = 3; i < solid.length; i += 4) solid[i] = 255

  return {
    inner: sampleInside(
      new MeshLambertMaterial({ map: toTexture({ ...skin.pixels, data: solid }) })
    ),
    outer: sampleInside(
      new MeshLambertMaterial({
        map: toTexture(skin.pixels),
        transparent: true,
        alphaTest: 1e-5,
        side: DoubleSide
      })
    )
  }
}

/** Fetches a skin image and reads its pixels. */
export async function fetchSkin(url: string): Promise<Skin> {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  image.src = url
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })!
  context.drawImage(image, 0, 0)
  return normaliseSkin(context.getImageData(0, 0, canvas.width, canvas.height))
}
