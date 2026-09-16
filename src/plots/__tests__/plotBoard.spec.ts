import { describe, it, expect } from 'vitest'
import { backoffDelay } from '../plotBoard'
import { normaliseEtag } from '../plotsClient'

describe('backoffDelay', () => {
  it('uses the base interval while healthy', () => {
    expect(backoffDelay(0, 3000)).toBe(3000)
  })

  it('grows exponentially with consecutive failures', () => {
    const first = backoffDelay(1, 3000)
    const third = backoffDelay(3, 3000)
    // Jittered, so compare against the jitter envelope rather than exact values.
    expect(first).toBeGreaterThanOrEqual(3000 * 0.85)
    expect(first).toBeLessThanOrEqual(3000 * 1.15)
    expect(third).toBeGreaterThanOrEqual(12000 * 0.85)
    expect(third).toBeLessThanOrEqual(12000 * 1.15)
  })

  it('never exceeds the cap, however long the server is down', () => {
    for (const failures of [10, 25, 100, 1000]) {
      expect(backoffDelay(failures, 3000)).toBeLessThanOrEqual(60_000 * 1.15)
    }
  })

  it('always waits at least a moment', () => {
    for (let f = 0; f < 20; f++) expect(backoffDelay(f, 3000)).toBeGreaterThan(0)
  })
})

describe('normaliseEtag', () => {
  it('makes the unquoted index form and the quoted header form comparable', () => {
    const fromIndex = '2a94632db5ceeed6fd00ca01587010bd'
    const fromHeader = '"2a94632db5ceeed6fd00ca01587010bd"'
    expect(normaliseEtag(fromIndex)).toBe(normaliseEtag(fromHeader))
  })

  it('strips a weak validator prefix', () => {
    expect(normaliseEtag('W/"abc"')).toBe('abc')
    expect(normaliseEtag('W/abc')).toBe('abc')
  })

  it('returns null for a missing header', () => {
    expect(normaliseEtag(null)).toBeNull()
    expect(normaliseEtag(undefined)).toBeNull()
    expect(normaliseEtag('')).toBeNull()
  })

  it('leaves an already-normalised value alone', () => {
    expect(normaliseEtag('abc123')).toBe('abc123')
  })
})
