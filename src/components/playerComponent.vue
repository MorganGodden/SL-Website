<script lang="ts" setup>
import { getBodyUrl } from '@/helpers/playerHelper'
import { inject, ref, computed } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import Tag from 'primevue/tag'
import type { LeaderboardRow, PlayerData } from '@/common/interfaces'
import { useDataStore } from '@/stores/dataStore'
import { getMedalEmoji } from '@/common/utilities'

const dialogRef = inject('dialogRef') as any
const leaderboardRow: LeaderboardRow = dialogRef.value.data.leaderboardRow
const player: PlayerData['data']['player'] = leaderboardRow.playerData.data.player

const dataStore = useDataStore()
const isLoading = ref(true)

// Find the player's score from the leaderboard
const playerScore = computed(() => {
  const leaderboardEntry = dataStore.leaderboardData.find(
    (entry) => entry.playerData.data.player.id === player.id
  )
  return leaderboardEntry?.score ?? 0
})

const onImageLoad = () => {
  isLoading.value = false
}
</script>

<template>
  <div class="flex flex-row h-96 gap-8 p-4">
    <!-- Avatar Section -->
    <div class="flex align-middle h-full w-40 relative flex-shrink-0">
      <ProgressSpinner v-if="isLoading" class="absolute inset-0 m-auto" strokeWidth="4" />
      <img
        :src="getBodyUrl(player.id)"
        alt="player image"
        class="w-full animate-fadein"
        @load="onImageLoad"
        :class="['drop-shadow-md', isLoading ? 'opacity-0' : '']"
      />
    </div>

    <!-- Content Section -->
    <div class="flex flex-col flex-grow gap-4 justify-between w-fit sm:w-[300px]">
      <!-- Overall Score Section -->
      <div
        class="bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg p-4 text-white drop-shadow-md"
      >
        <div class="text-sm opacity-90 mb-1">Overall Score</div>
        <div class="text-4xl font-bold">{{ playerScore.toLocaleString() }}</div>
      </div>

      <!-- Stats Section -->
      <div class="space-y-2 flex-grow">
        <div
          v-if="player.username"
          class="flex justify-between flex-col items-start sm:flex-row sm:items-center sm:gap-2"
        >
          <span class="text-gray-600 font-medium">Username:</span>
          <span class="text-lg font-semibold">{{ player.username }}</span>
        </div>

        <div class="flex justify-between flex-col items-start sm:flex-row sm:items-center sm:gap-2">
          <span class="text-gray-600 font-medium">Leaderboard Position:</span>
          <div class="flex items-center gap-2 text-nowrap">
            <span v-if="getMedalEmoji(leaderboardRow.position)" class="text-2xl">
              {{ getMedalEmoji(leaderboardRow.position) }}
            </span>
            <span class="font-bold text-blue-600">
              {{ leaderboardRow.position }}
              <span class="text-gray-500"> / {{ dataStore.leaderboardData.length }} </span>
            </span>
          </div>
        </div>
      </div>

      <!-- Achievements Section (Placeholder for future badges) -->
      <div class="border-t pt-3">
        <div class="font-medium text-gray-600 mb-2">Achievements</div>
        <div class="flex gap-2 flex-wrap">
          <Tag
            v-if="leaderboardRow.position === 1"
            value="First Place (SL-0)"
            pt:root="drop-shadow-sm"
          />
          <Tag
            v-else-if="leaderboardRow.position === 2"
            value="Second Place (SL-0)"
            pt:root="drop-shadow-sm"
          />
          <Tag
            v-else-if="leaderboardRow.position === 3"
            value="Third Place (SL-0)"
            pt:root="drop-shadow-sm"
          />
          <span v-else class="text-sm text-gray-400">No achievements yet.</span>
        </div>
      </div>
    </div>
  </div>
</template>
