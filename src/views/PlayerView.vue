<!-- <script setup lang="ts">
import axios from 'axios'
import { onMounted } from 'vue'

const fetchData = async () => {
  try {
    const [iconsResponse, clubResponse, membersResponse] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`),
      axios.get(`${import.meta.env.VITE_API_URL || ''}/api/player/${$route.params.tag}`)
    ])

    icons.value = iconsResponse.data
    icons.value = iconsResponse.data

    
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script> -->

<script setup lang="ts">
import axios from 'axios'
import _ from 'lodash'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Player } from '@/models/player.model'
import type { Icons } from '@/models/icon.model'
import type { Brawler } from '@/models/brawler.model'
import PlayerBrawlerListItem from '@/components/player/PlayerBrawlerListItem.vue'

const route = useRoute()

const loading = ref(false)
const player = ref<Player | null>(null)
const icons = ref<Icons | null>(null)
const playerIconUrl = ref('https://cdn-old.brawlify.com/profile/28000000.png')
const brawlers = ref<Brawler[]>([])
const error = ref(null)
const fetchPlayer = async () => {
  const url =
    `${import.meta.env.VITE_API_URL || ''}/api/player/` + encodeURIComponent(route.params.tag)
  axios
    .get('../../scrap/GCPV9Q8QY.json')
    .then((response) => {
      loading.value = false
      player.value = response.data
    })
    .catch((err) => {
      loading.value = false
      error.value = err.toString()
    })
}
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
      `${import.meta.env.VITE_API_URL || ''}/api/player/` + encodeURIComponent(route.params.tag)
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
  // playerIconUrl.value = icons[player.icon.id]
}

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
  <div class="max-w-screen-xl mx-auto text-white px-3">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="player" class="content">
      <header>
        <img :src="playerIconUrl" alt="" />
        <div class="flex flex-col">
          <h1>{{ player.name }}</h1>
          <p>{{ player.tag }}</p>
          <p>{{ player.trophies }}</p>
          <p>{{ player.expLevel }}</p>
          <p>{{ player.expPoints }}</p>
        </div>
      </header>
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
