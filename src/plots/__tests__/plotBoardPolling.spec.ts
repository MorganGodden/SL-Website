import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { PlotIndexEntry, PlotSnapshot } from '../types'

const fetchPlotIndex = vi.fn<[], Promise<PlotIndexEntry[]>>()
const fetchColumn = vi.fn()

vi.mock('../plotsClient', async () => {
  const actual = await vi.importActual<typeof import('../plotsClient')>('../plotsClient')
  return {
    // normaliseEtag stays real: it is the thing under test.
    normaliseEtag: actual.normaliseEtag,
    plotsConfigured: () => true,
    fetchPlotIndex: (...args: unknown[]) => fetchPlotIndex(...(args as [])),
    fetchColumn: (...args: unknown[]) => fetchColumn(...args)
  }
})

const decode = vi.fn(async (payload: PlotSnapshot) => ({
  requestId: 1, ok: true as const,
  playerUuid: payload.playerUuid, playerName: payload.playerName, plotIndex: 0,
  capturedAt: 0, sizeX: 16, sizeY: 81, sizeZ: 16, minY: 48,
  paletteSize: 2, faceCount: 10, occupiedHeight: 4,
  positions: new Float32Array(0), colours: new Uint8Array(0), indices: new Uint32Array(0)
}))

vi.mock('../decodeClient', () => ({
  DecodeClient: class {
    decode = decode
    slice = vi.fn()
    forget = vi.fn()
    dispose = vi.fn()
  }
}))

const { PlotBoard } = await import('../plotBoard')

const UUID = 'fa949f11-b74a-4243-8391-1515ace975e7'
const HASH = '2a94632db5ceeed6fd00ca01587010bd3965e9410140c241ce4b9c054a522740'

/** The index reports the etag UNQUOTED. */
function indexEntry(etag: string): PlotIndexEntry {
  return { playerUuid: UUID, playerName: 'SnowMonarch', plotIndex: 0, lastUpdated: 1, etag }
}

/** The column response reports it QUOTED, which is what fetchColumn normalises. */
function columnOk(etag: string) {
  return {
    status: 'ok' as const,
    payload: { playerUuid: UUID, playerName: 'SnowMonarch' } as PlotSnapshot,
    etag // fetchColumn has already normalised this
  }
}

