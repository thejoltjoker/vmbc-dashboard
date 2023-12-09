<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Spinner from './Spinner.vue'
import { defineProps, ref } from 'vue'
import RoleBadge from '@/components/badges/BadgeRole.vue'
import { round, capitalize } from 'lodash'
import { formatDistanceToNow, parseISO, subHours, isAfter } from 'date-fns'

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
  <RouterLink :to="'/player/' + encodeURIComponent(member.tag)">
    <li
      class="transition grid grid-cols-club-list grid-area-template-club-list md:grid-area-template-club-list-md md:grid-cols-club-list-md rounded-md overflow-hidden bg-zinc-800 hover:bg-zinc-700 p-2 md:p-3 mb-1"
    >
      <div class="w-16 grid-area-icon">
        <img
          :src="imageUrl"
          alt="icon"
          srcset=""
          class="w-full aspect-square"
          @error="replaceByDefault"
        />
      </div>
      <div class="pl-2 grid-area-name flex flex-col justify-center">
        <div class="inline-flex">
          <h3>{{ props.member.name }}</h3>

          <div
            v-if="isAfter(parseISO(props.member.lastPlayed), subHours(new Date(), 1))"
            class="rounded-full ml-2 w-2 h-2 bg-green-500"
          ></div>
        </div>

        <p class="hidden md:block opacity-20">{{ props.member.tag }}</p>
        <div class="md:hidden">
          <RoleBadge :role="props.member.role" :key="props.member.tag + props.member.role" />
        </div>
      </div>

      <div class="hidden grid-area-role md:flex items-center">
        <RoleBadge :role="props.member.role" :key="props.member.tag + props.member.role" />
      </div>

      <div class="inline-flex items-center text-zinc-300 grid-area-trophies">
        <span class="font-emoji pr-1">🏆</span>
        <span class="">{{ props.member.trophies.toLocaleString() }}</span>
      </div>

      <div class="inline-flex items-center text-zinc-300 grid-area-win-rate">
        <span class="font-emoji pr-1">🥇</span>
        <span class=""
          ><template v-if="winRateString !== ''">
            {{ winRateString }}
          </template>
          <template v-else> <Spinner /> </template
        ></span>
      </div>

      <div class="hidden md:inline-flex items-center text-zinc-300 grid-area-last-played">
        <span class="font-emoji pr-1">🎮</span>
        <span class=""
          ><template v-if="lastPlayedString !== ''">
            {{ lastPlayedString }}
          </template>
          <template v-else> <Spinner /> </template
        ></span>
      </div>
    </li>
  </RouterLink>
</template>
