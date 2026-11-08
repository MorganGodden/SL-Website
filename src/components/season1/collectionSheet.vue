<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  fetchCollection,
  type CollectionDocument,
  type CollectionItem
} from '@/plots/collectionClient'
import { iconStyle, itemIcon } from '@/plots/itemIcons'
import { getHeadUrl } from '@/helpers/playerHelper'
import { getMedalEmoji } from '@/common/utilities'

/**
 * One player's Collection Log: a sheet of glass over the board, opened from
 * their card. Everything there is to collect, by name, with what they have
 * logged in colour and the rest faded, and the top tier edged in its colour.
 *
 * It takes the keyboard while it is up. Escape closes it, and nothing typed
 * into its search reaches the board behind, whose own keys would zoom it.
 */
const props = defineProps<{
  uuid: string
  name: string
  /** How far up from the bottom of the window the player's card reaches, which the sheet keeps clear of. */
  below: number
}>()
const emit = defineEmits<{ close: [] }>()

/** Icons are drawn at this size, in CSS pixels: one and a half texels each. */
const ICON = 24
const LATEST = 8
/** Placeholder tiles while the log is on its way: about two rows of a wide sheet. */
const SKELETON_TILES = 36

const log = ref<CollectionDocument | null>(null)
const state = ref<'loading' | 'ready' | 'failed' | 'unknown'>('loading')
/** The only tier shown, or null for all. */
const tierShown = ref<string | null>(null)
const missingOnly = ref(false)
const search = ref('')
const closeButton = ref<HTMLButtonElement | null>(null)

async function load(): Promise<void> {
  state.value = 'loading'
  try {
    log.value = await fetchCollection(props.uuid)
    state.value = log.value ? 'ready' : 'unknown'
  } catch (error) {
    console.warn('[collection] could not load:', error)
    state.value = 'failed'
  }
}
void load()

/** `diamond_sword` -> `Diamond Sword`. */
function itemName(id: string): string {
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function titled(tier: string): string {
  return tier.charAt(0).toUpperCase() + tier.slice(1)
}

function points(value: number): string {
  return `${value} pt${value === 1 ? '' : 's'}`
}

const pointsOf = computed(() => new Map(log.value?.tiers.map((tier) => [tier.name, tier.points])))
/** The tier worth the most, which gets an edge. */
const topTier = computed(() => {
  const tiers = log.value?.tiers ?? []
  return tiers.length > 0 ? tiers[tiers.length - 1].name : null
})

/**
 * Minecraft's rarity colours, lowest first - common, uncommon, rare, epic -
 * with common in slate, since the game's white would vanish on the glass.
 */
const RARITY_BARS = ['bg-slate-400', 'bg-yellow-500', 'bg-cyan-500', 'bg-fuchsia-500']

/** A tier's colour by where it stands among however many there are. */
function tierColour(name: string): string {
  const tiers = log.value?.tiers ?? []
  const last = tiers.length - 1
  const index = tiers.findIndex((tier) => tier.name === name)
  return RARITY_BARS[last <= 0 ? 0 : Math.round((index * (RARITY_BARS.length - 1)) / last)]
}

const WHEN = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
})
const DAY = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' })

interface Tile {
  item: CollectionItem
  label: string
  icon: Record<string, string> | null
  initials: string
}

function tile(item: CollectionItem): Tile {
  const spot = itemIcon(item.id)
  return {
    item,
    label: `${itemName(item.id)} · ${titled(item.tier)} · ${points(pointsOf.value.get(item.tier) ?? 0)} · ${
      item.at === null ? 'not yet' : WHEN.format(item.at)
    }`,
    icon: spot ? iconStyle(spot, ICON) : null,
    initials: item.id
      .split('_')
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
  }
}

const shown = computed(() => {
  const term = search.value.trim().toLowerCase()
  return (log.value?.items ?? [])
    .filter(
      (item) =>
        (tierShown.value === null || item.tier === tierShown.value) &&
        !(missingOnly.value && item.at !== null) &&
        (!term || itemName(item.id).toLowerCase().includes(term))
    )
    .map(tile)
})

/** What is shown, a section to a tier, easiest first: the order the tiers come in. */
const sections = computed(() =>
  (log.value?.tiers ?? [])
    .map((tier) => ({ tier, tiles: shown.value.filter((entry) => entry.item.tier === tier.name) }))
    .filter((section) => section.tiles.length > 0)
)

const latest = computed(() =>
  (log.value?.items ?? [])
    .filter((item) => item.at !== null)
    .sort((a, b) => (b.at ?? 0) - (a.at ?? 0))
    .slice(0, LATEST)
    .map(tile)
)

