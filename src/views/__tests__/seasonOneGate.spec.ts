import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

/** The gate reads its settings when the module loads, so each test loads it afresh. */
async function mountBeforeTheSeason(server: string) {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-11-10T12:00:00Z'))
  vi.stubEnv('VITE_SEASON_PREVIEW', 'false')
  vi.stubEnv('VITE_SERVER_IP', server)
  vi.resetModules()
  const { default: SeasonOneGate } = await import('../SeasonOneGate.vue')
  return mount(SeasonOneGate, { global: { stubs: { RouterLink: true } } })
}

describe('season 1 countdown card', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllEnvs()
  })

  it('shows the last day and where to join', async () => {
    const wrapper = await mountBeforeTheSeason('mc.example.org')
    const text = wrapper.text()
    expect(text).toContain('Starts in')
    expect(text).toMatch(/Last day \D*19\D/)
    expect(text).toContain('mc.example.org')
    expect(wrapper.find('button').text()).toBe('Copy')
    expect(wrapper.find('router-link-stub[to="/s1/modpack"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('leaves the server line out when the build has no address', async () => {
    const wrapper = await mountBeforeTheSeason('')
    expect(wrapper.text()).not.toContain('Server')
    expect(wrapper.find('button').exists()).toBe(false)
    wrapper.unmount()
  })
})
