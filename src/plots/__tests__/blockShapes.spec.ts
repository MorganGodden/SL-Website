import { describe, it, expect } from 'vitest'
import { isFullCube, kindOf, shapeFor, shapeIsFixed, type ShapeContext } from '../blockShapes'

/** Nothing next door, which is all most shapes need. */
const ALONE: ShapeContext = { entry: () => null, solid: () => false }

/** A block on every side, for the shapes that reach out to their neighbours. */
const SURROUNDED: ShapeContext = { entry: () => 'minecraft:stone', solid: () => true }

/** The boxes of a shape, in sixteenths, for reading against the game's models. */
function boxes(entry: string, context: ShapeContext = ALONE): number[][] {
  return shapeFor(entry, context).boxes.map((box) =>
    [box.x0, box.y0, box.z0, box.x1, box.y1, box.z1].map((value) => Math.round(value * 16))
  )
}

describe('kindOf', () => {
  it('reads the shape off the identifier', () => {
    expect(kindOf('minecraft:stone')).toBe('full')
    expect(kindOf('minecraft:oak_slab')).toBe('slab')
    expect(kindOf('minecraft:andesite_stairs')).toBe('stairs')
    expect(kindOf('minecraft:oak_fence')).toBe('fence')
    expect(kindOf('minecraft:cobblestone_wall')).toBe('wall')
    expect(kindOf('minecraft:glass_pane')).toBe('pane')
    expect(kindOf('minecraft:iron_bars')).toBe('pane')
    expect(kindOf('minecraft:water')).toBe('liquid')
    expect(kindOf('minecraft:chest')).toBe('chest')
    expect(kindOf('minecraft:redstone_wire')).toBe('wire')
    expect(kindOf('minecraft:oak_pressure_plate')).toBe('plate')
    expect(kindOf('minecraft:lantern')).toBe('lantern')
  })

  it('keeps the more specific suffixes apart from the ones inside them', () => {
    // Each of these ends with a suffix belonging to another kind.
    expect(kindOf('minecraft:oak_fence_gate')).toBe('gate')
    expect(kindOf('minecraft:oak_trapdoor')).toBe('trapdoor')
    expect(kindOf('minecraft:oak_door')).toBe('door')
    expect(kindOf('minecraft:wall_torch')).toBe('wall_torch')
    expect(kindOf('minecraft:soul_torch')).toBe('torch')
    expect(kindOf('minecraft:oak_wall_sign')).toBe('sign')
  })

  it('knows a plant from a block made of one', () => {
    expect(kindOf('minecraft:poppy')).toBe('cross')
    expect(kindOf('minecraft:birch_sapling')).toBe('cross')
    expect(kindOf('minecraft:brown_mushroom')).toBe('cross')
    expect(kindOf('minecraft:tall_grass')).toBe('cross')
    // A block of the stuff is still a block.
    expect(kindOf('minecraft:brown_mushroom_block')).toBe('full')
    expect(kindOf('minecraft:mushroom_stem')).toBe('full')
  })
})

describe('isFullCube', () => {
  it('is what the mesher may cull against', () => {
    expect(isFullCube('minecraft:stone')).toBe(true)
    expect(isFullCube('minecraft:oak_slab[type=double]')).toBe(true)
    expect(isFullCube('minecraft:snow[layers=8]')).toBe(true)

    expect(isFullCube('minecraft:oak_slab[type=bottom]')).toBe(false)
    expect(isFullCube('minecraft:snow[layers=3]')).toBe(false)
    expect(isFullCube('minecraft:oak_fence[north=true]')).toBe(false)
    expect(isFullCube('minecraft:water[level=0]')).toBe(false)
    expect(isFullCube('minecraft:poppy')).toBe(false)
  })
})

describe('slabs', () => {
  it('sits in the half of the block it says it does', () => {
    expect(boxes('minecraft:oak_slab[type=bottom]')).toEqual([[0, 0, 0, 16, 8, 16]])
    expect(boxes('minecraft:oak_slab[type=top]')).toEqual([[0, 8, 0, 16, 16, 16]])
    expect(boxes('minecraft:oak_slab[type=double]')).toEqual([[0, 0, 0, 16, 16, 16]])
  })
})

