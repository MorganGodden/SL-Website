<script lang="ts" setup>
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import { getHeadUrl } from '@/helpers/playerHelper'
import type { LeaderboardEntry } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

/**
 * Presentational only. It is handed rows and knows nothing about which season
 * they belong to or where they came from, so seasons can compose it however
 * they like without it growing per-season branches.
 */
const props = defineProps<{
  rows: LeaderboardEntry[]
  title: string
  loading?: boolean
  /** Rows per page; a short archive board does not need a paginator. */
  rowsPerPage?: number
}>()

defineEmits<{ select: [entry: LeaderboardEntry] }>()

const searchTerm = ref('')
const tableData = computed(() =>
  props.rows.filter((entry) =>
    entry.playerName.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
)
</script>

<template>
  <div class="min-h-[300px] rounded-lg overflow-hidden drop-shadow">
    <DataTable
      :value="tableData"
      paginator
      :rows="rowsPerPage ?? 10"
      :always-show-paginator="false"
    >
      <!-- EMPTY -->
      <template #empty>
        <div class="flex align-middle items-center justify-center min-h-32 text-gray-400">
          <p v-if="loading">
            <i class="pi pi-spinner text-sm mr-1 animate-spin" />
            Fetching data...
          </p>
          <p v-else>
            <i class="pi pi-exclamation-circle text-sm pr-1" />
            No data available
          </p>
        </div>
      </template>

      <!-- HEADER -->
      <template #header>
        <div class="flex gap-1 justify-between flex-col items-start sm:flex-row sm:items-center">
          <h2 class="text-lg font-semibold text-pretty">{{ title }}</h2>
          <div class="flex items-center gap-2 w-full sm:w-fit">
            <IconField class="-mr-1 w-full">
              <InputIcon class="absolute pi pi-search" />
              <InputText
                v-model="searchTerm"
                placeholder="Search player..."
                size="small"
                pt:root="w-full"
              />
            </IconField>
            <slot name="actions" />
          </div>
        </div>
      </template>

      <Column field="rank" header="Rank" class="w-4">
        <template #body="{ data }: { data: LeaderboardEntry }">
          <div class="flex items-center justify-center w-full">
            {{ getMedalEmoji(data.rank) ?? data.rank }}
          </div>
        </template>
      </Column>

      <Column field="playerName" header="Name">
        <template #body="{ data }: { data: LeaderboardEntry }">
          <Button
            pt:root="flex gap-2.5 items-center align-middle h-8 px-2 py-1 hover:drop-shadow-md"
            text
            @click="$emit('select', data)"
          >
            <img class="w-5 h-5 my-auto" :src="getHeadUrl(data.playerUuid)" alt="avatar" />
            <p class="font-semibold">{{ data.playerName }}</p>
          </Button>
        </template>
      </Column>

      <Column field="score" header="Score" class="w-4">
        <template #body="{ data }: { data: LeaderboardEntry }">
          <p class="w-full text-right font-semibold">{{ data.score.toLocaleString() }}</p>
        </template>
      </Column>

      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </DataTable>
  </div>
</template>
