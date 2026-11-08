/** One row of a season leaderboard, whatever its source. */
export interface LeaderboardEntry {
  /** Canonical hyphenated UUID. Joins against `playerUuid` in the plot payloads. */
  playerUuid: string
  playerName: string
  score: number
  rank: number
  /** How much of the Collection Log they have; seasons scored another way have none. */
  collection?: { collected: number; total: number }
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

/** A player the board can bring forward, named as the leaderboard names them. */
export interface PlayerRef {
  uuid: string
  name: string
  /** Null for a player with a plot but no leaderboard row yet. */
  rank: number | null
}
