import {
  ACESFilmicToneMapping,
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
  MeshStandardMaterial,
  NearestFilter,
  NearestMipmapLinearFilter,
  OrthographicCamera,
  PCFShadowMap,
  PMREMGenerator,
  Raycaster,
  RepeatWrapping,
  SRGBColorSpace,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  type Texture
} from 'three'
import atlasUrl from '@/assets/textures/blocks.png'
import { SCREEN_UP_ON_FLOOR, wrapDistance } from './boardLayout'
import type { ColumnMesh } from './mesher'

// The scene is lit, so colours must be managed: block colours are authored in
// sRGB and converted to linear in the mesher, and the renderer converts back on
// output. Turning this off would wash out every lit surface.
ColorManagement.enabled = true

/** Brightness at the bottom of a plot shaft, relative to its lip. */
const DEPTH_SHADE = 0.28

/**
 * Alpha below which a textured face is punched through rather than drawn.
 *
 * Only leaves, bars and the like have any partly transparent texels once the
 * atlas is baked, so this costs nothing on the blocks that do not need it.
 */
const CUTOUT_ALPHA = 0.5

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
  private atlas: Texture | null = null
  private floorMaterial: MeshStandardMaterial
  private shaftMaterial: MeshStandardMaterial
  private sun!: DirectionalLight
  private environment: Texture | null = null

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

  private frameRequested = false
  private disposed = false

  private raycaster = new Raycaster()
  private pointer = new Vector2()
  /** Scratch list for picking, reused so hover testing allocates nothing. */
  private pickable: Mesh[] = []

  private viewHeight = 100
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

    this.loadAtlas()

    this.floorMaterial = new MeshStandardMaterial({
      color: new Color(0xf3f7fb),
      roughness: 0.96,
      metalness: 0,
      envMapIntensity: 1.2
    })
    this.floorMaterial.map = buildSlabTexture()

    this.shaftMaterial = new MeshStandardMaterial({
      color: new Color(0xb4ab9d),
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
    this.scene.add(this.floorPatch)

    this.shaftPatch = new Mesh(new BufferGeometry(), this.shaftMaterial)
    this.shaftPatch.receiveShadow = true
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
        this.material.map = texture
        this.material.needsUpdate = true
        this.blendedMaterial.map = texture
        this.blendedMaterial.needsUpdate = true
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

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(mesh.positions, 3))
    geometry.setAttribute('normal', new BufferAttribute(mesh.normals, 3, true))
    geometry.setAttribute('color', new BufferAttribute(mesh.colours, 3))
    geometry.setAttribute('uv', new BufferAttribute(mesh.uvs, 2))
    geometry.setIndex(new BufferAttribute(mesh.indices, 1))

    // Two draw ranges over one index buffer: solid blocks, then glass, ice and
    // water over the top of them. A group with no indices is left out entirely
    // rather than submitted as an empty draw call.
    const blended = mesh.indices.length - mesh.opaqueIndexCount
    if (mesh.opaqueIndexCount > 0) geometry.addGroup(0, mesh.opaqueIndexCount, 0)
    if (blended > 0) geometry.addGroup(mesh.opaqueIndexCount, blended, 1)

    geometry.computeBoundingSphere()

    if (this.baseMinY === null) this.baseMinY = mesh.minY

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
      const mesh = new Mesh(undefined, [this.material, this.blendedMaterial])
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.visible = false
      this.scene.add(mesh)
      this.instances.push({ mesh, uuid: null })
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
      instance.mesh.position.set(
        slot.x,
        column.minY - (this.baseMinY ?? column.minY),
        slot.z
      )
      instance.mesh.rotation.y = (slot.turn ?? 0) * (Math.PI / 2)
    }
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
    this.viewHeight = this.spacing * 1.35
    this.resize()
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

    this.fitShadowCamera(halfWidth, halfHeight)
    this.rebuildGround()
    this.invalidate()
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
    this.renderer.render(this.scene, this.camera)
  }

  /** Requests a redraw on the next frame. Repeated calls coalesce. */
  invalidate(): void {
    if (this.disposed || this.frameRequested) return
    this.frameRequested = true
    requestAnimationFrame(() => {
      this.frameRequested = false
      if (this.disposed) return
      this.renderer.render(this.scene, this.camera)
    })
  }

  /** Releases every GPU resource this renderer owns. */
  dispose(): void {
    if (this.disposed) return
    this.disposed = true

    for (const instance of this.instances) this.scene.remove(instance.mesh)
    this.instances = []

    for (const column of this.columns.values()) column.geometry.dispose()
    this.columns.clear()

    this.scene.remove(this.floorPatch)
    this.scene.remove(this.shaftPatch)
    this.floorPatch.geometry.dispose()
    this.shaftPatch.geometry.dispose()

    this.material.dispose()
    this.blendedMaterial.dispose()
    this.atlas?.dispose()
    this.floorMaterial.map?.dispose()
    this.floorMaterial.dispose()
    this.shaftMaterial.dispose()
    this.environment?.dispose()
    this.renderer.dispose()
  }
}

/**
 * A faint grid for the ring floor, so it reads as the slab plaza it is in-world
 * rather than as an endless blank plane. It also gives the eye a sense of scale
 * next to the blocks.
 */
function buildSlabTexture(): CanvasTexture | null {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) return null

  context.fillStyle = '#ffffff'
  context.fillRect(0, 0, size, size)
  context.strokeStyle = 'rgba(120, 132, 146, 0.18)'
  context.lineWidth = 2
  context.strokeRect(0, 0, size, size)

  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  // One cell every two blocks. UVs are in blocks, so this tiles across the
  // whole patch without a seam.
  texture.repeat.set(0.5, 0.5)
  texture.anisotropy = 4
  return texture
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
  geometry.setIndex(indices)
  geometry.computeBoundingSphere()
  return geometry
}
