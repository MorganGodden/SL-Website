import { describe, it, expect } from 'vitest'
import { faceTilesForEntry, hasTexture, tileBounds, RenderClass, WHITE_TILE } from '../blockAtlas'
import {
  ATLAS_CELL,
  ATLAS_COLUMNS,
  ATLAS_HEIGHT,
  ATLAS_PADDING,
  ATLAS_TILE,
  ATLAS_TILE_COUNT,
  ATLAS_WIDTH,
  BLOCK_TILES
} from '../blockAtlas.generated'

/** Face order, as the mesher emits them. */
const [UP, DOWN, EAST, WEST, SOUTH, NORTH] = [0, 1, 2, 3, 4, 5]

describe('faceTilesForEntry', () => {
  it('resolves a directly mapped block', () => {
    const stone = faceTilesForEntry('minecraft:stone')
    expect(stone.textured).toBe(true)
    expect(stone.render).toBe(RenderClass.Opaque)
    // One texture on every face.
    expect(new Set(stone.tiles).size).toBe(1)
  })

  it('ignores block state properties it has no use for', () => {
    expect(faceTilesForEntry('minecraft:stone_slab[type=top,waterlogged=false]').tiles).toEqual(
      faceTilesForEntry('minecraft:stone_slab').tiles
    )
  })

  it('gives a slab the texture of the material it is made of', () => {
    expect(faceTilesForEntry('minecraft:stone_slab').tiles).toEqual(
      faceTilesForEntry('minecraft:stone').tiles
    )
    expect(faceTilesForEntry('minecraft:birch_door').tiles).toEqual(
      faceTilesForEntry('minecraft:birch_planks').tiles
    )
  })

  it('puts a distinct texture on the top, sides and bottom of a grass block', () => {
    const grass = faceTilesForEntry('minecraft:grass_block')
    expect(grass.tiles[UP]).not.toBe(grass.tiles[NORTH])
    expect(grass.tiles[DOWN]).not.toBe(grass.tiles[NORTH])
    // All four sides match.
    const sides = [grass.tiles[EAST], grass.tiles[WEST], grass.tiles[SOUTH], grass.tiles[NORTH]]
    expect(new Set(sides).size).toBe(1)
  })

  it('whitens the sides of ground with snow lying on it', () => {
    const bare = faceTilesForEntry('minecraft:grass_block[snowy=false]')
    const snowy = faceTilesForEntry('minecraft:grass_block[snowy=true]')
    expect(snowy.tiles[NORTH]).not.toBe(bare.tiles[NORTH])
    // Only the sides change; the top is still grass.
    expect(snowy.tiles[UP]).toBe(bare.tiles[UP])
  })

  it('turns a pillar so its end grain follows the axis', () => {
    const upright = faceTilesForEntry('minecraft:oak_log[axis=y]')
    const east = faceTilesForEntry('minecraft:oak_log[axis=x]')
    const north = faceTilesForEntry('minecraft:oak_log[axis=z]')

    expect(east.tiles[EAST]).toBe(upright.tiles[UP])
    expect(east.tiles[UP]).toBe(upright.tiles[NORTH])
    expect(north.tiles[SOUTH]).toBe(upright.tiles[UP])
    expect(north.tiles[UP]).toBe(upright.tiles[NORTH])
  })

  it('classifies what can be seen through', () => {
    expect(faceTilesForEntry('minecraft:glass').render).toBe(RenderClass.Translucent)
    expect(faceTilesForEntry('minecraft:ice').render).toBe(RenderClass.Translucent)
    expect(faceTilesForEntry('minecraft:water[level=0]').render).toBe(RenderClass.Translucent)
    expect(faceTilesForEntry('minecraft:oak_leaves').render).toBe(RenderClass.Cutout)
    expect(faceTilesForEntry('minecraft:snow_block').render).toBe(RenderClass.Opaque)
  })

  it('falls back to the white tile for a block the atlas has no texture for', () => {
    const unknown = faceTilesForEntry('minecraft:some_block_nobody_baked')
    expect(unknown.textured).toBe(false)
    expect([...unknown.tiles]).toEqual(new Array(6).fill(WHITE_TILE))
    expect(hasTexture('minecraft:some_block_nobody_baked')).toBe(false)
    expect(hasTexture('minecraft:stone')).toBe(true)
  })

  it('returns the same object for a repeated entry', () => {
    expect(faceTilesForEntry('minecraft:bricks')).toBe(faceTilesForEntry('minecraft:bricks'))
  })
})

describe('the generated atlas table', () => {
  it('only names tiles the atlas actually contains', () => {
    for (const [id, tiles] of Object.entries(BLOCK_TILES)) {
      for (const tile of tiles.slice(0, 3) as number[]) {
        expect(tile, id).toBeGreaterThanOrEqual(0)
        expect(tile, id).toBeLessThan(ATLAS_TILE_COUNT)
      }
    }
  })

  it('is laid out inside the image it describes', () => {
    const rows = Math.ceil(ATLAS_TILE_COUNT / ATLAS_COLUMNS)
    expect(ATLAS_WIDTH).toBe(ATLAS_COLUMNS * ATLAS_CELL)
    expect(ATLAS_HEIGHT).toBeGreaterThanOrEqual(rows * ATLAS_CELL)
    expect(ATLAS_CELL).toBe(ATLAS_TILE + ATLAS_PADDING * 2)
  })
})

describe('tileBounds', () => {
  it('covers exactly one tile, padding excluded', () => {
    const bounds = tileBounds(0)
    expect((bounds.u1 - bounds.u0) * ATLAS_WIDTH).toBeCloseTo(ATLAS_TILE, 6)
    expect((bounds.v1 - bounds.v0) * ATLAS_HEIGHT).toBeCloseTo(ATLAS_TILE, 6)
  })

  it('keeps every tile inside the image, clear of its neighbours', () => {
    for (let tile = 0; tile < ATLAS_TILE_COUNT; tile++) {
      const { u0, v0, u1, v1 } = tileBounds(tile)
      expect(u0).toBeGreaterThanOrEqual(0)
      expect(v0).toBeGreaterThanOrEqual(0)
      expect(u1).toBeLessThanOrEqual(1)
      expect(v1).toBeLessThanOrEqual(1)

      // The margin around the tile is real, unshared space: this is what stops
      // one block's texture bleeding into another at a distance. Compared with
      // a pixel of slack, since a bound is a ratio and does not come back out
      // of one exactly.
      expect(u0 * ATLAS_WIDTH).toBeGreaterThan(ATLAS_PADDING - 1)
      expect(v0 * ATLAS_HEIGHT).toBeGreaterThan(ATLAS_PADDING - 1)
    }
  })

  it('gives neighbouring tiles disjoint ranges', () => {
    const first = tileBounds(0)
    const second = tileBounds(1)
    expect(second.u0).toBeGreaterThan(first.u1)

    // Tile ATLAS_COLUMNS is the first of the next row, so it is lower down the
    // image, which is a smaller v.
    const nextRow = tileBounds(ATLAS_COLUMNS)
    expect(nextRow.v1).toBeLessThan(first.v0)
  })
})
