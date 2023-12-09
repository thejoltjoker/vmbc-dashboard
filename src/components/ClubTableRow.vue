<script setup lang="ts">
import { defineProps, ref } from 'vue'

import BadgeRole from '@/components/badges/BadgeRole.vue'
import Spinner from './Spinner.vue'
import { round, capitalize } from 'lodash'
import { formatDistanceToNow, parseISO } from 'date-fns'

const props = defineProps(['member', 'icons'])
const winRateString = `${round(props.member.winRate * 100)}%`
const lastPlayedString = ref(
  capitalize(
    formatDistanceToNow(parseISO(`${props.member.lastPlayed}`), {
      addSuffix: true
    })
  )
)
const defaultImage = 'https://cdn-old.brawlify.com/profile/28000000.png'
// console.log(props.icons.player[props.member.icon.id])
const imageUrl = ref(props.icons.player[props.member.icon.id].imageUrl)
const replaceByDefault = () => {
  imageUrl.value = defaultImage
  // return defaultImage
}
</script>

<template>
  <!-- <tr>
    <td v-for="column in columns" :key="column.key + 'row'">{{ rowData[column.key] }}</td>
  </tr> -->
  <tr class="club-table-row border-b border-zinc-900 group transition rounded-md overflow-hidden">
    <th scope="row" class="p-2 md:p-3 w-20 rounded-l-md bg-zinc-800 group-hover:bg-zinc-700">
      <img
        :src="imageUrl"
        alt="icon"
        srcset=""
        class="w-full aspect-square"
        @error="replaceByDefault"
      />
    </th>
    <td class="p-2 md:p-3 bg-zinc-800 group-hover:bg-zinc-700">
      <h3>{{ props.member.name }}</h3>
      <p class="hidden md:block opacity-20">{{ props.member.tag }}</p>
      <div class="md:hidden">
        <BadgeRole :role="props.member.role" :key="props.member.tag + props.member.role" />
      </div>
    </td>
    <td class="p-2 md:p-3 bg-zinc-800 group-hover:bg-zinc-700 hidden md:table-cell">
      <BadgeRole :role="props.member.role" :key="props.member.tag + props.member.role" />
    </td>

    <td class="p-2 md:p-3 bg-zinc-800 group-hover:bg-zinc-700">
      {{ props.member.trophies.toLocaleString() }}
    </td>
    <td class="p-2 md:p-3 bg-zinc-800 group-hover:bg-zinc-700">
      <template v-if="winRateString !== ''">
        {{ winRateString }}
      </template>
      <template v-else>
        <Spinner />
      </template>
    </td>
    <td class="p-2 md:p-3 rounded-r-md bg-zinc-800 group-hover:bg-zinc-700">
      <div class="inline-flex h-full items-center">
        <template v-if="lastPlayedString !== ''">
          {{ lastPlayedString }}
        </template>
        <template v-else>
          <Spinner />
        </template>
        <!-- <template v-if="secondsSinceLastBattle !== 0 && secondsSinceLastBattle > 259200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 fill-red-500 ml-3"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>
        </template> -->
      </div>
    </td>
  </tr>
</template>
