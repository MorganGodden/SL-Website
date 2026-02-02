<script setup lang="ts">
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'

const dataStore = useDataStore()

// function numberToGB(number: number): string {
//   return (number / 1024 / 1024 / 1024).toFixed(2)
// }
// const totalMemoryGB = computed(() => numberToGB(dataStore.serverData.health.totalMemory))
// const usedMemeoryGB = computed(() =>
//   numberToGB(dataStore.serverData.health.totalMemory - dataStore.serverData.health.freeMemory)
// )
</script>

<template>
  <div class="grid grid-cols-2 gap-1">
    <!-- <b>Players:</b>
    <p>{{ dataStore.serverData.onlinePlayers }} / {{ dataStore.serverData.maxPlayers }}</p>
    <b>TPS:</b>
    <p>{{ dataStore.serverData.tps }}</p>
    <b>Memory:</b>
    <p>{{ usedMemeoryGB }} GB / {{ totalMemoryGB }} GB</p>
    <b>Version:</b>
    <p>{{ dataStore.serverData.version }}</p>
    <b>IP Address:</b>
    <a class="w-fit cursor-pointer" ref="#" @click="dataStore.copyServerIp">{{
      dataStore.serverIp
    }}</a> -->
  </div>
</template>
