<script setup lang="ts">
import Spinner from './Spinner.vue'
</script>
<template>
  <div class="fade-in flex flex-col items-center justify-center h-full w-full">
    <Spinner width="10" height="10" class="my-5" />

    <h6 class="font-display text-4xl md:text-6xl font-bold uppercase">Loading</h6>
  </div>
</template>
