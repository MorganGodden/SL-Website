import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  ColorManagement,
  DepthTexture,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  Float32BufferAttribute,
  HalfFloatType,
  Mesh,
  MeshDepthMaterial,
  MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
  NoBlending,
  OrthographicCamera,
  PCFShadowMap,
  PMREMGenerator,
  PlaneGeometry,
  Raycaster,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
  type Texture
} from 'three'
import atlasUrl from '@/assets/textures/blocks.png'
import { faceTilesForEntry, tilePixelRect } from './blockAtlas'
import { CAMERA_ELEVATION, SCREEN_UP_ON_FLOOR, wrapDistance } from './boardLayout'
import { CHANGE_SECONDS, type ColumnMesh } from './mesher'

// The scene is lit, so colours must be managed: block colours are authored in
// sRGB and converted to linear in the mesher, and the renderer converts back on
// output. Turning this off would wash out every lit surface.
ColorManagement.enabled = true

/** Brightness at the bottom of a plot shaft, relative to its lip. */
const DEPTH_SHADE = 0.28

/**
 * The block the ground between the plots is made of.
 *
 * Plain and pale, so the plaza reads as a surface the plots stand on rather
 * than as scenery of its own competing with what people have built.
 */
const GROUND_BLOCK = 'minecraft:white_concrete'

/**
 * Alpha below which a textured face is punched through rather than drawn.
 *
 * Only leaves, bars and the like have any partly transparent texels once the
 * atlas is baked, so this costs nothing on the blocks that do not need it.
 */
const CUTOUT_ALPHA = 0.5

/**
 * How much room is left around a plot the camera has come in on.
 *
 * Nothing moves the plot for a focus: the camera goes to it, and this is the
 * only thing deciding how much of the screen it ends up filling.
 */
const FOCUS_MARGIN = 1.24

/** Which way is up, for turning the camera about a plot it has come in on. */
const SPIN_AXIS = new Vector3(0, 1, 0)

/**
 * Where the camera stands, as a unit vector: half way between the x and z axes
 * so plots meet edge on, at the elevation the lattice is laid out for.
 */
const CAMERA_DIRECTION = new Vector3(
  Math.cos(CAMERA_ELEVATION) / Math.SQRT2,
  Math.sin(CAMERA_ELEVATION),
  Math.cos(CAMERA_ELEVATION) / Math.SQRT2
)

/**
 * How much of a world distance survives going up the screen, across the floor
 * and straight up.
 *
 * Two of them, because the camera looks down on the board: a step across the
 * plaza is squashed harder than a block of height is. Both follow from the one
 * angle the lattice already names, which is the distance across the floor that
 * one unit up the screen covers.
 */
const FLOOR_UP = 1 / SCREEN_UP_ON_FLOOR
const HEIGHT_UP = Math.sqrt(1 - FLOOR_UP * FLOOR_UP)

/**
 * World units across one tile of the glint pattern, and how fast the two layers
 * of it slide, in tiles per second.
 *
 * A few blocks to a tile, at two scales that are not multiples of each other
 * and rotated apart, is what keeps the pattern from reading as a repeat: the
 * two layers only come back into the same arrangement after a very long time.
 */
const GLINT_TILE = 7
const GLINT_DRIFT_A = 0.13
const GLINT_DRIFT_B = 0.08

/**
 * How strong the moving streaks are, and the flat purple laid under them.
 *
 * The base is there whenever a plot is hovered; the streaks come and go over
 * the top of it.
 */
const GLINT_SHEEN = 0.08
const GLINT_BASE = 0.05

/**
 * The depth of field, in world units either side of whatever the camera is
 * looking at, and the widest the blur is allowed to get in CSS pixels.
 *
 * An orthographic camera at isometric angles turns a plane of focus into a
 * diagonal band across the screen, which is what a tilt-shift lens does to a
 * real scene and why a board shot this way reads as a model of itself.
 */
const DOF_RANGE = 26
const DOF_RADIUS = 5.5
/** Taps in the blur. Enough for a smooth disc at that radius. */
const DOF_TAPS = 12

/** The sky the board is lit by: cool overhead, pale down at the horizon. */
const SKY_ZENITH = '#9fc4f0'
const SKY_HORIZON = '#dcebff'

/**
 * The same sky as a backdrop, authored deeper than it is meant to look.
 *
 * The lens pass is the only thing now drawing to the canvas, so everything goes
 * through the tone mapping it applies - including a backdrop that is not lit
 * and has no business being tone mapped at all. ACES lifts and desaturates it:
 * the zenith above comes out of it as #becfdf, a grey haze rather than a sky.
 * These are those colours wound back so that what lands on the screen is the
 * sky overhead, and no horizon, because a plot on the stage is not standing on
 * anything for a horizon to be behind.
 */
const BACKDROP_TOP = new Color('#4e8fdc')
const BACKDROP_BOTTOM = new Color('#76b5ff')

/**
 * How much of the board is left standing behind a focused plot, and how far
 * around that plot it is cleared away entirely.
 *
 * The far board does not go: it dims to a ghost of itself, which is what keeps
 * the plot somewhere rather than nowhere. What does go is the plaza immediately
 * around it, which at this range would otherwise be close enough to be mistaken
 * for part of it.
 *
 * The radius is measured in the camera's own plane rather than along the floor.
 * Flattened to match the plaza it would be a good deal shorter going up the
 * screen than across it - shorter, in fact, than the plot standing in the
 * middle of it is tall - and the whole gradient would play out behind the very
 * thing it is meant to be clearing a space around.
 */
const BOARD_REMAINS = 0.2
const CLEARING_BLOCKS = 24

/**
 * How much of that clearing is swept completely clean before the fade starts.
 *
 * The plot on the stage is about thirteen blocks from its middle to its corner
 * whichever way you measure, and it is standing in the middle of the clearing
 * hiding it. A fade that starts at the middle is therefore nearly half over by
 * the time there is any sky to see it in, and what is left reads as a flat
 * haze. Starting it at the plot's own edge puts the whole of the fade where it
 * can be seen: clean sky against the block, full ghost by the far edge.
 */
const CLEARING_CLEAN = 13

/**
 * How far the board has washed out before it stops covering the focused plot.
 *
 * Early, and for the plot's sake rather than the board's. Whenever the board
 * lets go there is a seam - something that was covered stops being covered -
 * and the size of it is however much of the plot had faded in by then. Let go
 * while the fade has barely started and there is little to see; hang on until
 * the board has gone and the whole side of the block arrives at once.
 */
const OCCLUDE_UNTIL = 0.3

/**
 * How far the board has washed out by the time the plot is solid.
 *
 * The fade begins the instant the wash does - the plot opens up as the board
 * goes, rather than waiting for it to get out of the way first - and finishes
 * short of the end of it. Short on purpose: the wash only ever approaches 1,
 * so a fade tied to the very end would still be running while the plot sat
 * there looking finished, and the block would keep a faint translucency for as
 * long as anyone cared to look at it.
 */
const REVEAL_END = 0.92

/**
 * How much of the column the fade leaves alone at the top.
 *
 * A plot sits flush in the plaza: the layer making up its surface is the one
 * directly beneath the floor plane, not above it. Measured from the plane
 * itself the fade would take that surface with it, and the one thing on screen
 * that was already there would dim as everything else did. So it starts a block
 * lower down, under the ground you can already see.
 */
const REVEAL_SURFACE = 1

/**
 * How the fade is spread down the block.
 *
 * At 2 the top of the buried half is solid by the time the reveal is half done
 * and the foot arrives exactly at the end, which puts a soft gradient the whole
 * height of the block rather than an edge travelling down it.
 */
const REVEAL_SPREAD = 2.0

/** The two ends of the glint's colour ramp, in sRGB. */
const GLINT_DARK = new Color(0x6d3ad6)
const GLINT_LIGHT = new Color(0xc9a6f7)

/**
 * Grows a block into place as it appears, and shrinks it away as it goes.
 *
 * Patched into the lit material rather than drawn as a pass of its own, so a
 * plot is still one mesh and one draw however much of it is moving. Each vertex
 * carries the block it belongs to and which way it is going; the clock is one
 * uniform for the whole board, so nothing has to be set per plot.
 *
 * The block is scaled about its own middle, which collapses it to a point
 * rather than fading it: these materials hide what is behind them, and a block
 * that faded would have to be drawn in the blended pass with everything that
 * implies.
 */
/**
 * The vertex half of the change animation.
 *
 * Shared, because the shadow pass has to move a block exactly as the lit pass
 * does. A block that shrank away in one and stood still in the other would go
 * on casting the shadow of something that is no longer there.
 */
function patchChangeVertex(
  shader: { vertexShader: string; uniforms: Record<string, { value: unknown }> },
  clock: { value: number }
): void {
  shader.uniforms.uNow = clock

  shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute float change;
        attribute float stamp;
        uniform float uNow;
        varying float vChange;`
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vChange = 1.0;
        if (change != 0.0) {
          float t = clamp((uNow - stamp) / ${CHANGE_SECONDS.toFixed(2)}, 0.0, 1.0);
          float amount = change > 0.0 ? t : 1.0 - t;
          // Eased, so it settles rather than arriving at speed.
          amount = amount * amount * (3.0 - 2.0 * amount);

          if (abs(change) < 1.5) {
            // A whole layer coming or going: it fades, all of it together.
            vChange = amount;
          } else {
            // One block: it grows out of its own middle, which the tag packs.
            float packed = abs(change) - 2.0;
            float by = floor(packed / 4096.0);
            float rest = packed - by * 4096.0;
            float bz = floor(rest / 64.0);
            float bx = rest - bz * 64.0;
            vec3 middle = vec3(bx - 32.0, by, bz - 32.0) + 0.5;
            transformed = middle + (transformed - middle) * amount;
          }
        }`
      )
}