describe('stairs', () => {
  it('puts the step on the side it faces', () => {
    expect(boxes('minecraft:oak_stairs[facing=east,half=bottom,shape=straight]')).toEqual([
      [0, 0, 0, 16, 8, 16],
      [8, 8, 0, 16, 16, 16]
    ])
    // A quarter turn round: the step moves to the south side.
    expect(boxes('minecraft:oak_stairs[facing=south,half=bottom,shape=straight]')).toEqual([
      [0, 0, 0, 16, 8, 16],
      [0, 8, 8, 16, 16, 16]
    ])
  })

  it('turns upside down for the top half', () => {
    expect(boxes('minecraft:oak_stairs[facing=east,half=top,shape=straight]')).toEqual([
      [0, 8, 0, 16, 16, 16],
      [8, 0, 0, 16, 8, 16]
    ])
  })

  it('turns a rolled-over corner back the quarter the game turns it', () => {
    // x180 then y90, straight out of the game's own blockstate table: rolling
    // the model over lands the quarter on the wrong side without it.
    const [, step] = boxes('minecraft:oak_stairs[facing=east,half=top,shape=outer_right]')
    expect(step).toEqual([8, 0, 8, 16, 8, 16])
  })

  it('cuts the step back to a quarter at an outer corner', () => {
    const [, step] = boxes('minecraft:oak_stairs[facing=east,half=bottom,shape=outer_right]')
    expect(step).toEqual([8, 8, 8, 16, 16, 16])
  })

  it('grows the step to three quarters at an inner corner', () => {
    expect(boxes('minecraft:oak_stairs[facing=east,half=bottom,shape=inner_right]')).toHaveLength(3)
  })
})

describe('fences and panes', () => {
  it('stands a post with nothing joined to it', () => {
    expect(boxes('minecraft:oak_fence[north=false,east=false,south=false,west=false]')).toEqual([
      [6, 0, 6, 10, 16, 10]
    ])
  })

  it('reaches out on the sides its state says it is joined on', () => {
    const joined = boxes(
      'minecraft:oak_fence[north=true,east=false,south=false,west=false]'
    )
    // The post, and two rails reaching north.
    expect(joined).toHaveLength(3)
    // Both run into the post rather than stopping against its face.
    expect(joined.slice(1)).toEqual([
      [7, 12, 0, 9, 15, 9],
      [7, 6, 0, 9, 9, 9]
    ])
  })

  it('looks at its neighbours when its state does not say', () => {
    expect(boxes('minecraft:oak_fence', ALONE)).toHaveLength(1)
    // A post and two rails on each of the four sides.
    expect(boxes('minecraft:oak_fence', SURROUNDED)).toHaveLength(9)
  })

  it('draws a pane as a thinner post with panels', () => {
    expect(boxes('minecraft:glass_pane[north=false,east=false,south=false,west=false]')).toEqual([
      [7, 0, 7, 9, 16, 9]
    ])
    expect(boxes('minecraft:glass_pane[north=true,east=false,south=false,west=false]')).toEqual([
      [7, 0, 7, 9, 16, 9],
      [7, 0, 0, 9, 16, 8]
    ])
  })
})

describe('walls', () => {
  it('reads the height of each arm off its state', () => {
    const wall = boxes('minecraft:cobblestone_wall[up=true,north=tall,east=low,south=none,west=none]')
    expect(wall).toEqual([
      [4, 0, 4, 12, 16, 12],
      [5, 0, 0, 11, 16, 8],
      [8, 0, 5, 16, 14, 11]
    ])
  })
})

describe('liquid', () => {
  it('sits a notch below the top of its block at the surface', () => {
    expect(boxes('minecraft:water[level=0]')).toEqual([[0, 0, 0, 16, 14, 16]])
  })

  it('fills the block when there is more of it above', () => {
    const under: ShapeContext = { entry: () => 'minecraft:water[level=0]', solid: () => false }
    expect(boxes('minecraft:water[level=0]', under)).toEqual([[0, 0, 0, 16, 16, 16]])
  })

  it('thins out along a flow', () => {
    const [source] = boxes('minecraft:water[level=0]')
    const [flowing] = boxes('minecraft:water[level=4]')
    expect(flowing[4]).toBeLessThan(source[4])
  })
})

