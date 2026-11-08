import { fetchPluginJson } from './plotsClient'

/**
 * The plugin's Collection Log, which is Season 1's score. The contract is the
 * "Collection Log" section of FORMAT.md in the plugin repository.
 */

/** The only Collection Log format version this client understands. */
export const COLLECTION_FORMAT_VERSION = 1

/** `GET /leaderboard`: everyone who has logged anything, best first. */
export interface LeaderboardDocument {
  formatVersion: number
  /** How many items can be collected at all. */
  total: number
  players: {
    rank: number
    playerUuid: string
    playerName: string
    score: number
    collected: number
  }[]
}

export interface CollectionTier {
  name: string
  points: number
  collected: number
  total: number
}

export interface CollectionItem {
  /** Item id without `minecraft:`, e.g. `diamond_sword`. */
  id: string
  /** The `name` of one of the document's tiers. */
  tier: string
  /** Epoch milliseconds when it was first logged, or null if it has not been. */
  at: number | null
}

/** `GET /collection/{uuid}`: one player's whole log, including what they have not got. */
export interface CollectionDocument {
  formatVersion: number
  playerUuid: string
  playerName: string
  /** Their place on the leaderboard, or null if they are not on it. */
  rank: number | null
  score: number
  collected: number
  total: number
  /** Fewest points first. Names and points are a server setting. */
  tiers: CollectionTier[]
  /** Every collectible item, sorted by id. */
  items: CollectionItem[]
}

function checked<T extends { formatVersion: number }>(document: T, what: string): T {
  if (document.formatVersion !== COLLECTION_FORMAT_VERSION) {
    throw new Error(`unsupported ${what} format ${document.formatVersion}`)
  }
  return document
}

export async function fetchLeaderboard(signal?: AbortSignal): Promise<LeaderboardDocument> {
  const board = await fetchPluginJson<LeaderboardDocument>('/leaderboard', signal)
  if (!board) throw new Error('GET /leaderboard: not found')
  return checked(board, 'leaderboard')
}

/** One player's log, or null for a player the server has never seen. */
export async function fetchCollection(
  uuid: string,
  signal?: AbortSignal
): Promise<CollectionDocument | null> {
  const log = await fetchPluginJson<CollectionDocument>(`/collection/${uuid}`, signal)
  return log && checked(log, 'collection')
}
