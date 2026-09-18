import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  ColorManagement,
  DirectionalLight,
  DoubleSide,
  EquirectangularReflectionMapping,
  Float32BufferAttribute,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
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
  WebGLRenderer,
  type Texture
} from 'three'
import atlasUrl from '@/assets/textures/blocks.png'
import { faceTilesForEntry, tilePixelRect } from './blockAtlas'
import { SCREEN_UP_ON_FLOOR, wrapDistance } from './boardLayout'
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
 * How far a focused plot is blown up, and how far towards the camera it comes
 * as a fraction of the view height.
 *
 * The camera is orthographic, so coming forward does not enlarge anything by
 * itself; it is what puts the plot in front of the whole board, and the scale
 * is what makes it read as having stepped towards the viewer.
 */
const FOCUS_SCALE = 1.45
const FOCUS_FORWARD = 2

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
 * How dark the focused plot's shadow is, and how much of its footprint it
 * covers.
 *
 * A contact shadow: enough to lift the plot off the backdrop and no more.
 */
const SHADOW_STRENGTH = 0.32
const SHADOW_SPREAD = 0.9

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
function animateChanges(material: MeshStandardMaterial, clock: { value: number }): void {
  material.onBeforeCompile = (shader) => {
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
  private veilMaterial: MeshBasicMaterial
  /** The ground block again, tiled flat across the screen behind a plot. */
  private veilTexture: Texture | null = null
  private veilPane: Mesh
  /** The shadow the focused plot lays on that backdrop. */
  private shadowMaterial: MeshBasicMaterial
  private shadowPane: Mesh
  private veil = 0

  private focusedMesh: Mesh | null = null
  /**
   * A sliced copy of the focused plot, drawn in place of its own geometry.
   *
   * Owned here rather than replacing the player's geometry, because every other
   * copy of that player on the board is still standing whole.
   */
  private focusGeometry: BufferGeometry | null = null
  /** Quarter turns and then some: how far the focused plot has been spun. */
  private focusSpin = 0
  /** Scratch vector for the focus pose, so a held focus allocates nothing. */
  private focusPoint = new Vector3()
  /** Scratch vectors for placing the shadow under it. */
  private shadowAt = new Vector3()
  private shadowEdge = new Vector3()

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

    this.veilMaterial = new MeshBasicMaterial({
      // The ground block's own colour, taken down a touch: the plot on the
      // stage is lit and the backdrop is not, and at full strength the two read
      // as the same brightness.
      color: new Color(0xe2e5e8),
      transparent: true,
      opacity: 0,
      // It is the pane, not part of the scene: nothing occludes it and it
      // occludes nothing, and black is black whatever the exposure.
      depthTest: false,
      depthWrite: false,
      toneMapped: false
    })
    this.veilPane = new Mesh(new PlaneGeometry(2, 2), this.veilMaterial)
    this.veilPane.frustumCulled = false
    this.veilScene.add(this.veilPane)

    // A soft shadow on the backdrop, under the plot that is standing on it.
    // Drawn here rather than cast by the sun, because there is no floor left
    // in the scene for a real shadow to fall on.
    this.shadowMaterial = new MeshBasicMaterial({
      color: new Color(0x0b1020),
      map: buildShadowTexture(),
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
      toneMapped: false
    })
    this.shadowPane = new Mesh(new PlaneGeometry(1, 1), this.shadowMaterial)
    this.shadowPane.frustumCulled = false
    this.shadowPane.renderOrder = 1
    this.veilScene.add(this.shadowPane)

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
        for (const material of [this.material, this.blendedMaterial, this.fadeMaterial]) {
          material.map = texture
          material.needsUpdate = true
        }
        // The glint is cut out by the same texels the blocks are.
        this.glintMaterial.uniforms.uAtlas.value = texture

        // The ground is drawn from the same pack as the blocks, so it comes out
        // of the same atlas rather than being invented here.
        this.groundTexture = buildGroundTexture(texture.image)
        if (this.groundTexture) {
          // A plot on the stage stands against the same block the plaza is
          // paved with, laid flat and tiled across the screen. Its own copy of
          // the texture, because the two tile at very different rates and the
          // rate belongs to the texture rather than to the material.
          this.veilTexture = this.groundTexture.clone()
          this.veilTexture.needsUpdate = true
          this.veilMaterial.map = this.veilTexture
          this.veilMaterial.needsUpdate = true
          this.tileVeil()

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
    this.sun.shadow.bias = -0.0004
    this.sun.shadow.normalBias = 0.06
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
    gradient.addColorStop(0, '#9fc4f0') // zenith
    gradient.addColorStop(0.46, '#dcebff') // sky near the horizon
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
   * Brings one drawn copy to the front and takes the rest of the board to
   * black behind it, at `progress` between 0 (untouched) and 1 (fully focused).
   *
   * Applied after placement and after the lift, and meant to be called every
   * frame for as long as a focus is in play: placement resets the pose each
   * frame, so the whole of the focus is expressed here rather than accumulated.
   * The fade itself happens at drawing time, in one pass over everything.
   */
  setFocus(index: number | null, progress: number): void {
    if (this.disposed) return

    const instance = index === null ? undefined : this.instances[index]
    const focused =
      instance && instance.uuid && instance.mesh.visible && progress > 0 ? instance : null

    if (this.focusedMesh !== (focused?.mesh ?? null)) {
      // Placement resets position but not scale, so the copy that was focused
      // has to be given its own size back.
      this.focusedMesh?.scale.set(1, 1, 1)
      // A slice belongs to the plot it was cut from, and placement gives that
      // copy its own geometry back on the next frame.
      this.focusGeometry?.dispose()
      this.focusGeometry = null
      this.focusedMesh = focused?.mesh ?? null
    }

    this.veil = focused ? progress : 0
    if (!focused) return

    const column = this.columns.get(focused.uuid as string)
    const height = Math.max(column?.occupiedHeight ?? this.spacing, 1)
    // Tall builds are blown up less, so that a forty-block tower still fits on
    // screen rather than running off both ends of it. Measured against the
    // board's own framing rather than the zoomed view: fitting it to a view
    // the visitor has zoomed in would shrink the plot by however much they had
    // zoomed, and leave them where they started.
    const full = Math.min(FOCUS_SCALE, (this.baseHeight * 1.5) / height)
    const scale = 1 + (full - 1) * progress

    // Centred on the axis the camera is looking down, so the plot lands in the
    // middle of the screen, and pulled along that axis towards the camera.
    this.focusPoint
      .copy(this.camera.position)
      .sub(this.target)
      .normalize()
      .multiplyScalar(this.viewHeight * FOCUS_FORWARD)
      .add(this.target)
    // A column is placed by its base, so it is dropped by half its own height
    // to put its middle, rather than its feet, in the centre of the view.
    this.focusPoint.y -= (height * scale) / 2

    focused.mesh.position.lerp(this.focusPoint, progress)
    focused.mesh.scale.setScalar(scale)

    this.layShadow(focused.mesh, scale)

    // Placement has already turned this copy to sit in its cell, so the spin is
    // added to that rather than replacing it: the plot turns from where it was
    // standing, not from wherever the lattice happened to face it.
    focused.mesh.rotation.y += this.focusSpin

    // Slicing only ever shortens a plot, so the whole of the sliced mesh is
    // inside the bounding sphere three culls against; there is nothing to
    // recompute when it changes.
    if (this.focusGeometry) focused.mesh.geometry = this.focusGeometry
  }

  /** How far the focused plot has been spun about its own axis, in radians. */
  setFocusSpin(radians: number): void {
    this.focusSpin = radians
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
    const depth = this.viewHeight * Math.SQRT2 * SCREEN_UP_ON_FLOOR

    return {
      across: this.viewHeight * aspect * Math.SQRT2 + margin,
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
    this.target.set(0, this.floorY + 3, 0)

    // Zoom is set by the lattice pitch alone, not by the tallest build: the
    // board is a field of plots, and one player's tower must neither shrink
    // everyone else's plot nor change how many are on screen. Tall builds are
    // allowed to run off the top; their labels are clamped back down.
    this.tallest = height
    this.baseHeight = this.spacing * 1.35
    this.viewHeight = this.baseHeight / this.zoom
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
    this.viewHeight = this.baseHeight / this.zoom
    this.resize()
  }

  /** How far in the view has been brought, as a factor of the board's framing. */
  get zoomLevel(): number {
    return this.zoom
  }

  /** Recomputes the projection for the canvas's current size. */
  resize(): void {
    if (this.disposed) return

    const width = this.canvas.clientWidth || 1
    const height = this.canvas.clientHeight || 1
    this.renderer.setSize(width, height, false)

    const aspect = width / height
    const halfHeight = this.viewHeight
    const halfWidth = halfHeight * aspect

    this.camera.left = -halfWidth
    this.camera.right = halfWidth
    this.camera.top = halfHeight
    this.camera.bottom = -halfHeight

    const distance = Math.max(this.viewHeight * 6, 800)
    this.camera.position
      .set(1, 1, 1)
      .normalize()
      .multiplyScalar(distance)
      .add(this.target)
    this.camera.lookAt(this.target)
    this.camera.updateProjectionMatrix()

    this.tileVeil()
    this.fitShadowCamera(halfWidth, halfHeight)
    this.rebuildGround()
    this.invalidate()
  }

  /**
   * Puts the shadow under the focused plot, sized to the plot's own footprint.
   *
   * The plot is centred on the screen, so the shadow only has to be dropped by
   * half the plot's height to sit under it. Widths are worked out in the space
   * the backdrop is drawn in, where the screen runs from -1 to 1 whichever way
   * round it is.
   */
  private layShadow(mesh: Mesh, scale: number): void {
    // Measured through the camera rather than worked out from the angles it is
    // set at: the plot's base is a square on the floor, and where its corners
    // land on screen is exactly the shape the shadow under it should be.
    this.camera.updateMatrixWorld()

    const half = (this.columnWidth * scale) / 2
    const middle = mesh.position
    const base = this.shadowAt.copy(middle).project(this.camera)

    // The two corners of the base that the camera puts furthest apart: one
    // below the middle, one beside it. Both diagonals are measured rather than
    // worked out, so the shadow keeps the plot's own proportions at any zoom.
    const drop = Math.abs(
      this.shadowEdge.set(middle.x + half, middle.y, middle.z + half).project(this.camera).y -
        base.y
    )
    const reach = Math.abs(
      this.shadowEdge.set(middle.x + half, middle.y, middle.z - half).project(this.camera).x -
        base.x
    )

    // Hung on the near corner rather than on the middle of the base: the middle
    // is behind the plot's own faces, where none of the shadow would show.
    this.shadowPane.position.set(base.x, base.y - drop, 0)
    this.shadowPane.scale.set(reach * 2 * SHADOW_SPREAD, drop * 2 * SHADOW_SPREAD, 1)
  }

  /**
   * Tiles the backdrop at the size the board's own blocks are drawn at, so a
   * plot on the stage stands against the same paving as the board it came from
   * rather than against a pattern of its own.
   */
  private tileVeil(): void {
    if (!this.veilTexture) return
    const aspect = (this.canvas.clientWidth || 1) / (this.canvas.clientHeight || 1)
    const blocksDown = this.viewHeight * 2
    this.veilTexture.repeat.set(blocksDown * aspect, blocksDown)
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

    this.sun.target.position.copy(this.target)
    this.sun.target.updateMatrixWorld()
    this.sun.position
      .set(0.55, 1.15, 0.8)
      .normalize()
      .multiplyScalar(radius * 2.2)
      .add(this.target)
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
   * One frame: the board, the veil over all of it, then the focused plot.
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

    this.renderer.clear()

    const hero = this.veil > 0 ? this.focusedMesh : null
    if (!hero) {
      this.renderer.render(this.scene, this.camera)
      return
    }

    // Nothing of the board is left to see once the veil is up, so it stops
    // being drawn at all rather than being drawn and then painted over.
    if (this.veil < 0.995) {
      hero.visible = false
      this.renderer.render(this.scene, this.camera)
      hero.visible = true
    }

    this.veilMaterial.opacity = this.veil
    this.shadowMaterial.opacity = this.veil * SHADOW_STRENGTH
    this.renderer.render(this.veilScene, this.veilCamera)

    // Drawn after the veil so that it alone stays lit, but against the depth
    // the board just wrote rather than a fresh buffer: a plot that has only
    // begun to rise is still in its shaft, and the half of it that is below the
    // plaza has to stay buried until it has actually climbed out. Clearing here
    // would put the whole column in front of the floor from the first frame,
    // and hold it there through the last frame of the way back down.
    //
    // By the time the board stops being drawn at all, the plot is far enough
    // forward that nothing in the board could have covered it anyway.
    this.drawAlone(hero)
  }

  /**
   * Draws one plot with the rest of the board stood down.
   *
   * Visibility rather than a scene of its own: the lights, the environment and
   * the shadow map all belong to the one scene, and a plot lit by a copy of
   * them would drift away from the board it came out of.
   */
  private drawAlone(hero: Mesh): void {
    this.floorPatch.visible = false
    this.shaftPatch.visible = false
    const glinting = this.glintMesh.visible
    this.glintMesh.visible = false
    for (const instance of this.instances) {
      if (instance.mesh !== hero) instance.mesh.visible = false
    }

    this.renderer.render(this.scene, this.camera)

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
    this.blendedMaterial.dispose()
    this.veilPane.geometry.dispose()
    this.shadowPane.geometry.dispose()
    this.shadowMaterial.map?.dispose()
    this.shadowMaterial.dispose()
    this.veilTexture?.dispose()
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
 * A soft blob, for the shadow a focused plot lays on the backdrop.
 *
 * Squared off towards the middle rather than a plain radial fade, so it reads
 * as a shadow under something solid rather than as a smudge.
 */
function buildShadowTexture(): CanvasTexture | null {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) return null

  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.45, 'rgba(255, 255, 255, 0.85)')
  gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.28)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  return new CanvasTexture(canvas)
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
