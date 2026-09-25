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
import Slider from 'primevue/slider'
import { buildPlayer, fetchSkin, skinMaterials, type PlayerModel } from '@/plots/playerModel'
import { getHeadUrl, getSkinUrl } from '@/helpers/playerHelper'
import type { PlayerRef } from '@/common/interfaces'

/**
 * The card under a plot on the stage: whose it is - their skin, which can be
 * turned by hand, and what they have scored - with a way on to the plots
 * either side of theirs, the slice, and the way back to the board.
 *
 * The skin has a small canvas of its own rather than a corner of the board's.
 * It is the one thing on screen that moves on its own, and the board is not
 * redrawn sixty times a second for it.
 */
const props = defineProps<{
  uuid: string
  name: string
  score: string | null
  rank: number | null
  medal: string | null
  prev: PlayerRef | null
  next: PlayerRef | null
  slice: {
    /** Layers currently drawn, from 1 to `layers`. */
    cut: number
    /** Layers the plot has anything in at all. */
    layers: number
    /** World y of the topmost layer still drawn. */
    worldY: number
    /** Layer index of the plot's grass, which the track marks. */
    surface: number
  }
  /** Which gestures to offer: a portrait screen is a phone near enough always. */
  landscape: boolean
}>()

const emit = defineEmits<{ step: [uuid: string]; slice: [cut: number]; back: [] }>()

const HINT = 'Drag to spin · scroll to zoom · Ctrl + scroll to slice'
const HINT_TOUCH = 'Drag to spin · pinch to zoom'
/**
 * The slice track is banded like a plot's own cross-section: stone, this many
 * layers of dirt, the grass the plot was generated with, and then the sky
 * whatever has been built on it stands in. Muted, so it sits with the glass
 * rather than shouting over the build it describes.
 */
const DIRT_LAYERS = 3
const STRATA = { stone: '#8d939a', dirt: '#94704f', grass: '#6f9e4f', sky: '#8fb8e0' }

/** How far along the track the cut stands: 0 at the bottom layer, 1 at the top. */
function cutFraction(): number {
  const { cut, layers } = props.slice
  return layers > 1 ? (cut - 1) / (layers - 1) : 1
}

/**
 * The track, drawn from the plot's real surface: the grass band on it is the
 * layer the handle has to come down to for the ground to show.
 */
function strata(): string {
  const { layers, surface } = props.slice
  const at = (layer: number) => `${(Math.min(Math.max(layer, 0), layers) / layers) * 100}%`
  const dirt = at(surface - DIRT_LAYERS)
  const grass = at(surface)
  const turf = `calc(${grass} + 3px)`
  return `linear-gradient(to right, ${STRATA.stone} ${dirt}, ${STRATA.dirt} ${dirt} ${grass}, ${STRATA.grass} ${grass} ${turf}, ${STRATA.sky} ${turf})`
}

/** Radians per pixel dragged, the same feel as spinning the plot itself. */
const TURN_PER_PIXEL = 0.011
/** Turned a little towards the rest of the card, so they read as a figure. */
const RESTING_YAW = 0.5
/**
 * The bust, in skin pixels: the head and shoulders are always in frame, with
 * the top of the head held a block from the top of the canvas and room for
 * the arms to sway and for it to be turned. However much taller than that the
 * canvas is shows more of the chest below, which fades out (see `.skin`).
 */
