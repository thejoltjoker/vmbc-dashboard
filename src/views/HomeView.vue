<script setup lang="ts">
import ClubTable from '@/components/ClubTable.vue'
import MainHeader from '@/components/MainHeader.vue'
import type { Icons } from '@/models/icon.model'
import { computed, onMounted, ref } from 'vue'
import { meanBy, round } from 'lodash'
import axios from 'axios'
import MainStatBox from './MainStatBox.vue'
import DiscordButton from './DiscordButton.vue'

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

const fetchClub = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/club`)
    club.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchMembers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/members`)
    members.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchIcons = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/icons`)
    icons.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchData = async () => {
  try {
    await fetchClub()
    await fetchIcons()
    await fetchMembers()
    clubIcon.value = icons.value.club[club.value.badgeId]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div id="app">
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
              titleColor="text-amber-500"
            />

            <MainStatBox
              key="statBoxMembers"
              :title="club.members.length"
              description="Members"
              titleColor="text-pink-500"
            />
            <MainStatBox
              key="statBoxWinRate"
              :title="avgWinRate"
              description="Avg. win rate"
              titleColor="text-sky-500"
            />
            <MainStatBox
              key="statBoxChill"
              title="100%"
              description="Chill"
              titleColor="text-violet-500"
            />
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
      <ClubTable :members="members" :icons="icons" />
    </div>
  </div>
</template>
@/models/icon.model
