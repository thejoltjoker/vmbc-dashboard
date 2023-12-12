<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  fallback: string
  alt: string
}>()

const imageUrl = ref(props.src)

const replaceByFallback = () => {
  imageUrl.value = props.fallback
}
</script>

<template>
  <img :src="src" :alt="alt" class="w-full" @error="replaceByFallback" />
</template>
