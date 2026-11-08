import type { LeaderboardEntry, LeaderboardFile } from '@/common/interfaces'
import type { SeasonId } from '@/seasons/registry'
import { fetchLeaderboard } from '@/plots/collectionClient'

import s0Leaderboard from './seasons/s0/leaderboard.json'

/**
 * The single place the site learns where leaderboard rows come from.
 *
 * Season 1 is scored live by the plugin's Collection Log; Season 0 is frozen in
 * a data file. No component imports a data file directly.
 */
type LeaderboardLoader = () => Promise<LeaderboardFile>

const LOADERS: Record<SeasonId, LeaderboardLoader> = {
  s0: async () => s0Leaderboard as LeaderboardFile,
  s1: async () => {
    const board = await fetchLeaderboard()
    return {
      seasonId: 's1',
      final: false,
      source: 'sl-plugin /leaderboard',
      players: board.players.map(({ rank, playerUuid, playerName, score, collected }) => ({
        rank,
        playerUuid,
        playerName,
        score,
        collection: { collected, total: board.total }
      }))
    }
  }
}

export async function getLeaderboard(seasonId: SeasonId): Promise<LeaderboardEntry[]> {
  const load = LOADERS[seasonId]
  if (!load) throw new Error(`no leaderboard source registered for season "${seasonId}"`)

  const file = await load()
  // Trust the file's own ranks, but never trust its ordering.
  return [...file.players].sort((a, b) => a.rank - b.rank)
}

/** Rows keyed by uuid, for joining against plot data. */
export async function getLeaderboardByUuid(
  seasonId: SeasonId
): Promise<Map<string, LeaderboardEntry>> {
  const rows = await getLeaderboard(seasonId)
  return new Map(rows.map((row) => [row.playerUuid, row]))
}
