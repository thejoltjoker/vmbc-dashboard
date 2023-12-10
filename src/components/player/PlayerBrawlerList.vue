<script setup lang="ts">
import { ref, computed } from 'vue'
import { sortBy } from 'lodash'
import PlayerBrawlerListItem from '@/components/player/PlayerBrawlerListItem.vue'
import type { PlayerBrawler } from '@/models/player.model'
import IconSort from '@/components/icons/IconSort.vue'

const props = defineProps<{
  brawlers: PlayerBrawler[]
}>()

const sortColumn = ref<string>('lastPlayed')
const sortDirection = ref<'asc' | 'desc'>('desc')

// Use a computed property to handle sorting
const sortedBrawlers = computed(() => {
  let sorted = props.brawlers
  if (['trophies', 'rank', 'power'].includes(sortColumn.value)) {
    console.log('sorting by ' + sortColumn.value)
    sorted = sortBy(props.brawlers, [(brawler) => brawler[sortColumn.value]])
  } else {
    sorted = sortBy(props.brawlers, [(brawler) => `${brawler[sortColumn.value]}`.toLowerCase()])
  }

  if (sortDirection.value == 'asc') {
    return sorted
  } else {
    return sorted.reverse()
  }
})

const sort = (column: string) => {
  // console.log(sortedMembers)
  if (sortColumn.value === column) {
    // Reverse direction if the same column is clicked
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set a new column to sort
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}
</script>

<template>
  <div class="flex justify-between md:grid md:grid-cols-brawler-list-md w-full p-2 md:p-3">
    <div class="w-16 hidden md:block">Icon</div>
    <div @click="sort('name')" class="pl-2 inline-flex items-center cursor-pointer">
      Name
      <IconSort />
    </div>
    <div @click="sort('rank')" class="inline-flex items-center cursor-pointer">
      Rank
      <IconSort />
    </div>
    <div @click="sort('power')" class="inline-flex items-center cursor-pointer">
      Power
      <IconSort />
    </div>
    <div @click="sort('trophies')" class="inline-flex items-center cursor-pointer">
      Trophies
      <IconSort />
    </div>
    <div class="hidden md:inline-flex items-center cursor-pointer">Powerups</div>
  </div>

  <ul>
    <PlayerBrawlerListItem v-for="brawler in sortedBrawlers" :brawler="brawler" :key="brawler.id" />
  </ul>
</template>