/**
 * Grows a block into place as it appears, and shrinks it away as it goes.
 */
function animateChanges(material: MeshStandardMaterial, clock: { value: number }): void {
  material.onBeforeCompile = (shader) => {
    patchChangeVertex(shader, clock)

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n        varying float vChange;`)
      .replace(
        '#include <alphatest_fragment>',
        `diffuseColor.a *= vChange;
        #include <alphatest_fragment>`
      )
  }

  // Two materials sharing one patch still compile to two programs, and three
  // keys its cache on the source; this keeps them from colliding.
  material.customProgramCacheKey = () => 'plot-changes'
}

/**
 * The same animation again, for the shadow the block casts while it runs.
 *
 * Without this a plot keeps the shadows of whatever has just been cut off it:
 * the layer that has gone is still in the geometry - it has to be, to be
 * animated out at all - and the shadow pass, which knows nothing about the
 * fade, goes on drawing it at full size for ever.
 *
 * A block being grown or shrunk is collapsed towards its own middle by the
 * shared vertex patch, and vanishes from the shadow of its own accord. A whole
 * layer only fades, which a depth pass cannot do, so it is dropped outright
 * once it is more gone than not.
 */
function buildChangeDepthMaterial(clock: { value: number }): MeshDepthMaterial {
  const material = new MeshDepthMaterial()

  material.onBeforeCompile = (shader) => {
    patchChangeVertex(shader, clock)

    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\n        varying float vChange;`)
      .replace(
        '#include <alphatest_fragment>',
        `#include <alphatest_fragment>
        if (vChange < 0.5) discard;`
      )
  }

  material.customProgramCacheKey = () => 'plot-changes-depth'
  return material
}

/** One player's decoded geometry, drawn at however many places it appears. */
interface ColumnData {
  geometry: BufferGeometry
  occupiedHeight: number
  surfaceLevel: number
  minY: number
}

/** One drawn copy of a plot. The lattice repeats, so a plot has many. */
interface Instance {
  mesh: Mesh
  uuid: string | null
  /** World y this copy sits at when nothing is lifting it. */
  restY: number
}

/** A lattice cell resolved to the player who should be drawn in it. */
export interface RenderSlot {
  uuid: string
  x: number
  z: number
  /**
   * Quarter turns about the vertical axis. The mesher centres a column on its
   * own origin, so this spins the plot in place inside its shaft.
   */
  turn?: number
}

/**
 * Renders plot columns with an orthographic camera at isometric angles.
 *
 * Geometry is owned per player and shared by every copy of that player on the
 * board, so repeating the lattice costs draw calls but not memory, and a
 * re-mesh updates every copy at once.
 */
export class PlotRenderer {
  private renderer: WebGLRenderer
  private scene = new Scene()
  private camera: OrthographicCamera
  /**
   * Draw range 0 of every column, and draw range 1 behind it: the opaque and
   * blended halves of the same geometry, in the order three.js expects a
   * multi-material mesh's groups.
   */
  private material: MeshStandardMaterial
  private blendedMaterial: MeshStandardMaterial
  /** The blocks part way in or out, which have to be blended to fade. */
  private fadeMaterial: MeshStandardMaterial
  /**
   * The clock the arriving and leaving blocks are measured against, in seconds.
   *
   * One uniform object shared by both block materials and updated once a frame,
   * which is what lets every plot animate without a uniform of its own.
   */
  private changeClock = { value: 0 }
  /**
   * The depth material every column casts its shadow through.
   *
   * One for the whole board: it carries no state of its own beyond the clock,
   * which every plot is already reading from.
   */
  private changeDepth = buildChangeDepthMaterial(this.changeClock)
  /** When the last block animation on the board will have finished. */
  private changesUntil = 0

  private atlas: Texture | null = null
  /** The ground block's tile, cropped out of the atlas so it can tile alone. */
  private groundTexture: Texture | null = null
  private floorMaterial: MeshStandardMaterial
  private shaftMaterial: MeshStandardMaterial
  private sun!: DirectionalLight
  private environment: Texture | null = null

  /**
   * One black pane over the whole board, and how far it has been brought up.
   *
   * The board fades by being covered rather than by every material in it
   * fading: faded separately they show through one another, and a plot becomes
   * a glass box with its own far wall and the shaft below it visible inside.
   * Covering the finished picture has nothing to see through.
   */
  private veilScene = new Scene()
  private veilCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  private veilMaterial: ShaderMaterial
  private veilPane: Mesh
  /** Scratch vector for putting the focused plot's middle on screen. */
  private veilFocus = new Vector3()
  private veil = 0

  /**
   * The whole picture drawn off screen, with the depth it was drawn at, so it
   * can be put through a lens on its way to the canvas.
   */
  private sceneTarget: WebGLRenderTarget
  private dofScene = new Scene()
  private dofMaterial: ShaderMaterial
  private dofQuad: Mesh
  /** Scratch vector for the drawing buffer's size, read on every resize. */
  private bufferSize = new Vector2()

  private focusedMesh: Mesh | null = null
  /**
   * A sliced copy of the focused plot, drawn in place of its own geometry.
   *
   * Owned here rather than replacing the player's geometry, because every other
   * copy of that player on the board is still standing whole.
   */
  private focusGeometry: BufferGeometry | null = null
  /** Quarter turns and then some: how far the camera has been swung round it. */
  private focusSpin = 0
  /** How far the camera has got between the board and one plot, 0 to 1. */
  private focusEase = 0
  /** The middle of the plot it is going to, and the height it frames it at. */
  private focusCentre = new Vector3()
  private focusHeight = 0
  /**
   * How far the focused plot has faded in, and the two heights that fade spans.
   *
   * Uniform objects rather than numbers, so the materials below read them
   * straight out and nothing has to be pushed per frame.
   */
  private revealAmount = { value: 0 }
  private revealTop = { value: 0 }
  private revealFoot = { value: 0 }
  private revealing = false

  /**
   * The block materials again, transparent and carrying that fade.
   *
   * Their own copies because the board is drawn with the originals and must
   * stay opaque: these are lent to the one plot on the stage and taken back
   * when it is done with them.
   */
  private revealMaterials: MeshStandardMaterial[] = []

  /**
   * An additive second pass over the hovered plot, drawn from that plot's own
   * geometry so the shimmer is cut to the shape of the build.
   */
  private glintMesh: Mesh
  private glintMaterial: ShaderMaterial
  private glintTexture: Texture | null
  private glintPlaceholder = new BufferGeometry()

  private columns = new Map<string, ColumnData>()
  private instances: Instance[] = []

  /**
   * The floor and the plot shafts are one mesh each, not one per plot.
   *
   * The lattice is periodic, so a patch a few cells wider than the view can be
   * slid by the scroll distance modulo the cell size and look infinite. That is
   * two draw calls for the whole ground instead of two per plot.
   */
  private floorPatch: Mesh
  private shaftPatch: Mesh
  private patchCells = 0
  /**
   * Whether any plot has arrived yet.
   *
   * The ground is the only thing the board can draw without one, and a plaza
   * with nothing standing in it is not the board: it would flash up as a field
   * of empty holes for as long as the first plot took to arrive and decode.
   */
  private hasColumns = false

  private frameRequested = false
  private disposed = false

  private raycaster = new Raycaster()
  private pointer = new Vector2()
  /** Scratch list for picking, reused so hover testing allocates nothing. */
  private pickable: Mesh[] = []

  private viewHeight = 100
  /**
   * The view height the board frames itself at, before any zoom.
   *
   * Kept apart from the height actually in use so that a re-frame - which
   * happens every time a plot arrives - does not throw the zoom away, and so
   * that a focused plot is still fitted to the view it would have had.
   */
  private baseHeight = 100
  private zoom = 1
  private target = new Vector3(0, 0, 0)
  /**
   * Where the camera looks when no plot has been picked.
   *
   * Kept apart from `target`, which is wherever the camera has got to on its
   * way in to a plot: the lattice, the ground patch and the shadow map are all
   * cut for the board, and must not be re-cut on every frame of a focus.
   */
  private boardTarget = new Vector3(0, 0, 0)

  private spacing = 20
  private columnWidth = 16
  /** Tallest build currently on the board, used to size the cull margin. */
  private tallest = 0

  /** World y of the floor surface. Columns descend through it. */
  private floorY = 0
  /** World y that layer 0 of a column maps to; the first column defines it. */
  private baseMinY: number | null = null

  private scrollX = 0
  private scrollZ = 0

  constructor(private canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.outputColorSpace = SRGBColorSpace
    this.renderer.toneMapping = ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.15
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    // PCFSoftShadowMap was removed in three 0.186; PCF with a generous map size
    // is the supported equivalent.
    this.renderer.shadowMap.type = PCFShadowMap

    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10_000)
    this.camera.position.set(1, 1, 1)

    this.material = new MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.94,
      metalness: 0,
      envMapIntensity: 1.35,
      alphaTest: CUTOUT_ALPHA
    })

    this.blendedMaterial = new MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.62,
      metalness: 0,
      envMapIntensity: 1.6,
      transparent: true,
      // Depth is still written, so the nearest pane of glass wins instead of
      // every pane behind it blending through in whatever order they were
      // meshed in. Two layers of glass do not tint each other; a stack of them
      // sorted wrongly would look far worse.
      depthWrite: true
    })

    // Fading faces are ordinary blocks that happen to be part way in or out, so
    // they are shaded like the solid ones and merely blended: the blended
    // material is tuned for glass, and a fading wall drawn with it would turn
    // glossy for as long as it took to go.
    this.fadeMaterial = this.material.clone()
    this.fadeMaterial.transparent = true
    this.fadeMaterial.alphaTest = 0
    this.fadeMaterial.depthWrite = false

    animateChanges(this.material, this.changeClock)
    animateChanges(this.blendedMaterial, this.changeClock)
    animateChanges(this.fadeMaterial, this.changeClock)

    this.revealMaterials = [this.material, this.blendedMaterial, this.fadeMaterial].map(
      (source) => this.buildRevealMaterial(source)
    )

    this.veilMaterial = buildVeilMaterial()
    this.veilPane = new Mesh(new PlaneGeometry(2, 2), this.veilMaterial)
    this.veilPane.frustumCulled = false
    this.veilScene.add(this.veilPane)

    // Half float, because the board is drawn into this before it is tone
    // mapped: three only tone maps what goes straight to the canvas, so the
    // buffer holds open-ended light and the lens pass brings it down at the end.
    const buffer = this.renderer.getDrawingBufferSize(this.bufferSize)
    this.sceneTarget = new WebGLRenderTarget(buffer.x, buffer.y, {
      type: HalfFloatType,
      samples: 4,
      depthTexture: new DepthTexture(buffer.x, buffer.y)
    })

    this.dofMaterial = buildDofMaterial()
    this.dofMaterial.uniforms.tColour.value = this.sceneTarget.texture
    this.dofMaterial.uniforms.tDepth.value = this.sceneTarget.depthTexture
    this.dofQuad = new Mesh(new PlaneGeometry(2, 2), this.dofMaterial)
    this.dofQuad.frustumCulled = false
    this.dofScene.add(this.dofQuad)

    // Every pass is drawn into the same buffer, so clearing is done once, by
    // hand, at the top of the frame.
    this.renderer.autoClear = false

    this.glintMaterial = buildGlintMaterial()
    this.glintTexture = this.glintMaterial.uniforms.uGlint.value as Texture | null
    this.glintMesh = new Mesh(this.glintPlaceholder, this.glintMaterial)
    this.glintMesh.visible = false
    // Additive over a plot that has already been drawn, so it comes last.
    this.glintMesh.renderOrder = 1
    this.scene.add(this.glintMesh)

    this.loadAtlas()

    this.floorMaterial = new MeshStandardMaterial({
      roughness: 0.96,
      metalness: 0,
      envMapIntensity: 1.2
    })

    this.shaftMaterial = new MeshStandardMaterial({
      roughness: 1,
      metalness: 0,
      envMapIntensity: 1.5,
      // Darkened with depth by the vertex colours baked into the walls.
      vertexColors: true,
      // The shaft is only ever seen from inside, and which side that is depends
      // on which of the four walls you are looking at.
      side: DoubleSide
    })

    this.floorPatch = new Mesh(new BufferGeometry(), this.floorMaterial)
    this.floorPatch.receiveShadow = true
    this.floorPatch.visible = false
    this.scene.add(this.floorPatch)

    this.shaftPatch = new Mesh(new BufferGeometry(), this.shaftMaterial)
    this.shaftPatch.receiveShadow = true
    this.shaftPatch.visible = false
    this.scene.add(this.shaftPatch)

    this.setUpLighting()
    this.resize()
  }

  /**
   * Loads the block atlas and hands it to both block materials.
   *
   * Nearest magnification is the whole point of a pixel-art pack: the textures
   * are 16x16 and must stay crisp. Minification still runs through mipmaps,
   * because a plot scrolling past at this zoom would otherwise crawl with
   * aliasing; the tiles are padded in the atlas so the levels cannot bleed
   * into one another.
   *
   * The board draws whatever has arrived, so a slow load only means the first
   * frames are drawn untextured rather than not at all.
   */
  private loadAtlas(): void {
    new TextureLoader().load(
      atlasUrl,
      (texture) => {
        if (this.disposed) {
          texture.dispose()
          return
        }

        texture.colorSpace = SRGBColorSpace
        texture.magFilter = NearestFilter
        texture.minFilter = NearestMipmapLinearFilter
        texture.generateMipmaps = true
        texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy())

        this.atlas = texture
        // The reveal copies are cloned before this arrives, so they are named
        // here too: left out, a plot on the stage comes in untextured and white.
        for (const material of [
          this.material,
          this.blendedMaterial,
          this.fadeMaterial,
          ...this.revealMaterials
        ]) {
          material.map = texture
          material.needsUpdate = true
        }
        // The glint is cut out by the same texels the blocks are.
        this.glintMaterial.uniforms.uAtlas.value = texture

        // The ground is drawn from the same pack as the blocks, so it comes out
        // of the same atlas rather than being invented here.
        this.groundTexture = buildGroundTexture(texture.image)
        if (this.groundTexture) {
          this.groundTexture.anisotropy = Math.min(
            4,
            this.renderer.capabilities.getMaxAnisotropy()
          )
          for (const material of [this.floorMaterial, this.shaftMaterial]) {
            material.map = this.groundTexture
            material.needsUpdate = true
          }
        }

        this.invalidate()
      },
      undefined,
      () => console.warn('block atlas failed to load; plots will draw untextured')
    )
  }

  /**
   * Sun plus image-based ambient.
   *
   * A single directional light gives the hard shadows; the rest of the light
   * comes from a small sky gradient run through PMREM, so surfaces pick up cool
   * light from above and warm bounce from the snow below. That is as close to
   * global illumination as a real-time WebGL scene reasonably gets, and it is
   * what stops faces pointing away from the sun reading as flat black.
   */
  private setUpLighting(): void {
    this.sun = new DirectionalLight(0xfff6e8, 2.25)
    this.sun.position.set(60, 110, 90)
    this.sun.castShadow = true
    this.sun.shadow.mapSize.set(2048, 2048)
    // Voxel faces are perfectly flat and axis-aligned, which makes them prone
    // to shadow acne; a normal-space offset avoids it without peter-panning.
    // A constant depth bias cannot: it is in normalised shadow depth, so the
    // shadow camera's range scales it back up into world units and slides every
    // shadow off the block casting it, leaving a lit sliver at the block's foot.
    this.sun.shadow.bias = 0
    // normalBias is set in fitShadowCamera, where the texel size is known.
    this.scene.add(this.sun)
    this.scene.add(this.sun.target)

    // Generous, so shadowed faces read as "in shade" rather than as black
    // holes. Together with the environment this stands in for bounce light.
    this.scene.add(new AmbientLight(0xd9e6f7, 0.62))

    this.environment = this.buildEnvironment()
    this.scene.environment = this.environment
  }

  /** A vertical sky-to-snow gradient, prefiltered for image-based lighting. */
  private buildEnvironment(): Texture | null {
    const source = document.createElement('canvas')
    source.width = 8
    source.height = 128
    const context = source.getContext('2d')
    if (!context) return null

    const gradient = context.createLinearGradient(0, 0, 0, 128)
    gradient.addColorStop(0, SKY_ZENITH)
    gradient.addColorStop(0.46, SKY_HORIZON) // sky near the horizon
    gradient.addColorStop(0.54, '#f2f6fa') // snow near the horizon
    gradient.addColorStop(1, '#c9d6e4') // ground bounce
    context.fillStyle = gradient
    context.fillRect(0, 0, 8, 128)

    const texture = new CanvasTexture(source)
    texture.mapping = EquirectangularReflectionMapping
    texture.colorSpace = SRGBColorSpace

    const pmrem = new PMREMGenerator(this.renderer)
    const environment = pmrem.fromEquirectangular(texture).texture
    pmrem.dispose()
    texture.dispose()
    return environment
  }

  /** Sets the lattice pitch and rebuilds the ground to match. */
  setGrid(spacing: number, columnWidth: number): void {
    if (Math.abs(spacing - this.spacing) < 0.001 && columnWidth === this.columnWidth) return
    this.spacing = spacing
    this.columnWidth = columnWidth
    this.patchCells = 0
    this.rebuildGround()
  }

  /**
   * Rebuilds the ground patch, sized to cover the view with a cell of margin so
   * that sliding it by one cell never exposes an edge.
   */
  private rebuildGround(): void {
    const needed = patchCellsFor(this.visibleReach, this.spacing)
    if (needed === this.patchCells) return
    this.patchCells = needed

    const floor = buildFloorPatch(needed, this.spacing, this.columnWidth)
    this.floorPatch.geometry.dispose()
    this.floorPatch.geometry = floor

    const shafts = buildShaftPatch(
      needed,
      this.spacing,
      this.columnWidth,
      Math.max(this.floorY + 4, 8)
    )
    this.shaftPatch.geometry.dispose()
    this.shaftPatch.geometry = shafts

    this.positionGround()
  }

  /**
   * Slides the ground to match the scroll.
   *
   * Only the remainder matters: the lattice repeats every cell, so offsetting by
   * the scroll modulo the pitch puts a hole exactly where every plot is.
   */
  private positionGround(): void {
    this.floorPatch.position.set(
      -wrapDistance(this.scrollX, this.spacing),
      this.floorY,
      -wrapDistance(this.scrollZ, this.spacing)
    )
    this.shaftPatch.position.copy(this.floorPatch.position)
  }

  /** Where the board has drifted to, in world units. */
  setScroll(x: number, z: number): void {
    this.scrollX = x
    this.scrollZ = z
    this.positionGround()
  }

  /**
   * Adds or replaces a player's geometry.
   *
   * The previous geometry is disposed explicitly. Without this the board leaks
   * GPU memory every few seconds for as long as it runs.
   */
  setColumn(uuid: string, mesh: ColumnMesh): void {
    if (this.disposed) return

    const geometry = buildGeometry(mesh, this.seconds())
    this.noteChanges(mesh)
    if (this.baseMinY === null) this.baseMinY = mesh.minY

    // The first plot brings the ground with it.
    if (!this.hasColumns) {
      this.hasColumns = true
      this.floorPatch.visible = true
      this.shaftPatch.visible = true
    }

    const existing = this.columns.get(uuid)
    if (existing) {
      // Point every drawn copy at the new geometry before releasing the old.
      for (const instance of this.instances) {
        if (instance.uuid === uuid) instance.mesh.geometry = geometry
      }
      existing.geometry.dispose()
      existing.geometry = geometry
      existing.occupiedHeight = mesh.occupiedHeight
      existing.surfaceLevel = mesh.surfaceLevel
      existing.minY = mesh.minY
    } else {
      this.columns.set(uuid, {
        geometry,
        occupiedHeight: mesh.occupiedHeight,
        surfaceLevel: mesh.surfaceLevel,
        minY: mesh.minY
      })
    }

    this.invalidate()
  }

  /** The clock the block animations run on, in seconds. */
  private seconds(): number {
    return performance.now() / 1000
  }

  /** Remembers when a mesh's arriving and leaving blocks will have settled. */
  private noteChanges(mesh: ColumnMesh): void {
    for (const change of mesh.changes) {
      if (change === 0) continue
      this.changesUntil = this.seconds() + CHANGE_SECONDS
      return
    }
  }

  /**
   * Whether any block on the board is still growing in or shrinking away.
   *
   * The board only redraws when something has changed, so it has to be asked.
   */
  get settling(): boolean {
    return this.seconds() < this.changesUntil
  }

  /** Removes a player and releases their geometry. */
  removeColumn(uuid: string): void {
    const entry = this.columns.get(uuid)
    if (!entry) return

    // Nothing may still be pointing at the geometry when it is released.
    for (const instance of this.instances) {
      if (instance.uuid !== uuid) continue
      instance.uuid = null
      instance.mesh.visible = false
    }
    entry.geometry.dispose()
    this.columns.delete(uuid)
    this.invalidate()
  }

  hasColumn(uuid: string): boolean {
    return this.columns.has(uuid)
  }

  /** Number of distinct players held, not the number of copies drawn. */
  get columnCount(): number {
    return this.columns.size
  }

  /** Number of drawn copies currently placed. */
  get instanceCount(): number {
    return this.instances.filter((i) => i.mesh.visible).length
  }

  /**
   * Live geometries as counted by WebGL itself, not by our own bookkeeping.
   * If a re-mesh ever stops disposing, this climbs and the tab eventually dies.
   */
  get gpuGeometryCount(): number {
    return this.renderer.info.memory.geometries
  }

  /** Places every drawn copy of the lattice for this frame. */
  syncPlots(slots: RenderSlot[]): void {
    if (this.disposed) return

    while (this.instances.length < slots.length) {
      const mesh = new Mesh(undefined, [this.material, this.blendedMaterial, this.fadeMaterial])
      mesh.castShadow = true
      mesh.receiveShadow = true
      // Cast through the animated depth material, so a block that has been cut
      // away stops throwing a shadow as it goes rather than leaving one behind.
      mesh.customDepthMaterial = this.changeDepth
      mesh.visible = false
      this.scene.add(mesh)
      this.instances.push({ mesh, uuid: null, restY: 0 })
    }

    for (let i = 0; i < this.instances.length; i++) {
      const instance = this.instances[i]
      const slot = slots[i]
      const column = slot ? this.columns.get(slot.uuid) : undefined

      if (!slot || !column) {
        instance.uuid = null
        instance.mesh.visible = false
        continue
      }

      if (instance.mesh.geometry !== column.geometry) instance.mesh.geometry = column.geometry
      instance.uuid = slot.uuid
      instance.mesh.visible = true
      instance.restY = column.minY - (this.baseMinY ?? column.minY)
      instance.mesh.position.set(slot.x, instance.restY, slot.z)
      instance.mesh.rotation.y = (slot.turn ?? 0) * (Math.PI / 2)
    }
  }

  /**
   * Raises one drawn copy out of its shaft, for hover feedback.
   *
   * Kept apart from placement, and meant to be applied after picking, so that
   * the ray still tests where the plot rests. Testing the raised plot instead
   * would let a copy whose edge is under the pointer lift itself out from under
   * it, drop, and judder between the two.
   *
   * Placement resets the height every frame, so a copy that is no longer being
   * lifted needs nothing done to it.
   */
  setLift(index: number, lift: number): void {
    const instance = this.instances[index]
    if (!instance || !instance.mesh.visible) return
    instance.mesh.position.y = instance.restY + lift
  }

  /**
   * Brings the camera in on one drawn copy and washes the board out behind it,
   * at `progress` between 0 (the board's own framing) and 1 (that plot filling
   * the screen).
   *
   * The plot is not touched: it stays standing in its own cell and it is the
   * camera that travels. `veil` is handed in apart from `progress` so that the
   * board can be left to go a moment after the camera has set off, rather than
   * dimming the instant something is clicked.
   *
   * Applied after placement and after the lift, and meant to be called every
   * frame for as long as a focus is in play: placement resets the pose each
   * frame, so the whole of the focus is expressed here rather than accumulated.
   */
  setFocus(index: number | null, progress: number, veil: number): void {
    if (this.disposed) return

    const instance = index === null ? undefined : this.instances[index]
    const focused =
      instance && instance.uuid && instance.mesh.visible && progress > 0 ? instance : null

    if (this.focusedMesh !== (focused?.mesh ?? null)) {
      // A slice belongs to the plot it was cut from, and placement gives that
      // copy its own geometry back on the next frame.
      this.focusGeometry?.dispose()
      this.focusGeometry = null
      this.focusedMesh = focused?.mesh ?? null
    }

    this.veil = focused ? Math.min(Math.max(veil, 0), 1) : 0

    if (!focused) {
      this.revealing = false
      if (this.focusEase !== 0) {
        this.focusEase = 0
        this.updateCamera()
      }
      return
    }

    const column = this.columns.get(focused.uuid as string)
    const top = focused.restY + Math.max(column?.occupiedHeight ?? this.spacing, 1)
    // The whole column, underground half included: by the time the board has
    // gone the plot is a block of world standing on nothing, and the camera is
    // framing the block rather than the part of it that clears the plaza.
    const base = focused.restY

    const aspect = (this.canvas.clientWidth || 1) / (this.canvas.clientHeight || 1)
    // The footprint is a square on the floor, which this camera shows corner
    // on: its diagonal is what it measures across the screen, and that same
    // diagonal, flattened, is most of what it measures up it.
    const across = this.columnWidth * Math.SQRT2
    const tall = (top - base) * HEIGHT_UP + across * FLOOR_UP
    const fit = Math.max(tall / 2, across / (2 * aspect)) * FOCUS_MARGIN

    // Never further out than the board's own framing. The ground patch and the
    // lattice are cut for that, and a tower tall enough to want more would show
    // the edge of both; it runs off the top here as it does on the board, and
    // the slice control is there for anyone who wants the top of it back.
    //
    // Divided by the zoom like the board's own framing is, so that the wheel
    // still works on a focused plot rather than being swallowed by a fit that
    // never changes.
    this.focusHeight = Math.min(fit / this.zoom, this.boardHeight)
    this.focusCentre.set(focused.mesh.position.x, (base + top) / 2, focused.mesh.position.z)

    // The surface and whatever stands on it are already on screen and stay
    // solid; everything under them fades up from nothing, the top of it first.
    const reveal = Math.min(this.veil / REVEAL_END, 1)
    this.revealAmount.value = reveal
    this.revealTop.value = this.floorY - REVEAL_SURFACE
    this.revealFoot.value = Math.min(base, this.floorY) - 0.5
    // Once it is all the way in there is nothing left to blend, and the plot is
    // handed back its own opaque materials.
    this.revealing = reveal < 1
    this.focusEase = progress
    this.updateCamera()

    // Slicing only ever shortens a plot, so the whole of the sliced mesh is
    // inside the bounding sphere three culls against; there is nothing to
    // recompute when it changes.
    if (this.focusGeometry) focused.mesh.geometry = this.focusGeometry
  }

  /**
   * One block material again, transparent, with the reveal fade patched in.
   *
   * The fade is applied after the cutout test rather than before it, so a leaf
   * or a pane of bars is still punched through by its own texture while it is
   * coming in: folded in earlier, a half-faded block would fail the cutout
   * outright and blink out instead of fading.
   */
  private buildRevealMaterial(source: MeshStandardMaterial): MeshStandardMaterial {
    const material = source.clone()
    material.transparent = true

    // A clone does not carry a patch, so the original's is put back on and this
    // one is hung off the end of it.
    animateChanges(material, this.changeClock)
    const changes = material.onBeforeCompile

    material.onBeforeCompile = (shader, renderer) => {
      changes(shader, renderer)

      shader.uniforms.uReveal = this.revealAmount
      shader.uniforms.uRevealTop = this.revealTop
      shader.uniforms.uRevealFoot = this.revealFoot

      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', `#include <common>
        varying float vRevealY;`)
        .replace(
          '#include <project_vertex>',
          `vRevealY = (modelMatrix * vec4(transformed, 1.0)).y;
          #include <project_vertex>`
        )

      shader.fragmentShader = shader.fragmentShader
        .replace(
          '#include <common>',
          `#include <common>
          varying float vRevealY;
          uniform float uReveal;
          uniform float uRevealTop;
          uniform float uRevealFoot;`
        )
        .replace(
          '#include <alphatest_fragment>',
          `#include <alphatest_fragment>
          // Nothing above the plaza is arriving: it was on screen already.
          float revealSpan = max(uRevealTop - uRevealFoot, 0.001);
          float revealDepth = clamp((uRevealTop - vRevealY) / revealSpan, 0.0, 1.0);
          diffuseColor.a *= vRevealY >= uRevealTop
            ? 1.0
            : clamp(uReveal * ${REVEAL_SPREAD.toFixed(1)} - revealDepth, 0.0, 1.0);`
        )
    }

    // A different program from the one the board is drawn with, so three does
    // not hand this shader back for the opaque copies.
    material.customProgramCacheKey = () => 'plot-reveal'
    return material
  }

  /**
   * How far the camera has been swung round the focused plot, in radians.
   *
   * The camera turns rather than the plot, because the plot is standing in a
   * square hole: one spun in place would put its corners through the walls.
   */
  setFocusSpin(radians: number): void {
    if (this.disposed || this.focusSpin === radians) return
    this.focusSpin = radians
    this.updateCamera()
    this.invalidate()
  }

  /**
   * Draws the focused plot from this mesh instead of its own, for slicing, or
   * puts its own geometry back with null.
   *
   * The sliced geometry is owned here and released on the next slice, so a
   * visitor dragging the cut through a hundred layers leaves nothing behind.
   */
  setFocusColumn(mesh: ColumnMesh | null): void {
    if (this.disposed) return

    const next = mesh ? buildGeometry(mesh, this.seconds()) : null
    if (mesh) this.noteChanges(mesh)

    // The focused copy is pointing at the geometry about to be released, so it
    // is handed its replacement here rather than left drawing a dead one for
    // the rest of the frame.
    if (this.focusedMesh) {
      this.focusedMesh.geometry =
        next ?? this.columnGeometryFor(this.focusedMesh) ?? this.focusedMesh.geometry
    }

    this.focusGeometry?.dispose()
    this.focusGeometry = next
    this.invalidate()
  }

  /** The whole geometry belonging to whichever player a copy is drawing. */
  private columnGeometryFor(mesh: Mesh): BufferGeometry | null {
    for (const instance of this.instances) {
      if (instance.mesh === mesh && instance.uuid) {
        return this.columns.get(instance.uuid)?.geometry ?? null
      }
    }
    return null
  }

  /**
   * Lays the enchanted glint over one drawn copy at `strength` between 0 and 1,
   * or takes it off the board with a null index.
   *
   * The glint borrows the plot's own geometry and pose, so it shimmers over the
   * blocks themselves and follows the plot as it lifts.
   */
  setGlint(index: number | null, strength: number): void {
    if (this.disposed) return

    const instance = index === null ? undefined : this.instances[index]
    // Without the atlas there is nothing to cut the glint out with, and it
    // would shimmer over the plot's bounding box rather than over its blocks.
    if (!instance || !instance.uuid || !instance.mesh.visible || strength <= 0 || !this.atlas) {
      this.glintMesh.visible = false
      return
    }

    this.glintMesh.geometry = instance.mesh.geometry
    this.glintMesh.position.copy(instance.mesh.position)
    this.glintMesh.quaternion.copy(instance.mesh.quaternion)
    this.glintMesh.scale.copy(instance.mesh.scale)
    this.glintMaterial.uniforms.uIntensity.value = Math.min(strength, 1)
    this.glintMesh.visible = true
  }

  /**
   * Height of the floor surface, taken from the plots' own grass layer so the
   * ring floor and the plot surface are flush.
   */
  setFloorLevel(surfaceLevel: number): void {
    // The floor sits on top of the grass block, not at its base.
    const next = surfaceLevel + 1
    if (Math.abs(next - this.floorY) < 0.001) return
    this.floorY = next

    // The shafts must reach the bottom of the columns, which moved with it.
    const shafts = buildShaftPatch(
      this.patchCells,
      this.spacing,
      this.columnWidth,
      this.floorY + 4
    )
    this.shaftPatch.geometry.dispose()
    this.shaftPatch.geometry = shafts

    this.positionGround()
    this.invalidate()
  }

  /** The floor level currently in use, in column-layer units. */
  get floorLevel(): number {
    return this.floorY
  }

  /**
   * How much of the floor plane is on screen, as the rotated rectangle the
   * isometric projection actually produces.
   *
   * Screen-right lies along the world diagonal (x - z), and screen-up along
   * (x + z) foreshortened by the camera's tilt.
   *
   * The margin covers a plot's own footprint plus whatever is built on it: a
   * tall tower one cell beyond the top edge still projects into view, and would
   * pop in without this.
   */
  get viewExtent(): { across: number; near: number; far: number } {
    const aspect = (this.canvas.clientWidth || 1) / (this.canvas.clientHeight || 1)
    // Enough to cover a plot straddling the edge: its corners reach the full
    // plot width in both the across and depth directions.
    const margin = this.spacing * 0.9
    // Only the top edge needs room for what is built on the plots.
    const build = Math.max(this.tallest - this.floorY, 0) * 1.25
    // The board's own framing rather than the camera's: coming in on a plot
    // only ever narrows the view, and re-cutting the lattice every frame of
    // that would drop plots out of the board and pop them back on the way out.
    const depth = this.boardHeight * Math.SQRT2 * SCREEN_UP_ON_FLOOR

    return {
      across: this.boardHeight * aspect * Math.SQRT2 + margin,
      near: depth + margin,
      far: depth + margin + build
    }
  }

  /** Largest world distance from the centre the lattice may need to cover. */
  get visibleReach(): number {
    const extent = this.viewExtent
    return (extent.across + Math.max(extent.near, extent.far)) / 2
  }

  /**
   * World distance covered by one CSS pixel of screen.
   *
   * The camera is orthographic, so this is a constant rather than something
   * that depends on depth, which is what lets a drag track the cursor exactly.
   */
  get unitsPerPixel(): number {
    return (this.viewHeight * 2) / (this.canvas.clientHeight || 1)
  }

  /**
   * Index of the drawn copy under a pointer position given in CSS pixels
   * relative to the canvas, or null where the pointer is over bare floor.
   *
   * Tests against the plot geometry itself rather than against the footprint on
   * the floor plane: under an isometric camera a tall build covers the plots
   * behind it, and the plot you are pointing at is the one you can see.
   */
  pickSlot(x: number, y: number): number | null {
    if (this.disposed) return null

    const width = this.canvas.clientWidth || 1
    const height = this.canvas.clientHeight || 1
    this.pointer.set((x / width) * 2 - 1, 1 - (y / height) * 2)
    this.raycaster.setFromCamera(this.pointer, this.camera)

    // Positions are set during syncPlots and only flushed at render time; a
    // pick between the two would otherwise test last frame's placement.
    this.scene.updateMatrixWorld()

    this.pickable.length = 0
    for (const instance of this.instances) {
      if (instance.uuid && instance.mesh.visible) this.pickable.push(instance.mesh)
    }

    const hits = this.raycaster.intersectObjects(this.pickable, false)
    if (hits.length === 0) return null

    const hit = hits[0].object
    for (let i = 0; i < this.instances.length; i++) {
      if (this.instances[i].mesh === hit) return i
    }
    return null
  }

  /**
   * Where the label for a drawn copy belongs, in CSS pixels relative to the
   * canvas. Returns null when that copy is off screen or not drawn.
   */
  projectSlot(index: number): { x: number; y: number } | null {
    const instance = this.instances[index]
    if (!instance || !instance.mesh.visible || !instance.uuid) return null
    const column = this.columns.get(instance.uuid)
    if (!column) return null

    // Labels sit just above whatever stands on the plot, but are clamped: a
    // player with a forty-block pillar would otherwise have their name floating
    // near the top of the screen, nowhere near the plot it identifies.
    const height = Math.min(
      Math.max(column.occupiedHeight, this.floorY) + 3,
      this.floorY + 11
    )
    const world = new Vector3(0, height, 0).add(instance.mesh.position)
    const projected = world.project(this.camera)
    if (projected.x < -1.1 || projected.x > 1.1 || projected.y < -1.1 || projected.y > 1.1) {
      return null
    }

    return {
      x: ((projected.x + 1) / 2) * this.canvas.clientWidth,
      y: ((1 - projected.y) / 2) * this.canvas.clientHeight
    }
  }

  /** Points the camera so that a good spread of the lattice is in view. */
  frame(height: number): void {
    // Most of a column is below the floor, so the view is centred a little
    // above it rather than on the middle of the raw column height.
    this.boardTarget.set(0, this.floorY + 3, 0)

    // Zoom is set by the lattice pitch alone, not by the tallest build: the
    // board is a field of plots, and one player's tower must neither shrink
    // everyone else's plot nor change how many are on screen. Tall builds are
    // allowed to run off the top; their labels are clamped back down.
    this.tallest = height
    this.baseHeight = this.spacing * 1.35
    this.resize()
  }

  /**
   * Brings the view in or pushes it back, as a factor of how the board frames
   * itself: above 1 is closer.
   *
   * The camera is orthographic, so this is the height of what it takes in
   * rather than a distance; nothing moves, the view just covers more or less
   * of the board.
   */
  setZoom(zoom: number): void {
    if (this.disposed || Math.abs(zoom - this.zoom) < 0.0001) return
    this.zoom = zoom
    this.resize()
  }

  /** How far in the view has been brought, as a factor of the board's framing. */
  get zoomLevel(): number {
    return this.zoom
  }

  /** Half-height of the view the board frames itself at, before any focus. */
  private get boardHeight(): number {
    return this.baseHeight / this.zoom
  }

  /** Recomputes the projection for the canvas's current size. */
  resize(): void {
    if (this.disposed) return

    const width = this.canvas.clientWidth || 1
    const height = this.canvas.clientHeight || 1
    this.renderer.setSize(width, height, false)

    const buffer = this.renderer.getDrawingBufferSize(this.bufferSize)
    this.sceneTarget.setSize(buffer.x, buffer.y)

    this.updateCamera()
    this.rebuildGround()
    this.invalidate()
  }

  /**
   * Places the camera wherever it has got to between the board and one plot.
   *
   * Everything a focus does to the camera happens here: the board's framing and
   * the plot's are worked out apart from each other and mixed by how far in it
   * has come, so a focus caught half way is a perfectly good camera rather than
   * a state with no way back out of it.
   */
  private updateCamera(): void {
    const aspect = (this.canvas.clientWidth || 1) / (this.canvas.clientHeight || 1)
    const board = this.boardHeight

    this.viewHeight = board + (this.focusHeight - board) * this.focusEase
    this.target.lerpVectors(this.boardTarget, this.focusCentre, this.focusEase)

    const halfHeight = this.viewHeight
    const halfWidth = halfHeight * aspect

    this.camera.left = -halfWidth
    this.camera.right = halfWidth
    this.camera.top = halfHeight
    this.camera.bottom = -halfHeight

    this.camera.position
      .copy(CAMERA_DIRECTION)
      .applyAxisAngle(SPIN_AXIS, this.focusSpin * this.focusEase)
      // As far off as the board would have put it whatever it is looking at: an
      // orthographic view is the same picture from any distance, and closing
      // the gap as well would only risk the near plane.
      .multiplyScalar(Math.max(board * 6, 800))
      .add(this.target)
    this.camera.lookAt(this.target)
    this.camera.updateProjectionMatrix()

    // Sized and aimed for the board, not for the focus: the shadow map covers
    // the whole board either way, and re-fitting it as the camera comes in
    // would shift every shadow on the way.
    this.fitShadowCamera(board * aspect, board)
  }

  /**
   * Keeps the shadow map covering only what is on screen.
   *
   * The lattice is unbounded; sizing the shadow camera to all of it is not even
   * possible, let alone useful.
   */
  private fitShadowCamera(halfWidth: number, halfHeight: number): void {
    const radius = Math.hypot(halfWidth, halfHeight) * 1.2
    const shadow = this.sun.shadow.camera
    shadow.left = -radius
    shadow.right = radius
    shadow.top = radius
    shadow.bottom = -radius
    shadow.near = 1
    shadow.far = radius * 6
    shadow.updateProjectionMatrix()

    // One shadow texel of normal offset: enough to clear the acne, little
    // enough that the shadow still meets the block it belongs to. A fixed world
    // distance cannot do both, because a texel grows and shrinks with the zoom.
    this.sun.shadow.normalBias = (radius * 2) / this.sun.shadow.mapSize.x

    this.sun.target.position.copy(this.boardTarget)
    this.sun.target.updateMatrixWorld()
    this.sun.position
      .set(0.55, 1.15, 0.8)
      .normalize()
      .multiplyScalar(radius * 2.2)
      .add(this.boardTarget)
  }

  /** Draws immediately rather than on the next frame. */
  renderNow(): void {
    if (this.disposed) return
    this.draw()
  }

  /** Requests a redraw on the next frame. Repeated calls coalesce. */
  invalidate(): void {
    if (this.disposed || this.frameRequested) return
    this.frameRequested = true
    requestAnimationFrame(() => {
      this.frameRequested = false
      if (this.disposed) return
      this.draw()
    })
  }

  /**
   * One frame: the board, the wash over all of it, then the focused plot, all
   * drawn off screen and put through the lens on the way to the canvas.
   *
   * The glint is the one thing in the scene that moves on its own, so its
   * clock is read at the moment of drawing rather than passed in: a frame drawn
   * for some other reason still shows the shimmer where it should be by then.
   */
  private draw(): void {
    this.changeClock.value = this.seconds()
    if (this.glintMesh.visible) {
      this.glintMaterial.uniforms.uTime.value = this.changeClock.value
    }

    this.renderer.setRenderTarget(this.sceneTarget)
    this.renderer.clear()

    const hero = this.veil > 0 ? this.focusedMesh : null
    if (hero) {
      // Drawn twice: once with the board, which is never wholly painted over
      // any more, and once over the sky so that it alone comes through at full
      // strength. It is left out of the first pass because a second draw at
      // exactly the same depth would be rejected.
      hero.visible = false
      this.renderer.render(this.scene, this.camera)
      hero.visible = true

      this.aimVeil()
      this.renderer.render(this.veilScene, this.veilCamera)

      // While the board is still there to be seen, the plot is still part of
      // it: the board's own depth is left standing, and whatever is in front of
      // the plot covers it, plaza and neighbours alike. Once the sky has taken
      // the board, nothing left has any business covering anything - and it is
      // the fade, not the floor, that hides the plot's underground half by then
      // - so the depth goes and the block can open up.
      if (this.veil >= OCCLUDE_UNTIL) this.renderer.clearDepth()
      this.drawAlone(hero)
    } else {
      this.renderer.render(this.scene, this.camera)
    }

    this.renderer.setRenderTarget(null)
    this.renderer.clear()
    this.focusLens()
    this.renderer.render(this.dofScene, this.veilCamera)
  }

  /**
   * Points the sky at the plot it is clearing a space around.
   *
   * The clearing is a circle on the plaza, which this camera shows as an
   * ellipse: as wide as the view is in blocks, and flattened going up it by
   * exactly as much as the floor is. Worked out here rather than in the shader,
   * which has no idea what a block is.
   */
  private aimVeil(): void {
    const uniforms = this.veilMaterial.uniforms
    const aspect = (this.canvas.clientWidth || 1) / (this.canvas.clientHeight || 1)

    this.camera.updateMatrixWorld()
    this.veilFocus.copy(this.focusCentre).project(this.camera)

    uniforms.uProgress.value = this.veil
    uniforms.uFocus.value.set(this.veilFocus.x, this.veilFocus.y)
    // A circle facing the camera, so it is the same number of blocks across
    // the screen whichever way it is measured and reaches past the plot on
    // every side rather than only at its shoulders.
    uniforms.uRadius.value.set(
      CLEARING_BLOCKS / (this.viewHeight * aspect),
      CLEARING_BLOCKS / this.viewHeight
    )
  }

  /**
   * Tells the lens where it is focused.
   *
   * The plane of focus is whatever the camera is looking at, which on the board
   * is the middle of it and during a focus is the plot itself - so the plot
   * comes through sharp for the same reason the middle of the board does,
   * rather than by being exempted from anything.
   */
  private focusLens(): void {
    const uniforms = this.dofMaterial.uniforms
    // Measured the way the depth buffer reads: down the camera's own axis, and
    // negative in front of it.
    uniforms.uFocus.value = -this.camera.position.distanceTo(this.target)
    uniforms.uNear.value = this.camera.near
    uniforms.uFar.value = this.camera.far
    uniforms.uTexel.value.set(1 / this.sceneTarget.width, 1 / this.sceneTarget.height)
    // Given in CSS pixels, so the blur is as wide on a retina screen as it is
    // anywhere else rather than half as wide.
    uniforms.uRadius.value = DOF_RADIUS * this.renderer.getPixelRatio()
  }

  /**
   * Draws one plot with the rest of the board stood down.
   *
   * Visibility rather than a scene of its own: the lights, the environment and
   * the shadow map all belong to the one scene, and a plot lit by a copy of
   * them would drift away from the board it came out of.
   */
  private drawAlone(hero: Mesh): void {
    const own = hero.material
    if (this.revealing) hero.material = this.revealMaterials
    this.floorPatch.visible = false
    this.shaftPatch.visible = false
    const glinting = this.glintMesh.visible
    this.glintMesh.visible = false
    for (const instance of this.instances) {
      if (instance.mesh !== hero) instance.mesh.visible = false
    }

    this.renderer.render(this.scene, this.camera)

    hero.material = own
    this.floorPatch.visible = this.hasColumns
    this.shaftPatch.visible = this.hasColumns
    this.glintMesh.visible = glinting
    // Placement keeps a copy visible exactly while it has a player in it.
    for (const instance of this.instances) instance.mesh.visible = instance.uuid !== null
  }

  /** Releases every GPU resource this renderer owns. */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true

    for (const instance of this.instances) this.scene.remove(instance.mesh)
    this.instances = []
    this.focusedMesh = null

    // The glint borrows a column's geometry, which is released below with the
    // rest of them; only the placeholder is this mesh's own.
    this.scene.remove(this.glintMesh)
    this.glintMesh.geometry = this.glintPlaceholder
    this.glintPlaceholder.dispose()

    for (const column of this.columns.values()) column.geometry.dispose()
    this.columns.clear()
    this.focusGeometry?.dispose()
    this.focusGeometry = null

    this.scene.remove(this.floorPatch)
    this.scene.remove(this.shaftPatch)
    this.floorPatch.geometry.dispose()
    this.shaftPatch.geometry.dispose()

    this.material.dispose()
    this.changeDepth.dispose()
    for (const material of this.revealMaterials) material.dispose()
    this.blendedMaterial.dispose()
    this.veilPane.geometry.dispose()
    this.dofQuad.geometry.dispose()
    this.dofMaterial.dispose()
    this.sceneTarget.depthTexture?.dispose()
    this.sceneTarget.dispose()
    this.fadeMaterial.dispose()
    this.veilMaterial.dispose()
    this.glintMaterial.dispose()
    this.glintTexture?.dispose()
    this.atlas?.dispose()
    this.groundTexture?.dispose()
    this.floorMaterial.dispose()
    this.shaftMaterial.dispose()
    this.environment?.dispose()
    this.renderer.dispose()
  }
}

