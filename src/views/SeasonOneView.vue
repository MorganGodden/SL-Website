<script setup lang="ts">
import { defineAsyncComponent, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LeaderboardOverlay from '@/components/season1/leaderboardOverlay.vue'
import PlotScene from '@/components/season1/plotScene.vue'
import { getLeaderboard } from '@/data/leaderboardService'
import LiveStatus from '@/components/season1/liveStatus.vue'
import type { LeaderboardEntry } from '@/common/interfaces'
import type { BoardStatus } from '@/plots/plotBoard'

/**
 * Season 1: the plot visualisation is the page, with the leaderboard floating
 * over it. Scores are the plugin's Collection Log, fetched through the
 * data-access module and refreshed while the page is open.
 */

/** How often the scores are fetched again, in milliseconds. */
const SCORES_REFRESH_MS = 30_000

/** Only fetched when someone opens a log, and the icon tables with it. */
const CollectionSheet = defineAsyncComponent(() => import('@/components/season1/collectionSheet.vue'))
const scene = ref<InstanceType<typeof PlotScene> | null>(null)
const rows = ref<LeaderboardEntry[]>([])
/** Players the board is drawing, so the leaderboard knows which rows lead anywhere. */
const plotted = ref<string[]>([])
const loading = ref(true)
/** The last fetch of the scores failed, and there were none to keep showing. */
const scoresFailed = ref(false)
/** Whose collection log is open over the board, if anyone's. */
const logOf = ref<{ uuid: string; name: string } | null>(null)
/** How far up the window the focused plot's card reaches, which the log stays clear of. */
const cardReach = ref(0)
const boardStatus = ref<BoardStatus | null>(null)
/**
 * The leaderboard covers the board, so the board folds it away while it needs
 * the room - a plot brought forward - and it comes back when that plot is let
 * go of. While it is open the board is covered: it answers no pointer at all
 * apart from a click asking for it to go.
 */
const leaderboardExpanded = ref(true)
/**
 * Whether it was the board that closed it.
 *
 * A leaderboard the visitor closed themselves stays closed: reopening it for
 * them would be overruling the button they just pressed.
 */
let collapsedByBoard = false

const route = useRoute()
const router = useRouter()
/**
 * The plot a shared link asks for, held until the board has it.
 *
 * Plots arrive by poll, so a link opened cold names a plot the board cannot
 * show for a second or two. It is dropped the moment anything else takes the
 * stage: by then the link has been overtaken.
 */
let pendingLink = typeof route.query.plot === 'string' ? route.query.plot : null

watch(plotted, () => {
  if (pendingLink && scene.value?.focusPlayer(pendingLink)) pendingLink = null
})

function foldLeaderboard(): void {
  if (!leaderboardExpanded.value) return
  collapsedByBoard = true
  leaderboardExpanded.value = false
}

function restoreLeaderboard(): void {
  if (!collapsedByBoard) return
  collapsedByBoard = false
  leaderboardExpanded.value = true
}

// Opened again before the board gave it back: the visitor has taken the panel
// over, and whatever they do with it next is theirs rather than ours to undo.
watch(leaderboardExpanded, (open) => {
  if (open) collapsedByBoard = false
})

/**
 * A plot coming forward takes the whole screen, so the panel goes for as long
 * as it is up, whether or not a drag had already folded it away. A plot picked
 * from a leaderboard row arrives here too, so the row that chose it folds the
 * panel away just as a click on the board would.
 */
function onBoardFocus(target: { uuid: string; name: string } | null): void {
  pendingLink = null
  if (target) foldLeaderboard()
  else restoreLeaderboard()
  // The link names the player rather than the cell: the board is a lattice that
  // has drifted since, and the plot is what was being pointed at anyway.
  // Replaced rather than pushed - picking through a dozen plots should not bury
  // the way off the page under a dozen history entries.
  void router.replace({ query: { ...route.query, plot: target?.name } })
}

/**
 * Keeps the last good scores through a failed fetch: a blip in the connection
 * should not empty the leaderboard for the thirty seconds until the next one.
 */
function refreshScores(): void {
  getLeaderboard('s1')
    .then((entries) => {
      rows.value = entries
      scoresFailed.value = false
    })
    .catch((error) => {
      console.warn('[scores] could not load:', error)
      scoresFailed.value = rows.value.length === 0
    })
    .finally(() => (loading.value = false))
}
refreshScores()
const scoresTimer = setInterval(refreshScores, SCORES_REFRESH_MS)
onBeforeUnmount(() => clearInterval(scoresTimer))

</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-slate-200">
    <!--
      The board itself, put a little out of focus while the leaderboard is open:
      the panel is a sheet of glass, and glass reads as glass when what is
      behind it is softened rather than merely dimmed.
    -->
    <div class="board" :class="{ 'board--behind-glass': leaderboardExpanded || logOf }">
      <PlotScene
        ref="scene"
        :rows="rows"
        :covered="leaderboardExpanded"
        @status="boardStatus = $event"
        @plots="plotted = $event"
        @dismiss="leaderboardExpanded = false"
        @escape="leaderboardExpanded = !leaderboardExpanded"
        @focused="onBoardFocus"
        @log="logOf = $event"
        @dock="cardReach = $event"
      />
    </div>

    <LeaderboardOverlay
      v-model:expanded="leaderboardExpanded"
      :rows="rows"
      :loading="loading"
      :failed="scoresFailed"
      :plotted="plotted"
      @select="scene?.focusPlayer($event.playerUuid)"
    >
      <template #status>
        <LiveStatus :status="boardStatus" />
      </template>
    </LeaderboardOverlay>

    <Transition name="sheet">
      <CollectionSheet
        v-if="logOf"
        :key="logOf.uuid"
        v-bind="logOf"
        :below="cardReach"
        @close="logOf = null"
      />
    </Transition>
  </div>
</template>

<style scoped>
/*
 * The board sits behind the leaderboard's glass, so it is put a little out of
 * focus while that is open: glass reads as glass when what is behind it is
 * softened rather than merely dimmed. Slight, and only while the panel is up -
 * the board is the page, and a blurred page is no use to anybody.
 */
.board {
  position: absolute;
  inset: 0;
  transition: filter 180ms ease;
}

.board--behind-glass {
  filter: blur(3px);
}

/* The log comes and goes the same way: a short fade, in and out alike. */
.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 160ms ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .board,
  .sheet-enter-active,
  .sheet-leave-active {
    transition: none;
  }
}
</style>
