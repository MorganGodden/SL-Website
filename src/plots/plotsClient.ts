import type { PlotIndexEntry, PlotSnapshot } from './types'

const BASE_URL = (import.meta.env.VITE_PLOTS_API_URL ?? '').replace(/\/+$/, '')
const SECRET = import.meta.env.VITE_PLOTS_SECRET

/**
 * The single most likely source of a silent refetch-everything bug:
 * `/plots` reports the etag UNQUOTED, while the `ETag` header on a column
 * response is QUOTED, and may carry a weak validator prefix. Compare only
 * normalised values.
 */
export function normaliseEtag(etag: string | null | undefined): string | null {
  if (!etag) return null
  return etag.trim().replace(/^W\//i, '').replace(/^"(.*)"$/s, '$1')
}

function headers(extra?: Record<string, string>): Record<string, string> {
  const h: Record<string, string> = { ...extra }
  // Only sent when the plugin is configured with a shared secret. Note that
  // Vite inlines this into the bundle, so it is a development affordance only —
  // a deployed site talking to a secured endpoint needs a server-side proxy.
  if (SECRET) h['X-SnowLeagues-Secret'] = SECRET
  return h
}

export function plotsConfigured(): boolean {
  return BASE_URL.length > 0
}

/** `GET /plots` — the change index. One request tells us every plot's etag. */
export async function fetchPlotIndex(signal?: AbortSignal): Promise<PlotIndexEntry[]> {
  const response = await fetch(`${BASE_URL}/plots`, { headers: headers(), signal })
  if (!response.ok) {
    throw new Error(`GET /plots failed: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as PlotIndexEntry[]
}

export type ColumnResult =
  /** A new snapshot. `etag` is normalised. */
  | { status: 'ok'; payload: PlotSnapshot; etag: string | null }
  /** The server confirmed our copy is current. */
  | { status: 'not-modified' }
  /** That player has no published snapshot yet. Normal, not an error. */
  | { status: 'missing' }

/**
 * `GET /plots/{uuid}`.
 *
 * `knownEtag` is sent as `If-None-Match` as a second line of defence behind the
 * index comparison. Content-Encoding is left entirely to the browser.
 */
export async function fetchColumn(
  uuid: string,
  knownEtag?: string | null,
  signal?: AbortSignal
): Promise<ColumnResult> {
  const conditional = knownEtag ? { 'If-None-Match': `"${normaliseEtag(knownEtag)}"` } : undefined
  const response = await fetch(`${BASE_URL}/plots/${uuid}`, {
    headers: headers(conditional),
    signal
  })

  if (response.status === 304) return { status: 'not-modified' }
  if (response.status === 404) return { status: 'missing' }
  if (!response.ok) {
    throw new Error(`GET /plots/${uuid} failed: ${response.status} ${response.statusText}`)
  }

  return {
    status: 'ok',
    payload: (await response.json()) as PlotSnapshot,
    etag: normaliseEtag(response.headers.get('ETag'))
  }
}
