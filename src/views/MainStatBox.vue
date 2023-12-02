<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['title', 'description', 'titleColor'])
const titleClasses = ref('text-4xl md:text-6xl ' + props.titleColor)
</script>

<template>
  <div class="mb-6 text-center md:text-start">
    <span :class="titleClasses">{{ props.title }}</span>
    <br />
    <span class="description text-2xl md:text-4xl">{{ props.description }}</span>
  </div>
</template>
