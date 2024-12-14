<script lang="ts" setup>
import { getBodyUrl } from '@/helpers/avatarHelper'
import { inject, onMounted } from 'vue'

const dialogRef = inject('dialogRef') as any
const props = dialogRef.value.data
</script>

<template>
  <div class="flex flex-row h-96">
    <div class="flex align-middle h-full w-40">
      <img :src="getBodyUrl(props.uuid)" alt="player image" class="w-full animate-fadein" />
    </div>
    <div class="w-[300px] h-full">
      {{ props.uuid }}
    </div>
  </div>
</template>
