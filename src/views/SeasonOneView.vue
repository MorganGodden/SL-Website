<script setup lang="ts">
import { ref, watch } from 'vue'
import LeaderboardOverlay from '@/components/season1/leaderboardOverlay.vue'
import PlotScene from '@/components/season1/plotScene.vue'
import { getLeaderboard } from '@/data/leaderboardService'
import LiveStatus from '@/components/season1/liveStatus.vue'
import type { LeaderboardEntry } from '@/common/interfaces'
import type { BoardStatus } from '@/plots/plotBoard'

/**
 * Season 1: the plot visualisation is the page, with the leaderboard floating
 * over it. Scores come from fixtures via the data-access module — there is no
 * Season 1 scoring endpoint yet.
 */
const scene = ref<InstanceType<typeof PlotScene> | null>(null)
const rows = ref<LeaderboardEntry[]>([])
/** Players the board is drawing, so the leaderboard knows which rows lead anywhere. */
const plotted = ref<string[]>([])
const loading = ref(true)
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
function onBoardFocus(focused: boolean): void {
  if (focused) foldLeaderboard()
  else restoreLeaderboard()
}

getLeaderboard('s1')
  .then((entries) => (rows.value = entries))
  .finally(() => (loading.value = false))

</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-slate-200">
    <!--
      The board itself, put a little out of focus while the leaderboard is open:
      the panel is a sheet of glass, and glass reads as glass when what is
      behind it is softened rather than merely dimmed.
    -->
    <div class="board" :class="{ 'board--behind-glass': leaderboardExpanded }">
      <PlotScene
        ref="scene"
        :rows="rows"
        :covered="leaderboardExpanded"
        @status="boardStatus = $event"
        @plots="plotted = $event"
        @dismiss="leaderboardExpanded = false"
        @escape="leaderboardExpanded = !leaderboardExpanded"
        @focused="onBoardFocus"
      />
    </div>

    <LeaderboardOverlay
      v-model:expanded="leaderboardExpanded"
      :rows="rows"
      :loading="loading"
      :plotted="plotted"
      @select="scene?.focusPlayer($event.playerUuid)"
    >
      <template #status>
        <LiveStatus :status="boardStatus" />
      </template>
    </LeaderboardOverlay>
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

@media (prefers-reduced-motion: reduce) {
  .board {
    transition: none;
  }
}
</style>