function percent(part: number, whole: number): string {
  return `${whole > 0 ? (part / whole) * 100 : 0}%`
}

let returnFocus: HTMLElement | null = null

function onKeyDown(event: KeyboardEvent): void {
  // Caught on the way down, before the board's own listener can see it.
  event.stopPropagation()
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
  }
}

onMounted(() => {
  returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  window.addEventListener('keydown', onKeyDown, true)
  closeButton.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown, true)
  // Back to the button that opened it, if it is still there.
  returnFocus?.focus()
})
</script>

<template>
  <!--
    The backdrop is clear: the board behind is softened by the page, not by
    this. It sits between the leaderboard's island at the top and the player's
    card at the bottom, with the same clear gap to each.
  -->
  <div
    class="fixed inset-0 z-30 flex items-center justify-center px-4 pt-[6.5rem] sm:pt-[7rem]"
    :style="{ paddingBottom: `calc(${below}px + 2rem)` }"
    @pointerdown.self="emit('close')"
  >
    <section
      role="dialog"
      aria-modal="true"
      aria-labelledby="collection-title"
      class="sheet glass flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl"
    >
      <header class="flex items-center gap-3 px-4 pb-3 pt-3.5">
        <img :src="getHeadUrl(uuid)" alt="" class="size-8 shrink-0 rounded-md" />
        <div class="min-w-0 flex-1">
          <h2
            id="collection-title"
            class="truncate text-[15px] font-semibold tracking-tight text-slate-900"
          >
            {{ name }}'s collection log
          </h2>
          <p class="min-h-4 truncate text-xs leading-4 tabular-nums text-slate-600">
            <template v-if="log">
              <template v-if="log.rank">
                {{ getMedalEmoji(log.rank) ?? `#${log.rank}` }} ·
              </template>
              {{ log.score.toLocaleString() }} pts · {{ log.collected.toLocaleString() }} of
              {{ log.total.toLocaleString() }} logged
            </template>
          </p>
        </div>
        <button
          ref="closeButton"
          type="button"
          class="round"
          aria-label="Close the collection log"
          title="Close"
          @click="emit('close')"
        >
          <i class="pi pi-times text-[11px]" aria-hidden="true" />
        </button>
      </header>

      <div
        v-if="state === 'loading'"
        class="grid grid-cols-[repeat(auto-fill,2.125rem)] gap-1.5 px-4 pb-4 pt-1"
        role="status"
        aria-label="Fetching the collection log"
      >
        <span v-for="i in SKELETON_TILES" :key="i" class="skeleton size-[2.125rem] rounded-lg" />
      </div>

      <p v-else-if="state === 'failed'" class="px-4 pb-6 pt-2 text-center text-sm text-slate-600">
        The collection log could not be reached.
        <button
          type="button"
          class="font-semibold text-primary-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          @click="load"
        >
          Try again
        </button>
      </p>

      <p v-else-if="state === 'unknown'" class="px-4 pb-6 pt-2 text-center text-sm text-slate-600">
        {{ name }} has not been on the server yet.
      </p>

      <template v-else-if="log">
        <!-- Two to a row, however many tiers the server has: four do not fit on one. -->
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 px-4">
          <div v-for="tier in log.tiers" :key="tier.name" class="grid min-w-0 gap-1 text-xs">
            <div class="flex justify-between gap-2 whitespace-nowrap tabular-nums text-slate-600">
              <span class="min-w-0 truncate">
                <span class="font-semibold text-slate-900">{{ titled(tier.name) }}</span>
                · {{ points(tier.points) }}
              </span>
              <span>{{ tier.collected.toLocaleString() }} / {{ tier.total.toLocaleString() }}</span>
            </div>
            <div class="h-1.5 overflow-hidden rounded-full bg-slate-900/10">
              <span
                class="block h-full rounded-full"
                :class="tierColour(tier.name)"
                :style="{ width: percent(tier.collected, tier.total) }"
              />
            </div>
          </div>
        </div>

        <div v-if="latest.length > 0" class="px-4 pt-3">
          <h3 class="label">Latest</h3>
          <ul class="mt-1.5 flex gap-2 overflow-x-auto pb-1" aria-label="Latest logged">
            <li
              v-for="entry in latest"
              :key="entry.item.id"
              class="grid w-12 shrink-0 justify-items-center gap-1"
            >
              <span
                class="tile"
                :class="{ 'tile--top': entry.item.tier === topTier }"
                role="img"
                :aria-label="entry.label"
                :title="entry.label"
              >
                <span v-if="entry.icon" class="icon" :style="entry.icon" />
                <span v-else class="initials">{{ entry.initials }}</span>
              </span>
              <span class="text-[10.5px] leading-3 tabular-nums text-slate-500" aria-hidden="true">
                {{ DAY.format(entry.item.at ?? 0) }}
              </span>
            </li>
          </ul>
        </div>
        <p v-else class="px-4 pt-3 text-xs text-slate-600">Nothing logged yet.</p>

        <div class="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 pb-2 pt-3">
          <div class="seg" role="group" aria-label="Tier">
            <button type="button" :aria-pressed="tierShown === null" @click="tierShown = null">
              All
            </button>
            <button
              v-for="tier in log.tiers"
              :key="tier.name"
              type="button"
              :aria-pressed="tierShown === tier.name"
              @click="tierShown = tier.name"
            >
              {{ titled(tier.name) }}
            </button>
          </div>
          <label class="flex cursor-pointer items-center gap-1.5 text-xs text-slate-700">
            <input v-model="missingOnly" type="checkbox" class="accent-primary-600" />
            Missing only
          </label>
          <label class="sr-only" for="collection-search">Search items</label>
          <input
            id="collection-search"
            v-model="search"
            type="search"
            placeholder="Search items"
            class="ml-auto w-full rounded-lg border border-white/60 bg-white/50 px-3 py-1 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600 sm:w-44"
          />
        </div>

        <div class="items min-h-0 flex-1 overflow-y-auto px-4 pb-4 pt-1">
          <div v-if="sections.length > 0" class="grid gap-3">
            <section v-for="{ tier, tiles } in sections" :key="tier.name" class="grid gap-1.5">
              <h3 class="label">{{ titled(tier.name) }}</h3>
              <ul
                class="grid grid-cols-[repeat(auto-fill,2.125rem)] gap-1.5"
                :aria-label="`${titled(tier.name)} items`"
              >
                <li v-for="entry in tiles" :key="entry.item.id">
                  <span
                    class="tile"
                    :class="{
                      'tile--missing': entry.item.at === null,
                      'tile--top': entry.item.tier === topTier
                    }"
                    role="img"
                    :aria-label="entry.label"
                    :title="entry.label"
                  >
                    <span v-if="entry.icon" class="icon" :style="entry.icon" />
                    <span v-else class="initials">{{ entry.initials }}</span>
                  </span>
                </li>
              </ul>
            </section>
          </div>
          <p v-else class="py-6 text-center text-sm text-slate-600">
            {{ search ? `No item matching “${search}”` : 'Every one of these is logged.' }}
          </p>
        </div>
      </template>
    </section>
  </div>
