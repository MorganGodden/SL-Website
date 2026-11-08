import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchCollection } from '../collectionClient'
import { getLeaderboard } from '@/data/leaderboardService'

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  })
}

describe('Collection Log client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('turns /leaderboard into Season 1 rows, best first, each with the log total', async () => {
    vi.mocked(fetch).mockResolvedValue(
      response({
        formatVersion: 1,
        total: 1413,
        players: [
          { rank: 2, playerUuid: 'b', playerName: 'Second', score: 20, collected: 9 },
          { rank: 1, playerUuid: 'a', playerName: 'First', score: 40, collected: 12 }
        ]
      })
    )

    const rows = await getLeaderboard('s1')

    expect(vi.mocked(fetch).mock.calls[0][0]).toMatch(/\/leaderboard$/)
    expect(rows).toEqual([
      {
        rank: 1,
        playerUuid: 'a',
        playerName: 'First',
        score: 40,
        collection: { collected: 12, total: 1413 }
      },
      {
        rank: 2,
        playerUuid: 'b',
        playerName: 'Second',
        score: 20,
        collection: { collected: 9, total: 1413 }
      }
    ])
  })

  it('refuses a format it does not know rather than guessing at it', async () => {
    vi.mocked(fetch).mockResolvedValue(response({ formatVersion: 2, total: 0, players: [] }))
    await expect(getLeaderboard('s1')).rejects.toThrow('unsupported leaderboard format 2')
  })

  it('reads a 404 for a player as nobody the server has seen, and other failures as errors', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(response('no such player', 404))
    expect(await fetchCollection('00000000-0000-0000-0000-000000000001')).toBeNull()

    vi.mocked(fetch).mockResolvedValueOnce(response('unauthorized', 401))
    await expect(fetchCollection('00000000-0000-0000-0000-000000000001')).rejects.toThrow('401')
  })
})
