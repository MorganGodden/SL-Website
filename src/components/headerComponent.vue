<script lang="ts" setup>
import Image from 'primevue/image'
import Button from 'primevue/button'
import Logo from '../assets/images/logo.avif'
import { useDataStore } from '@/stores/dataStore'
import { computed } from 'vue'

const dataStore = useDataStore()

function stripColorCodes(text: string): string {
  // Remove RGB color codes (§x§R§R§G§G§B§B)
  let stripped = text.replace(/§x(§[0-9a-f]){6}/gi, '')
  // Remove formatting codes (§l, §n, etc.)
  stripped = stripped.replace(/§[0-9a-fk-or]/gi, '')
  return stripped
}

const motd = computed(() =>
  stripColorCodes(/*dataStore.serverData?.motd ??*/ 'Welcome, to the Snow Leagues!')
)
</script>

<template>
  <header class="flex flex-col text-center align-middle items-center justify-center">
    <Image :src="Logo" alt="Logo" class="drop-shadow-lg px-8" />
    <hr class="w-full mt-4 mb-2 text-lightgray" />
    <div class="flex flex-row w-full gap-2 align-middle items-center justify-between h-10">
      <p class="h-fit ml-3 font-semibold opacity-50">{{ motd }}</p>
      <Button
        v-if="!dataStore.usingTempStaticData"
        label="Join Now!"
        class="font-bold hover:animate-pulse"
        text
        @click="dataStore.copyServerIp"
      />
    </div>
  </header>
</template>
