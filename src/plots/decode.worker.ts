/// <reference lib="webworker" />
import { decodeSnapshot } from './decode'
import { meshColumn, type ChangeStyle } from './mesher'
import type { DecodedColumn, PlotSnapshot } from './types'

/**
 * Decoding is roughly `blocks x bitsPerIndex` of bit work and meshing walks
 * every block again, and several columns may change in one poll cycle. Both
 * happen here so the render loop never stutters: payload in, geometry out.
 */
export interface DecodeRequest {
  kind?: 'decode'
  requestId: number
  payload: PlotSnapshot
}

/**
 * Re-meshes a column already decoded here, cut off at `ceiling` layers.
 *
 * Slicing is a mesh again from the same blocks, so the blocks are what is kept
 * rather than the geometry: a plot being sliced is re-meshed once per layer the
 * visitor drags through, and paying for the decode each time would make that
 * crawl. Only the blocks are held, and only until the board drops the plot.
 */
export interface SliceRequest {
  kind: 'slice'
  requestId: number
  playerUuid: string
  ceiling: number
  /**
   * The cut currently on screen, which the new one is compared against.
   *
   * The caller knows what it is drawing; the worker would only be guessing, and
   * would guess wrong the moment a plot is let go of and picked up again.
   */
  from?: number
}

/** The board has dropped a plot; its blocks are no longer worth keeping. */
export interface ForgetRequest {
  kind: 'forget'
  playerUuid: string
}

export type WorkerRequest = DecodeRequest | SliceRequest | ForgetRequest

export interface DecodeSuccess {
  requestId: number
  ok: true
  playerUuid: string
  playerName: string
  plotIndex: number
  capturedAt: number
  sizeX: number
  sizeY: number
  sizeZ: number
  minY: number
  paletteSize: number
  faceCount: number
  occupiedHeight: number
  surfaceLevel: number
  positions: Float32Array
  normals: Int8Array
  colours: Float32Array
  uvs: Float32Array
  /** Per vertex: which block is arriving or leaving, and 0 for the rest. */
  changes: Float32Array
  indices: Uint32Array
  /** Index count of the opaque draw range; then blended, then fading. */
  opaqueIndexCount: number
  blendedIndexCount: number
}

export interface DecodeFailure {
  requestId: number
  ok: false
  error: string
}

export type DecodeResponse = DecodeSuccess | DecodeFailure

/**
 * The blocks of every column decoded here and the cut it was last drawn at.
 *
 * Kept for two reasons: re-meshing when the cut moves, and knowing what the
 * plot looked like a moment ago, which is what says which blocks have just
 * appeared and which have just gone.
 */
const columns = new Map<string, DecodedColumn>()

/** Meshes a column, whole or cut off, against what was drawn before it. */
function respond(
  requestId: number,
  column: DecodedColumn,
  ceiling?: number,
  before?: { column: DecodedColumn; ceiling?: number },
  style?: ChangeStyle
): void {
  const mesh = meshColumn(column, ceiling, before?.column, before?.ceiling, style)

  const response: DecodeSuccess = {
    requestId,
    ok: true,
    playerUuid: column.playerUuid,
    playerName: column.playerName,
    plotIndex: column.plotIndex,
    capturedAt: column.capturedAt,
    sizeX: mesh.sizeX,
    sizeY: mesh.sizeY,
    sizeZ: mesh.sizeZ,
    minY: mesh.minY,
    paletteSize: column.palette.length,
    faceCount: mesh.faceCount,
    occupiedHeight: mesh.occupiedHeight,
    surfaceLevel: mesh.surfaceLevel,
    positions: mesh.positions,
    normals: mesh.normals,
    colours: mesh.colours,
    uvs: mesh.uvs,
    changes: mesh.changes,
    indices: mesh.indices,
    opaqueIndexCount: mesh.opaqueIndexCount,
    blendedIndexCount: mesh.blendedIndexCount
  }

  // Hand the buffers over rather than structured-cloning them.
  ;(self as unknown as Worker).postMessage(response, [
    response.positions.buffer,
    response.normals.buffer,
    response.colours.buffer,
    response.uvs.buffer,
    response.changes.buffer,
    response.indices.buffer
  ])
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const message = event.data

  if (message.kind === 'forget') {
    columns.delete(message.playerUuid)
    return
  }

  try {
    if (message.kind === 'slice') {
      const held = columns.get(message.playerUuid)
      if (!held) throw new Error(`no decoded column for ${message.playerUuid}`)
      // The same blocks either side of the change: only the cut has moved, so
      // whole layers come and go at once and fade rather than grow.
      respond(
        message.requestId,
        held,
        message.ceiling,
        { column: held, ceiling: message.from },
        'fade'
      )
      return
    }

    const column = decodeSnapshot(message.payload)
    // Whatever was drawn for this player before is what the new blocks are
    // compared against; the first snapshot has nothing to compare with and so
    // arrives without anything moving.
    const before = columns.get(column.playerUuid)
    // A fresh snapshot is always meshed whole: the board draws whole plots, and
    // only a focused one is ever cut.
    columns.set(column.playerUuid, column)
    respond(message.requestId, column, undefined, before ? { column: before } : undefined)
  } catch (error) {
    const response: DecodeFailure = {
      requestId: message.requestId,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    }
    ;(self as unknown as Worker).postMessage(response)
  }
}
