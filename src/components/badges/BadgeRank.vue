<script setup lang="ts">
const props = defineProps(['rank'])

const getRankClass = (rank: number) => {
  // let classList = ' px-2 py-0.5 text-xs md:text-sm font-bold rounded-sm inline-block'
  let classList = 'rank-badge'

  if (rank < 5) {
    return classList + ' bg-orange-900 border-orange-400'
  } else if (rank < 10) {
    return classList + ' bg-blue-900 border-blue-500'
  } else if (rank < 15) {
    return classList + ' bg-amber-900 border-amber-500'
  } else if (rank < 20) {
    return classList + ' bg-sky-900 border-sky-500'
  } else if (rank < 25) {
    return classList + ' bg-violet-900 border-violet-500'
  } else if (rank < 30) {
    return classList + ' bg-green-900 border-green-500'
  } else if (rank < 35) {
    return classList + ' bg-red-900 border-red-500'
  } else {
    return classList + ' bg-zinc-300'
  }
}
</script>

<template>
  <div :class="getRankClass(props.rank)">
    <!-- <span class="font-emoji bg-zinc-900 bg-opacity-50 rounded-full p-0.5 mr-1">🥇</span> -->
    {{ props.rank }}
  </div>
</template>

<style scoped>
.rank-badge {
  @apply h-7 inline-flex items-center justify-center rounded-md px-2 border-3 font-bold text-sm;
}
</style>
