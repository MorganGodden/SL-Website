<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import HeaderComponent from '@/components/headerComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import LeaderboardComponent from '@/components/leaderboardComponent.vue'

const dataStore = useDataStore()

;(async () => await dataStore.fetchServerData())()
</script>

<template>
  <span v-if="false" class="flex flex-col items-center gap-6 drop-shadow-lg">
    <ProgressSpinner stroke-width="8" />
    <h1 class="font-bold text-lg w-[70%] text-center text-balance">
      {{
        dataStore.connectionRefused
          ? `Server not found, retrying in ${dataStore.dataFetchInterval - dataStore.secondsSinceLastServerDataFetch} seconds.`
          : 'Loading...'
      }}
    </h1>
  </span>
  <div v-else class="container">
    <HeaderComponent />
    <LeaderboardComponent />
  </div>
</template>
