<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
import ErrorBoundary from './components/errorBoundary.vue'

const route = useRoute()

// Seasons that render a full-viewport scene opt out of the centred, padded page
// container and manage their own scrolling. `#app` and `body` are both outside
// this component tree, so the flag is applied as a class on <body>; the rules it
// drives live in assets/main.css.
watchEffect(() => {
  document.body.classList.toggle('full-bleed', route.meta.fullBleed === true)
})
</script>

<template>
  <Toast />
  <DynamicDialog />
  <ErrorBoundary :reset-key="route.path">
    <router-view />
  </ErrorBoundary>
</template>

<style scoped>
@import './assets/primevue.css';
</style>
