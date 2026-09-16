import { describe, it, expect } from 'vitest'
import {
  PLOT_GAP,
  SCREEN_UP_ON_FLOOR,
  layoutGrid,
  pickStride,
  playerForCell,
  screenDeltaToWorld,
  turnForCell,
  wrapDistance
} from '../boardLayout'

const SPACING = 16 + PLOT_GAP
const EXTENT = { across: 150, near: 170, far: 170 }

describe('pickStride', () => {
  it('is coprime with the player count, so neighbours are never the same plot', () => {
    for (let players = 3; players <= 30; players++) {
      const stride = pickStride(players)
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      expect(gcd(stride, players)).toBe(1)
    }
  })

  it('degrades safely for one or two players', () => {
    expect(pickStride(1)).toBe(1)
    expect(pickStride(2)).toBe(1)
  })
})

describe('playerForCell', () => {
  it('walks the whole player list along both axes', () => {
    const players = 5
    const stride = pickStride(players)
    const alongX = new Set<number>()
    const alongZ = new Set<number>()
    for (let i = 0; i < players; i++) {
      alongX.add(playerForCell(i, 0, players, stride))
      alongZ.add(playerForCell(0, i, players, stride))
    }
    expect(alongX.size).toBe(players)
    expect(alongZ.size).toBe(players)
  })

  it('does not put the same plot next to itself', () => {
    for (const players of [3, 4, 5, 7, 12, 25]) {
      const stride = pickStride(players)
      for (let gx = -3; gx <= 3; gx++) {
        for (let gz = -3; gz <= 3; gz++) {
          const here = playerForCell(gx, gz, players, stride)
          expect(playerForCell(gx + 1, gz, players, stride)).not.toBe(here)
          expect(playerForCell(gx, gz + 1, players, stride)).not.toBe(here)
        }
      }
    }
  })

  it('handles negative coordinates, which the lattice has in both directions', () => {
    const stride = pickStride(5)
    for (let gx = -20; gx < 20; gx++) {
      const index = playerForCell(gx, -7, 5, stride)
      expect(index).toBeGreaterThanOrEqual(0)
      expect(index).toBeLessThan(5)
    }
  })

  it('repeats with the player count', () => {
    const stride = pickStride(7)
    expect(playerForCell(0, 0, 7, stride)).toBe(playerForCell(7, 0, 7, stride))
    expect(playerForCell(3, 2, 7, stride)).toBe(playerForCell(10, 2, 7, stride))
  })
})

describe('wrapDistance', () => {
  it('stays positive for a negative scroll', () => {
    expect(wrapDistance(-1, 20)).toBe(19)
    expect(wrapDistance(-21, 20)).toBe(19)
  })

  it('is zero at a whole number of periods', () => {
    expect(wrapDistance(0, 20)).toBe(0)
    expect(wrapDistance(40, 20)).toBe(0)
    expect(wrapDistance(-40, 20)).toBe(0)
  })
})

