/**
 * The season registry.
 *
 * Adding a season should be an entry here plus a data file — not a refactor.
 * Anything season-specific that components need to branch on belongs in
 * `features`, so that no component has to know which season it is rendering.
 */

export type SeasonId = 's0' | 's1'

export interface SeasonFeatures {
  /** Has a leaderboard. Every season so far does; not assumed. */
  leaderboard: boolean
  /** Has per-player pocket-dimension plots to visualise. Season 0 does not. */
  plots: boolean
}

/** When a season's server can be played on. */
export interface SeasonSchedule {
  /** The instant the season opens. Before it, the season's pages show a countdown instead. */
  startsAt: string
  /**
   * The server's daily opening hours, on its own clock. Must match `hours` in
   * the plugin's config.yml: a close at or before the open wraps through midnight.
   */
  hours: { open: string; close: string; timeZone: string; label: string }
}

export interface SeasonDefinition {
  id: SeasonId
  /** Full display name, e.g. for page headings. */
  name: string
  /** Compact label, e.g. for nav chips. */
  shortName: string
  route: string
  /**
   * Where this season's leaderboard comes from. The loader itself lives in
   * `@/data/leaderboardService` — this is the declared intent, which the UI
   * uses to decide whether to show "provisional"/"final" affordances.
   */
  dataSource: 'frozen' | 'fixtures' | 'live'
  features: SeasonFeatures
  /** Only for a season with a live server to gate its pages on. */
  schedule?: SeasonSchedule
}

export const SEASONS: readonly SeasonDefinition[] = [
  {
    id: 's1',
    name: 'Snow Leagues 1',
    shortName: 'SL-1',
    route: '/s1',
    dataSource: 'live',
    features: { leaderboard: true, plots: true },
    schedule: {
      // Saturday 28 November 2026, 18:00 UK time (GMT, so UTC, in November).
      // Must match season.first-day and hours.open in the plugin's config.yml.
      startsAt: '2026-11-28T18:00:00Z',
      hours: { open: '18:00', close: '00:00', timeZone: 'Europe/London', label: 'UK time' }
    }
  },
  {
    id: 's0',
    name: 'Snow Leagues 0',
    shortName: 'SL-0',
    route: '/s0',
    dataSource: 'frozen',
    features: { leaderboard: true, plots: false }
  }
] as const

/** The season `/` redirects to. */
export const DEFAULT_SEASON_ID: SeasonId = 's1'

export function getSeason(id: SeasonId): SeasonDefinition {
  const season = SEASONS.find((s) => s.id === id)
  if (!season) throw new Error(`unknown season "${id}"`)
  return season
}

export function defaultSeason(): SeasonDefinition {
  return getSeason(DEFAULT_SEASON_ID)
}
