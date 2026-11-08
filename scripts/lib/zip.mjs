/* eslint-env node */
/**
 * Minimal zip reader, enough to pull texture files out of a resource pack.
 *
 * Node has no built-in zip support, and asking whoever rebuilds the atlas to
 * unpack a 34MB archive by hand first is a step that gets forgotten. Only the
 * two storage methods a pack actually uses are supported: stored and deflate.
 */
import { inflateRawSync } from 'node:zlib'

const END_OF_CENTRAL_DIRECTORY = 0x06054b50
const CENTRAL_FILE_HEADER = 0x02014b50

/** Opens an archive already in memory and indexes its entries by path. */
export function readZip(buffer) {
  const end = findEndOfCentralDirectory(buffer)
  const count = buffer.readUInt16LE(end + 10)
  let at = buffer.readUInt32LE(end + 16)

  const entries = new Map()
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(at) !== CENTRAL_FILE_HEADER) break
    const method = buffer.readUInt16LE(at + 10)
    const compressedSize = buffer.readUInt32LE(at + 20)
    const nameLength = buffer.readUInt16LE(at + 28)
    const extraLength = buffer.readUInt16LE(at + 30)
    const commentLength = buffer.readUInt16LE(at + 32)
    const localHeader = buffer.readUInt32LE(at + 42)
    const name = buffer.toString('utf8', at + 46, at + 46 + nameLength)

    entries.set(name, { method, compressedSize, localHeader })
    at += 46 + nameLength + extraLength + commentLength
  }

  return {
    names: () => entries.keys(),
    has: (name) => entries.has(name),
    /** The decompressed bytes of one entry, or null when it is not present. */
    read: (name) => {
      const entry = entries.get(name)
      if (!entry) return null

      // The local header repeats the name and extra fields, and its extra field
      // length routinely differs from the central one, so it must be read here
      // rather than assumed.
      const header = entry.localHeader
      const nameLength = buffer.readUInt16LE(header + 26)
      const extraLength = buffer.readUInt16LE(header + 28)
      const start = header + 30 + nameLength + extraLength
      const body = buffer.subarray(start, start + entry.compressedSize)

      if (entry.method === 0) return Buffer.from(body)
      if (entry.method === 8) return inflateRawSync(body)
      throw new Error(`unsupported compression method ${entry.method} for ${name}`)
    }
  }
}

/** Scans back from the end for the central directory record. */
function findEndOfCentralDirectory(buffer) {
  // The record is 22 bytes plus a comment of up to 64KB.
  const earliest = Math.max(0, buffer.length - 22 - 0xffff)
  for (let at = buffer.length - 22; at >= earliest; at--) {
    if (buffer.readUInt32LE(at) === END_OF_CENTRAL_DIRECTORY) return at
  }
  throw new Error('not a zip archive: no end of central directory record')
}