describe('layoutGrid', () => {
  it('fills the view in both directions, not just one', () => {
    const cells = layoutGrid(25, SPACING, 0, 0, EXTENT)
    expect(cells.some((c) => c.z < -SPACING)).toBe(true)
    expect(cells.some((c) => c.z > SPACING)).toBe(true)
    expect(cells.some((c) => c.x < -SPACING)).toBe(true)
    expect(cells.some((c) => c.x > SPACING)).toBe(true)
  })

  it('places plots on a lattice with the requested gap between them', () => {
    const cells = layoutGrid(25, SPACING, 0, 0, EXTENT)
    const xs = [...new Set(cells.map((c) => +c.x.toFixed(6)))].sort((a, b) => a - b)
    for (let i = 1; i < xs.length; i++) {
      expect(xs[i] - xs[i - 1]).toBeCloseTo(SPACING, 6)
    }
    // Plots are 16 wide, so this is the floor showing between them.
    expect(SPACING - 16).toBe(PLOT_GAP)
  })

  it('never stacks two plots in the same place', () => {
    const cells = layoutGrid(25, SPACING, 37, -18, EXTENT)
    const seen = new Set(cells.map((c) => `${c.x.toFixed(4)},${c.z.toFixed(4)}`))
    expect(seen.size).toBe(cells.length)
  })

  it('repeats a single published plot across the whole lattice', () => {
    const cells = layoutGrid(1, SPACING, 0, 0, EXTENT)
    expect(cells.length).toBeGreaterThan(20)
    expect(cells.every((c) => c.playerIndex === 0)).toBe(true)
  })

  it('shows every player somewhere on screen', () => {
    const cells = layoutGrid(25, SPACING, 0, 0, { across: 400, near: 400, far: 400 })
    expect(new Set(cells.map((c) => c.playerIndex)).size).toBe(25)
  })

  it('never pops a plot in or out inside the visible region', () => {
    // Cells do enter and leave in whole diagonals at the very edge, because the
    // cull boundary runs at 45 degrees to the lattice. What must never happen is
    // a plot appearing or vanishing somewhere the viewer can actually see, so
    // this checks a region comfortably inside the margin.
    const inner = { across: EXTENT.across - 40, depth: EXTENT.near - 40 }
    const isInner = (c: { x: number; z: number }) =>
      Math.abs(c.x - c.z) < inner.across && Math.abs(c.x + c.z) < inner.depth

    for (let step = 0; step < 60; step++) {
      const now = layoutGrid(5, SPACING, step, 0, EXTENT)
      const next = layoutGrid(5, SPACING, step + 1, 0, EXTENT)
      const nextByPlace = new Map(
        next.map((c) => [`${c.x.toFixed(4)},${c.z.toFixed(4)}`, c.playerIndex])
      )

      for (const cell of now.filter(isInner)) {
        // One unit of scroll along x moves every plot one unit the other way.
        const moved = `${(cell.x - 1).toFixed(4)},${cell.z.toFixed(4)}`
        expect(nextByPlace.get(moved)).toBe(cell.playerIndex)
      }
    }
  })

  it('looks identical after scrolling a whole number of lattice periods', () => {
    const players = 5
    const period = SPACING * players
    const key = (c: { playerIndex: number; x: number; z: number }) =>
      `${c.playerIndex}@${c.x.toFixed(4)},${c.z.toFixed(4)}`
    const a = layoutGrid(players, SPACING, 0, 0, EXTENT).map(key).sort()
    const b = layoutGrid(players, SPACING, period, 0, EXTENT).map(key).sort()
    expect(a).toEqual(b)
  })

  it('degrades safely before anything is published', () => {
    expect(layoutGrid(0, SPACING, 0, 0, EXTENT)).toEqual([])
    expect(layoutGrid(5, 0, 0, 0, EXTENT)).toEqual([])
    expect(layoutGrid(5, SPACING, 0, 0, { across: 0, near: 0, far: 0 })).toEqual([])
  })
})

describe('screenDeltaToWorld', () => {
  /** Where a floor-plane displacement lands on screen, in pixels. */
  function project(x: number, z: number, unitsPerPixel: number) {
    return {
      right: (x - z) / Math.SQRT2 / unitsPerPixel,
      down: (x + z) / Math.SQRT2 / SCREEN_UP_ON_FLOOR / unitsPerPixel
    }
  }

  it('moves the board by exactly the distance the pointer moved', () => {
    const unitsPerPixel = 0.0675
    for (const [dx, dy] of [
      [40, 0],
      [0, 40],
      [-25, 60],
      [13, -7]
    ]) {
      const world = screenDeltaToWorld(dx, dy, unitsPerPixel)
      const screen = project(world.x, world.z, unitsPerPixel)
      expect(screen.right).toBeCloseTo(dx, 6)
      expect(screen.down).toBeCloseTo(dy, 6)
    }
  })

  it('drives both floor axes, so the board is not stuck on the drift line', () => {
    const across = screenDeltaToWorld(10, 0, 0.1)
    expect(across.x).toBeCloseTo(-across.z, 6)
    expect(across.x).not.toBeCloseTo(0, 6)

    const down = screenDeltaToWorld(0, 10, 0.1)
    expect(down.x).toBeCloseTo(down.z, 6)
    expect(down.x).toBeGreaterThan(0)
  })

  it('is linear, so a drag and the same drag in steps agree', () => {
    const whole = screenDeltaToWorld(30, 18, 0.08)
    const a = screenDeltaToWorld(12, 5, 0.08)
    const b = screenDeltaToWorld(18, 13, 0.08)
    expect(a.x + b.x).toBeCloseTo(whole.x, 6)
    expect(a.z + b.z).toBeCloseTo(whole.z, 6)
  })
})

