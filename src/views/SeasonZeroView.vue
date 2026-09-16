<script setup lang="ts">
import { ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import HeaderComponent from '@/components/headerComponent.vue'
import LeaderboardComponent from '@/components/leaderboardComponent.vue'
import PlayerComponent from '@/components/season0/playerComponent.vue'
import { getLeaderboard } from '@/data/leaderboardService'
import type { LeaderboardEntry } from '@/common/interfaces'

/**
 * Season 0 is finished. Its scores are frozen in
 * `src/data/seasons/s0/leaderboard.json` and this page makes no network calls
 * for them — the only remote requests left are the player avatar images.
 */
const dialog = useDialog()
const rows = ref<LeaderboardEntry[]>([])
const loading = ref(true)

getLeaderboard('s0')
  .then((entries) => (rows.value = entries))
  .finally(() => (loading.value = false))

function showPlayer(entry: LeaderboardEntry) {
  dialog.open(PlayerComponent, {
    props: { header: 'Player Profile', modal: true },
    data: { entry, totalPlayers: rows.value.length }
  })
}
</script>

<template>
  <div class="container">
    <HeaderComponent season-id="s0" tagline="Welcome, to the Snow Leagues!" />
    <div class="mt-2">
      <LeaderboardComponent
        :rows="rows"
        :loading="loading"
        title="Season Zero - Leaderboard"
        @select="showPlayer"
      />
    </div>
  </div>
</template>
