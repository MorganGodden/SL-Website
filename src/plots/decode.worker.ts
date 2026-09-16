/// <reference lib="webworker" />
import { decodeSnapshot } from './decode'
import { meshColumn } from './mesher'
import type { PlotSnapshot } from './types'

/**
 * Decoding is roughly `blocks x bitsPerIndex` of bit work and meshing walks
 * every block again, and several columns may change in one poll cycle. Both
 * happen here so the render loop never stutters: payload in, geometry out.
 */
export interface DecodeRequest {
  requestId: number
  payload: PlotSnapshot
}

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
  indices: Uint32Array
  /** Index count of the opaque draw range; the rest of the draw is blended. */
  opaqueIndexCount: number
}

export interface DecodeFailure {
  requestId: number
  ok: false
  error: string
}

export type DecodeResponse = DecodeSuccess | DecodeFailure

self.onmessage = (event: MessageEvent<DecodeRequest>) => {
  const { requestId, payload } = event.data
  try {
    const column = decodeSnapshot(payload)
    const mesh = meshColumn(column)

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
      indices: mesh.indices,
      opaqueIndexCount: mesh.opaqueIndexCount
    }

    // Hand the buffers over rather than structured-cloning them.
    ;(self as unknown as Worker).postMessage(response, [
      response.positions.buffer,
      response.normals.buffer,
      response.colours.buffer,
      response.uvs.buffer,
      response.indices.buffer
    ])
  } catch (error) {
    const response: DecodeFailure = {
      requestId,
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    }
    ;(self as unknown as Worker).postMessage(response)
  }
}