describe('layoutGrid lattice coordinates', () => {
  it('names a cell the same way however far the board has scrolled', () => {
    // A plot the pointer is resting on keeps its identity while the board
    // drifts under it; only stepping onto the next plot changes it.
    const unscrolled = layoutGrid(7, SPACING, 0, 0, EXTENT)
    const scrolled = layoutGrid(7, SPACING, SPACING * 3, SPACING * 2, EXTENT)

    const cell = unscrolled.find((c) => c.gx === 1 && c.gz === -1)
    const same = scrolled.find((c) => c.gx === 1 && c.gz === -1)
    expect(cell).toBeDefined()
    expect(same).toBeDefined()
    // Same cell, same player, moved on screen by exactly the scroll.
    expect(same!.playerIndex).toBe(cell!.playerIndex)
    expect(same!.x).toBeCloseTo(cell!.x - SPACING * 3, 6)
    expect(same!.z).toBeCloseTo(cell!.z - SPACING * 2, 6)
  })

  it('gives every visible cell its own name', () => {
    const cells = layoutGrid(5, SPACING, 12, -30, EXTENT)
    const keys = new Set(cells.map((c) => `${c.gx}:${c.gz}`))
    expect(cells.length).toBeGreaterThan(10)
    expect(keys.size).toBe(cells.length)
  })

  it('places a cell where its lattice coordinates say it should be', () => {
    const scrollX = 41
    const scrollZ = -17
    for (const cell of layoutGrid(6, SPACING, scrollX, scrollZ, EXTENT)) {
      expect(cell.x).toBeCloseTo(cell.gx * SPACING - scrollX, 6)
      expect(cell.z).toBeCloseTo(cell.gz * SPACING - scrollZ, 6)
    }
  })
})

describe('turnForCell', () => {
  it('gives a cell the same orientation every time it is laid out', () => {
    // The lattice is rebuilt every frame; a plot that drew a new number each
    // time would spin on the spot.
    for (let gx = -5; gx <= 5; gx++) {
      for (let gz = -5; gz <= 5; gz++) {
        expect(turnForCell(gx, gz)).toBe(turnForCell(gx, gz))
      }
    }
  })

  it('only ever turns by a quarter, so a plot stays square in its shaft', () => {
    for (let gx = -40; gx <= 40; gx++) {
      for (let gz = -40; gz <= 40; gz++) {
        const turn = turnForCell(gx, gz)
        expect(Number.isInteger(turn)).toBe(true)
        expect(turn).toBeGreaterThanOrEqual(0)
        expect(turn).toBeLessThanOrEqual(3)
      }
    }
  })

  it('spreads the four orientations evenly over the board', () => {
    const counts = [0, 0, 0, 0]
    for (let gx = -30; gx < 30; gx++) {
      for (let gz = -30; gz < 30; gz++) counts[turnForCell(gx, gz)]++
    }
    const expected = 3600 / 4
    for (const count of counts) {
      expect(count).toBeGreaterThan(expected * 0.8)
      expect(count).toBeLessThan(expected * 1.2)
    }
  })

  it('does not fall into stripes along either axis', () => {
    // A weak hash tends to repeat down a row or column, which on a repeating
    // lattice reads as banding — exactly what the turn is there to break up.
    let differingNeighbours = 0
    let pairs = 0
    for (let gx = -20; gx < 20; gx++) {
      for (let gz = -20; gz < 20; gz++) {
        const here = turnForCell(gx, gz)
        if (turnForCell(gx + 1, gz) !== here) differingNeighbours++
        if (turnForCell(gx, gz + 1) !== here) differingNeighbours++
        pairs += 2
      }
    }
    // Three orientations in four differ by chance; anything near that is fine.
    expect(differingNeighbours / pairs).toBeGreaterThan(0.6)
  })

  it('is carried on the cells the layout produces', () => {
    for (const cell of layoutGrid(6, SPACING, 0, 0, EXTENT)) {
      expect(cell.turn).toBe(turnForCell(cell.gx, cell.gz))
    }
  })
})
