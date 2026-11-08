<script setup lang="ts">
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
import ErrorBoundary from './components/errorBoundary.vue'

const route = useRoute()

/**
 * Seasons that render a full-viewport scene opt out of the centred, padded page
 * container and manage their own scrolling. `#app` and `body` are both outside
 * this component tree, so the flag is applied as a class on <body>; the rules it
 * drives live in assets/main.css.
 *
 * Driven off the crossfade rather than off the route, because the two do not
 * change at the same moment: the route changes first and the outgoing view then
 * spends its fade still on screen. Swapped on the route, a scene on its way out
 * would lose the full-height container out from under it and collapse while
 * still visible. The incoming view's turn to appear is the moment the container
 * it needs should change, so that is where it is done.
 */
function applyContainer(): void {
  document.body.classList.toggle('full-bleed', route.meta.fullBleed === true)
}
</script>

<template>
  <Toast />
  <DynamicDialog />
  <ErrorBoundary :reset-key="route.path">
    <!--
      Seasons look nothing alike - one is a page, the other a lit 3D board -
      so moving between them cuts hard. A short crossfade, out before in so the
      two are never on screen together and the scene is torn down before its
      replacement builds.
    -->
    <router-view v-slot="{ Component }">
      <Transition name="view" mode="out-in" appear @before-enter="applyContainer">
        <component :is="Component" />
      </Transition>
    </router-view>
  </ErrorBoundary>
</template>

<style scoped>
@import './assets/primevue.css';

/*
 * Leaves a little faster than it arrives, so the gap between the two seasons
 * is spent on the incoming one rather than on an empty screen.
 */
.view-enter-active {
  transition: opacity 140ms ease-out;
}

.view-leave-active {
  transition: opacity 100ms ease-in;
}

.view-enter-from,
.view-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .view-enter-active,
  .view-leave-active {
    transition: none;
  }
}
</style>
