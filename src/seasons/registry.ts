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
}

export const SEASONS: readonly SeasonDefinition[] = [
  {
    id: 's1',
    name: 'Snow Leagues 1',
    shortName: 'SL-1',
    route: '/s1',
    dataSource: 'fixtures',
    features: { leaderboard: true, plots: true }
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
