<script setup lang="ts">
import ListBase from '@/components/lists/ListBase.vue'
import type { ListHeaderField, ListItem } from '@/models/list.model'

const fields: ListHeaderField[] = [
  { id: 'icon', title: 'Icon', sortable: false },
  { id: 'name', title: 'Name', sortable: true },
  { id: 'role', title: 'Role', sortable: true },
  { id: 'rank', title: 'Rank', sortable: true },
  { id: 'trophies', title: 'Trophies', sortable: true },
  { id: 'winRate', title: 'Win rate', sortable: true }
]
const listItems: ListItem[] = [
  {
    id: '1',
    img: {
      src: 'https://cdn-old.brawlify.com/profile/28000000.png',
      fallback: 'https://cdn-old.brawlify.com/profile/28000000.png',
      alt: 'Player Icon'
    },
    fields: [
      { key: 'role', value: 'President' },
      { key: 'name', value: 'John Doe' },
      { key: 'rank', value: 32 },
      { key: 'trophies', value: 4284 },
      { key: 'winRate', value: 0.43 }
    ],
    link: '/player'
  }
]
</script>

<template>
  <ListBase :fields="fields" :list-items="listItems" />
</template>
