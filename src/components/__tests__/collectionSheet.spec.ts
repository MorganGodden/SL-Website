import { describe, it, expect, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import CollectionSheet from '../season1/collectionSheet.vue'
import type { CollectionDocument } from '@/plots/collectionClient'

const LOG: CollectionDocument = {
  formatVersion: 1,
  playerUuid: 'uuid-1',
  playerName: 'Ada',
  rank: 1,
  score: 11,
  collected: 2,
  total: 4,
  // Fewest points first, as the server sends them.
  tiers: [
    { name: 'common', points: 1, collected: 1, total: 2 },
    { name: 'rare', points: 10, collected: 1, total: 1 },
    { name: 'epic', points: 50, collected: 0, total: 1 }
  ],
  // Sorted by id, which mixes the tiers up.
  items: [
    { id: 'beacon', tier: 'epic', at: null },
    { id: 'diamond', tier: 'rare', at: 1 },
    { id: 'dirt', tier: 'common', at: 2 },
    { id: 'stone', tier: 'common', at: null }
  ]
}

vi.mock('@/plots/collectionClient', () => ({ fetchCollection: vi.fn(async () => LOG) }))

describe('collection sheet', () => {
  it('lays the items out a section to a tier, easiest first', async () => {
    const wrapper = mount(CollectionSheet, { props: { uuid: 'uuid-1', name: 'Ada', below: 200 } })
    await flushPromises()

    const sections = wrapper.findAll('section section')
    expect(sections.map((section) => section.get('h3').text())).toEqual(['Common', 'Rare', 'Epic'])
    expect(sections.map((section) => section.findAll('li').length)).toEqual([2, 1, 1])
    wrapper.unmount()
  })
})