</template>

<style scoped>
.round {
  @apply flex size-9 shrink-0 items-center justify-center rounded-full bg-white/50 text-slate-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600;
}

@media (hover: hover) and (pointer: fine) {
  .round:hover {
    @apply bg-white/75 text-slate-900;
  }
}

.label {
  @apply text-[11px] font-semibold uppercase tracking-wider text-slate-500;
}

.seg {
  @apply inline-flex rounded-lg bg-slate-900/[0.06] p-0.5;
}

.seg button {
  @apply rounded-md px-2.5 py-1 text-xs font-semibold text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600;
}

.seg button[aria-pressed='true'] {
  @apply bg-white text-slate-900 shadow-sm;
}

.tile {
  display: grid;
  place-items: center;
  width: 2.125rem;
  height: 2.125rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.7);
}

/* The top tier: a thin edge in its colour, logged or not, so the rarest stand out either way. */
.tile--top {
  box-shadow:
    inset 0 0 0 1.5px #c026d3,
    0 0 0 1px rgba(192, 38, 211, 0.18);
}

.icon {
  width: 24px;
  height: 24px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
}

.initials {
  font-size: 10px;
  font-weight: 600;
  color: rgb(100 116 139);
}

/* Not yet logged: there to be looked for, but faded back. */
.tile--missing .icon,
.tile--missing .initials {
  filter: grayscale(1);
  opacity: 0.3;
}

/*
 * A phone on its side has no height to spare for a fixed head over the items:
 * the whole sheet scrolls instead, so the items still get the full height.
 */
@media (orientation: landscape) and (max-height: 480px) {
  .sheet {
    overflow-y: auto;
  }

  .items {
    flex: none;
    overflow: visible;
  }
}

.skeleton {
  background-color: rgba(15, 23, 42, 0.1);
  animation: skeleton-pulse 1.6s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  50% {
    opacity: 0.45;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation: none;
  }
}
</style>
