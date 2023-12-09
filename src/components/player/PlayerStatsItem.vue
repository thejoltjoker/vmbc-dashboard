<script setup lang="ts">
const props = defineProps(['title', 'value', 'emoji'])
</script>

<template>
  <div class="flex items-center">
    <div class="font-emoji text-xl mr-3">{{ emoji }}</div>
    <div class="flex-col">
      <p class="text-xl">{{ value }}</p>
      <p class="opacity-50 text-sm">{{ title }}</p>
    </div>
  </div>
</template>
