<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import ClubTable from "./components/ClubTable.vue";
import Club from "./models/Club";
import ClubMember from "./models/ClubMember";
import MainHeader from "./components/MainHeader.vue";

const members = ref([] as ClubMember[]);
const icons = ref({ player: {}, club: {} });
const clubIcon = ref("");
const club = ref({
  tag: "",
  name: "VMBC",
  description: "",
  trophies: 0,
  requiredTrophies: 0,
  members: [],
  type: "unknown",
  badgeId: 8000035,
} as Club); // Assuming trophies is a number

const fetchData = async () => {
  try {
    const response = await axios.get("/api/club");
    club.value = response.data;
    members.value = club.value.members;

    const iconsResponse = await axios.get("/api/icons");
    icons.value = iconsResponse.data;
    clubIcon.value = icons.value.club[club.value.badgeId].imageUrl;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="max-w-screen-xl mx-auto text-white">
    <MainHeader :clubIcon="clubIcon" :club="club" />

    <div class="mb-6">
      <div class="flex flex-row justify-stretch gap-3">
        <div
          class="grow grid grid-cols-2 uppercase text-stone-400 font-display text-4xl font-bold"
        >
          <div class="mb-6">
            <span class="text-amber-400 text-6xl">{{
              club.trophies.toLocaleString()
            }}</span>
            <br />
            Total trophies
          </div>
          <div class="">
            <span class="text-pink-500 text-6xl">{{ members.length }}</span>
            <br />
            Members
          </div>
          <div class="">
            <span class="text-amber-400 text-6xl">{{
              club.trophies.toLocaleString()
            }}</span>
            <br />
            Average win rate
          </div>
          <div class="">
            <span class="text-pink-500 text-6xl">{{ members.length }}</span>
            <br />
            Members
          </div>
        </div>
        <div class="grow shrink">
          <div class="text-stone-400 grid grid-cols-2 grow">
            <div
              class="uppercase text-white font-display text-4xl font-bold col-span-full"
            >
              Status
            </div>
            Available Seats:

            <template v-if="club.members.length >= 30">
              <span class="text-red-500 font-bold"> Currently full </span>
            </template>
            <template v-else>
              <span class="text-sky-500 font-bold">
                {{ 30 - club.members.length }} / 30
              </span>
            </template>

            <br />
            Type:
            <span class="text-sky-500 font-bold capitalize">{{
              club.type
            }}</span>
            <br />
            Required Trophies:
            <span class="text-amber-500 font-bold capitalize">{{
              club.requiredTrophies.toLocaleString()
            }}</span>
          </div>

          <div>
            <button
              type="button"
              class="text-white bg-violet-700 hover:bg-violet-700/80 focus:ring-4 focus:outline-none focus:ring-violet-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
            >
              <svg
                class="w-6 h-6 me-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                height="16"
                width="20"
                viewBox="0 0 640 512"
              >
                <path
                  d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"
                />
              </svg>

              Join us on Discord
            </button>
          </div>
        </div>
      </div>
    </div>
    <ClubTable :members="members" :icons="icons" />
  </div>
</template>