/**
 * A column's buffers as a geometry three can draw.
 *
 * Two draw ranges over one index buffer: solid blocks, then glass, ice and
 * water over the top of them. A group with no indices is left out entirely
 * rather than submitted as an empty draw call.
 */
function buildGeometry(mesh: ColumnMesh, now: number): BufferGeometry {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(mesh.positions, 3))
  geometry.setAttribute('normal', new BufferAttribute(mesh.normals, 3, true))
  geometry.setAttribute('color', new BufferAttribute(mesh.colours, 3))
  geometry.setAttribute('uv', new BufferAttribute(mesh.uvs, 2))
  geometry.setAttribute('change', new BufferAttribute(mesh.changes, 1))

  // The mesher tags which blocks are moving; the clock they move against is the
  // renderer's, so the moment they arrived is stamped on here.
  const stamps = new Float32Array(mesh.changes.length)
  for (let i = 0; i < stamps.length; i++) stamps[i] = mesh.changes[i] === 0 ? 0 : now
  geometry.setAttribute('stamp', new BufferAttribute(stamps, 1))

  geometry.setIndex(new BufferAttribute(mesh.indices, 1))

  const fadingStart = mesh.opaqueIndexCount + mesh.blendedIndexCount
  const fading = mesh.indices.length - fadingStart
  if (mesh.opaqueIndexCount > 0) geometry.addGroup(0, mesh.opaqueIndexCount, 0)
  if (mesh.blendedIndexCount > 0) {
    geometry.addGroup(mesh.opaqueIndexCount, mesh.blendedIndexCount, 1)
  }
  if (fading > 0) geometry.addGroup(fadingStart, fading, 2)

  geometry.computeBoundingSphere()
  return geometry
}

