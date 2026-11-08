import { describe, it, expect } from 'vitest'
import { buildCollarGeometry, patchCellCentres, patchCellsFor } from '../plotRenderer'
import { PLOT_GAP, layoutGrid, wrapDistance } from '../boardLayout'

const SPACING = 16 + PLOT_GAP

describe('patchCellCentres', () => {
  it('puts every cell centre on an exact multiple of the pitch', () => {
    // The original bug: centring the patch as -(cells * spacing) / 2 lands the
    // centres on multiples of the pitch for an odd cell count and half a cell
    // off for an even one, so plots slid half-way onto the surrounding floor at
    // some window sizes and not others.
    for (let cells = 1; cells <= 40; cells++) {
      for (const centre of patchCellCentres(cells, SPACING)) {
        expect(Math.abs(centre % SPACING)).toBe(0)
      }
    }
  })

  it('is symmetric about the origin', () => {
    const centres = patchCellCentres(9, SPACING)
    expect(centres[0]).toBe(-centres[centres.length - 1])
    expect(centres).toContain(0)
  })

  it('covers at least the requested number of cells', () => {
    for (let cells = 1; cells <= 40; cells++) {
      expect(patchCellCentres(cells, SPACING).length).toBeGreaterThanOrEqual(cells)
    }
  })

  it('spaces the cells by exactly the pitch', () => {
    const centres = patchCellCentres(12, SPACING)
    for (let i = 1; i < centres.length; i++) {
      expect(centres[i] - centres[i - 1]).toBe(SPACING)
    }
  })
})

describe('floor holes line up with the plots that sit in them', () => {
  const extent = { across: 120, near: 140, far: 180 }
  const reach = (extent.across + Math.max(extent.near, extent.far)) / 2

  it('lands every plot exactly on a hole, at any scroll', () => {
    const cells = patchCellsFor(reach, SPACING)
    const centres = new Set(patchCellCentres(cells, SPACING))

    for (const scroll of [0, 3, 7.5, 19.99, 20, 33, -14, -20, 137.25, -1000.5]) {
      // The patch only ever moves by the scroll modulo the pitch.
      const patchX = -wrapDistance(scroll, SPACING)
      const patchZ = -wrapDistance(0, SPACING)

      for (const cell of layoutGrid(5, SPACING, scroll, 0, extent)) {
        // Where the plot sits in the patch's own frame, rounded to kill the
        // floating-point dust the modulo leaves behind.
        const localX = Math.round((cell.x - patchX) * 1e6) / 1e6
        const localZ = Math.round((cell.z - patchZ) * 1e6) / 1e6
        expect(centres.has(localX)).toBe(true)
        expect(centres.has(localZ)).toBe(true)
      }
    }
  })

  it('sizes the patch to cover everything the lattice places', () => {
    for (const r of [40, 103, 150, 260]) {
      const centres = patchCellCentres(patchCellsFor(r, SPACING), SPACING)
      // Plus half a cell, since each centre carries a full cell of floor.
      expect(Math.max(...centres) + SPACING / 2).toBeGreaterThanOrEqual(r + SPACING)
    }
  })
})

/**
 * A board can hold plots of different sizes, so cells are cut to the widest
 * one. What fills a narrower plot's cell in to its own edge is its collar, and
 * a collar that does not reach exactly from the plot edge to the hole edge
 * leaves either void or an overlap that z-fights the plaza.
 */
describe('buildCollarGeometry', () => {
  const HOLE = 32
  const DEPTH = 12

  /** Extent of the geometry's top face, which is the plaza part. */
  function topExtent(geometry: NonNullable<ReturnType<typeof buildCollarGeometry>>) {
    const position = geometry.getAttribute('position')
    let minX = Infinity
    let maxX = -Infinity
    let minZ = Infinity
    let maxZ = -Infinity
    let deepest = 0
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i)
      deepest = Math.min(deepest, y)
      if (y !== 0) continue
      minX = Math.min(minX, position.getX(i))
      maxX = Math.max(maxX, position.getX(i))
      minZ = Math.min(minZ, position.getZ(i))
      maxZ = Math.max(maxZ, position.getZ(i))
    }
    return { minX, maxX, minZ, maxZ, deepest }
  }

  it('reaches the hole edge, so the plaza meets it with no seam', () => {
    const collar = buildCollarGeometry(16, 16, HOLE, DEPTH)!
    const { minX, maxX, minZ, maxZ } = topExtent(collar)

    expect(maxX).toBeCloseTo(HOLE / 2, 10)
    expect(minX).toBeCloseTo(-HOLE / 2, 10)
    expect(maxZ).toBeCloseTo(HOLE / 2, 10)
    expect(minZ).toBeCloseTo(-HOLE / 2, 10)
  })

  it('leaves a hole exactly the size of the plot it wraps', () => {
    for (const size of [16, 24, 32]) {
      const collar = buildCollarGeometry(size, size, HOLE, DEPTH)
      if (size === HOLE) {
        // Nothing to fill: the plot already reaches the cell edge.
        expect(collar).toBeNull()
        continue
      }
      const position = collar!.getAttribute('position')
      // The inner edge is the closest the top face comes to the centre.
      let inner = Infinity
      for (let i = 0; i < position.count; i++) {
        if (position.getY(i) !== 0) continue
        inner = Math.min(inner, Math.max(Math.abs(position.getX(i)), Math.abs(position.getZ(i))))
      }
      expect(inner).toBeCloseTo(size / 2, 10)
    }
  })

  it('drops its walls to the shaft depth, so nothing is seen through', () => {
    const collar = buildCollarGeometry(16, 16, HOLE, DEPTH)!
    expect(topExtent(collar).deepest).toBeCloseTo(-DEPTH, 10)
  })

  it('wraps a plot that is not square on both axes', () => {
    const collar = buildCollarGeometry(16, 32, HOLE, DEPTH)!
    const position = collar.getAttribute('position')
    let innerX = Infinity
    let innerZ = Infinity
    for (let i = 0; i < position.count; i++) {
      if (position.getY(i) !== 0) continue
      const x = Math.abs(position.getX(i))
      const z = Math.abs(position.getZ(i))
      if (x < HOLE / 2) innerX = Math.min(innerX, x)
      if (z < HOLE / 2) innerZ = Math.min(innerZ, z)
    }
    expect(innerX).toBeCloseTo(8, 10)
    // Full width on z, so that axis is already flush and has no inner edge.
    expect(innerZ).toBe(Infinity)
  })

  it('splits into a plaza group and a shaft group, in that order', () => {
    const collar = buildCollarGeometry(16, 16, HOLE, DEPTH)!
    expect(collar.groups.length).toBe(2)
    expect(collar.groups[0].materialIndex).toBe(0)
    expect(collar.groups[1].materialIndex).toBe(1)
    expect(collar.groups[0].start).toBe(0)
    expect(collar.groups[0].count + collar.groups[1].count).toBe(collar.getIndex()!.count)
  })
})
