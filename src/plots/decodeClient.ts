import type {
  DecodeRequest,
  DecodeResponse,
  DecodeSuccess,
  ForgetRequest,
  SliceRequest
} from './decode.worker'
import type { PlotSnapshot } from './types'

/**
 * Promise wrapper around the decode worker.
 *
 * One worker is plenty: a column is a few milliseconds of work and requests are
 * queued in order, which keeps decode off the render thread without spawning a
 * thread per column.
 */
export class DecodeClient {
  private worker: Worker | null = null
  private nextRequestId = 1
  private pending = new Map<
    number,
    { resolve: (value: DecodeSuccess) => void; reject: (reason: Error) => void }
  >()

  private ensureWorker(): Worker {
    if (this.worker) return this.worker

    const worker = new Worker(new URL('./decode.worker.ts', import.meta.url), {
      type: 'module'
    })

    worker.onmessage = (event: MessageEvent<DecodeResponse>) => {
      const message = event.data
      const entry = this.pending.get(message.requestId)
      if (!entry) return
      this.pending.delete(message.requestId)
      if (message.ok) entry.resolve(message)
      else entry.reject(new Error(message.error))
    }

    worker.onerror = (event) => {
      const error = new Error(`decode worker failed: ${event.message}`)
      for (const entry of this.pending.values()) entry.reject(error)
      this.pending.clear()
    }

    this.worker = worker
    return worker
  }

  decode(payload: PlotSnapshot): Promise<DecodeSuccess> {
    const worker = this.ensureWorker()
    const requestId = this.nextRequestId++
    return new Promise<DecodeSuccess>((resolve, reject) => {
      this.pending.set(requestId, { resolve, reject })
      worker.postMessage({ kind: 'decode', requestId, payload } satisfies DecodeRequest)
    })
  }

  /**
   * Re-meshes a column already decoded, cut off at `ceiling` layers.
   *
   * Rejects when the worker has no blocks for that player, which is what
   * happens if the plot was dropped between the request and the answer.
   */
  slice(playerUuid: string, ceiling: number, from?: number): Promise<DecodeSuccess> {
    const worker = this.ensureWorker()
    const requestId = this.nextRequestId++
    return new Promise<DecodeSuccess>((resolve, reject) => {
      this.pending.set(requestId, { resolve, reject })
      worker.postMessage({
        kind: 'slice',
        requestId,
        playerUuid,
        ceiling,
        from
      } satisfies SliceRequest)
    })
  }

  /** Releases the blocks held for a player the board no longer shows. */
  forget(playerUuid: string): void {
    // Nothing is held until a column has been decoded, so a worker that was
    // never started has nothing to forget.
    this.worker?.postMessage({ kind: 'forget', playerUuid } satisfies ForgetRequest)
  }

  dispose(): void {
    this.worker?.terminate()
    this.worker = null
    for (const entry of this.pending.values()) {
      entry.reject(new Error('decode client disposed'))
    }
    this.pending.clear()
  }
}
