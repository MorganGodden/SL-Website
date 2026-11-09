<script setup lang="ts">
import { ref } from 'vue'
import { useDialog } from 'primevue/usedialog'
import Image from 'primevue/image'
import Logo from '@/assets/images/logo.avif'
import LeaderboardComponent from '@/components/leaderboardComponent.vue'
import PlayerComponent from '@/components/season0/playerComponent.vue'
import { getLeaderboard } from '@/data/leaderboardService'
import { SEASONS } from '@/seasons/registry'
import type { LeaderboardEntry } from '@/common/interfaces'

/**
 * Season 0 is finished. Its scores are frozen in
 * `src/data/seasons/s0/leaderboard.json` and this page makes no network calls
 * for them — the only remote requests left are the player avatar images.
 *
 * It stands on the same grass as Season 1's gate, in the same grounded glass:
 * the welcome line and season links along the top of the card, as on the
 * board's own leaderboard, and the table under them.
 */
const dialog = useDialog()
const rows = ref<LeaderboardEntry[]>([])
const loading = ref(true)
const seasons = SEASONS

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
  <div>
    <!-- Fixed, so the page scrolls over the grass rather than to the end of it. -->
    <div class="grass fixed inset-0" aria-hidden="true" />

    <!-- Below lg, #app pads every side; from lg up only the sides, so this adds the rest. -->
    <div class="relative mx-auto w-full max-w-2xl lg:py-8">
      <header class="flex justify-center">
        <Image :src="Logo" alt="Snow Leagues" class="px-8 drop-shadow-lg" />
      </header>

      <section class="glass glass--grounded mt-4 overflow-hidden rounded-2xl">
        <div class="flex items-center justify-between gap-3 px-4 py-2">
          <p class="text-sm font-semibold text-slate-600">Welcome, to the Snow Leagues!</p>
          <nav aria-label="Seasons" class="flex shrink-0 items-center gap-1">
            <RouterLink
              v-for="season in seasons"
              :key="season.id"
              :to="season.route"
              :aria-current="season.id === 's0' ? 'page' : undefined"
              class="rounded px-2.5 py-1 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              :class="
                season.id === 's0'
                  ? 'bg-white/70 shadow-sm'
                  : 'opacity-60 hover:bg-white/50 hover:opacity-100'
              "
            >
              {{ season.shortName }}
            </RouterLink>
          </nav>
        </div>
        <LeaderboardComponent
          class="border-t border-white/50"
          :rows="rows"
          :loading="loading"
          title="Season Zero - Leaderboard"
          @select="showPlayer"
        />
      </section>
    </div>
  </div>
</template>
