export interface CsvRow {
  uuid: string
  datatype: string
  score: string
}

export interface PlayerData {
  code: string
  message: string
  data: {
    player: {
      meta: {
        cached_at: number
      }
      username: string
      id: string
      raw_id: string
      avatar: string
      skin_texture: string
      properties: Array<{
        name: string
        value: string
        signature: string
      }>
    }
  }
}

export interface LeaderboardRow {
  position: number
  uuid: string
  playerData: PlayerData
  score: number
}
