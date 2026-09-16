import { describe, it, expect } from 'vitest'
import { patchCellCentres, patchCellsFor } from '../plotRenderer'
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
