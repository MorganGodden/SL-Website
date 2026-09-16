<script lang="ts" setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import LeaderboardComponent from '@/components/leaderboardComponent.vue'
import { SEASONS } from '@/seasons/registry'
import type { LeaderboardEntry } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

/**
 * Floats above the plot scene. Expanded it is the full leaderboard; collapsed it
 * shrinks to a header island that still shows who is winning, so the board is
 * never fully obscured but rank is never fully hidden either.
 */
const props = defineProps<{
  rows: LeaderboardEntry[]
  loading?: boolean
}>()

defineEmits<{ select: [entry: LeaderboardEntry] }>()

const expanded = ref(true)
const leader = computed(() => props.rows[0])
const seasons = SEASONS
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-20 flex justify-center p-3 sm:p-4">
    <div
      class="pointer-events-auto w-full max-w-2xl rounded-xl border border-white/60 bg-white/80 shadow-lg backdrop-blur-md transition-all duration-300"
    >
      <!-- Island bar: always visible, doubles as the collapsed state -->
      <div class="flex items-center gap-3 px-3 py-2">
        <div class="flex items-baseline gap-2 min-w-0">
          <span class="font-bold text-sm whitespace-nowrap">Snow Leagues 1</span>
          <nav class="flex items-center gap-1">
            <RouterLink
              v-for="season in seasons"
              :key="season.id"
              :to="season.route"
              class="rounded px-1.5 py-0.5 text-[11px] font-semibold transition-colors"
              :class="
                season.id === 's1'
                  ? 'bg-primary-100 text-primary-700'
                  : 'opacity-40 hover:opacity-100'
              "
            >
              {{ season.shortName }}
            </RouterLink>
          </nav>
        </div>

        <!-- Leader summary, shown when collapsed so the island still says something -->
        <Transition name="fade">
          <div
            v-if="!expanded && leader"
            class="flex min-w-0 items-center gap-1.5 text-sm"
          >
            <span>{{ getMedalEmoji(1) }}</span>
            <span class="truncate font-semibold">{{ leader.playerName }}</span>
            <span class="text-gray-500">{{ leader.score.toLocaleString() }}</span>
          </div>
        </Transition>

        <div class="ml-auto flex items-center gap-1">
          <slot name="status" />
          <Button
            v-tooltip.bottom="expanded ? 'Hide leaderboard' : 'Show leaderboard'"
            :icon="expanded ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
            text
            rounded
            size="small"
            :aria-label="expanded ? 'Hide leaderboard' : 'Show leaderboard'"
            :aria-expanded="expanded"
            @click="expanded = !expanded"
          />
        </div>
      </div>

      <!-- Expanded panel -->
      <Transition name="panel">
        <div v-if="expanded" class="overflow-hidden border-t border-white/60">
          <div class="max-h-[65vh] overflow-y-auto p-2">
            <LeaderboardComponent
              :rows="rows"
              :loading="loading"
              title="Season One - Leaderboard"
              :rows-per-page="10"
              @select="$emit('select', $event)"
            />
            <p class="px-1 pt-2 text-center text-[11px] text-gray-400">
              Scores are provisional placeholders while Season 1 scoring is built.
            </p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.panel-enter-active,
.panel-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.2s ease;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
