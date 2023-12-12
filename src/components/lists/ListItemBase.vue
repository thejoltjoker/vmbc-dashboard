<script setup lang="ts">
import ListItemImg from '@/components/lists/ListItemImg.vue'
import BoxGrayHover from '@/components/boxes/BoxGrayHover.vue'
import type { ListItemField, ListItemImage } from '@/models/list.model'

defineProps<{
  img: ListItemImage
  link: string
  fields: ListItemField[]
}>()
</script>
<template>
  <RouterLink :to="link">
    <BoxGrayHover>
      <li :class="`grid grid-cols-${fields.length + 1} p-2 sm:p-3 mb-1 items-center`">
        <div class="w-16">
          <ListItemImg :src="img.src" :fallback="img.fallback" :alt="img.alt" />
        </div>
        <div v-for="field of fields" :key="field.key">
          {{ field.value }}
        </div>
      </li>
    </BoxGrayHover>
  </RouterLink>
</template>
