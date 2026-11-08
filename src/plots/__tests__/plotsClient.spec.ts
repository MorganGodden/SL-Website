import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchColumn, fetchPlotIndex } from '../plotsClient'

const UUID = 'fa949f11-b74a-4243-8391-1515ace975e7'
const HASH = '2a94632db5ceeed6fd00ca01587010bd3965e9410140c241ce4b9c054a522740'

function response(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    ...init
  })
}

describe('fetchColumn etag handling', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('normalises the QUOTED ETag header so it compares equal to the UNQUOTED index etag', async () => {
    // This is the boundary the whole change-detection scheme rests on. The
    // plugin sends `ETag: "<hash>"` on a column but `"etag": "<hash>"` unquoted
    // in the index. Returning the raw header here makes every plot look changed
    // on every poll and refetches the entire board every 3 seconds.
    vi.mocked(fetch).mockResolvedValue(
      response({ formatVersion: 1 }, { headers: { ETag: `"${HASH}"` } })
    )

    const result = await fetchColumn(UUID)
    expect(result.status).toBe('ok')
    if (result.status !== 'ok') return

    expect(result.etag).toBe(HASH)

    // The index form, verbatim from a real /plots response.
    const indexEtag = HASH
    expect(result.etag).toBe(indexEtag)
  })

  it('handles a weak validator on the header', async () => {
    vi.mocked(fetch).mockResolvedValue(
      response({ formatVersion: 1 }, { headers: { ETag: `W/"${HASH}"` } })
    )
    const result = await fetchColumn(UUID)
    expect(result.status === 'ok' && result.etag).toBe(HASH)
  })

  it('sends If-None-Match in the QUOTED form the server expects', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 304 }))

    // Callers hold the normalised (unquoted) value; the header must be quoted.
    const result = await fetchColumn(UUID, HASH)
    expect(result.status).toBe('not-modified')

    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit
    const headers = init.headers as Record<string, string>
    expect(headers['If-None-Match']).toBe(`"${HASH}"`)
  })

  it('reports 404 as missing rather than throwing', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('not found', { status: 404 }))
    await expect(fetchColumn(UUID)).resolves.toEqual({ status: 'missing' })
  })

  it('throws on a server error so the poll can back off', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('boom', { status: 500 }))
    await expect(fetchColumn(UUID)).rejects.toThrow(/500/)
  })

  it('throws when the index request fails', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('nope', { status: 401 }))
    await expect(fetchPlotIndex()).rejects.toThrow(/401/)
  })

  it('does not send If-None-Match on a first fetch', async () => {
    vi.mocked(fetch).mockResolvedValue(response([], { headers: { ETag: `"${HASH}"` } }))
    await fetchColumn(UUID)
    const init = vi.mocked(fetch).mock.calls[0][1] as RequestInit
    expect((init.headers as Record<string, string>)['If-None-Match']).toBeUndefined()
  })
})