/**
 * The lens the finished picture is put through.
 *
 * A plane of focus at whatever the camera is looking at, and everything either
 * side of it gathered from a disc that widens with how far out of focus it is.
 * Under an orthographic camera at isometric angles that plane cuts the screen
 * as a diagonal band, which is the tilt-shift look: the board reads as a model
 * of itself, and the one thing the camera is on stays sharp.
 *
 * One pass rather than the usual two. The board is a quiet picture with a small
 * circle of confusion, and a separable blur would cost a second buffer to hide
 * a difference nothing at this radius is big enough to show.
 */
function buildDofMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: 'tilt-shift',
    defines: { TAPS: DOF_TAPS },
    uniforms: {
      tColour: { value: null },
      tDepth: { value: null },
      uTexel: { value: new Vector2() },
      uFocus: { value: 0 },
      uNear: { value: 0 },
      uFar: { value: 0 },
      uRange: { value: DOF_RANGE },
      uRadius: { value: DOF_RADIUS }
    },
    depthTest: false,
    depthWrite: false,
    blending: NoBlending,
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      #include <packing>

      uniform sampler2D tColour;
      uniform sampler2D tDepth;
      uniform vec2 uTexel;
      uniform float uFocus;
      uniform float uNear;
      uniform float uFar;
      uniform float uRange;
      uniform float uRadius;

      varying vec2 vUv;

      // How far out of focus one point is, from nothing to fully blurred.
      float confusion(vec2 uv) {
        float depth = texture2D(tDepth, uv).x;
        float viewZ = orthographicDepthToViewZ(depth, uNear, uFar);
        return clamp(abs(viewZ - uFocus) / uRange, 0.0, 1.0);
      }

      void main() {
        float here = confusion(vUv);
        float radius = here * uRadius;

        vec4 sum = texture2D(tColour, vUv);
        float weight = 1.0;

        for (int i = 0; i < TAPS; i++) {
          // A golden-angle spiral: every tap lands somewhere the ones before it
          // did not, at any count, without a table of offsets to carry around.
          float ring = (float(i) + 0.5) / float(TAPS);
          float angle = float(i) * 2.399963;
          vec2 at = vUv + vec2(cos(angle), sin(angle)) * sqrt(ring) * radius * uTexel;

          // A tap that is itself in focus does not get to smear over what is
          // behind it, so a sharp edge keeps its own outline instead of
          // bleeding into whatever the blur reaches for.
          float share = min(confusion(at) / max(here, 0.001), 1.0);
          sum += texture2D(tColour, at) * share;
          weight += share;
        }

        gl_FragColor = sum / weight;

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  })
}

