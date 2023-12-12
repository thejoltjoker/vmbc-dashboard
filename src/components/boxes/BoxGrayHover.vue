<script setup lang="ts">
import BoxGray from '@/components/boxes/BoxGray.vue'
</script>
<template>
  <BoxGray class="transition hover:bg-zinc-700">
    <slot></slot>
  </BoxGray>
</template>
