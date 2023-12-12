<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import type { Brawler } from '@vmbc-dashboard/shared/models/brawler.model'
import LoadingPage from '@/components/LoadingPage.vue'
import BoxGray from '@/components/boxes/BoxGray.vue'
import BoxYellow from '@/components/boxes/BoxYellow.vue'
import _ from 'lodash'

const title = useTitle('VMBC')
const route = useRoute()
const loading = ref(false)
const brawler = ref<Brawler | null>(null)
const error = ref(null)

const defaultImage = 'https://cdn-old.brawlify.com/profile/28000000.png'
const imageUrl = ref(defaultImage)
const replaceByDefault = () => {
  imageUrl.value = defaultImage
  // return defaultImage
}

const getBrawler = async (id: number | string) => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/brawlers/${id}`)
    brawler.value = response.data
  } catch (err: any) {
    console.error('Error fetching map data:', err)
    error.value = err.toString()
  }
  loading.value = false
}

const fetchData = async () => {
  error.value = null
  loading.value = true
  await getBrawler(route.params.id as string)
  // Set title
  title.value = `${_.get(brawler.value, 'name') ?? 'Brawler'} @ VMBC`
  imageUrl.value = brawler.value?.imageUrl ?? defaultImage
}
watch(
  () => route.params,
  () => {
    fetchData()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="loading" class="loading h-full"><LoadingPage /></div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="brawler" class="content">
    <div class="max-w-screen-xl mx-auto text-white px-3">
      <header class="flex flex-col md:flex-row items-center p-2 md:p-3 mb-1">
        <img
          :src="imageUrl"
          :alt="brawler.name + ' icon'"
          class="w-32 h-32 md:mr-3"
          @error="replaceByDefault"
        />
        <div class="flex flex-col text-center md:text-start pt-3 md:pt-0">
          <h1 class="font-display text-5xl md:text-7xl font-black uppercase">
            {{ brawler.name }}
          </h1>

          <p class="opacity-30 text-2xl">{{ brawler.rarity.name }}</p>
        </div>
      </header>
      <div class="grid md:grid-cols-2 gap-2 my-2">
        <BoxYellow>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-yellow-700 text-sm">This page is</p>

            <div class="inline-flex gap-2 items-center">
              <div class="w-16 h-16 -mt-8">
                <img src="/constructor.gif" alt="" />
              </div>
              <p class="font-display uppercase font-bold text-white text-5xl">Under construction</p>
            </div>

            <div
              class="inline-flex gap-2 border-t-[1px] pt-2 border-amber-300 construction-striped -m-3 md:-m-5 pb-3 px-3 md:px-5 md:pb-5"
            >
              <!-- <p class="text-zinc-500 text-sm">
                <a :href="brawler.link" class="text-white"> Read more </a>
                Under construction
              </p> -->
            </div>
          </div>
        </BoxYellow>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Description</p>

            <p class="text-white text-lg">
              {{ brawler.description }}
            </p>

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
                <span class="text-white">sf</span>
                highest trophies
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Class</p>

            <p class="font-display uppercase font-bold text-white text-6xl">
              {{ brawler.class.name }}
            </p>

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
                <span class="text-white">sf</span>
                highest trophies
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Rarity</p>

            <p class="font-display uppercase font-bold text-white text-6xl">
              {{ brawler.rarity.name }}
            </p>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <div class="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>

              <p class="text-zinc-500 text-sm">
                <a :href="brawler.link" class="text-white"> Read more </a>
                on brawlify
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Recommended Star Power</p>
            <div class="inline-flex gap-2 items-center">
              <div class="w-16 h-16">
                <img :src="brawler.starPowers[0].imageUrl" alt="" class="-mt-1" />
              </div>
              <p class="font-display uppercase font-bold text-white text-6xl">
                {{ brawler.starPowers[0].name }}
              </p>
            </div>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
                class="w-5 h-5 fill-red-500"
              >
                <path
                  d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                />
              </svg>

              <p class="text-zinc-500 text-sm">
                <a href="https://www.youtube.com/watch?v=1IcOKkfaJPQ" class="text-white">
                  Kairostime
                </a>
                recommends
              </p>
            </div>
          </div>
        </BoxGray>
        <BoxGray>
          <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
            <p class="uppercase font-medium text-zinc-500 text-sm">Recommended Gadget</p>
            <div class="inline-flex gap-2 items-center">
              <div class="w-16 h-16">
                <img :src="brawler.gadgets[0].imageUrl" alt="" class="-mt-1" />
              </div>
              <p class="font-display uppercase font-bold text-white text-6xl">
                {{ brawler.gadgets[0].name }}
              </p>
            </div>

            <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="18"
                viewBox="0 0 576 512"
                class="w-5 h-5 fill-red-500"
              >
                <path
                  d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                />
              </svg>

              <p class="text-zinc-500 text-sm">
                <a href="https://www.youtube.com/watch?v=_gRzPQx3GQ8" class="text-white">
                  Kairostime
                </a>
                recommends
              </p>
            </div>
          </div>
        </BoxGray>
      </div>
    </div>
  </div>
</template>
