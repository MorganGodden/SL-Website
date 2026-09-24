import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import LeaderboardOverlay from '../season1/leaderboardOverlay.vue'
import type { LeaderboardEntry } from '@/common/interfaces'

const ROWS: LeaderboardEntry[] = [
  { rank: 1, playerName: 'Ada', playerUuid: 'uuid-1', score: 300 },
  { rank: 2, playerName: 'Bo', playerUuid: 'uuid-2', score: 200 },
  { rank: 3, playerName: 'Cy', playerUuid: 'uuid-3', score: 100 },
  { rank: 4, playerName: 'Di', playerUuid: 'uuid-4', score: 50 }
]

async function mountOverlay(props: Record<string, unknown>) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/s0', component: { render: () => h('div') } },
      { path: '/s1', component: { render: () => h('div') } }
    ]
  })
  // The panel carries the season nav, so it wants somewhere to already be.
  await router.push('/s1')
  return mount(LeaderboardOverlay, {
    props: { rows: [], ...props },
    global: { plugins: [router] }
  })
}

describe('leaderboard overlay', () => {
  it('stands placeholder rows in for the list while scores are loading', async () => {
    const wrapper = await mountOverlay({ loading: true })

    // Eight rows of four bars each, in the shape the real rows will take.
    expect(wrapper.findAll('.skeleton')).toHaveLength(32)
    // The wait is still announced, now that there is no line of text saying so.
    expect(wrapper.get('[role="status"]').attributes('aria-label')).toBe('Fetching scores')
    // And it is placeholders rather than rows: nothing here is a control.
    expect(wrapper.findAll('#leaderboard-panel button')).toHaveLength(0)
  })

  it('drops the placeholders once the rows arrive', async () => {
    const wrapper = await mountOverlay({ rows: ROWS, loading: false })

    expect(wrapper.findAll('.skeleton')).toHaveLength(0)
    expect(wrapper.findAll('#leaderboard-panel li')).toHaveLength(ROWS.length)
  })
})
