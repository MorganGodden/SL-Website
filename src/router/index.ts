import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { SEASONS, defaultSeason, type SeasonId } from '@/seasons/registry'

/**
 * Each season owns its own view. The two seasons genuinely differ and will
 * diverge further, so they are separate routes rather than one component
 * branching on a season id.
 *
 * Views are lazily imported so that visiting the Season 0 archive never
 * downloads the Season 1 renderer (three.js) it has no use for.
 */
const VIEWS: Record<SeasonId, () => Promise<unknown>> = {
  s0: () => import('@/views/SeasonZeroView.vue'),
  s1: () => import('@/views/SeasonOneView.vue')
}

const seasonRoutes: RouteRecordRaw[] = SEASONS.map((season) => ({
  path: season.route,
  name: season.id,
  component: VIEWS[season.id],
  meta: {
    seasonId: season.id,
    /**
     * A season with plots renders a full-viewport scene and manages its own
     * scrolling; one without sits in the ordinary centred page container.
     */
    fullBleed: season.features.plots
  }
})) as RouteRecordRaw[]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: defaultSeason().route },
    ...seasonRoutes,
    // Anything else (including a stale /s2 link) lands on the current season
    // rather than a blank screen.
    { path: '/:pathMatch(.*)*', redirect: defaultSeason().route }
  ]
})

export default router
