<script lang="ts" setup>
import Image from 'primevue/image'
import Button from 'primevue/button'
import Logo from '../assets/images/logo.avif'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()
</script>

<template>
  <header class="flex flex-col text-center align-middle items-center justify-center">
    <Image :src="Logo" alt="Logo" class="drop-shadow-lg px-8" />
    <hr class="w-full mt-4 mb-2 text-lightgray" />
    <div class="flex flex-row w-full gap-2 align-middle items-center justify-between">
      <p class="h-fit ml-3">{{ dataStore.serverData?.motd ?? '' }}</p>
      <Button
        label="Join Now!"
        class="font-bold hover:animate-pulse"
        text
        @click="dataStore.copyServerIp"
      />
    </div>
  </header>
</template>
