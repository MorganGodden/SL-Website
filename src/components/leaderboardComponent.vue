<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import { useDataStore } from '@/stores/dataStore'
import { getHeadUrl } from '@/helpers/avatarHelper'
import { useDialog } from 'primevue/usedialog'
import PlayerComponent from './playerComponent.vue'
import ServerInfo from './serverInfoComponent.vue'
import { ref } from 'vue'

const dataStore = useDataStore()
const dialog = useDialog()

const searchTerm = ref('')

const fakeData = [
  { rank: 1, name: 'SnowMonarch', points: 97, uuid: 'fa949f11-b74a-4243-8391-1515ace975e7' },
  { rank: 2, name: 'Jane Doe', points: 93, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 3, name: 'John Smith', points: 85, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 4, name: 'Jane Smith', points: 78, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 5, name: 'John Johnson', points: 74, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 6, name: 'Jane Johnson', points: 69, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 7, name: 'John Brown', points: 65, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 8, name: 'Jane Brown', points: 61, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 9, name: 'John White', points: 57, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' },
  { rank: 10, name: 'Jane White', points: 53, uuid: 'c5ef3347-4593-4f39-8bb1-2eaa40dd986e' }
]

const tableData = ref(fakeData)

function showPlayer(name: string, uuid: string) {
  dialog.open(PlayerComponent, {
    props: {
      header: 'Player Profile / ' + name,
      modal: true
    },
    data: {
      uuid
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

function searchData() {
  if (searchTerm.value === '') {
    tableData.value = fakeData
    return
  }

  tableData.value = fakeData.filter((data) => {
    return data.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  })
}
</script>

<template>
  <div class="my-4 min-h-[300px] rounded-lg overflow-hidden drop-shadow-sm">
    <DataTable class="" :value="tableData">
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
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Leaderboard</h2>
          <div class="flex items-center space-x-2">
            <IconField>
              <InputIcon class="absolute pi pi-search" />
              <InputText
                v-model="searchTerm"
                placeholder="Player search..."
                size="small"
                @input="searchData"
              />
            </IconField>
            <Button
              v-tooltip="'Server info'"
              icon="pi pi-info-circle"
              text
              @click="showServerInfo"
            />
          </div>
        </div>
      </template>
      <Column field="rank" header="Rank" sortable></Column>
      <Column field="name" header="Name">
        <template #body="slotProps">
          <Button
            class="flex align-middle"
            text
            @click="showPlayer(slotProps.data.name, slotProps.data.uuid)"
          >
            <img class="w-5 h-5 my-auto" :src="getHeadUrl(slotProps.data.uuid)" alt="avatar" />
            <p class="ml-2 font-semibold">{{ slotProps.data.name }}</p>
          </Button>
        </template>
      </Column>
      <Column field="points" header="Points"></Column>

      <!-- FOOTER -->
      <template #footer>
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
