<script setup lang="ts">
import axios from 'axios'
import _ from 'lodash'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Player } from '@/models/player.model'
import type { Icons } from '@/models/icon.model'
import type { Brawler } from '@/models/brawler.model'
import PlayerBrawlerListItem from '@/components/player/PlayerBrawlerListItem.vue'
import PlayerHeader from '@/components/PlayerHeader.vue'
import { getRoboRumbleLevel } from '@/lib/utilities'
import PlayerStatsItem from '@/components/player/PlayerStatsItem.vue'
import LoadingPage from '@/components/LoadingPage.vue'

const route = useRoute()

const loading = ref(false)
const player = ref<Player | null>(null)
const icons = ref<Icons | null>(null)
const playerIconUrl = ref('https://cdn-old.brawlify.com/profile/28000000.png')
const brawlers = ref<Brawler[]>([])
const error = ref(null)

const fetchIcons = async () => {
  if (localStorage.icons) {
    icons.value = JSON.parse(localStorage.icons)
  } else {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`)
      icons.value = response.data
    } catch (error) {
      console.error('Error fetching icons data:', error)
    }
  }
}
const fetchData = async () => {
  error.value = player.value = null
  loading.value = true
  try {
    const playerUrl =
      `${import.meta.env.VITE_API_URL || ''}/api/player/` +
      encodeURIComponent(route.params.tag as string)
    const [iconsResponse, brawlersResponse, playerResponse] = await Promise.all([
      fetchIcons(),
      axios.get(`${import.meta.env.VITE_API_URL || ''}/api/brawlers`),
      // axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`),
      axios.get(playerUrl)
    ])
    // icons.value = iconsResponse.data
    brawlers.value = brawlersResponse.data
    player.value = playerResponse.data
    loading.value = false
  } catch (err: any) {
    console.error('Error fetching data:', err)
    loading.value = false
    error.value = err.toString()
  }
  console.log(icons.value)
  playerIconUrl.value =
    _.get(icons.value?.player, `${player.value?.icon.id}`)?.imageUrl ||
    'https://cdn-old.brawlify.com/profile/28000000.png'
}
const playerNameColor = computed(() => {
  return `#${player.value?.nameColor.slice(-6)}`
})
// Watch the params of the route to fetch the data again
watch(
  () => route.params,
  () => {
    fetchData()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading" class="loading w-full h-full"><LoadingPage /></div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="player" class="content">
    <div class="max-w-screen-xl mx-auto text-white px-3">
      <PlayerHeader
        :iconUrl="playerIconUrl"
        :name="player.name"
        :tag="player.tag"
        :nameColor="player.nameColor"
      />
      <div class="grid md:grid-cols-2 gap-3 mb-2">
        <div
          class="grid grid-cols-2 gap-3 items-center transition rounded-md overflow-hidden bg-zinc-800 hover:bg-zinc-700 p-2 md:p-3 mb-1"
        >
          <PlayerStatsItem title="Trophies" :value="player.trophies.toLocaleString()" emoji="🏆" />
          <PlayerStatsItem
            :title="_.startCase('highestTrophies')"
            :value="player.highestTrophies.toLocaleString()"
            emoji="🏆"
          />
          <PlayerStatsItem
            title="Experience Level"
            :value="player.expLevel.toLocaleString()"
            emoji="🎖️"
          />
          <PlayerStatsItem
            title="Experience Points"
            :value="player.expPoints.toLocaleString()"
            emoji="🪙"
          />
          <PlayerStatsItem
            :title="_.startCase('soloVictories')"
            :value="player.soloVictories.toLocaleString()"
            emoji="🏆"
          />

          <PlayerStatsItem
            :title="_.startCase('duoVictories')"
            :value="player.duoVictories.toLocaleString()"
            emoji="👯‍♀️"
          />
          <PlayerStatsItem
            title="3 vs 3 Victories"
            :value="player['3vs3Victories'].toLocaleString()"
            emoji="☘️"
          />
          <PlayerStatsItem
            title="Best Robo Rumble"
            :value="getRoboRumbleLevel(player.bestRoboRumbleTime)"
            emoji="🤖"
          />
        </div>
        <div
          class="grid grid-cols-2 gap-3 items-center transition rounded-md overflow-hidden bg-zinc-800 hover:bg-zinc-700 p-2 md:p-3 mb-1"
        >
          <PlayerStatsItem
            title="Last Played"
            :value="player.highestTrophies.toLocaleString()"
            emoji="🟢"
          />
          <PlayerStatsItem title="Trophies" :value="player.trophies.toLocaleString()" emoji="🏆" />
          <PlayerStatsItem title="Brawlers" :value="`${player.brawlers.length}/67`" emoji="👾" />
        </div>
      </div>
      <h3 class="font-display uppercase text-4xl pt-3 font-bold">
        Brawlers
        <span class="opacity-30 font-sans text-lg font-normal"
          >({{ player.brawlers.length }}/67)</span
        >
      </h3>
      <ul>
        <PlayerBrawlerListItem
          v-for="brawler in player.brawlers"
          :brawler="brawler"
          :key="brawler.id"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
header {
  background-color: --name-color;
}
</style>
