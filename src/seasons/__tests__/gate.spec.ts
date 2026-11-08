import { describe, it, expect } from 'vitest'
import { admission, countdown, withinHours } from '../gate'
import type { SeasonSchedule } from '../registry'

const SCHEDULE: SeasonSchedule = {
  startsAt: '2026-12-04T18:00:00Z',
  hours: { open: '18:00', close: '00:00', timeZone: 'Europe/London', label: 'UK time' }
}

describe('season gate', () => {
  it('is shut before the season, whatever the hour, unless previewing', () => {
    expect(admission(new Date('2026-12-04T17:59:59Z'), SCHEDULE, false)).toBe('pre-season')
    expect(admission(new Date('2026-12-04T17:59:59Z'), SCHEDULE, true)).toBe('open')
    expect(admission(new Date('2026-12-04T18:00:00Z'), SCHEDULE, false)).toBe('ask-server')
  })

  it('asks the server only during opening hours, on the server clock', () => {
    // 23:59 in London is inside 18:00-00:00; midnight is not.
    expect(admission(new Date('2026-12-05T23:59:00Z'), SCHEDULE, false)).toBe('ask-server')
    expect(admission(new Date('2026-12-06T00:00:00Z'), SCHEDULE, false)).toBe('open')
    expect(admission(new Date('2026-12-06T12:00:00Z'), SCHEDULE, false)).toBe('open')
  })

  it('reads the hours on London time through the clock change, not UTC', () => {
    // 17:30 UTC in July is 18:30 in London (BST): open.
    expect(withinHours(new Date('2027-07-01T17:30:00Z'), SCHEDULE.hours)).toBe(true)
    // 17:30 UTC in December is 17:30 in London (GMT): not yet.
    expect(withinHours(new Date('2026-12-10T17:30:00Z'), SCHEDULE.hours)).toBe(false)
  })

  it('wraps a window through midnight, and treats open equal to close as always open', () => {
    const late = { ...SCHEDULE.hours, open: '22:00', close: '02:00' }
    expect(withinHours(new Date('2026-12-10T01:00:00Z'), late)).toBe(true)
    expect(withinHours(new Date('2026-12-10T03:00:00Z'), late)).toBe(false)
    expect(
      withinHours(new Date('2026-12-10T12:00:00Z'), { ...SCHEDULE.hours, close: '18:00' })
    ).toBe(true)
  })

  it('counts down in days, hours, minutes and seconds', () => {
    expect(countdown((61 * 86400 + 20 * 3600 + 14 * 60 + 9) * 1000)).toBe('61d 20h 14m 09s')
    expect(countdown((3600 + 5) * 1000)).toBe('1h 00m 05s')
    expect(countdown(59_001)).toBe('1m 00s')
    expect(countdown(-5)).toBe('0m 00s')
  })
})