const HEAD_TOP = 17.5
const HALF_HEIGHT = 9
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
  const centre = HEAD_TOP - half
  camera.position.set(0, centre + distance * Math.sin(ELEVATION), distance * Math.cos(ELEVATION))
  camera.lookAt(0, centre, 0)
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
  <!--
    One card of glass, pinned under the plot. The owner's bust stands at its
    left with their head over its top edge, fading out down the chest into the
    glass. Everything beside it starts on one left edge and ends on one right
    edge, with the two round buttons - back and whole plot - in a column of
    their own past it. Laid out by area: see the styles.
  -->
  <section aria-label="Plot on show" class="card glass">
    <div class="bust">
      <canvas
        ref="canvas"
        role="img"
        :aria-label="`${name}'s skin. Drag to turn.`"
        class="skin absolute inset-0 block size-full cursor-grab touch-none active:cursor-grabbing"
        :class="{ 'skin--ready': ready }"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      />
    </div>

    <p class="name flex min-w-0 items-center gap-1.5">
      <span v-if="rank" class="sr-only">Rank {{ rank }},</span>
      <span v-if="medal" aria-hidden="true" class="text-base leading-none">{{ medal }}</span>
      <span
        v-else-if="rank"
        aria-hidden="true"
        class="rounded-md bg-slate-900/[0.06] px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-slate-600"
      >
        #{{ rank }}
      </span>
      <span class="truncate text-[15px] font-semibold tracking-tight text-slate-900">
        {{ name }}
      </span>
    </p>
    <p
      v-if="score"
      class="score text-2xl font-semibold leading-none tracking-tight tabular-nums text-slate-900"
    >
      {{ score }}
      <span class="text-xs font-medium tracking-normal text-slate-600">points</span>
    </p>
    <p v-else class="score text-sm font-medium text-slate-600">Unranked</p>

    <!-- The plots either side, by who owns them rather than by where they rank. -->
    <nav aria-label="Other plots" class="steps grid grid-cols-2 gap-1">
      <button
        type="button"
        class="step"
        :disabled="!prev"
        :aria-label="prev ? `Previous plot: ${prev.name}` : 'No previous plot'"
        :title="prev?.name"
        @click="prev && emit('step', prev.uuid)"
      >
        <i class="pi pi-chevron-left text-[10px]" aria-hidden="true" />
        <template v-if="prev">
          <img :src="getHeadUrl(prev.uuid)" alt="" class="size-4 shrink-0 rounded-[3px]" />
          <span class="truncate">{{ prev.name }}</span>
        </template>
        <span v-else aria-hidden="true">First</span>
      </button>
      <button
        type="button"
        class="step justify-end"
        :disabled="!next"
        :aria-label="next ? `Next plot: ${next.name}` : 'No next plot'"
        :title="next?.name"
        @click="next && emit('step', next.uuid)"
      >
        <template v-if="next">
          <span class="truncate">{{ next.name }}</span>
          <img :src="getHeadUrl(next.uuid)" alt="" class="size-4 shrink-0 rounded-[3px]" />
        </template>
        <span v-else aria-hidden="true">Last</span>
        <i class="pi pi-chevron-right text-[10px]" aria-hidden="true" />
      </button>
    </nav>

    <!--
      The slice. The track is the plot's cross-section; what has been cut away
      is washed out past the handle, and the handle carries the height the cut
      stands at.
    -->
    <div class="slice flex min-w-0 items-center gap-3">
      <span class="slice-label text-[11px] font-medium text-slate-600">Slice</span>
      <div class="track relative h-2.5 min-w-0 flex-1">
        <div
          aria-hidden="true"
          class="absolute inset-0 overflow-hidden rounded-full"
          :style="{ background: strata() }"
        >
          <div
            class="absolute inset-y-0 right-0 bg-white/70"
            :style="{ width: (1 - cutFraction()) * 100 + '%' }"
          />
        </div>
        <Slider
          :model-value="slice.cut"
          :min="1"
          :max="slice.layers"
          :disabled="slice.layers < 2"
          aria-label="Slice height"
          @update:model-value="emit('slice', Number($event))"
        />
        <span
          aria-hidden="true"
          class="readout pointer-events-none absolute whitespace-nowrap text-[11px] font-semibold tabular-nums text-slate-800"
          :style="{ left: cutFraction() * 100 + '%' }"
        >
          Y {{ slice.worldY }}
        </span>
      </div>
    </div>
    <!--
      Only there once something has been cut, at the end the cut comes back to,
      and under the way back so the two round buttons share a column.
    -->
    <button
      type="button"
      class="round reset"
      :disabled="slice.cut === slice.layers"
      aria-label="Show the whole plot"
      title="Whole plot"
      @click="emit('slice', slice.layers)"
    >
      <i class="pi pi-undo text-[11px]" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="round close"
      aria-label="Back to the board"
      title="Back to the board"
      @click="emit('back')"
    >
      <i class="pi pi-times text-[11px]" aria-hidden="true" />
    </button>

    <p class="hint truncate text-[11px] leading-4 text-slate-600">
      {{ landscape ? HINT : HINT_TOUCH }}
    </p>
  </section>
</template>

<style scoped>
/*
 * Laid out by area, so one set of elements serves every shape of screen, and
 * on two edges: whatever is beside the bust - name, score, the slice's label,
 * the hint - starts on one line, and the neighbours and the slice's track end
 * on another. The round buttons stand in a column past that.
 *
 * The bust spans the rows beside it, out to the card's bottom edge, and up by
 * `--lip` past its top, so the head stands over the edge without the card
 * growing to hold it: the plot above keeps clear of the card, and the head is
 * allowed into that gap. It takes its height from those rows rather than
 * giving them one, so the card is as tall as what is beside the bust.
 */
.card {
  --bust: 10rem;
  --lip: 1.25rem;
  --pad: 0.625rem;
  display: grid;
  grid-template-columns: var(--bust) minmax(0, 1fr) 18rem 2.25rem;
  grid-template-areas:
    'bust name  steps close'
    'bust score steps close'
    'bust slice slice reset'
    'bust hint  hint  .';
  align-items: center;
  column-gap: 0.75rem;
  row-gap: 0.25rem;
  width: min(100%, 46rem);
  padding: var(--pad) 0.75rem;
  border-radius: 1.75rem;
}

.bust {
  grid-area: bust;
  position: relative;
  align-self: stretch;
  margin-top: calc(-1 * (var(--pad) + var(--lip)));
  margin-bottom: calc(-1 * var(--pad));
}

