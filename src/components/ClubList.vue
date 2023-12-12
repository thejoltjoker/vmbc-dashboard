<script setup lang="ts">
import { ref, computed } from 'vue'
import { sortBy } from 'lodash'
import ClubListMember from '@/components/ClubListMember.vue'
import IconSort from './icons/IconSort.vue'
const props = defineProps(['members', 'icons'])

const sortColumn = ref<string>('lastPlayed')
const sortDirection = ref<'asc' | 'desc'>('desc')

// Use a computed property to handle sorting
const sortedMembers = computed(() => {
  let sorted = props.members
  if (['trophies', 'winRate'].includes(sortColumn.value)) {
    sorted = sortBy(props.members, [(member) => member[sortColumn.value]])
  } else if (sortColumn.value == 'lastPlayed') {
    sorted = sortBy(props.members, [(member) => member.lastPlayed])
  } else {
    sorted = sortBy(props.members, [(member) => `${member[sortColumn.value]}`.toLowerCase()])
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
  <div class="flex justify-between md:grid md:grid-cols-club-list-md w-full p-2 sm:p-3">
    <div class="w-16 hidden sm:block">Icon</div>
    <div @click="sort('name')" class="md:pl-2 inline-flex items-center cursor-pointer">
      Name
      <IconSort class="w-3 h-3 ms-0.5" />
    </div>
    <div @click="sort('role')" class="hidden sm:inline-flex items-center cursor-pointer">
      Role
      <IconSort class="w-3 h-3 ms-0.5" />
    </div>
    <div @click="sort('trophies')" class="inline-flex items-center cursor-pointer">
      Trophies
      <IconSort class="w-3 h-3 ms-0.5" />
    </div>
    <div @click="sort('winRate')" class="inline-flex items-center cursor-pointer">
      Win rate
      <IconSort class="w-3 h-3 ms-0.5" />
    </div>
    <div @click="sort('lastPlayed')" class="hidden sm:inline-flex items-center cursor-pointer">
      Last played
      <IconSort class="w-3 h-3 ms-0.5" />
    </div>
  </div>

  <ul>
    <ClubListMember
      v-for="member in sortedMembers"
      :key="member._id"
      :member="member"
      :icons="icons"
    />
  </ul>
</template>
