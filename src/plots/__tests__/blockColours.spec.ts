import { describe, it, expect } from 'vitest'
import { colourForBlock, hasMappedColour } from '../blockColours'

describe('colourForBlock', () => {
  it('resolves a directly mapped block', () => {
    expect(colourForBlock('minecraft:stone')).toBe(0x8f8f8f)
  })

  it('gives a slab the colour of the material it is made of', () => {
    // The first real payload contained andesite_slab, tuff_slab and
    // polished_tuff_slab but no plain andesite or tuff block.
    expect(colourForBlock('minecraft:andesite_slab')).toBe(colourForBlock('minecraft:andesite'))
    expect(colourForBlock('minecraft:tuff_slab')).toBe(colourForBlock('minecraft:tuff'))
    expect(colourForBlock('minecraft:polished_tuff_slab')).toBe(
      colourForBlock('minecraft:polished_tuff')
    )
  })

  it('follows stairs and walls back to their material too', () => {
    expect(colourForBlock('minecraft:stone_stairs')).toBe(colourForBlock('minecraft:stone'))
    expect(colourForBlock('minecraft:sandstone_wall')).toBe(colourForBlock('minecraft:sandstone'))
  })

  it('resolves a wooden door through to its planks', () => {
    expect(colourForBlock('minecraft:birch_door')).toBe(colourForBlock('minecraft:birch_planks'))
  })

  it('is deterministic for unmapped blocks', () => {
    const a = colourForBlock('minecraft:some_block_nobody_mapped')
    const b = colourForBlock('minecraft:some_block_nobody_mapped')
    expect(a).toBe(b)
    expect(hasMappedColour('minecraft:some_block_nobody_mapped')).toBe(false)
  })

  it('keeps generated colours muted', () => {
    for (const id of ['minecraft:aaa', 'minecraft:zzz', 'minecraft:q_1', 'minecraft:xyzzy']) {
      const c = colourForBlock(id)
      const [r, g, b] = [(c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff]
      // Low saturation: channels stay close together, never a pure primary.
      expect(Math.max(r, g, b) - Math.min(r, g, b)).toBeLessThan(90)
    }
  })

  it('never returns a colour outside 24-bit range', () => {
    for (const id of ['minecraft:air', 'minecraft:unmapped_thing', 'x']) {
      const c = colourForBlock(id)
      expect(c).toBeGreaterThanOrEqual(0)
      expect(c).toBeLessThanOrEqual(0xffffff)
    }
  })
})
