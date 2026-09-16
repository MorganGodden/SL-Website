/** One row of a season leaderboard, whatever its source. */
export interface LeaderboardEntry {
  /** Canonical hyphenated UUID. Joins against `playerUuid` in the plot payloads. */
  playerUuid: string
  playerName: string
  score: number
  rank: number
}

/** The shape of the static leaderboard files under `src/data/seasons/`. */
export interface LeaderboardFile {
  seasonId: string
  /** True once a season is over and its scores can never change again. */
  final: boolean
  frozenAt?: string
  source: string
  players: LeaderboardEntry[]
}
