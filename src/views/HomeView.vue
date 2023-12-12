<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import type { Icons } from '@/models/icon.model'
import { computed, onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { formatDistanceToNow, isBefore, parseISO, subDays } from 'date-fns'
import _ from 'lodash'
import axios from 'axios'
import MainStatBox from '@/components/MainStatBox.vue'
import ClubList from '@/components/ClubList.vue'
import LoadingPage from '@/components/LoadingPage.vue'
import { useFavicon } from '@vueuse/core'
import BoxGray from '@/components/boxes/BoxGray.vue'
import FooterMain from '@/components/FooterMain.vue'
// import type { Member } from '@/models/member.model'

import type { Member } from '@vmbc-dashboard/shared/models/member.model'
import HomeWarningMembers from './HomeWarningMembers.vue'

// For loading screen
const loading = ref(false)
const error = ref<any>(null)

// Define variables
const icons = ref<Icons>({ player: {}, club: {} })
const club = ref({ trophies: 0, members: [], requiredTrophies: 0, badgeId: '0', type: 'Unknown' })
const members = ref<Member[]>([])
const clubIcon = ref({
  id: 0,
  imageUrl: ''
})
// returns Ref<string>
const avgWinRate = computed(() => {
  const avg = _.meanBy(members.value, 'winRate')
  localStorage.setItem('avgWinRate', avg.toString())
  const avgString = `${_.round(avg * 100)}%`
  return avg ? avgString : 'N/A'
})
const warningMembers = ref<Member[]>([])
const favicon = useFavicon()
favicon.value = 'https://cdn-old.brawlify.com/club/8000000.png'

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

    // Calculate who's in the danger zone
    warningMembers.value = members.value.filter((member: Member) =>
      isBefore(parseISO(`${member.lastPlayed}`), subDays(new Date(), 7))
    )

    clubIcon.value = icons.value.club[club.value.badgeId]
    // Set Favicon
    favicon.value = clubIcon.value.imageUrl
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
        <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-2 my-2">
          <div
            class="grid grid-cols-2 lg:grid-cols-4 uppercase text-zinc-400 font-display text-4xl font-bold col-span-full"
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
          <!-- <BoxGray>
            <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full bg-event-heist">
              <div class="inline-flex justify-between w-full">
                <p class="uppercase font-medium text-violet-400 text-sm">Heist</p>
                <p class="uppercase font-medium text-zinc-500 text-sm">Event</p>
              </div>

              <div class="inline-flex gap-3 items-center">
                <div class="w-20 h-20">
                  <img src="https://cdn-old.brawlify.com/gamemode/Heist.png" alt="" class="-mt-1" />
                </div>

                <p class="font-display uppercase font-bold text-white text-6xl">Hot Potato</p>
              </div>

              <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
                <div class="text-cyan-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  Next event
                  <span class="text-white">
                    {{
                      formatDistanceToNow(parseISO('2023-12-11T14:00:00.000Z'), {
                        addSuffix: true
                      })
                    }}
                  </span>
                </p>
              </div>
            </div>
          </BoxGray> -->
          <!-- <BoxGray>
            <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full bg-event-knockout">
              <div class="inline-flex justify-between w-full">
                <p class="uppercase font-medium text-red-400 text-sm">Knockout</p>
                <p class="uppercase font-medium text-zinc-500 text-sm">Event</p>
              </div>

              <div class="inline-flex gap-3 items-center">
                <div class="w-20 h-20">
                  <img
                    src="https://cdn-old.brawlify.com/gamemode/Knockout.png"
                    alt=""
                    class="-mt-1"
                  />
                </div>
                <p class="font-display uppercase font-bold text-white text-6xl">Flaring Phoenix</p>
              </div>

              <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
                <div class="text-cyan-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>

                <p class="text-zinc-500 text-sm">
                  Next event
                  <span class="text-white">
                    {{
                      formatDistanceToNow(parseISO('2023-12-11T14:00:00.000Z'), {
                        addSuffix: true
                      })
                    }}
                  </span>
                </p>
              </div>
            </div>
          </BoxGray> -->
          <BoxGray>
            <div class="p-5 flex flex-col gap-3 justify-between h-full">
              <p class="uppercase font-medium text-zinc-500 text-sm">Club status</p>
              <div class="grid grid-cols-2">
                <div>Available Seats:</div>
                <div>
                  <template v-if="club.members.length >= 30">
                    <span class="text-red-500 font-bold">
                      {{ 30 - club.members.length }} / 30
                    </span>
                  </template>
                  <template v-else>
                    <span class="text-green-500 font-bold">
                      {{ 30 - club.members.length }} / 30
                    </span>
                  </template>
                </div>
                <div>Required Trophies:</div>
                <div>
                  <span class="text-amber-400 font-bold capitalize">{{
                    club.requiredTrophies.toLocaleString()
                  }}</span>
                </div>
                <div>Type:</div>
                <div>
                  <span class="text-zinc-400 font-bold capitalize">{{ club.type }}</span>
                </div>
                <div>Family Friendly:</div>
                <div>
                  <span class="text-zinc-400 font-bold capitalize">No</span>
                </div>
              </div>
              <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
                <svg
                  class="fill-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
                  />
                </svg>

                <p class="text-zinc-500 text-sm">
                  Join us on
                  <span class="transition text-indigo-400 hover:text-indigo-500"
                    ><a href="https://discord.gg/xbJvSD8Xw2">Discord</a></span
                  >
                </p>
              </div>
            </div>
          </BoxGray>
          <HomeWarningMembers :warningMembers="warningMembers" />
        </div>
      </div>
      <ClubList :members="members" :icons="icons" />

      <!-- <ClubTable :members="members" :icons="icons" /> -->
    </div>
  </div>
  <FooterMain />
</template>
<style>
.bg-event-heist {
  position: relative;
}
.bg-event-heist:before {
  position: absolute;
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: url('https://cdn-old.brawlify.com/gamemode/header/Heist.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.bg-event-knockout {
  position: relative;
}
.bg-event-knockout:before {
  position: absolute;
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  background-image: url('https://cdn-old.brawlify.com/gamemode/header/Knockout.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>
