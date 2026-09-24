import { describe, it, expect } from 'vitest'
import { resolvePlot } from '../plotLink'

const ALEX = 'fa949f11-b74a-4243-8391-1515ace975e7'
const SAM = '0b1f6c3d-2e4a-4f7b-9c8d-1a2b3c4d5e6f'

const board = [
  { uuid: ALEX, name: 'Alex' },
  { uuid: SAM, name: 'Sam' }
]

describe('resolvePlot', () => {
  it('matches a uuid and a name, either case', () => {
    expect(resolvePlot(ALEX.toUpperCase(), board)).toBe(ALEX)
    expect(resolvePlot('sam', board)).toBe(SAM)
    expect(resolvePlot('  Alex ', board)).toBe(ALEX)
  })

  it('prefers a uuid over a name that collides with it', () => {
    // A player may take a name that is another player's id. The uuid is the
    // board's key, so the link resolves to that player rather than to whoever
    // renamed themselves after them.
    expect(resolvePlot(SAM, [{ uuid: ALEX, name: SAM }, ...board])).toBe(SAM)
  })

  it('answers null for a plot the board has not got', () => {
    expect(resolvePlot('nobody', board)).toBeNull()
    expect(resolvePlot('', board)).toBeNull()
  })
})
