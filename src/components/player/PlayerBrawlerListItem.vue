<script setup lang="ts">
import type { Brawler } from '@/models/brawler.model'
import type { PlayerBrawler } from '@/models/player.model'
import axios from 'axios'
import _ from 'lodash'
import { computed, onMounted, ref, watch } from 'vue'
import BadgeRank from '@/components/badges/BadgeRank.vue'
import BadgePower from '@/components/badges/BadgePower.vue'

const props = defineProps({
  brawler: {
    type: Object as () => PlayerBrawler,
    required: true
  }
})
const brawlers = ref<Brawler[]>([])
const iconUrl = ref('')
const brawlerData = ref<Brawler>()

// Watcher for changes in 'name'
watch(brawlers, (brawlersData: Brawler[]) => {
  // Update localStorage when 'name' changes
  localStorage.brawlers = JSON.stringify(brawlersData)
})

onMounted(async () => {
  if (localStorage.brawlers) {
    brawlers.value = JSON.parse(localStorage.brawlers)
  } else {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || ''}/api/brawlers`)
      brawlers.value = response.data
    } catch (error) {
      console.error('Error fetching brawlers data:', error)
    }
  }

  brawlerData.value = brawlers.value.find((b) => b.id == props.brawler.id)
})
</script>

<template>
  <li
    class="transition grid rounded-md overflow-hidden bg-zinc-800 hover:bg-zinc-700 p-2 md:p-3 mb-1"
  >
    <div class="grid grid-cols-5 md:grid-cols-6 items-center">
      <div>
        <img
          class="w-16"
          :src="brawlerData?.imageUrl"
          :alt="_.capitalize(brawler.name) + ' icon'"
        />
      </div>
      <div>
        {{ _.capitalize(props.brawler.name) }}
      </div>
      <div>
        <!-- <span class="font-emoji">🥇</span> -->
        <BadgeRank :rank="props.brawler.rank" />
        <!-- {{ props.brawler.rank }} -->
      </div>
      <div>
        <BadgePower :level="props.brawler.power" />
      </div>
      <div class="inline-flex items-center gap-1">
        <!-- <span class="font-emoji">🏆</span> -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="w-5 h-5 fill-amber-500"
        >
          <path
            fill-rule="evenodd"
            d="M10 1c-1.828 0-3.623.149-5.371.435a.75.75 0 00-.629.74v.387c-.827.157-1.642.345-2.445.564a.75.75 0 00-.552.698 5 5 0 004.503 5.152 6 6 0 002.946 1.822A6.451 6.451 0 017.768 13H7.5A1.5 1.5 0 006 14.5V17h-.75C4.56 17 4 17.56 4 18.25c0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-.69-.56-1.25-1.25-1.25H14v-2.5a1.5 1.5 0 00-1.5-1.5h-.268a6.453 6.453 0 01-.684-2.202 6 6 0 002.946-1.822 5 5 0 004.503-5.152.75.75 0 00-.552-.698A31.804 31.804 0 0016 2.562v-.387a.75.75 0 00-.629-.74A33.227 33.227 0 0010 1zM2.525 4.422C3.012 4.3 3.504 4.19 4 4.09V5c0 .74.134 1.448.38 2.103a3.503 3.503 0 01-1.855-2.68zm14.95 0a3.503 3.503 0 01-1.854 2.68C15.866 6.449 16 5.74 16 5v-.91c.496.099.988.21 1.475.332z"
            clip-rule="evenodd"
          />
        </svg>

        {{ props.brawler.trophies }}
      </div>
      <div class="hidden md:block">
        <ul class="inline-flex">
          <!-- Gadgets -->
          <li v-for="gadget of props.brawler.gadgets" :key="gadget.id">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 fill-green-500"
            >
              <path
                fill-rule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- <img
              class="w-10"
              :src="brawlerData?.gadgets.find((g) => g.id === gadget.id)?.imageUrl"
              alt=""
            /> -->
          </li>
          <!-- Star powers -->
          <li v-for="sp of props.brawler.starPowers" :key="sp.id">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 fill-amber-400"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- <img
              class="w-10"
              :src="brawlerData?.starPowers.find((bs) => bs.id === sp.id)?.imageUrl"
              alt=""
            /> -->
          </li>

          <!-- Gears -->
          <li v-for="gear of props.brawler.gears" :key="gear.id">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 fill-slate-400"
            >
              <path
                fill-rule="evenodd"
                d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clip-rule="evenodd"
              />
            </svg>

            <!-- <img
              class="w-10"
              :src="brawlerData?.starPowers.find((bs) => bs.id === sp.id)?.imageUrl"
              alt=""
            /> -->
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>
