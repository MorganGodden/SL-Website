import { DecodeClient } from './decodeClient'
import type { DecodeSuccess } from './decode.worker'
import { fetchColumn, fetchPlotIndex, normaliseEtag } from './plotsClient'
import type { PlotIndexEntry } from './types'

const DEFAULT_POLL_MS = 3000
const MAX_BACKOFF_MS = 60_000

/**
 * Delay before the next poll.
 *
 * The Minecraft server restarts on every plugin rebuild and is down entirely
 * much of the time, so repeated failures back off exponentially rather than
 * hammering a socket that is refusing connections. Jitter keeps several open
 * tabs from retrying in lockstep.
 */
export function backoffDelay(consecutiveFailures: number, baseMs = DEFAULT_POLL_MS): number {
  if (consecutiveFailures <= 0) return baseMs
  const exponential = baseMs * 2 ** (consecutiveFailures - 1)
  const capped = Math.min(exponential, MAX_BACKOFF_MS)
  // +/-15% so retries spread out.
  return Math.round(capped * (0.85 + Math.random() * 0.3))
}

export type BoardState =
  /** No successful poll yet. */
  | 'connecting'
  /** Last poll succeeded. */
  | 'live'
  /** Polls are failing; whatever is on screen is the last known good state. */
  | 'stale'

export interface BoardStatus {
  state: BoardState
  /** When the index was last fetched successfully. */
  lastSuccessAt: number | null
  consecutiveFailures: number
  /** Last error message, for the staleness tooltip. */
  lastError: string | null
  plotCount: number
}

export interface PlotBoardCallbacks {
  /** A column has new geometry. Always follows a real content change. */
  onMesh: (mesh: DecodeSuccess) => void
  /** A column is gone from the index, or its snapshot was withdrawn. */
  onRemoved: (playerUuid: string) => void
  onStatus: (status: BoardStatus) => void
}

/**
 * Polls the change index and keeps decoded columns in step with it.
 *
 * The index is the only thing polled on a timer: one request reports every
 * plot's etag, and a column is refetched only when its etag has actually
 * changed. `If-None-Match` on the column request is a second line of defence
 * behind that comparison.
 */
export class PlotBoard {
  /** playerUuid -> last known NORMALISED etag. */
  private known = new Map<string, string>()
  private decoder = new DecodeClient()
  private timer: ReturnType<typeof setTimeout> | null = null
  private abort: AbortController | null = null

  private consecutiveFailures = 0
  private lastSuccessAt: number | null = null
  private lastError: string | null = null
  private started = false
  private stopped = false

  constructor(
    private callbacks: PlotBoardCallbacks,
    private pollMs: number = Number(import.meta.env.VITE_PLOTS_POLL_MS) || DEFAULT_POLL_MS
  ) {}

  start(): void {
    if (this.started) return
    this.started = true
    this.stopped = false
    this.emitStatus('connecting')
    void this.poll()
  }

  /** Stops polling and releases the worker. Safe to call more than once. */
  stop(): void {
    this.stopped = true
    this.started = false
    if (this.timer !== null) clearTimeout(this.timer)
    this.timer = null
    this.abort?.abort()
    this.abort = null
    this.decoder.dispose()
  }

  private emitStatus(state: BoardState): void {
    this.callbacks.onStatus({
      state,
      lastSuccessAt: this.lastSuccessAt,
      consecutiveFailures: this.consecutiveFailures,
      lastError: this.lastError,
      plotCount: this.known.size
    })
  }

  private schedule(): void {
    if (this.stopped) return
    this.timer = setTimeout(() => void this.poll(), backoffDelay(this.consecutiveFailures, this.pollMs))
  }

  private async poll(): Promise<void> {
    if (this.stopped) return

    this.abort = new AbortController()
    try {
      const index = await fetchPlotIndex(this.abort.signal)
      if (this.stopped) return

      this.consecutiveFailures = 0
      this.lastError = null
      this.lastSuccessAt = Date.now()

      await this.reconcile(index)
      this.emitStatus('live')
    } catch (error) {
      if (this.stopped) return
      this.consecutiveFailures++
      // A refused connection just means the Minecraft server is not running.
      // That is the normal state during development, so it is never surfaced as
      // an error page — the last known board stays on screen.
      this.lastError = error instanceof Error ? error.message : String(error)
      this.emitStatus('stale')
    } finally {
      this.abort = null
      this.schedule()
    }
  }

  /** Brings decoded columns into line with the index we just fetched. */
  private async reconcile(index: PlotIndexEntry[]): Promise<void> {
    const present = new Set(index.map((entry) => entry.playerUuid))

    for (const uuid of [...this.known.keys()]) {
      if (!present.has(uuid)) {
        this.known.delete(uuid)
        this.callbacks.onRemoved(uuid)
      }
    }

    // The index etag is UNQUOTED and the column ETag header is QUOTED, so both
    // are normalised before they are ever compared. Skipping this refetches
    // every column on every poll.
    const changed = index.filter(
      (entry) => normaliseEtag(entry.etag) !== this.known.get(entry.playerUuid)
    )

    for (const entry of changed) {
      if (this.stopped) return
      await this.refresh(entry)
    }
  }

  private async refresh(entry: PlotIndexEntry): Promise<void> {
    try {
      const result = await fetchColumn(
        entry.playerUuid,
        this.known.get(entry.playerUuid),
        this.abort?.signal
      )
      if (this.stopped) return

      if (result.status === 'missing') {
        // 404 means this player has not published a snapshot yet. Normal.
        if (this.known.delete(entry.playerUuid)) {
          this.callbacks.onRemoved(entry.playerUuid)
        }
        return
      }

      if (result.status === 'not-modified') {
        // The index disagreed with the column, and the column wins.
        this.known.set(entry.playerUuid, normaliseEtag(entry.etag)!)
        return
      }

      const mesh = await this.decoder.decode(result.payload)
      if (this.stopped) return

      this.known.set(entry.playerUuid, result.etag ?? normaliseEtag(entry.etag)!)
      this.callbacks.onMesh(mesh)
    } catch (error) {
      // One bad column must not abandon the rest of the poll. A decode failure
      // is worth surfacing loudly, since it means the format changed.
      console.error(`[plots] column ${entry.playerName} failed:`, error)
    }
  }
}
