import type { LeaderboardEntry, LeaderboardFile } from '@/common/interfaces'
import type { SeasonId } from '@/seasons/registry'

import s0Leaderboard from './seasons/s0/leaderboard.json'
import s1Leaderboard from './seasons/s1/leaderboard.json'

/**
 * The single place the site learns where leaderboard rows come from.
 *
 * Season 1 scoring does not exist in the plugin yet, so `s1` reads a fixture
 * file. When it does exist, swapping it for a real endpoint is a change to this
 * map and nothing else — no component imports a data file directly.
 */
type LeaderboardLoader = () => Promise<LeaderboardFile>

const LOADERS: Record<SeasonId, LeaderboardLoader> = {
  s0: async () => s0Leaderboard as LeaderboardFile,
  s1: async () => s1Leaderboard as LeaderboardFile
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
