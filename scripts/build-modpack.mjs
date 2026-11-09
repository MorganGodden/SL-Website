#!/usr/bin/env node
/* eslint-env node */
/**
 * Publishes the Season 1 client modpack: copies the exported .mrpack into
 * public/ for download, and writes what is in it - with names, blurbs and
 * icons from Modrinth - for the modpack page.
 *
 *   npm run build:modpack -- <pack.mrpack>
 *
 * Run it again whenever the pack is re-exported. Both outputs are committed.
 */
import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readZip } from './lib/zip.mjs'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const PACK_FILE = 'snow-leagues-1.mrpack'
const PACK_PATH = join(ROOT, 'public', PACK_FILE)
const DATA_PATH = join(ROOT, 'src/data/seasons/s1/modpack.generated.ts')
/** Modrinth asks API clients to say who they are. */
const USER_AGENT = 'MorganGodden/SL-Website (npm run build:modpack)'

/** Instance folder to the kind of thing kept in it, in the order the page lists them. */
const KINDS = { shaderpacks: 'shader', resourcepacks: 'resourcepack', mods: 'mod' }
const ORDER = Object.values(KINDS)
const LOADERS = {
  'fabric-loader': 'Fabric',
  'quilt-loader': 'Quilt',
  forge: 'Forge',
  neoforge: 'NeoForge'
}
const OVERRIDES = /^(client-)?overrides\//

const source = process.argv[2]
if (!source) {
  console.error('usage: npm run build:modpack -- <pack.mrpack>')
  process.exit(1)
}

const zip = readZip(readFileSync(source))
const index = JSON.parse(zip.read('modrinth.index.json'))
const text = (name) => zip.read(name)?.toString('utf8') ?? ''

// What a fresh instance has switched on: resource packs from options.txt, the shader from Iris.
const resourcePacksOn = JSON.parse(
  /^resourcePacks:(.*)$/m.exec(text('overrides/options.txt'))?.[1] ?? '[]'
)
const iris = text('overrides/config/iris.properties')
const shaderOn = /^enableShaders=true$/m.test(iris) ? /^shaderPack=(.*)$/m.exec(iris)?.[1] : null

/** Downloads the index lists, then files carried inside the pack. Top-level files only. */
const files = [
  ...index.files
    .filter((f) => f.env?.client !== 'unsupported')
    .map((f) => ({
      path: f.path,
      projectId: /^https:\/\/cdn\.modrinth\.com\/data\/([^/]+)\//.exec(f.downloads[0])?.[1]
    })),
  ...[...zip.names()]
    .filter((n) => OVERRIDES.test(n))
    .map((n) => ({ path: n.replace(OVERRIDES, '') }))
].filter((f) => /^(mods|resourcepacks|shaderpacks)\/[^/]+$/.test(f.path))

const ids = [...new Set(files.map((f) => f.projectId).filter(Boolean))]
const response = await fetch(
  `https://api.modrinth.com/v2/projects?ids=${encodeURIComponent(JSON.stringify(ids))}`,
  { headers: { 'User-Agent': USER_AGENT } }
)
if (!response.ok) throw new Error(`Modrinth answered ${response.status} ${response.statusText}`)
const projects = new Map((await response.json()).map((p) => [p.id, p]))

const entries = files
  .map(({ path, projectId }) => {
    const [folder, file] = path.split('/')
    const kind = KINDS[folder]
    const project = projects.get(projectId)
    const entry = {
      kind,
      title: project?.title ?? file.replace(/\.(jar|zip)$/, ''),
      description: project?.description ?? 'Carried inside the pack.',
      icon: project?.icon_url || null,
      url: project ? `https://modrinth.com/${project.project_type}/${project.slug}` : null,
      library: project?.categories.includes('library') ?? false
    }
    if (kind === 'resourcepack') entry.on = resourcePacksOn.includes(`file/${file}`)
    if (kind === 'shader') entry.on = file === shaderOn
    return entry
  })
  .sort((a, b) => ORDER.indexOf(a.kind) - ORDER.indexOf(b.kind) || a.title.localeCompare(b.title))

const [loader, loaderVersion] = Object.entries(index.dependencies).find(([id]) => LOADERS[id]) ?? []
const icon = zip.read('overrides/icon.png')
const modpack = {
  name: index.name,
  version: index.versionId,
  minecraft: index.dependencies.minecraft,
  loader: loader ? `${LOADERS[loader]} ${loaderVersion}` : null,
  file: PACK_FILE,
  icon: icon ? `data:image/png;base64,${icon.toString('base64')}` : null,
  entries
}

if (resolve(source) !== PACK_PATH) copyFileSync(source, PACK_PATH)
writeFileSync(
  DATA_PATH,
  `/**
 * GENERATED FILE - do not edit.
 *
 * Written by \`npm run build:modpack\` from the exported .mrpack, with names,
 * blurbs and icons from Modrinth. Regenerate rather than patch.
 */

export interface ModpackEntry {
  kind: 'shader' | 'resourcepack' | 'mod'
  title: string
  description: string
  /** Modrinth's icon; null for a file carried inside the pack. */
  icon: string | null
  /** The Modrinth page; null for a file carried inside the pack. */
  url: string | null
  /** There for other mods to use, with nothing of its own to see. */
  library: boolean
  /** Resource packs and shaders only: switched on in a fresh instance. */
  on?: boolean
}

export interface Modpack {
  name: string
  version: string
  minecraft: string
  loader: string | null
  /** Its name in public/. */
  file: string
  icon: string | null
  entries: ModpackEntry[]
}

export const MODPACK: Modpack = ${JSON.stringify(modpack, null, 2)}
`
)

const counts = ORDER.map((kind) => `${entries.filter((e) => e.kind === kind).length} ${kind}`)
console.log(
  `${index.name} ${index.versionId}: ${counts.join(', ')} -> public/${PACK_FILE}, ${DATA_PATH.slice(ROOT.length + 1)}`
)
