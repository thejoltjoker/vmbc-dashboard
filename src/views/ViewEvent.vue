<script setup lang="ts">
import axios from 'axios'
import { ref, watch } from 'vue'
import type { Map } from '@/models/map.model'
import { useRoute } from 'vue-router'
import { useStorage } from '@vueuse/core'
import LoadingPage from '@/components/LoadingPage.vue'
import { useTitle } from '@vueuse/core'
import BoxGray from '@/components/boxes/BoxGray.vue'

const title = useTitle('VMBC')
const route = useRoute()
const loading = ref(false)
const map = ref<Map | null>(null)
const error = ref(null)
// const state = useStorage('my-store', { hello: 'hi', greeting: 'Hello' })
const getMap = async (id: number | string) => {
  loading.value = true
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/maps/${id}`)
    map.value = response.data
  } catch (err: any) {
    console.error('Error fetching map data:', err)
    error.value = err.toString()
  }
  loading.value = false
}

const fetchData = async () => {
  error.value = map.value = null
  loading.value = true
  await getMap(route.params.id as string)
  // Set title
  // title.value = `${map.value.name ?? 'Name'} @ VMBC`
}

watch(
  () => route.params,
  () => {
    fetchData()
  },
  { immediate: true }
)

const defaultImage = 'https://cdn-old.brawlify.com/profile/28000000.png'
const imageUrl = ref(defaultImage)
const replaceByDefault = () => {
  imageUrl.value = defaultImage
  // return defaultImage
}
</script>

<template>
  <div v-if="loading" class="loading h-full">
    <LoadingPage />
  </div>

  <div v-if="error" class="error">{{ error }}</div>

  <div v-if="map" class="content max-w-screen-xl mx-auto px-3">
    <header class="flex flex-col items-center md:items-start p-2 md:p-3 mb-1">
      <h1 class="font-display text-5xl md:text-7xl font-black uppercase">
        {{ map.name }}
      </h1>

      <p class="opacity-30 text-2xl">#{{ map.id }}</p>
    </header>
    <div class="grid md:grid-cols-2 gap-2 my-2">
      <BoxGray>
        <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
          <p class="uppercase font-medium text-zinc-500 text-sm">Map</p>
          <div class="inline-flex gap-2 items-center max-h-[50vh]">
            <img :src="map.imageUrl" alt="" class="mx-auto max-h-full" />
          </div>

          <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
            <div class="text-amber-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z"
                />
              </svg>
            </div>

            <p class="text-zinc-500 text-sm">
              Created by
              <span :href="map.link" class="text-white">{{ map.credit }}</span>
            </p>
          </div>
        </div>
      </BoxGray>
      <BoxGray>
        <div class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
          <p class="uppercase font-medium text-zinc-500 text-sm">Game mode</p>
          <div class="inline-flex gap-2 items-center">
            <div class="w-16 h-16">
              <img :src="map.gameMode.imageUrl" alt="" class="-mt-1" />
            </div>
            <p class="font-display uppercase font-bold text-white text-4xl">
              {{ map.gameMode.name }}
            </p>
          </div>

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
              <a :href="map.gameMode.link" class="text-white"> Read more </a>
              on brawlify
            </p>
          </div>
        </div>
      </BoxGray>
    </div>
  </div>
</template>
