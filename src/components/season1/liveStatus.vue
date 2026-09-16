<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import type { BoardStatus } from '@/plots/plotBoard'

/**
 * Deliberately subtle. The Minecraft server restarts on every plugin rebuild
 * and is down entirely much of the time, so a failed poll is an everyday event
 * and must never look like a broken page — the board keeps showing the last
 * known state and this quietly says how old it is.
 */
const props = defineProps<{ status: BoardStatus | null }>()

// Re-render the relative age once a second without polling anything.
const now = ref(Date.now())
const ticker = setInterval(() => (now.value = Date.now()), 1000)
onBeforeUnmount(() => clearInterval(ticker))

const ageSeconds = computed(() => {
  if (!props.status?.lastSuccessAt) return null
  return Math.max(0, Math.round((now.value - props.status.lastSuccessAt) / 1000))
})

const label = computed(() => {
  const status = props.status
  if (!status) return ''
  if (status.state === 'connecting') return 'connecting'
  if (status.state === 'live') return 'live'
  const age = ageSeconds.value
  if (age === null) return 'offline'
  if (age < 60) return `${age}s ago`
  return `${Math.floor(age / 60)}m ago`
})

const tone = computed(() => {
  const state = props.status?.state
  if (state === 'live') return 'bg-emerald-500'
  if (state === 'stale') return 'bg-amber-500'
  return 'bg-slate-300'
})

const title = computed(() => {
  const status = props.status
  if (!status) return ''
  if (status.state === 'live') return `${status.plotCount} plot(s), updated just now`
  if (status.state === 'connecting') return 'Contacting the server...'
  return `Showing the last known board. ${status.lastError ?? 'Server unreachable.'}`
})
</script>

<template>
  <div
    v-if="status"
    v-tooltip.bottom="title"
    class="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] text-slate-500"
  >
    <span
      class="h-1.5 w-1.5 rounded-full transition-colors"
      :class="[tone, status.state === 'live' ? 'animate-pulse' : '']"
    />
    {{ label }}
  </div>
</template>
