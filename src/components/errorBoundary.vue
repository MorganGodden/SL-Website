<script setup lang="ts">
import Button from 'primevue/button'
import { ref, watchEffect, onErrorCaptured } from 'vue'

// Define props to accept a key to reset the component
const props = defineProps<{
  resetKey?: string | number
}>()

const error = ref<Error | null>(null)

function resetError() {
  error.value = null
}

function handleError(err: Error) {
  error.value = err
}

// Watch for changes to resetKey to reset the error
watchEffect(() => {
  if (props.resetKey) {
    resetError()
  }
})

// Use the errorCaptured lifecycle to catch errors in child components
onErrorCaptured((err) => {
  console.error('An error occurred in a child component:', err)
  handleError(err)
  return false // Prevent further propagation of the error
})
</script>

<template>
  <slot v-if="!error"></slot>
  <div v-else class="flex flex-col gap-2 bg-red-500 text-white font-semibold p-6 min-w-72 rounded">
    <h1>An error occurred:</h1>
    <p>{{ error.message }}</p>
    <Button text @click="resetError">Try Again</Button>
  </div>
</template>