.skin {
  /*
   * Chest up: solid through the head and shoulders, gone by the waist. The
   * drop shadow follows the model's own outline and is faded with it.
   */
  -webkit-mask-image: linear-gradient(to bottom, #000 66%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 66%, transparent 100%);
  filter: drop-shadow(0 4px 6px rgba(15, 23, 42, 0.16));
  /*
   * The grey stand-in waits half there, and the skin comes up to full once it
   * has arrived - and drops back the same way when the next player is asked for.
   */
  opacity: 0.35;
  transition: opacity 200ms ease;
}

.skin--ready {
  opacity: 1;
}

/* The name and score read as one block, whatever height the rows beside it reach. */
.name {
  grid-area: name;
  align-self: end;
}

.score {
  grid-area: score;
  align-self: start;
}

.steps {
  grid-area: steps;
}

/*
 * The handle overhangs the track by half its width at either end, so the
 * track is inset by that much: at the top and bottom of the cut the handle
 * itself meets the label and the right edge.
 */
.slice {
  grid-area: slice;
  height: 2.5rem;
}

.track {
  margin-inline: 1.375rem;
}

.reset {
  grid-area: reset;
}

.close {
  grid-area: close;
}

.hint {
  grid-area: hint;
}

/*
 * A short landscape screen - a phone on its side - gets one row, no taller than
 * the leaderboard's bar: the plot keeps the same room clear above it as below,
 * and the bar needs that much at the top anyway.
 */
@media (orientation: landscape) and (max-height: 480px) {
  .card {
    --bust: 5.25rem;
    --lip: 1.5rem;
    --pad: 0.5rem;
    grid-template-columns: var(--bust) minmax(0, 1fr) minmax(0, 13rem) minmax(0, 14rem) 2.25rem 2.25rem;
    grid-template-areas:
      'bust name  steps slice reset close'
      'bust score steps slice reset close';
    row-gap: 0.125rem;
    width: 100%;
  }

  /* The height on the handle says what the track is, and the track wants the room. */
  .hint,
  .slice-label {
    display: none;
  }
}

/*
 * Stacked: the owner, then the ways on, the slice and the hint, each starting
 * at the card's own edge once the bust is past.
 */
@media (orientation: portrait) {
  .card {
    --bust: 6.5rem;
    --lip: 2.5rem;
    grid-template-columns: var(--bust) minmax(0, 1fr) 2.25rem;
    grid-template-areas:
      'bust  name  close'
      'bust  score close'
      'steps steps steps'
      'slice slice reset'
      'hint  hint  hint';
    row-gap: 0.375rem;
    width: min(100%, 24rem);
  }

  /* Down to the owner's rows only: the ways on run the card's full width under it. */
  .bust {
    margin-bottom: 0;
  }
}

/*
 * PrimeVue's slider, emptied out to a hit area over the track: the strata
 * under it are the bar, and its handle is a pill the height reading sits on.
 */
.track :deep(.p-slider) {
  position: absolute;
  inset: 0;
  height: auto;
  background: transparent;
}

.track :deep(.p-slider-range) {
  background: transparent;
}

.track :deep(.p-slider-handle) {
  width: 2.75rem;
  height: 1.5rem;
  margin: -0.75rem 0 0;
  margin-inline-start: -1.375rem;
  background: white;
  box-shadow:
    0 0 0 1px rgba(15, 23, 42, 0.06),
    0 1px 2px rgba(15, 23, 42, 0.16),
    0 4px 10px rgba(15, 23, 42, 0.1);
  -webkit-tap-highlight-color: transparent;
}

.track :deep(.p-slider-handle::before) {
  display: none;
}

.readout {
  z-index: 1;
  top: 50%;
  transform: translate(-50%, -50%);
}

.step,
.round {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition:
    opacity 150ms ease,
    background-color 150ms ease,
    transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
}

.step {
  @apply flex h-9 min-w-0 items-center gap-1.5 rounded-xl bg-white/40 px-2.5 text-xs font-medium text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600 disabled:pointer-events-none;
}

/*
 * At either end of the board the button keeps its shape beside its partner,
 * so the pair still reads as a pair, and only what it says fades back.
 */
.step:disabled > * {
  opacity: 0.4;
}

.round {
  @apply flex size-9 items-center justify-center rounded-full bg-white/50 text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600 disabled:pointer-events-none disabled:opacity-0;
}

.step:active,
.round:active {
  transform: scale(0.97);
}

/* A tap would otherwise leave the button lit until the next tap elsewhere. */
@media (hover: hover) and (pointer: fine) {
  .step:hover,
  .round:hover {
    @apply bg-white/75 text-slate-900;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skin,
  .step,
  .round {
    transition: opacity 150ms ease;
  }

  .step:active,
  .round:active {
    transform: none;
  }
}
</style>
