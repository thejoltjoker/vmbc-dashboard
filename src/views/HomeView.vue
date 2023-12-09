<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import type { Icons } from '@/models/icon.model'
import { computed, onMounted, ref } from 'vue'
import { meanBy, round } from 'lodash'
import axios from 'axios'
import MainStatBox from '@/components/MainStatBox.vue'
import DiscordButton from '@/components/DiscordButton.vue'
import ClubList from '@/components/ClubList.vue'
import LoadingPage from '@/components/LoadingPage.vue'

// For loading screen
const loading = ref(false)
const error = ref<any>(null)
// Define variables
const icons = ref<Icons>({ player: {}, club: {} })
const club = ref({ trophies: 0, members: [], requiredTrophies: 0, badgeId: '0', type: 'Unknown' })
const members = ref([])
const clubIcon = ref({
  id: 0,
  imageUrl: ''
})
const avgWinRate = computed(() => {
  const avg = meanBy(members.value, 'winRate')
  const avgString = `${round(avg * 100)}%`
  return avg ? avgString : 'N/A'
})

const fetchIcons = async () => {
  if (localStorage.icons) {
    console.log('Getting icons from local storage')
    icons.value = JSON.parse(localStorage.icons)
  } else {
    console.log('Getting icons from api')
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`)
      icons.value = response.data
      localStorage.icons = JSON.stringify(icons.value)
    } catch (error) {
      console.error('Error fetching brawlers data:', error)
    }
  }
  // try {
  //   const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`)
  //   icons.value = response.data
  // } catch (error) {
  //   console.error('Error fetching data:', error)
  // }
}

// const fetchData = async () => {
//   try {
//     await fetchClub()
//     await fetchIcons()
//     await fetchMembers()
//     clubIcon.value = icons.value.club[club.value.badgeId]
//   } catch (error) {
//     console.error('Error fetching data:', error)
//   }
// }
const fetchData = async () => {
  loading.value = true
  try {
    const [iconsResponse, clubResponse, membersResponse] = await Promise.all([
      // axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`),
      fetchIcons(),
      axios.get(`${import.meta.env.VITE_API_URL || ''}/api/club`),
      axios.get(`${import.meta.env.VITE_API_URL || ''}/api/members`)
    ])

    // icons.value = iconsResponse.data
    club.value = clubResponse.data

    members.value = membersResponse.data

    clubIcon.value = icons.value.club[club.value.badgeId]
    loading.value = false
  } catch (err) {
    console.error('Error fetching data:', err)
    error.value = err
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="loading" class="loading w-full h-full">
    <LoadingPage />
  </div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="club.trophies > 0" class="content">
    <div class="max-w-screen-xl mx-auto text-white px-3">
      <MainHeader :clubIcon="clubIcon" :club="club" />
      <div class="mb-6">
        <div class="flex flex-col md:flex-row justify-stretch gap-3">
          <div
            class="grow grid grid-cols-2 uppercase text-stone-400 font-display text-4xl font-bold"
          >
            <MainStatBox
              key="statBoxTrophies"
              :title="club.trophies.toLocaleString()"
              description="Total trophies"
              titleColor="amber"
            />

            <MainStatBox
              key="statBoxMembers"
              :title="club.members.length"
              description="Members"
              titleColor="pink"
            />
            <MainStatBox
              key="statBoxWinRate"
              :title="avgWinRate"
              description="Avg. win rate"
              titleColor="sky"
            />
            <div
              class="from-amber-400 to-amber-500 from-sky-400 to-sky-500 from-violet-400 to-violet-500 from-pink-400 to-pink-500 hidden"
            ></div>
            <MainStatBox key="statBoxChill" title="100%" description="Chill" titleColor="violet" />
          </div>
          <div class="grow shrink flex flex-col justify-between mb-6">
            <div class="text-stone-400 grid grid-cols-2">
              <div class="uppercase text-white font-display text-4xl font-bold col-span-full">
                Status
              </div>

              <div>Available Seats:</div>
              <div class="">
                <template v-if="club.members.length >= 30">
                  <span class="text-red-500 font-bold"> Currently full </span>
                </template>
                <template v-else>
                  <span class="text-sky-500 font-bold"> {{ 30 - club.members.length }} / 30 </span>
                </template>
              </div>

              <div>Type:</div>
              <div>
                <span class="text-sky-500 font-bold capitalize">{{ club.type }}</span>
              </div>
              <div>Required Trophies:</div>
              <div>
                <span class="text-amber-500 font-bold capitalize">{{
                  club.requiredTrophies.toLocaleString()
                }}</span>
              </div>
            </div>

            <div>
              <DiscordButton />
            </div>
          </div>
        </div>
      </div>
      <ClubList :members="members" :icons="icons" />

      <!-- <ClubTable :members="members" :icons="icons" /> -->
    </div>
  </div>
</template>
