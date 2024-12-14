import { defineStore } from 'pinia'
import * as SwaggerSDK from '@/../generated-sdk'
import { ref } from 'vue'

export const useDataStore = defineStore('dataStore', () => {
  const config = new SwaggerSDK.Configuration({
    basePath: import.meta.env.VITE_API_URL!,
    headers: { key: import.meta.env.VITE_API_KEY! }
  })
  const server = new SwaggerSDK.ServerApi(config)
  const serverIp = import.meta.env.VITE_SERVER_IP

  const fetchingData = ref(false)
  const serverData = ref<SwaggerSDK.Server | null>(null)
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
    fetchingData.value = true

    serverData.value = await server.v1ServerGet()
    secondsSinceLastServerDataFetch.value = 0

    fetchingData.value = false
  }

  async function copyServerIp() {
    navigator.clipboard.writeText(serverIp)
    alert('Server IP copied to clipboard!')
  }

  return {
    serverIp,
    fetchingData,
    copyServerIp,
    serverData,
    fetchServerData,
    secondsSinceLastServerDataFetch
  }
})
