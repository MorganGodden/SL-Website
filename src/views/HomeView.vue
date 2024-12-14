<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'
import HeaderComponent from '@/components/headerComponent.vue'
import { useDataStore } from '@/stores/dataStore'
import LeaderboardComponent from '@/components/leaderboardComponent.vue'

const dataStore = useDataStore()

;(async () => await dataStore.fetchServerData())()
</script>

<template>
  <ProgressSpinner v-if="!dataStore.serverData" />
  <div v-else class="container">
    <HeaderComponent />
    <LeaderboardComponent />
  </div>
</template>
