<script setup lang="ts">
const props = defineProps(['club', 'clubIcon'])
</script>

<template>
  <header class="mt-6 mb-16 text-center">
    <img :src="props.clubIcon.imageUrl" alt="Club Badge" class="w-40 mx-auto mb-3" />

    <h1 class="font-display text-white text-7xl font-black uppercase">Vacay Mania Brawl Club</h1>
    <p class="text-white text-xl">
      {{ props.club.description }}
    </p>
  </header>
</template>