/**
 * The sky a focused plot stands against, and the hole it clears in the board.
 *
 * Full strength around the plot, easing off to leave a fifth of the board
 * standing further out. The gradient is mixed here rather than sampled from a
 * strip, so the colours stay in the space the rest of the frame is in and
 * nothing has to be decoded on the way past.
 */
function buildVeilMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    name: 'backdrop',
    uniforms: {
      uTop: { value: BACKDROP_TOP },
      uBottom: { value: BACKDROP_BOTTOM },
      uProgress: { value: 0 },
      uFocus: { value: new Vector2() },
      uRadius: { value: new Vector2(1, 1) },
      uClean: { value: CLEARING_CLEAN / CLEARING_BLOCKS },
      uRemains: { value: BOARD_REMAINS }
    },
    transparent: true,
    // It is the pane, not part of the scene: nothing occludes it and it
    // occludes nothing.
    depthTest: false,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uTop;
      uniform vec3 uBottom;
      uniform float uProgress;
      uniform vec2 uFocus;
      uniform vec2 uRadius;
      uniform float uClean;
      uniform float uRemains;

      varying vec2 vUv;

      void main() {
        // Distance from the plot, in clearings rather than in pixels.
        vec2 fromPlot = (vUv * 2.0 - 1.0 - uFocus) / uRadius;
        float away = length(fromPlot);

        // Swept clean as far as the plot's own edge, then fading back in, until
        // by the edge of the clearing the board is merely dimmed - and it stays
        // that way however much further out you look.
        float cover = mix(1.0, 1.0 - uRemains, smoothstep(uClean, 1.0, away));

        gl_FragColor = vec4(mix(uBottom, uTop, vUv.y), cover * uProgress);
      }
    `
  })
}

/**
 * The ground block's tile, lifted out of the atlas into a texture of its own.
 *
 * The plaza is a handful of big quads rather than a quad per block, so it
 * cannot sample the atlas the way the plots do: a repeating texture would
 * repeat the whole atlas. Cropped out on its own it tiles by itself, and the
 * floor's texture coordinates are already in blocks, so one repeat lands on
 * one block.
 */
function buildGroundTexture(source: CanvasImageSource): CanvasTexture | null {
  const tile = faceTilesForEntry(GROUND_BLOCK).tiles[0]
  const rect = tilePixelRect(tile)

  const canvas = document.createElement('canvas')
  canvas.width = rect.size
  canvas.height = rect.size
  const context = canvas.getContext('2d')
  if (!context) return null

  context.drawImage(source, rect.x, rect.y, rect.size, rect.size, 0, 0, rect.size, rect.size)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  // Sixteen pixels a block, kept crisp close up and mipped down far away, the
  // same treatment the blocks themselves get.
  texture.magFilter = NearestFilter
  texture.minFilter = NearestMipmapLinearFilter
  texture.generateMipmaps = true
  return texture
}

/**
 * The enchanted glint: two layers of soft streaked noise sliding across the
 * plot in different directions, added over the blocks.
 *
 * The pattern is sampled in view space rather than by the blocks' own texture
 * coordinates. Every face on a plot maps to a sixteen-pixel tile of the atlas,
 * so glinting by those coordinates would put a full churning pattern on each
 * block face; what is wanted is one sheen sliding across the whole build.
 */
function buildGlintMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {
      uAtlas: { value: null as Texture | null },
      uGlint: { value: buildGlintTexture() },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uDark: { value: GLINT_DARK },
      uLight: { value: GLINT_LIGHT }
    },
    vertexShader: `
      // Two rotations about twenty and fifty degrees apart, so the streaks of
      // the two layers cross rather than run together.
      const mat2 TURN_A = mat2(0.94, -0.34, 0.34, 0.94);
      const mat2 TURN_B = mat2(0.63, 0.78, -0.78, 0.63);

      varying vec2 vGlintA;
      varying vec2 vGlintB;
      varying vec2 vAtlas;

      void main() {
        // Laid on the plot's own faces rather than on the screen: the board
        // scrolls and the plot turns, and a sheen fixed to the screen slides
        // off whatever it is meant to be on. Each face takes the two axes it
        // faces across, so the pattern runs over the blocks and stays there.
        vec3 facing = abs(normal);
        vec2 sheenSpace = facing.y > 0.5
          ? position.xz
          : (facing.x > 0.5 ? position.zy : position.xy);
        sheenSpace /= ${GLINT_TILE.toFixed(1)};

        vGlintA = TURN_A * sheenSpace;
        // Not a whole multiple of the other layer, so the two never line up
        // into a pattern the eye can follow.
        vGlintB = TURN_B * sheenSpace * 0.63;

        vAtlas = uv;

        // Worked out in the same two steps the lit material uses, and in the
        // same order: this pass lies exactly on the blocks it is lighting, and
        // multiplying the matrices together first rounds differently enough to
        // set the two fighting over which is in front.
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D uAtlas;
      uniform sampler2D uGlint;
      uniform float uTime;
      uniform float uIntensity;
      uniform vec3 uDark;
      uniform vec3 uLight;

      varying vec2 vGlintA;
      varying vec2 vGlintB;
      varying vec2 vAtlas;

      void main() {
        // Cut to the same shape the blocks are: leaves and bars are mostly
        // holes, and a glint over the holes would be a glowing block.
        if (texture2D(uAtlas, vAtlas).a < ${CUTOUT_ALPHA}) discard;

        float a = texture2D(uGlint, vGlintA + vec2(uTime * ${GLINT_DRIFT_A}, uTime * ${(GLINT_DRIFT_A * 0.4).toFixed(3)})).r;
        float b = texture2D(uGlint, vGlintB + vec2(uTime * -${GLINT_DRIFT_B}, uTime * ${(GLINT_DRIFT_B * 0.5).toFixed(3)})).r;

        // Added and eased, rather than multiplied and sharpened: the sheen
        // washes across the plot and falls away at its edges instead of
        // breaking into hot specks wherever two bright patches cross.
        //
        // The two layers average about half each, so the threshold sits well
        // above their sum: only where both happen to run bright does a streak
        // show at all, and most of the plot is left as it was.
        float sheen = smoothstep(1.02, 1.46, a + b);

        // A faint wash of the same purple across the whole plot under the
        // streaks, so a hovered plot reads as enchanted even at the moments
        // when no streak is crossing it.
        vec3 glow = uDark * ${GLINT_BASE} + mix(uDark, uLight, sheen) * sheen * ${GLINT_SHEEN};

        gl_FragColor = vec4(glow * uIntensity, 1.0);

        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    blending: AdditiveBlending,
    // Exactly on top of geometry that has already been drawn: the depth test
    // still hides the parts of it that are behind something else, but it has
    // nothing of its own to contribute to the depth buffer.
    depthWrite: false
  })
}

