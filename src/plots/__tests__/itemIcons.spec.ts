import { describe, it, expect } from 'vitest'
import { iconStyle, itemIcon } from '../itemIcons'

describe('itemIcon', () => {
  it('takes a flat item from the item sheet', () => {
    expect(itemIcon('diamond')?.url).toMatch(/items/)
  })

  it('takes a block in the hand from the side of its block in the board atlas', () => {
    expect(itemIcon('stone')?.url).toMatch(/blocks/)
    // A shape takes its material's face, as it does on the board.
    expect(itemIcon('stone_brick_stairs')).toEqual(itemIcon('stone_bricks'))
  })

  it('draws waxed copper as the copper it is, and wood as the side of its log', () => {
    expect(itemIcon('waxed_copper_block')).toEqual(itemIcon('copper_block'))
    expect(itemIcon('pale_oak_wood')).toEqual(itemIcon('pale_oak_log'))
    expect(itemIcon('pale_oak_wood')).not.toBeNull()
  })

  it('has nothing for an item no sheet holds', () => {
    expect(itemIcon('not_an_item')).toBeNull()
  })

  it('scales a sheet so one 16px tile fills the size asked for', () => {
    const style = iconStyle({ url: 'x.png', x: 32, y: 16, sheetWidth: 512, sheetHeight: 400 }, 24)
    expect(style.backgroundSize).toBe('768px 600px')
    expect(style.backgroundPosition).toBe('-48px -24px')
  })
})
