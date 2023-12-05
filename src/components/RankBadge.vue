<script setup lang="ts">
import { startCase } from 'lodash'
const props = defineProps(['rank'])

const getRankClass = (rank: number) => {
  let classList = 'pl-0.5 pr-2 py-0.5 text-xs md:text-sm font-bold rounded-full inline-block'

  if (rank <= 3) {
    return classList + ' bg-slate-500'
  } else if (rank < 10) {
    return classList + ' bg-slate-500 text-slate-900'
  } else if (rank < 15) {
    return classList + ' bg-amber-500 text-amber-900'
  } else if (rank < 20) {
    return classList + ' bg-sky-500 text-sky-900'
  } else if (rank < 25) {
    return classList + ' bg-violet-500 text-violet-900'
  } else {
    return classList + ' bg-zinc-300'
  }
}
</script>

<template>
  <div :class="getRankClass(props.rank)">
    <span class="font-emoji bg-zinc-900 bg-opacity-50 rounded-full p-0.5 mr-1">🥇</span
    >{{ props.rank }}
  </div>
</template>
