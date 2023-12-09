<script setup lang="ts">
import { ref, computed } from 'vue'
import { sortBy } from 'lodash'
import ClubListMember from '@/components/ClubListMember.vue'

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
  <div class="flex justify-between md:grid md:grid-cols-club-list-md w-full p-2 md:p-3">
    <div class="w-16 hidden md:block">Icon</div>
    <div @click="sort('name')" class="pl-2 inline-flex items-center cursor-pointer">
      Name
      <svg
        class="w-3 h-3 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
    </div>
    <div @click="sort('role')" class="hidden md:inline-flex items-center cursor-pointer">
      Role
      <svg
        class="w-3 h-3 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
    </div>
    <div @click="sort('trophies')" class="inline-flex items-center cursor-pointer">
      Trophies
      <svg
        class="w-3 h-3 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
    </div>
    <div @click="sort('winRate')" class="inline-flex items-center cursor-pointer">
      Win rate
      <svg
        class="w-3 h-3 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
    </div>
    <div @click="sort('lastPlayed')" class="hidden md:inline-flex items-center cursor-pointer">
      Last played
      <svg
        class="w-3 h-3 ms-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
        />
      </svg>
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
