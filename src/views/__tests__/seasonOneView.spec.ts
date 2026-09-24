import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { flushPromises, shallowMount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import SeasonOneView from '../SeasonOneView.vue'

const SAM = '0b1f6c3d-2e4a-4f7b-9c8d-1a2b3c4d5e6f'

/** The board, minus the WebGL: it only has to be pointed at and to report back. */
const focusPlayer = vi.fn(() => true)
const PlotSceneStub = defineComponent({
  emits: ['plots', 'focused', 'status', 'dismiss', 'escape'],
  methods: { focusPlayer },
  render: () => h('div')
})

async function mountAt(query: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/s1', component: { render: () => h('div') } }]
  })
  await router.push(`/s1${query}`)
  await router.isReady()

  const wrapper = shallowMount(SeasonOneView, {
    global: { plugins: [router], stubs: { PlotScene: PlotSceneStub } }
  })
  return { wrapper, router, scene: wrapper.findComponent(PlotSceneStub) }
}

describe('season 1 plot permalinks', () => {
  it('focuses the plot named in the URL once the board has it', async () => {
    focusPlayer.mockClear()
    const { scene } = await mountAt('?plot=Alex')

    // Nothing to focus before the first poll comes back.
    expect(focusPlayer).not.toHaveBeenCalled()

    scene.vm.$emit('plots', ['whoever'])
    await nextTick()
    expect(focusPlayer).toHaveBeenCalledWith('Alex')

    // Asked for once: a link that has been honoured is not re-applied on every
    // later poll, which would drag the visitor back off whatever they picked.
    scene.vm.$emit('plots', ['whoever', 'someone-else'])
    await nextTick()
    expect(focusPlayer).toHaveBeenCalledTimes(1)
  })

  it('writes the focused plot into the URL and clears it when the plot is let go', async () => {
    const { router, scene } = await mountAt('')

    scene.vm.$emit('focused', { uuid: SAM, name: 'Sam' })
    await flushPromises()
    expect(router.currentRoute.value.query.plot).toBe('Sam')

    scene.vm.$emit('focused', null)
    await flushPromises()
    expect(router.currentRoute.value.query.plot).toBeUndefined()
  })
})
