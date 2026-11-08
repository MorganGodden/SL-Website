import type { SeasonSchedule } from './registry'

/** What a season's pages do before the server has been asked anything. */
export type Admission = 'pre-season' | 'ask-server' | 'open'

/** Minutes past midnight on the server's clock, wherever the visitor is. */
function serverMinutes(now: Date, timeZone: string): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(now)
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  return part('hour') * 60 + part('minute')
}

function minutesOf(time: string): number {
  const [hour, minute] = time.split(':').map(Number)
  return hour * 60 + minute
}

/**
 * Whether `now` is in [open, close) on the server's clock. As the plugin reads
 * it, a close at or before the open wraps through midnight, and an open equal
 * to its close means open around the clock.
 */
export function withinHours(now: Date, hours: SeasonSchedule['hours']): boolean {
  const at = serverMinutes(now, hours.timeZone)
  const open = minutesOf(hours.open)
  const close = minutesOf(hours.close)
  if (open === close) return true
  return open < close ? at >= open && at < close : at >= open || at < close
}

/**
 * Before the season: shut, whatever the server says. During opening hours: up
 * to the server. Outside them: open, even if the server is down for the night.
 */
export function admission(now: Date, schedule: SeasonSchedule, preview: boolean): Admission {
  if (!preview && now.getTime() < Date.parse(schedule.startsAt)) return 'pre-season'
  return withinHours(now, schedule.hours) ? 'ask-server' : 'open'
}

/** `61d 20h 14m 09s`, with days and hours only while there are any. */
export function countdown(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  if (days > 0) return `${days}d ${hours}h ${pad(minutes)}m ${pad(seconds)}s`
  if (hours > 0) return `${hours}h ${pad(minutes)}m ${pad(seconds)}s`
  return `${minutes}m ${pad(seconds)}s`
}