/**
 * Seamless streaked noise: three octaves of value noise, each stretched across
 * the tile so the features come out as long soft bands rather than blobs.
 *
 * Every octave's lattice wraps, so the tile repeats exactly and can be scrolled
 * for as long as the page is open without ever showing a seam. The values are
 * hashed rather than random, so the pattern is the same on every visit.
 */
function buildGlintTexture(): CanvasTexture | null {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) return null

  const octaves = [
    { cellsX: 2, cellsY: 9, weight: 0.55 },
    { cellsX: 4, cellsY: 18, weight: 0.3 },
    { cellsX: 8, cellsY: 32, weight: 0.15 }
  ].map((octave, index) => ({ ...octave, sample: wrappingNoise(octave.cellsX, octave.cellsY, index) }))

  const image = context.createImageData(size, size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let value = 0
      for (const octave of octaves) value += octave.sample(x / size, y / size) * octave.weight

      const offset = (y * size + x) * 4
      const level = Math.round(Math.min(Math.max(value, 0), 1) * 255)
      image.data[offset] = level
      image.data[offset + 1] = level
      image.data[offset + 2] = level
      image.data[offset + 3] = 255
    }
  }
  context.putImageData(image, 0, 0)

  const texture = new CanvasTexture(canvas)
  // A mask, not a colour: it is read in the working space as it is written.
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  return texture
}

