import type { DecodeRequest, DecodeResponse, DecodeSuccess } from './decode.worker'
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
      worker.postMessage({ requestId, payload } satisfies DecodeRequest)
    })
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
