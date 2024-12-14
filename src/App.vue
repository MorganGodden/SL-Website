<script setup lang="ts">
import Toast from 'primevue/toast'
import DynamicDialog from 'primevue/dynamicdialog'
import ErrorBoundary from './components/errorBoundary.vue'
</script>

<template>
  <Toast />
  <DynamicDialog />
  <ErrorBoundary>
    <router-view />
  </ErrorBoundary>
</template>

<style scoped>
@import './styles/index.css';
@import './styles/global.css';
</style>
