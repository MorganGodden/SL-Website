<script setup lang="ts">
import HeaderComponent from '@/components/headerComponent.vue'
import { MODPACK, type ModpackEntry } from '@/data/seasons/s1/modpack.generated'

/**
 * The optional Season 1 client modpack: what is in it, and the file to import.
 * All of it comes from the exported pack, through `npm run build:modpack`.
 */
const download = `${import.meta.env.BASE_URL}${MODPACK.file}`

const of = (kind: ModpackEntry['kind'], library = false) =>
  MODPACK.entries.filter((e) => e.kind === kind && e.library === library)

const groups = [
  { title: 'Shaders', note: '', items: of('shader') },
  { title: 'Resource packs', note: '', items: of('resourcepack') },
  { title: 'Mods', note: '', items: of('mod') },
  {
    title: 'Libraries',
    note: 'Other mods need these. Nothing of their own to see.',
    items: of('mod', true)
  }
].filter((g) => g.items.length > 0)

const count = (n: number, one: string) => `${n} ${one}${n === 1 ? '' : 's'}`
const summary = [
  count(MODPACK.entries.filter((e) => e.kind === 'mod').length, 'mod'),
  count(of('resourcepack').length, 'resource pack'),
  count(of('shader').length, 'shader')
].join(' · ')

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
</script>

<template>
  <!--
    A reading-width column. Below lg, #app already pads every side by 2rem;
    from lg up it pads only the sides, so the top and bottom get theirs here.
  -->
  <div class="mx-auto w-full max-w-3xl lg:py-8">
    <HeaderComponent season-id="s1" tagline="Season 1 modpack" />

    <section
      aria-labelledby="pack-title"
      class="mt-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"
    >
      <div class="flex items-center gap-4">
        <img v-if="MODPACK.icon" :src="MODPACK.icon" alt="" class="size-16 shrink-0 rounded-xl" />
        <div class="min-w-0">
          <h1 id="pack-title" class="text-xl font-bold text-slate-900">
            {{ MODPACK.name }}
            <span class="text-sm font-semibold text-slate-500">v{{ MODPACK.version }}</span>
          </h1>
          <p class="text-sm text-slate-600">
            Minecraft {{ MODPACK.minecraft
            }}<template v-if="MODPACK.loader"> · {{ MODPACK.loader }}</template>
          </p>
          <p class="text-sm text-slate-600">{{ summary }}</p>
        </div>
      </div>

      <p class="mt-4 text-sm text-slate-700">
        Optional: plain Minecraft {{ MODPACK.minecraft }} joins the server too.
      </p>
      <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
        <li>
          Install the
          <a href="https://modrinth.com/app" target="_blank" rel="noopener">Modrinth App</a> or
          <a href="https://prismlauncher.org" target="_blank" rel="noopener">Prism Launcher</a>.
        </li>
        <li>
          Import the pack. Modrinth App: <em>New instance → From file</em>. Prism:
          <em>Add Instance → Import</em>.
        </li>
        <li>Launch it and join the server.</li>
      </ol>

      <a
        :href="download"
        download
        class="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold !text-white shadow-sm transition-colors hover:bg-primary-700"
        :class="focusRing"
      >
        <i class="pi pi-download" aria-hidden="true" />
        Download the pack (.mrpack)
      </a>
    </section>

    <section v-for="group in groups" :key="group.title" :aria-label="group.title" class="mt-6">
      <h2 class="text-sm font-bold text-slate-900">
        {{ group.title }}
        <span class="font-semibold text-slate-500">{{ group.items.length }}</span>
      </h2>
      <p v-if="group.note" class="text-xs text-slate-500">{{ group.note }}</p>

      <ul class="mt-2 grid gap-2 sm:grid-cols-2">
        <li v-for="item in group.items" :key="item.title">
          <component
            :is="item.url ? 'a' : 'div'"
            v-bind="item.url ? { href: item.url, target: '_blank', rel: 'noopener' } : {}"
            class="flex h-full items-start gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition-colors"
            :class="item.url && ['hover:bg-slate-50 hover:ring-slate-300', focusRing]"
          >
            <img
              v-if="item.icon"
              :src="item.icon"
              alt=""
              loading="lazy"
              class="size-10 shrink-0 rounded-lg"
            />
            <span v-else aria-hidden="true" class="size-10 shrink-0 rounded-lg bg-slate-100" />
            <span class="min-w-0">
              <span class="flex items-center gap-2">
                <span class="truncate text-sm font-semibold text-slate-900">{{ item.title }}</span>
                <span
                  v-if="item.on !== undefined"
                  class="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold"
                  :class="
                    item.on ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  "
                >
                  {{ item.on ? 'On by default' : 'Off by default' }}
                </span>
              </span>
              <span class="mt-0.5 line-clamp-2 block text-xs text-slate-600">{{
                item.description
              }}</span>
            </span>
          </component>
        </li>
      </ul>
    </section>
  </div>
</template>
