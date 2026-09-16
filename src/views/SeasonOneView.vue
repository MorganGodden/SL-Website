<script setup lang="ts">
import { ref } from 'vue'
import LeaderboardOverlay from '@/components/season1/leaderboardOverlay.vue'
import PlotScene from '@/components/season1/plotScene.vue'
import { getLeaderboard } from '@/data/leaderboardService'
import LiveStatus from '@/components/season1/liveStatus.vue'
import type { LeaderboardEntry } from '@/common/interfaces'
import type { BoardStatus } from '@/plots/plotBoard'

/**
 * Season 1: the plot visualisation is the page, with the leaderboard floating
 * over it. Scores come from fixtures via the data-access module — there is no
 * Season 1 scoring endpoint yet.
 */
const rows = ref<LeaderboardEntry[]>([])
const loading = ref(true)
const boardStatus = ref<BoardStatus | null>(null)

getLeaderboard('s1')
  .then((entries) => (rows.value = entries))
  .finally(() => (loading.value = false))

</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-slate-200">
    <PlotScene :rows="rows" @status="boardStatus = $event" />

    <LeaderboardOverlay :rows="rows" :loading="loading">
      <template #status>
        <LiveStatus :status="boardStatus" />
      </template>
    </LeaderboardOverlay>
  </div>
</template>
