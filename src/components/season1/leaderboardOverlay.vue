<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SEASONS } from '@/seasons/registry'
import { getHeadUrl } from '@/helpers/playerHelper'
import type { LeaderboardEntry } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

/**
 * The board's own leaderboard: a pane of glass over the plots.
 *
 * It draws its own rows rather than reaching for the shared table component.
 * That component is a data grid with a paginator and a solid background of its
 * own, which is right for a page and wrong for a sheet of glass floating over a
 * scene: everything here has to let the board through behind it.
 *
 * Expanded it is the full list; collapsed it shrinks to a header island that
 * still says who is winning, so the board is never covered but rank is never
 * fully hidden either.
 */
const props = defineProps<{
  rows: LeaderboardEntry[]
  loading?: boolean
  /**
   * Players the board can bring forward. Only their rows are clickable — a row
   * for a player who has published nothing has nothing to point at.
   *
   * Left off, every row is clickable: the panel is not the authority on what
   * the board holds, and a board that has not said yet should not gray out the
   * whole list while it loads.
   */
  plotted?: string[]
}>()

const emit = defineEmits<{ select: [entry: LeaderboardEntry] }>()

/**
 * Open by default, but the page owns it: scrubbing the board behind this panel
 * folds it away, so the visitor is not dragging the scene around underneath a
 * panel covering the part they are dragging it towards.
 */
const expanded = defineModel<boolean>('expanded', { default: true })

const search = ref('')
const seasons = SEASONS
const leader = computed(() => props.rows[0])

const matches = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return props.rows
  return props.rows.filter((row) => row.playerName.toLowerCase().includes(term))
})

/**
 * Whether this row points anywhere.
 *
 * A row that does not is still a score and still belongs on the list, so it is
 * not dimmed or marked: it simply stops being a control, losing the hover and
 * the focus ring that offered a click in the first place.
 */
function hasPlot(entry: LeaderboardEntry): boolean {
  return props.plotted?.includes(entry.playerUuid) ?? true
}

/**
 * Name widths for the placeholder rows, so the wait reads as a list of names
 * rather than as a barcode of identical bars. Eight of them: the panel is
 * centred on the screen and grows from wherever it starts, so standing in for
 * roughly the number of rows that will arrive keeps it from lurching when they
 * do.
 */
const SKELETON_WIDTHS = ['42%', '28%', '55%', '35%', '48%', '31%', '44%', '38%']

