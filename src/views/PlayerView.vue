<script setup lang="ts">
import type { Player, PlayerBrawler } from '@/../shared/models/player.model'
import LoadingPage from '@/components/LoadingPage.vue'
import PlayerHeader from '@/components/PlayerHeader.vue'
import BoxGray from '@/components/boxes/BoxGray.vue'
import PlayerBrawlerList from '@/components/player/PlayerBrawlerList.vue'
import PlayerStatsStarPlayerStreak from '@/components/player/PlayerStatsStarPlayerStreak.vue'
import PlayerStatsWinStreak from '@/components/player/PlayerStatsWinStreak.vue'
import type { Brawler } from '@/models/brawler.model'
import type { Icons } from '@/models/icon.model'
import { useStorage, useTitle } from '@vueuse/core'
import axios from 'axios'
import _ from 'lodash'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const loading = ref(false)
const player = ref<Player | null>(null)
const icons = ref<Icons | null>(null)
const defaultImage = 'https://cdn-old.brawlify.com/profile/28000000.png'
const playerIconUrl = ref(defaultImage)
const brawlers = ref<Brawler[]>([])
const winRates = ref([])
const topBrawler = ref<PlayerBrawler | null>(null)
const favoriteBrawler = ref<PlayerBrawler | null>(null)
const error = ref(null)
const avgWinRate = useStorage('avgWinRate', 0)
const title = useTitle(player.value?.name, { titleTemplate: '%s @ Vacay Mania Brawl Club' })

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

    brawlers.value = brawlersResponse.data

    player.value = playerResponse.data

    // Set top brawler
    topBrawler.value = _.sortBy(player.value?.brawlers, [
      (brawler) => brawler.trophies
    ]).reverse()[0]
    favoriteBrawler.value = _.sortBy(player.value?.brawlers, [
      (brawler) => brawler.totalBattles
    ]).reverse()[0]

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

      <div class="grid md:grid-cols-2 gap-2 my-2">
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Trophies</p>

            <p class="font-display uppercase font-bold text-white text-6xl">
              {{ player.trophies.toLocaleString() }}
            </p>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <template v-if="player.trophies < player.highestTrophies">
                <div class="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  <span class="text-white">{{
                    (player.highestTrophies - player.trophies).toLocaleString()
                  }}</span>
                  lower than highest trophies
                </p>
              </template>
              <template v-else>
                <div class="text-amber-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  <span class="text-white">{{ player.highestTrophies.toLocaleString() }}</span>
                  highest trophies
                </p>
              </template>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Experience Level</p>

            <p class="font-display uppercase font-bold text-white text-6xl">
              {{ player.expLevel }}
            </p>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <div class="text-sky-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <p class="text-zinc-500 text-sm">
                <span class="text-white">{{ player.expPoints.toLocaleString() }}</span>
                experience points
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Victories</p>

            <div
              class="flex flex-row text-4xl md:text-5xl lg:text-6xl justify-between font-display uppercase font-bold text-white"
            >
              <p>
                {{ player.soloVictories.toLocaleString() }}
              </p>
              <p>
                {{ player.duoVictories.toLocaleString() }}
              </p>
              <p>
                {{ player.soloVictories.toLocaleString() }}
              </p>
            </div>
            <div
              class="grid grid-cols-3 gap-2 border-t-[1px] pt-2 border-zinc-100/10 justify-between"
            >
              <p class="text-zinc-500 text-sm">Solo</p>
              <p class="text-zinc-500 text-sm text-center">Duo</p>
              <p class="text-zinc-500 text-sm text-end">3 vs 3</p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Win Rate</p>
            <p class="font-display font-bold text-white text-6xl">
              {{ _.round(player.winRate * 100)
              }}<span class="font-normal text-2xl opacity-50">%</span>
            </p>
            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <template v-if="player.winRate > avgWinRate">
                <div class="text-green-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  <span class="text-white">
                    {{ _.round((player.winRate - avgWinRate) * 100) }}%
                  </span>
                  better than club average
                </p>
              </template>
              <template v-else>
                <div class="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      d="M18.905 12.75a1.25 1.25 0 01-2.5 0v-7.5a1.25 1.25 0 112.5 0v7.5zM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 015.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.242 0-2.26-1.01-2.146-2.247.193-2.08.652-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 011.342.317l2.733 1.366A3 3 0 0013.613 5h1.292v7h-.963c-.684 0-1.258.482-1.612 1.068a4.012 4.012 0 01-2.165 1.73c-.433.143-.854.386-1.012.814-.16.432-.248.9-.248 1.388z"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  <span class="text-white">
                    {{ _.round((avgWinRate - player.winRate) * 100) }}%
                  </span>
                  lower than club average
                </p>
              </template>
            </div>
          </div>
        </BoxGray>
        <PlayerStatsWinStreak :player="player" />
        <PlayerStatsStarPlayerStreak :player="player" />
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Top brawler</p>
            <div class="inline-flex gap-2 items-center">
              <div class="w-20 h-20">
                <img
                  :src="brawlers.find((brawler) => brawler.id == topBrawler?.id)?.imageUrl3"
                  alt=""
                  class="-mt-1"
                />
              </div>
              <p class="font-display uppercase font-bold text-white text-6xl">
                {{ topBrawler?.name }}
              </p>
            </div>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <div class="text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <p class="text-zinc-500 text-sm">
                <span class="text-white"> {{ topBrawler?.trophies }} </span>
                Trophies
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Favorite brawler</p>
            <div class="inline-flex gap-2 items-center">
              <div class="w-20 h-20">
                <img
                  :src="brawlers.find((brawler) => brawler.id == favoriteBrawler?.id)?.imageUrl3"
                  alt=""
                  class="-mt-1"
                />
              </div>
              <p class="font-display uppercase font-bold text-white text-6xl">
                {{ favoriteBrawler?.name }}
              </p>
            </div>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <div class="text-amber-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <p class="text-zinc-500 text-sm">
                <span class="text-white"
                  >{{
                    _.round(
                      ((favoriteBrawler?.totalBattles ?? 0.00001) /
                        _.sum(player.brawlers.map((brawler) => brawler.totalBattles))) *
                        100
                    )
                  }}%</span
                >
                of battles played with {{ _.capitalize(favoriteBrawler?.name) }}
              </p>
            </div>
          </div>
        </BoxGray>
      </div>
      <h3 class="font-display uppercase text-2xl md:text-4xl pt-3 font-bold">
        Brawlers
        <span class="opacity-30 font-sans text-lg font-normal"
          >({{ player.brawlers.length }}/{{ brawlers.length }})</span
        >
      </h3>
      <PlayerBrawlerList :brawlers="player.brawlers" />
    </div>
  </div>
</template>

<style scoped>
header {
  background-color: --name-color;
}
</style>