/**
 * One octave of value noise on a `cellsX` by `cellsY` lattice, smoothly
 * interpolated and wrapping at both edges.
 */
function wrappingNoise(
  cellsX: number,
  cellsY: number,
  seed: number
): (u: number, v: number) => number {
  const values = new Float32Array(cellsX * cellsY)
  for (let i = 0; i < values.length; i++) {
    // A hash rather than Math.random: the same pattern every time the page is
    // opened, which is one less thing to wonder about when it looks wrong.
    const noise = Math.sin((i + 1) * 127.1 + (seed + 1) * 311.7) * 43758.5453
    values[i] = noise - Math.floor(noise)
  }

  // Smoothstep on the cell fraction, so the bands ease into one another rather
  // than creasing at every lattice line.
  const ease = (t: number) => t * t * (3 - 2 * t)

  return (u, v) => {
    const x = u * cellsX
    const y = v * cellsY
    const x0 = Math.floor(x) % cellsX
    const y0 = Math.floor(y) % cellsY
    const x1 = (x0 + 1) % cellsX
    const y1 = (y0 + 1) % cellsY
    const tx = ease(x - Math.floor(x))
    const ty = ease(y - Math.floor(y))

    const top = values[y0 * cellsX + x0] + (values[y0 * cellsX + x1] - values[y0 * cellsX + x0]) * tx
    const bottom =
      values[y1 * cellsX + x0] + (values[y1 * cellsX + x1] - values[y1 * cellsX + x0]) * tx
    return top + (bottom - top) * ty
  }
}

