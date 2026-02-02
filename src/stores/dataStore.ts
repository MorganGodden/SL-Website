import { ref } from 'vue'
import { defineStore } from 'pinia'
// import * as SwaggerSDK from '@/../generated-sdk'
// import axios from 'axios'
import Papa from 'papaparse'
import { getPlayer } from '@/helpers/avatarHelper'
import type { CsvRow, LeaderboardRow } from '@/common/interfaces'

export const useDataStore = defineStore('dataStore', () => {
  // const config = new SwaggerSDK.Configuration({
  //   basePath: import.meta.env.VITE_API_URL!,
  //   headers: { key: import.meta.env.VITE_API_KEY! }
  // })
  // const server = new SwaggerSDK.ServerApi(config)
  const serverIp = import.meta.env.VITE_SERVER_IP

  const fetchingData = ref(false)
  const connectionRefused = ref(false)

  // TODO: Remove once data is no longer static
  const usingTempStaticData = true

  // const serverData = ref<SwaggerSDK.Server | null>(null)
  const leaderboardData = ref<LeaderboardRow[]>([])

  const dataFetchInterval = import.meta.env.VITE_DATA_FETCH_INTERVAL
  const secondsSinceLastServerDataFetch = ref(0)

  setInterval(() => {
    if (secondsSinceLastServerDataFetch.value >= dataFetchInterval) {
      fetchServerData()
    } else {
      secondsSinceLastServerDataFetch.value++
    }
  }, 1000)

  async function fetchServerData() {
    // fetchingData.value = true
    // TODO: Re-enable once data is no longer static
    // try {
    //   serverData.value = await server.v1ServerGet()
    //   connectionRefused.value = false
    // } catch (error) {
    //   connectionRefused.value = true
    // }
    secondsSinceLastServerDataFetch.value = 0

    fetchingData.value = false
  }

  function loadCsv(): Promise<CsvRow[]> {
    return new Promise((resolve, reject) => {
      Papa.parse<CsvRow>('/leaderboard.csv', {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: (results: { data: CsvRow[] | PromiseLike<CsvRow[]> }) => resolve(results.data),
        error: (err: any) => reject(err)
      })
    })
  }

  // Must use an axios request as the swagger does not have this endpoint
  async function fetchLeaderboard(): Promise<LeaderboardRow[]> {
    try {
      const csvData = await loadCsv()
      const leaderboard = (
        await Promise.all(
          csvData.map(async (data, index) => ({
            position: index + 1,
            uuid: data.uuid.replace('player.score.total::', ''),
            playerData: await getPlayer(data.uuid.replace('player.score.total::', '')),
            score: parseInt(data.score, 16)
          }))
        )
      )
        .filter((row) => row.playerData && row.playerData.code === 'player.found')
        .sort((a, b) => b.score - a.score)
        .map((row, index) => ({ ...row, position: index + 1 }))
      leaderboardData.value = leaderboard
      return leaderboardData.value
    } catch (error) {
      console.error('Error fetching leaderboard:', error)
      return []
    }
  }

  async function copyServerIp() {
    navigator.clipboard.writeText(serverIp)
    alert('Server IP copied to clipboard!')
  }

  return {
    usingTempStaticData,
    serverIp,
    fetchingData,
    connectionRefused,
    copyServerIp,
    // serverData,
    fetchServerData,
    dataFetchInterval,
    secondsSinceLastServerDataFetch,
    fetchLeaderboard,
    leaderboardData
  }
})
