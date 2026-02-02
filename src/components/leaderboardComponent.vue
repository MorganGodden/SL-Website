<script lang="ts" setup>
import { computed, ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import { useDataStore } from '@/stores/dataStore'
import { getHeadUrl } from '@/helpers/playerHelper'
import { useDialog } from 'primevue/usedialog'
import PlayerComponent from './playerComponent.vue'
import ServerInfo from './serverInfoComponent.vue'
import type { LeaderboardRow } from '@/common/interfaces'
import { getMedalEmoji } from '@/common/utilities'

const dataStore = useDataStore()
const dialog = useDialog()

const searchTerm = ref('')
const tableData = computed(() =>
  dataStore.leaderboardData.filter((entry) => {
    const username = entry.playerData.data.player?.username?.toLowerCase() || ''
    return username.includes(searchTerm.value.toLowerCase())
  })
)

;(async () => await dataStore.fetchLeaderboard())()

function showPlayer(leaderboardRow: LeaderboardRow) {
  dialog.open(PlayerComponent, {
    props: {
      header: 'Player Profile',
      modal: true
    },
    data: {
      leaderboardRow
    }
  })
}

function showServerInfo() {
  dialog.open(ServerInfo, {
    props: {
      header: 'Server Info',
      modal: true
    }
  })
}
</script>

<template>
  <div class="mt-2 min-h-[300px] rounded-lg overflow-hidden drop-shadow">
    <DataTable :value="tableData" paginator :rows="10" :always-show-paginator="false">
      <!-- EMPTY -->
      <template #empty>
        <div class="flex align-middle items-center justify-center min-h-32 text-gray-400">
          <p v-if="dataStore.fetchingData">
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
          <h2 class="text-lg font-semibold text-pretty">Season Zero - Leaderboard</h2>
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
            <Button
              v-if="!dataStore.usingTempStaticData"
              v-tooltip="'Server info'"
              icon="pi pi-info-circle"
              text
              @click="showServerInfo"
            />
          </div>
        </div>
      </template>

      <Column field="position" header="Rank" class="w-4">
        <template #body="{ data }: { data: LeaderboardRow }">
          <div class="flex items-center justify-center w-full">
            {{ getMedalEmoji(data.position) ?? data.position }}
          </div>
        </template>
      </Column>

      <Column field="uuid" header="Name">
        <template #body="{ data }: { data: LeaderboardRow }">
          <Button
            pt:root="flex gap-2.5 items-center align-middle h-8 px-2 py-1 hover:drop-shadow-md"
            text
            @click="showPlayer(data)"
          >
            <img class="w-5 h-5 my-auto" :src="getHeadUrl(data.uuid)" alt="avatar" />
            <p class="font-semibold">
              {{ data.playerData.data.player?.username }}
            </p>
          </Button>
        </template>
      </Column>
      <Column field="score" header="Score" class="w-4">
        <template #body="{ data }: { data: LeaderboardRow }">
          <p class="w-full text-right font-semibold">{{ data.score.toLocaleString() }}</p>
        </template>
      </Column>

      <!-- FOOTER -->
      <!-- TODO: Re-enable footer when data is not static -->
      <template v-if="false" #footer>
        <div class="text-center text-nowrap text-gray-400">
          <p v-if="dataStore.fetchingData">
            <i class="pi pi-spinner text-sm mr-1 animate-spin" />
            Fetching data...
          </p>
          <p v-else>
            <i class="pi pi-refresh text-sm pr-1" />
            Refreshed {{ dataStore.secondsSinceLastServerDataFetch }} seconds ago
          </p>
        </div>
      </template>
    </DataTable>
  </div>
</template>