/**
 * Patch-local centres of the ground cells.
 *
 * Every centre must land on an exact multiple of the pitch, because plots are
 * placed at multiples of the pitch and the patch is only ever offset by the
 * scroll modulo that pitch. Centring the patch as `-(cells * spacing) / 2` puts
 * the centres on multiples of the pitch for an odd cell count but half a cell
 * off for an even one, which slides every plot half-way onto the surrounding
 * floor — and only at some window sizes, which is what makes it easy to miss.
 */
export function patchCellsFor(reach: number, spacing: number): number {
  if (spacing <= 0) return 1
  // Two cells of slack: one so that sliding the patch by up to a full cell
  // never exposes its edge, one so a plot straddling the boundary still has
  // floor around it.
  return Math.ceil((reach * 2) / spacing) + 3
}

export function patchCellCentres(cells: number, spacing: number): number[] {
  const half = Math.floor(Math.max(cells, 1) / 2)
  const centres: number[] = []
  for (let c = -half; c <= half; c++) centres.push(c * spacing)
  return centres
}

/**
 * The ring-chunk floor for a square of lattice cells: a flat plane with a
 * square hole per cell for the plot to descend through.
 *
 * The lattice sits on the world axes, so the cells and their holes are all
 * axis-aligned and the whole patch is four quads per cell.
 */
function buildFloorPatch(
  cells: number,
  spacing: number,
  columnWidth: number
): BufferGeometry {
  const positions: number[] = []
  const normals: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const half = spacing / 2
  const hole = columnWidth / 2
  const centres = patchCellCentres(cells, spacing)

  const quad = (x0: number, z0: number, x1: number, z1: number) => {
    if (x1 - x0 <= 0 || z1 - z0 <= 0) return
    const base = positions.length / 3
    positions.push(x0, 0, z0, x1, 0, z0, x1, 0, z1, x0, 0, z1)
    for (let i = 0; i < 4; i++) normals.push(0, 1, 0)
    uvs.push(x0, z0, x1, z0, x1, z1, x0, z1)
    indices.push(base, base + 2, base + 1, base, base + 3, base + 2)
  }

  for (const centreX of centres) {
    for (const centreZ of centres) {
      const minX = centreX - half
      const maxX = centreX + half
      const minZ = centreZ - half
      const maxZ = centreZ + half

      // Four strips around the hole.
      quad(minX, minZ, maxX, centreZ - hole)
      quad(minX, centreZ + hole, maxX, maxZ)
      quad(minX, centreZ - hole, centreX - hole, centreZ + hole)
      quad(centreX + hole, centreZ - hole, maxX, centreZ + hole)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3))
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}

/**
 * The inward-facing walls of the shaft each plot sits in, for a square of
 * lattice cells.
 *
 * Without these the floor is a zero-thickness plane: as soon as a player mines
 * out to their plot boundary you see straight through the world to the sky.
 */
function buildShaftPatch(
  cells: number,
  spacing: number,
  columnWidth: number,
  depth: number
): BufferGeometry {
  const positions: number[] = []
  const normals: number[] = []
  const colours: number[] = []
  const uvs: number[] = []
  const indices: number[] = []

  const hole = columnWidth / 2
  const centres = patchCellCentres(cells, spacing)

  for (const centreX of centres) {
    for (const centreZ of centres) {
      const wall = (
        ax: number, az: number,
        bx: number, bz: number,
        nx: number, nz: number
      ) => {
        const base = positions.length / 3
        positions.push(
          centreX + ax, 0, centreZ + az,
          centreX + bx, 0, centreZ + bz,
          centreX + bx, -depth, centreZ + bz,
          centreX + ax, -depth, centreZ + az
        )
        for (let i = 0; i < 4; i++) normals.push(nx, 0, nz)
        // In blocks, like the floor's, so the wall carries on the same grid the
        // plaza above it is laid out on.
        uvs.push(0, 0, columnWidth, 0, columnWidth, depth, 0, depth)
        // Less and less of the sky reaches the bottom of a shaft. Baking that
        // falloff in is what makes the recess read as depth rather than as a
        // flat grey patch, and it is what indirect light would actually do.
        colours.push(
          1, 1, 1,
          1, 1, 1,
          DEPTH_SHADE, DEPTH_SHADE, DEPTH_SHADE,
          DEPTH_SHADE, DEPTH_SHADE, DEPTH_SHADE
        )
        indices.push(base, base + 1, base + 2, base, base + 2, base + 3)
      }

      // Normals face into the shaft, which is the only side ever seen.
      wall(-hole, -hole, hole, -hole, 0, 1)
      wall(hole, hole, -hole, hole, 0, -1)
      wall(-hole, hole, -hole, -hole, 1, 0)
      wall(hole, -hole, hole, hole, -1, 0)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colours, 3))
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2))
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}
