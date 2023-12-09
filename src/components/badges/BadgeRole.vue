<script setup lang="ts">
import { startCase } from 'lodash'
const props = defineProps(['role'])

const getRoleClass = (role: any) => {
  let classList = 'text-zinc-900 px-2 py-0.5 text-xs md:text-sm rounded-full inline-block'
  switch (role) {
    case 'member':
      return classList + ' bg-zinc-500'
    case 'senior':
      return classList + ' bg-amber-500'
    case 'vicePresident':
      return classList + ' bg-pink-500'
    case 'president':
      return classList + ' bg-sky-500'

    default:
      return classList + ' bg-zinc-300'
  }
}
</script>

<template>
  <div :class="getRoleClass(props.role)">
    {{ startCase(props.role) }}
  </div>
</template>
