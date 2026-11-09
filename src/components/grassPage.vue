<script lang="ts" setup>
import Image from 'primevue/image'
import Logo from '@/assets/images/logo.avif'
import { SEASONS, type SeasonId } from '@/seasons/registry'

/**
 * An ordinary page standing on the grass: the logo on the grass, then one
 * card of grounded glass with the page's line and the season links along its
 * top, as on the board's own leaderboard. The page's content goes in the card,
 * under that line.
 *
 * One card rather than several: grounded glass shades the grass all round it,
 * and a second card would lay that shade over the first.
 */
defineProps<{
  /** Which season's link is marked as the current one. */
  seasonId: SeasonId
  /** The line along the top of the card. */
  tagline: string
}>()

const seasons = SEASONS
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
          <p class="text-sm font-semibold text-slate-600">{{ tagline }}</p>
          <nav aria-label="Seasons" class="flex shrink-0 items-center gap-1">
            <RouterLink
              v-for="season in seasons"
              :key="season.id"
              :to="season.route"
              :aria-current="season.id === seasonId ? 'page' : undefined"
              class="rounded px-2.5 py-1 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              :class="
                season.id === seasonId
                  ? 'bg-white/70 shadow-sm'
                  : 'opacity-60 hover:bg-white/50 hover:opacity-100'
              "
            >
              {{ season.shortName }}
            </RouterLink>
          </nav>
        </div>
        <div class="border-t border-white/50">
          <slot />
        </div>
      </section>
    </div>
  </div>
</template>