describe('PlotBoard change detection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    fetchPlotIndex.mockReset()
    fetchColumn.mockReset()
    decode.mockClear()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('does not refetch a column whose content has not changed', async () => {
    // This is the trap: the index etag is unquoted and the column ETag header is
    // quoted. Comparing them raw makes every plot look changed on every poll and
    // refetches the whole board every 3 seconds.
    fetchPlotIndex.mockResolvedValue([indexEntry(HASH)])
    fetchColumn.mockResolvedValue(columnOk(HASH))

    const onMesh = vi.fn()
    const board = new PlotBoard({ onMesh, onRemoved: vi.fn(), onStatus: vi.fn() }, 3000)
    board.start()

    await vi.advanceTimersByTimeAsync(0)
    expect(fetchColumn).toHaveBeenCalledTimes(1)

    // Five more polls with identical content.
    await vi.advanceTimersByTimeAsync(16_000)
    expect(fetchPlotIndex.mock.calls.length).toBeGreaterThan(4)
    expect(fetchColumn).toHaveBeenCalledTimes(1)
    expect(onMesh).toHaveBeenCalledTimes(1)

    board.stop()
  })

  it('refetches exactly once when the content does change', async () => {
    fetchPlotIndex.mockResolvedValueOnce([indexEntry(HASH)])
    fetchColumn.mockResolvedValueOnce(columnOk(HASH))

    const onMesh = vi.fn()
    const board = new PlotBoard({ onMesh, onRemoved: vi.fn(), onStatus: vi.fn() }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)

    const CHANGED = 'ffff632db5ceeed6fd00ca01587010bd3965e9410140c241ce4b9c054a522740'
    fetchPlotIndex.mockResolvedValue([indexEntry(CHANGED)])
    fetchColumn.mockResolvedValue(columnOk(CHANGED))

    await vi.advanceTimersByTimeAsync(3500)
    expect(fetchColumn).toHaveBeenCalledTimes(2)

    // ...and then goes quiet again.
    await vi.advanceTimersByTimeAsync(10_000)
    expect(fetchColumn).toHaveBeenCalledTimes(2)

    board.stop()
  })

  it('sends the known etag as If-None-Match on the next change', async () => {
    fetchPlotIndex.mockResolvedValueOnce([indexEntry(HASH)])
    fetchColumn.mockResolvedValueOnce(columnOk(HASH))
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved: vi.fn(), onStatus: vi.fn() }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)

    expect(fetchColumn.mock.calls[0][1]).toBeUndefined()

    fetchPlotIndex.mockResolvedValue([indexEntry('deadbeef')])
    fetchColumn.mockResolvedValue(columnOk('deadbeef'))
    await vi.advanceTimersByTimeAsync(3500)

    // Second call carries what we already hold.
    expect(fetchColumn.mock.calls[1][1]).toBe(HASH)
    board.stop()
  })

  it('treats a 404 as a player without a snapshot, not an error', async () => {
    fetchPlotIndex.mockResolvedValue([indexEntry(HASH)])
    fetchColumn.mockResolvedValue({ status: 'missing' as const })

    const onRemoved = vi.fn()
    const onStatus = vi.fn()
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved, onStatus }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)

    // Never held it, so nothing to remove, and the board stays live.
    expect(onRemoved).not.toHaveBeenCalled()
    expect(onStatus).toHaveBeenLastCalledWith(expect.objectContaining({ state: 'live' }))
    board.stop()
  })

  it('removes a column that disappears from the index', async () => {
    fetchPlotIndex.mockResolvedValueOnce([indexEntry(HASH)])
    fetchColumn.mockResolvedValueOnce(columnOk(HASH))
    const onRemoved = vi.fn()
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved, onStatus: vi.fn() }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)

    fetchPlotIndex.mockResolvedValue([])
    await vi.advanceTimersByTimeAsync(3500)
    expect(onRemoved).toHaveBeenCalledWith(UUID)
    board.stop()
  })

  it('goes stale and backs off when the server is down, without losing state', async () => {
    fetchPlotIndex.mockResolvedValueOnce([indexEntry(HASH)])
    fetchColumn.mockResolvedValueOnce(columnOk(HASH))
    const onRemoved = vi.fn()
    const onStatus = vi.fn()
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved, onStatus }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)

    // The Minecraft server goes away mid-session.
    fetchPlotIndex.mockRejectedValue(new TypeError('Failed to fetch'))
    await vi.advanceTimersByTimeAsync(3500)

    const status = onStatus.mock.calls.at(-1)![0]
    expect(status.state).toBe('stale')
    expect(status.lastSuccessAt).not.toBeNull()
    // Critically: nothing is torn off the board just because a poll failed.
    expect(onRemoved).not.toHaveBeenCalled()

    // Retries spread out rather than hammering a refused socket.
    const callsAfter10s = fetchPlotIndex.mock.calls.length
    await vi.advanceTimersByTimeAsync(10_000)
    expect(fetchPlotIndex.mock.calls.length - callsAfter10s).toBeLessThan(4)

    board.stop()
  })

  it('recovers automatically when the server comes back', async () => {
    fetchPlotIndex.mockRejectedValue(new TypeError('Failed to fetch'))
    const onStatus = vi.fn()
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved: vi.fn(), onStatus }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(5000)
    expect(onStatus.mock.calls.at(-1)![0].state).toBe('stale')

    fetchPlotIndex.mockResolvedValue([indexEntry(HASH)])
    fetchColumn.mockResolvedValue(columnOk(HASH))
    await vi.advanceTimersByTimeAsync(30_000)

    expect(onStatus.mock.calls.at(-1)![0].state).toBe('live')
    board.stop()
  })

  it('stops polling once stopped', async () => {
    fetchPlotIndex.mockResolvedValue([])
    const board = new PlotBoard({ onMesh: vi.fn(), onRemoved: vi.fn(), onStatus: vi.fn() }, 3000)
    board.start()
    await vi.advanceTimersByTimeAsync(0)
    board.stop()

    const calls = fetchPlotIndex.mock.calls.length
    await vi.advanceTimersByTimeAsync(30_000)
    expect(fetchPlotIndex.mock.calls.length).toBe(calls)
  })
})
