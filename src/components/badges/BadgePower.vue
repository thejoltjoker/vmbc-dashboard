<script setup lang="ts">
const props = defineProps(['level'])
</script>

<template>
  <div
    class="w-7 h-7 flex items-center justify-center text-xs md:text-sm font-bold rounded-full bg-fuchsia-900 text-white border-3 border-fuchsia-500"
  >
    <p class="drop-shadow-sm">{{ props.level }}</p>
  </div>
</template>