describe('the odds and ends', () => {
  it('lays flat things flat', () => {
    expect(boxes('minecraft:redstone_wire[east=side,north=side,power=0]')).toEqual([
      [0, 0, 0, 16, 1, 16]
    ])
    expect(boxes('minecraft:oak_pressure_plate[powered=false]')).toEqual([[1, 0, 1, 15, 1, 15]])
    expect(boxes('minecraft:white_carpet')).toEqual([[0, 0, 0, 16, 1, 16]])
  })

  it('stacks snow by the layer', () => {
    expect(boxes('minecraft:snow[layers=1]')).toEqual([[0, 0, 0, 16, 2, 16]])
    expect(boxes('minecraft:snow[layers=3]')).toEqual([[0, 0, 0, 16, 6, 16]])
    expect(boxes('minecraft:snow[layers=8]')).toEqual([[0, 0, 0, 16, 16, 16]])
  })

  it('hangs a trapdoor on the floor, the ceiling or a wall', () => {
    expect(boxes('minecraft:oak_trapdoor[half=bottom,open=false,facing=north]')).toEqual([
      [0, 0, 0, 16, 3, 16]
    ])
    expect(boxes('minecraft:oak_trapdoor[half=top,open=false,facing=north]')).toEqual([
      [0, 13, 0, 16, 16, 16]
    ])
    expect(boxes('minecraft:oak_trapdoor[half=bottom,open=true,facing=north]')).toEqual([
      [0, 0, 13, 16, 16, 16]
    ])
  })

  it('swings a door round its hinge', () => {
    expect(boxes('minecraft:oak_door[facing=east,hinge=left,open=false,half=lower]')).toEqual([
      [0, 0, 0, 3, 16, 16]
    ])
    // Open on a left hinge is a quarter turn clockwise from closed.
    expect(boxes('minecraft:oak_door[facing=east,hinge=left,open=true,half=lower]')).toEqual([
      [0, 0, 0, 16, 16, 3]
    ])
  })

  it('joins the halves of a double chest', () => {
    expect(boxes('minecraft:chest[facing=south,type=single]')).toEqual([[1, 0, 1, 15, 14, 15]])
    // Joined across the way it faces, so the two halves meet.
    expect(boxes('minecraft:chest[facing=south,type=left]')).toEqual([[0, 0, 1, 16, 14, 15]])
    expect(boxes('minecraft:chest[facing=east,type=left]')).toEqual([[1, 0, 0, 15, 14, 16]])
  })

  it('stands a torch up and hangs one off a wall', () => {
    expect(boxes('minecraft:torch')).toEqual([[7, 0, 7, 9, 10, 9]])
    // Pointing east means standing against the wall to the west.
    expect(boxes('minecraft:wall_torch[facing=east]')).toEqual([[1, 3, 7, 4, 13, 9]])
    expect(boxes('minecraft:wall_torch[facing=south]')).toEqual([[7, 3, 1, 9, 13, 4]])
  })

  it('hangs a lantern from its chain', () => {
    expect(boxes('minecraft:lantern[hanging=false]')).toEqual([
      [5, 0, 5, 11, 7, 11],
      [6, 7, 6, 10, 9, 10]
    ])
    const hanging = boxes('minecraft:lantern[hanging=true]')
    expect(hanging[0][1]).toBeGreaterThan(0)
    expect(hanging[1][4]).toBe(16)
  })

  it('draws a plant as crossed planes rather than as boxes', () => {
    const poppy = shapeFor('minecraft:poppy', ALONE)
    expect(poppy.cross).toBe(true)
    expect(poppy.boxes).toHaveLength(0)
    expect(poppy.full).toBe(false)
  })
})

describe('shapeIsFixed', () => {
  it('is true for the shapes that never look at their neighbours', () => {
    expect(shapeIsFixed('minecraft:stone')).toBe(true)
    expect(shapeIsFixed('minecraft:oak_slab[type=top]')).toBe(true)
    expect(shapeIsFixed('minecraft:poppy')).toBe(true)
    // Its state already says what it is joined to.
    expect(shapeIsFixed('minecraft:oak_fence[north=true,east=false,south=false,west=false]')).toBe(
      true
    )
  })

  it('is false when the block has to look around itself', () => {
    expect(shapeIsFixed('minecraft:water[level=0]')).toBe(false)
    expect(shapeIsFixed('minecraft:oak_fence')).toBe(false)
    expect(shapeIsFixed('minecraft:glass_pane[north=true]')).toBe(false)
  })
})
