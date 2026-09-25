<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { usePreferredReducedMotion, useResizeObserver } from '@vueuse/core'
import {
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'
import { buildPlayer, fetchSkin, skinMaterials, type PlayerModel } from '@/plots/playerModel'
import { getSkinUrl } from '@/helpers/playerHelper'
import type { PlayerRef } from '@/common/interfaces'

/**
 * Whose plot is on the stage: their skin, which can be turned by hand, and
 * what they have scored, with a way on to the plots either side of theirs.
 *
 * The skin has a small canvas of its own rather than a corner of the board's.
 * The panel is glass over the board, so anything the board drew under it would
 * be blurred with everything else. It is also the one thing on screen that
 * moves on its own, and the board is not redrawn sixty times a second for it.
 */
const props = defineProps<{
  uuid: string
  name: string
  score: string | null
  rank: number | null
  medal: string | null
  prev: PlayerRef | null
  next: PlayerRef | null
  /** Down the side of a landscape screen, or along the bottom of a portrait one. */
  landscape: boolean
}>()

const emit = defineEmits<{ step: [uuid: string] }>()

/** Radians per pixel dragged, the same feel as spinning the plot itself. */
const TURN_PER_PIXEL = 0.011
/** Turned a little towards the plot beside them, so they read as a figure. */
const RESTING_YAW = 0.5
/** Half the room the model takes, in skin pixels, with space for the arms. */
const HALF_HEIGHT = 17
const HALF_WIDTH = 9.5
const FOV = 28
/** Looking down on them a touch, as you would at someone across a table. */
const ELEVATION = 0.12
/** The perspective brings the near side of the model out past the fit. */
const FIT_MARGIN = 1.12

const canvas = ref<HTMLCanvasElement | null>(null)
/** Whether the skin is on the model yet, rather than the grey stand-in. */
const ready = ref(false)
const motion = usePreferredReducedMotion()

const scene = new Scene()
const camera = new PerspectiveCamera(FOV, 1, 1, 500)
scene.add(new HemisphereLight(0xffffff, 0x94a3b8, 2.4))
const sun = new DirectionalLight(0xffffff, 1.6)
sun.position.set(-8, 16, 12)
scene.add(sun)

let renderer: WebGLRenderer | null = null
let model: PlayerModel | null = null
let materials: MeshLambertMaterial[] = []
let yaw = RESTING_YAW
let dragX: number | null = null
let frameHandle: number | null = null
let dirty = true
let disposed = false
/** Bumped per skin asked for, so a slow one cannot land over a newer one. */
let loading = 0

function release(): void {
  if (model) {
    scene.remove(model.root)
    model.root.traverse((object) => object instanceof Mesh && object.geometry.dispose())
  }
  for (const material of materials) {
    material.map?.dispose()
    material.dispose()
  }
  model = null
  materials = []
}

function show(next: PlayerModel, owned: MeshLambertMaterial[]): void {
  release()
  model = next
  materials = owned
  // At rest the arms hang a few degrees out from the sides, as in game.
  next.leftArm.rotation.z = Math.PI * 0.02
  next.rightArm.rotation.z = -Math.PI * 0.02
  scene.add(next.root)
  dirty = true
}

/** A plain grey figure, for while the skin is on its way or if it never comes. */
function showStandIn(): void {
  const grey = new MeshLambertMaterial({ color: 0x94a3b8 })
  show(buildPlayer(grey, null, false), [grey])
}

watch(
  () => props.uuid,
  async (uuid) => {
    const mine = ++loading
    ready.value = false
    // The last player's skin would be the wrong person for as long as the new
    // one takes, so the stand-in goes up in the meantime.
    showStandIn()
    try {
      const skin = await fetchSkin(getSkinUrl(uuid))
      if (mine !== loading || disposed) return
      const { inner, outer } = skinMaterials(skin)
      show(buildPlayer(inner, outer, skin.slim), [inner, outer])
      ready.value = true
    } catch (error) {
      // Offline, or not a skin at all: the stand-in stays, which is still a
      // person standing by their plot.
      if (mine === loading) console.warn('[skin] could not load:', error)
    }
  },
  { immediate: true }
)

function fit(): void {
  const element = canvas.value
  if (!renderer || !element) return
  const width = element.clientWidth || 1
  const height = element.clientHeight || 1
  renderer.setSize(width, height, false)

  camera.aspect = width / height
  const half = Math.max(HALF_HEIGHT, HALF_WIDTH / camera.aspect) * FIT_MARGIN
  const distance = half / Math.tan((FOV * Math.PI) / 360)
  camera.position.set(0, distance * Math.sin(ELEVATION), distance * Math.cos(ELEVATION))
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()
  dirty = true
}

function frame(now: number): void {
  frameHandle = requestAnimationFrame(frame)
  if (!renderer || !model) return

  if (motion.value !== 'reduce') {
    // The game's own idle: the arms breathing in and out from the sides.
    const t = (now / 1000) * 1.6
    model.leftArm.rotation.z = Math.cos(t) * 0.03 + Math.PI * 0.02
    model.rightArm.rotation.z = Math.cos(t + Math.PI) * 0.03 - Math.PI * 0.02
    dirty = true
  }
  if (!dirty) return
  dirty = false

  model.root.rotation.y = yaw
  renderer.render(scene, camera)
}

function onPointerDown(event: PointerEvent): void {
  dragX = event.clientX
  canvas.value?.setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent): void {
  if (dragX === null) return
  // Turned the way the hand goes, like something on a table taken by its front.
  yaw += (event.clientX - dragX) * TURN_PER_PIXEL
  dragX = event.clientX
  dirty = true
}

function onPointerUp(): void {
  dragX = null
}

useResizeObserver(canvas, fit)

onMounted(() => {
  if (!canvas.value) return
  renderer = new WebGLRenderer({ canvas: canvas.value, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  fit()
  frameHandle = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  disposed = true
  if (frameHandle !== null) cancelAnimationFrame(frameHandle)
  release()
  // The panel comes and goes with every plot picked, and a browser only keeps
  // a handful of contexts alive: this one is handed back now rather than
  // whenever the garbage collector gets round to it.
  renderer?.dispose()
  renderer?.forceContextLoss()
  renderer = null
})
</script>

<template>
  <section
    aria-label="Plot owner"
    class="flex rounded-xl border border-white/60 bg-white/55 backdrop-blur-sm"
    :class="
      landscape ? 'w-[clamp(10rem,22vw,16rem)] flex-col gap-2 p-3' : 'w-full items-center gap-3 p-2'
    "
  >
    <canvas
      ref="canvas"
      role="img"
      :aria-label="`${name}'s skin. Drag to turn.`"
      class="skin block shrink-0 cursor-grab touch-none active:cursor-grabbing"
      :class="[landscape ? 'skin--tall w-full' : 'h-28 w-20', { 'skin--ready': ready }]"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    />

    <div class="flex min-w-0 flex-1 flex-col gap-2">
      <div class="min-w-0">
        <p class="flex min-w-0 items-baseline gap-1.5">
          <span v-if="rank" class="sr-only">Rank {{ rank }},</span>
          <span v-if="medal" aria-hidden="true">{{ medal }}</span>
          <span
            v-else-if="rank"
            aria-hidden="true"
            class="text-sm font-semibold tabular-nums text-slate-500"
          >
            #{{ rank }}
          </span>
          <span class="truncate text-base font-bold text-slate-900">{{ name }}</span>
        </p>
        <p v-if="score" class="text-xl font-bold tabular-nums text-slate-800">
          {{ score }}
          <span class="text-xs font-semibold text-slate-500">points</span>
        </p>
        <p v-else class="text-sm italic text-slate-500">Unranked</p>
      </div>

      <div class="flex justify-between gap-1">
        <button
          type="button"
          class="step"
          :disabled="!prev"
          :aria-label="prev ? `Previous plot: ${prev.name}` : 'No previous plot'"
          :title="prev?.name"
          @click="prev && emit('step', prev.uuid)"
        >
          <i class="pi pi-chevron-left text-[10px]" aria-hidden="true" />
          <span v-if="prev?.rank" aria-hidden="true">#{{ prev.rank }}</span>
        </button>
        <button
          type="button"
          class="step"
          :disabled="!next"
          :aria-label="next ? `Next plot: ${next.name}` : 'No next plot'"
          :title="next?.name"
          @click="next && emit('step', next.uuid)"
        >
          <span v-if="next?.rank" aria-hidden="true">#{{ next.rank }}</span>
          <i class="pi pi-chevron-right text-[10px]" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * Tall enough to stand the player up in, but never so tall on a short screen
 * that the name and score beneath are pushed off it.
 */
.skin--tall {
  height: max(6rem, min(calc((clamp(10rem, 22vw, 16rem) - 1.5rem) * 1.35), calc(100dvh - 15rem)));
}

/*
 * The grey stand-in waits half there, and the skin comes up to full once it
 * has arrived - and drops back the same way when the next player is asked for.
 */
.skin {
  opacity: 0.35;
  transition: opacity 200ms ease;
}

.skin--ready {
  opacity: 1;
}

.step {
  @apply flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold tabular-nums text-slate-600 transition-colors hover:bg-white/60 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600 disabled:pointer-events-none disabled:opacity-30;
}

@media (prefers-reduced-motion: reduce) {
  .skin {
    transition: none;
  }
}
</style>
