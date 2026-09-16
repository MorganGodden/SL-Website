<script lang="ts" setup>
import Image from 'primevue/image'
import Logo from '../assets/images/logo.avif'
import { SEASONS, type SeasonId } from '@/seasons/registry'

defineProps<{
  /** Which season is being viewed; used to mark the active nav link. */
  seasonId: SeasonId
  /** Line shown under the logo. Season 0 keeps the original welcome message. */
  tagline: string
}>()

const seasons = SEASONS
</script>

<template>
  <header class="flex flex-col text-center align-middle items-center justify-center">
    <Image :src="Logo" alt="Logo" class="drop-shadow-lg px-8" />
    <hr class="w-full mt-4 mb-2 text-lightgray" />
    <div class="flex flex-row w-full gap-2 align-middle items-center justify-between h-10">
      <p class="h-fit ml-3 font-semibold opacity-50">{{ tagline }}</p>
      <nav class="flex items-center gap-1 mr-1">
        <RouterLink
          v-for="season in seasons"
          :key="season.id"
          :to="season.route"
          class="px-2.5 py-1 rounded text-sm font-semibold transition-colors"
          :class="
            season.id === seasonId
              ? 'bg-primary-100 text-primary-700'
              : 'opacity-50 hover:opacity-100'
          "
        >
          {{ season.shortName }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
