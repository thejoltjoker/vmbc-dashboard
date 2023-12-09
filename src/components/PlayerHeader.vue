<script setup lang="ts">
const props = defineProps(['iconUrl', 'name', 'tag', 'nameColor'])
</script>

<template>
  <header class="flex flex-col md:flex-row items-center p-2 md:p-3 mb-1">
    <img :src="iconUrl" :alt="name + ' icon'" class="w-32 h-32 mr-3" />
    <div class="flex flex-col text-center md:text-start pt-3 md:pt-0">
      <h1 class="font-display text-5xl md:text-7xl font-black uppercase">
        {{ name }}
      </h1>

      <p class="opacity-30 text-2xl">{{ tag }}</p>
    </div>
  </header>
</template>
