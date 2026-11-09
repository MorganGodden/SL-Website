<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getSeason } from '@/seasons/registry'
import { admission, countdown } from '@/seasons/gate'
import { serverAnswers } from '@/plots/plotsClient'

/**
 * Season 1's front door. Before the season it is shut, with a countdown.
 * During opening hours it asks the server first, and while the server does not
 * answer it waits here, asking again every few seconds. Outside opening hours
 * it goes straight through: a server down for the night is not an outage.
 *
 * Once through, a visitor stays through. The board shows its own connection,
 * and throwing someone off it mid-look would be worse than a board that says
 * it cannot reach the server. The board is only fetched once they are let in,
 * so nobody downloads it before the season.
 */
const SeasonOneView = defineAsyncComponent(() => import('@/views/SeasonOneView.vue'))

/** Seconds between asks while the server is not answering. */
const RECHECK_SECONDS = 10
const PREVIEW = import.meta.env.VITE_SEASON_PREVIEW === 'true'
const schedule = getSeason('s1').schedule!
const startsAt = Date.parse(schedule.startsAt)

const state = ref<'pre-season' | 'checking' | 'offline' | 'open'>('checking')
const now = ref(Date.now())
const nextCheckAt = ref(0)
let asking = false

async function ask(): Promise<void> {
  if (asking) return
  asking = true
  const up = await serverAnswers()
  asking = false
  if (up) {
    state.value = 'open'
  } else {
    state.value = 'offline'
    now.value = Date.now()
    nextCheckAt.value = now.value + RECHECK_SECONDS * 1000
  }
}

/** Where a visitor stands right now, before any answer from the server. */
function decide(): void {
  const verdict = admission(new Date(), schedule, PREVIEW)
  if (verdict === 'pre-season') state.value = 'pre-season'
  else if (verdict === 'open') state.value = 'open'
  else void ask()
}

const ticker = setInterval(() => {
  now.value = Date.now()
  if (state.value === 'pre-season' && now.value >= startsAt) {
    state.value = 'checking'
    decide()
  } else if (state.value === 'offline') {
    // Closing time can come while they wait, and after it they are let in.
    if (admission(new Date(), schedule, PREVIEW) === 'open') state.value = 'open'
    else if (now.value >= nextCheckAt.value) void ask()
  }
}, 1000)
onBeforeUnmount(() => clearInterval(ticker))
decide()

const startsLocally = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
}).format(startsAt)
const hoursLine = `Open daily ${schedule.hours.open}–${schedule.hours.close} ${schedule.hours.label}`
/** Read as a calendar date, in UTC, so no visitor's time zone can move it a day. */
const lastDayLine = `Last day ${new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: 'UTC'
}).format(Date.parse(`${schedule.lastDay}T00:00:00Z`))}`
const secondsLeft = computed(() => Math.max(0, Math.ceil((nextCheckAt.value - now.value) / 1000)))

/** Where players join. The card leaves the line out when a build has none. */
const SERVER = (import.meta.env.VITE_SERVER_IP ?? '').trim()
const copied = ref(false)
async function copyServer(): Promise<void> {
  try {
    await navigator.clipboard.writeText(SERVER)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Some browsers refuse; the address is selectable text anyway.
  }
}
</script>

<template>
  <SeasonOneView v-if="state === 'open'" />
  <div v-else class="grass flex h-full w-full items-center justify-center px-4 py-6">
    <section
      aria-labelledby="gate-title"
      class="glass glass--grounded w-full max-w-sm rounded-2xl px-5 py-4"
    >
      <h1 id="gate-title" class="text-sm font-bold text-slate-900">Snow Leagues 1</h1>

      <div v-if="state === 'pre-season'" class="mt-4">
        <p class="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Starts in</p>
        <p class="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">
          {{ countdown(startsAt - now) }}
        </p>
        <p class="mt-1 text-sm text-slate-600">{{ startsLocally }} your time</p>
        <p class="mt-3 text-sm text-slate-600">{{ hoursLine }}</p>
        <p class="text-sm text-slate-600">{{ lastDayLine }}</p>
      </div>

      <div v-else class="mt-4">
        <p role="status" class="flex items-center gap-2 text-base font-semibold text-slate-900">
          <span
            aria-hidden="true"
            class="size-2 shrink-0 rounded-full"
            :class="state === 'offline' ? 'bg-red-500' : 'bg-amber-400'"
          />
          {{ state === 'offline' ? 'The server is offline' : 'Checking the server…' }}
        </p>
        <template v-if="state === 'offline'">
          <p class="mt-1 text-sm text-slate-600">Plots and scores come back with it.</p>
          <div class="mt-4 flex items-center justify-between gap-3">
            <p class="text-sm tabular-nums text-slate-600">Checking again in {{ secondsLeft }}s</p>
            <button
              type="button"
              class="rounded-lg bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              @click="ask"
            >
              Check now
            </button>
          </div>
        </template>
      </div>

      <div v-if="SERVER" class="mt-4 flex items-center justify-between gap-3">
        <p class="min-w-0 text-sm text-slate-600">
          Server <span class="select-all break-all font-semibold text-slate-900">{{ SERVER }}</span>
        </p>
        <button
          type="button"
          class="shrink-0 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          @click="copyServer"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </button>
      </div>

      <div class="mt-5 flex items-center justify-between gap-3">
        <RouterLink
          to="/s1/modpack"
          class="text-xs font-semibold text-primary-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Optional modpack →
        </RouterLink>
        <RouterLink
          to="/s0"
          class="text-xs font-semibold text-primary-700 underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          SL-0 archive →
        </RouterLink>
      </div>
    </section>
  </div>
</template>