/** What a screen reader hears for a row, which the eye reads as columns. */
function rowLabel(entry: LeaderboardEntry): string {
  return `Rank ${entry.rank}, ${entry.playerName}, ${entry.score.toLocaleString()} points`
}
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-20 flex items-start justify-center p-3 sm:p-4"
  >
    <section
      aria-labelledby="leaderboard-title"
      class="glass pointer-events-auto w-full max-w-2xl overflow-hidden rounded-2xl"
      :class="{ 'glass--centred': expanded }"
    >
      <!-- Island: always visible, and the whole of the collapsed state -->
      <div class="flex items-center gap-3 px-3 py-2">
        <div class="flex min-w-0 items-baseline gap-2">
          <h2 id="leaderboard-title" class="whitespace-nowrap text-sm font-bold text-slate-900">
            Snow Leagues 1
          </h2>
          <nav aria-label="Seasons" class="flex items-center gap-1">
            <RouterLink
              v-for="season in seasons"
              :key="season.id"
              :to="season.route"
              :aria-current="season.id === 's1' ? 'page' : undefined"
              class="rounded px-1.5 py-0.5 text-[11px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              :class="
                season.id === 's1'
                  ? 'bg-white/70 text-primary-700 shadow-sm'
                  : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
              "
            >
              {{ season.shortName }}
            </RouterLink>
          </nav>
        </div>

        <!-- Who is winning, for when the list itself is folded away -->
        <Transition name="fade">
          <p v-if="!expanded && leader" class="flex min-w-0 items-center gap-1.5 text-sm">
            <span aria-hidden="true">{{ getMedalEmoji(1) }}</span>
            <span class="truncate font-semibold text-slate-900">{{ leader.playerName }}</span>
            <span class="tabular-nums text-slate-600">{{ leader.score.toLocaleString() }}</span>
          </p>
        </Transition>

        <div class="ml-auto flex items-center gap-1">
          <slot name="status" />
          <button
            type="button"
            class="rounded-full p-1.5 text-slate-700 transition-colors hover:bg-white/60 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            :aria-label="expanded ? 'Hide leaderboard' : 'Show leaderboard'"
            :aria-expanded="expanded"
            aria-controls="leaderboard-panel"
            @click="expanded = !expanded"
          >
            <i :class="expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- The list itself -->
      <Transition name="panel">
        <div v-if="expanded" id="leaderboard-panel" class="overflow-hidden border-t border-white/50">
          <div class="px-3 pb-3 pt-2">
            <label class="sr-only" for="leaderboard-search">Search player</label>
            <div class="relative">
              <i
                class="pi pi-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500"
                aria-hidden="true"
              />
              <input
                id="leaderboard-search"
                v-model="search"
                type="search"
                placeholder="Search player"
                class="w-full rounded-lg border border-white/60 bg-white/50 py-1.5 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600"
              />
            </div>
          </div>

          <div class="max-h-[60vh] overflow-y-auto px-2 pb-2">
            <!--
              Placeholder rows rather than a line of text: the panel is centred
              on the screen, so a one-line wait replaced by a full list jumps
              the whole thing. These stand in the shape the rows will take.
            -->
            <ul
              v-if="loading"
              class="flex flex-col gap-0.5"
              role="status"
              aria-label="Fetching scores"
            >
              <li
                v-for="(width, i) in SKELETON_WIDTHS"
                :key="i"
                class="flex items-center gap-3 px-2 py-1.5"
                aria-hidden="true"
              >
                <span class="skeleton h-3 w-6 shrink-0 rounded" />
                <span class="skeleton size-5 shrink-0 rounded-sm" />
                <span class="skeleton h-3 rounded" :style="{ width }" />
                <span class="skeleton ml-auto h-3 w-10 shrink-0 rounded" />
              </li>
            </ul>
            <p v-else-if="matches.length === 0" class="px-2 py-6 text-center text-sm text-slate-600">
              {{ rows.length === 0 ? 'No scores yet' : `No player matching “${search}”` }}
            </p>

            <ul v-else class="flex flex-col gap-0.5">
              <li v-for="entry in matches" :key="entry.playerUuid">
                <component
                  :is="hasPlot(entry) ? 'button' : 'div'"
                  :type="hasPlot(entry) ? 'button' : undefined"
                  :aria-label="hasPlot(entry) ? rowLabel(entry) : undefined"
                  class="group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-colors"
                  :class="
                    hasPlot(entry)
                      ? 'hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-600'
                      : undefined
                  "
                  @click="hasPlot(entry) && emit('select', entry)"
                >
                  <!--
                    Hidden from a row that carries its own label, read out as
                    part of one that does not.
                  -->
                  <span
                    :aria-hidden="hasPlot(entry) ? 'true' : undefined"
                    class="w-6 shrink-0 text-center text-sm font-semibold tabular-nums text-slate-500"
                  >
                    {{ getMedalEmoji(entry.rank) ?? entry.rank }}
                  </span>
                  <img
                    :src="getHeadUrl(entry.playerUuid)"
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    class="size-5 shrink-0 rounded-sm"
                  />
                  <span class="truncate text-sm font-semibold text-slate-900">
                    {{ entry.playerName }}
                  </span>
                  <span class="ml-auto shrink-0 text-sm tabular-nums text-slate-700">
                    {{ entry.score.toLocaleString() }}
                  </span>
                </component>
              </li>
            </ul>
          </div>

          <p class="px-3 pb-2 text-center text-[11px] text-slate-500">
            Scores are provisional placeholders while Season 1 scoring is built.
          </p>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style scoped>
/*
 * Glass: what is behind it, blurred and lightened, with a hairline of white
 * along the top edge where the light would catch it. The blur is the whole
 * effect, so where a browser cannot do it the panel falls back to a solid
 * enough background to keep the text readable.
 */
.glass {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    0 8px 32px rgba(15, 23, 42, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
  transition: transform 180ms ease;
}

/*
 * Open, the list is the page and belongs in the middle of it; folded, it is an
 * island at the top, out of the board's way. It travels between the two rather
 * than jumping, and it stays centred while it grows because the half it takes
 * off is half of its own height, whatever that has reached.
 */
.glass--centred {
  transform: translateY(calc(50vh - 50% - 0.75rem));
  transform: translateY(calc(50dvh - 50% - 0.75rem));
}

@media (min-width: 640px) {
  .glass--centred {
    transform: translateY(calc(50vh - 50% - 1rem));
    transform: translateY(calc(50dvh - 50% - 1rem));
  }
}

@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .glass {
    background: rgba(255, 255, 255, 0.55);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    backdrop-filter: blur(20px) saturate(160%);
  }
}

/*
 * The panel is held back a moment and should arrive softly rather than snap
 * into place, and it leaves faster than it arrives.
 */
.panel-enter-active,
.panel-leave-active {
  transition:
    max-height 0.18s ease,
    opacity 0.12s ease;
}
.panel-enter-from,
.panel-leave-to {
  max-height: 0;
  opacity: 0;
}
.panel-enter-to,
.panel-leave-from {
  max-height: 65vh;
  opacity: 1;
}

/*
 * The placeholder bars. Slate at low opacity rather than the usual grey, so
 * they sit on the glass as something behind it rather than on top of it, and
 * they breathe slowly - a fast pulse under a centred panel is a strobe.
 */
.skeleton {
  background-color: rgba(15, 23, 42, 0.1);
  animation: skeleton-pulse 1.6s ease-in-out infinite;
}

@keyframes skeleton-pulse {
  50% {
    opacity: 0.45;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.12s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .glass,
  .panel-enter-active,
  .panel-leave-active,
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }

  .skeleton {
    animation: none;
  }
}
</style>
