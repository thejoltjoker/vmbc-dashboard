<!-- <script setup lang="ts">
import { defineProps, ref, onMounted, computed, Ref } from "vue";

import axios from "axios";
import BattleLog from "../models/BattleLog";


const props = defineProps(["member", "icons", "battles", "winRate"]);
const defaultImageUrl = "https://cdn-old.brawlify.com/profile/28000000.png";
const icon = ref(defaultImageUrl);


const battles = ref([]); // Initialize battles as an empty array



const winRateString: Ref<null | string> = ref(null);
const lastBattleString: Ref<null | string> = ref(null);
const hoursSinceLastBattle: Ref<null | number> = ref(null);

// Fetch data from API
onMounted(async () => {
  try {
    const url = `/api/player/${encodeURIComponent(props.member.tag)}/battles`;
    const response = await axios.get(url);
    icon.value = props.icons.player[props.member.icon.id]?.imageUrl;
    battles.value = response.data.items; // Set the fetched battles
    winRateString.value = `${Math.round(winRate.value * 100)}%`;
    lastBattleString.value = timeAgoString(lastBattle.value.battleTime);
    hoursSinceLastBattle.value = timeAgo(lastBattle.value.battleTime).asHours();
  } catch (error) {
    console.error("Error fetching data from the API", error);
  }
});
</script> -->
<script setup lang="ts">
import { ref, onMounted, computed, Ref } from "vue";
import axios from "axios";
import RoleBadge from "./RoleBadge.vue";
import Spinner from "./Spinner.vue";
import ClubMember from "../models/ClubMember";
import PlayerIcon from "../models/brawlapi.PlayerIcon";
import BattleLog from "../models/BattleLog";
import { timeAgoString, timeAgo } from "../lib/utility";

const props = defineProps<{
  member: ClubMember;
  icon: PlayerIcon;
}>();

// Define a reactive variable to store the fetched data
const battles: Ref<BattleLog[]> = ref([]);
const winRateString = ref("");
const lastBattleString = ref("");
const secondsSinceLastBattle = ref(0);

/**
 * Calculates the win rate based on battle results.
 *
 * @returns {number} The win rate as a decimal value.
 */
const winRate = computed(() => {
  // Map battles to an array of boolean values indicating victory or top 3 rank
  const results = battles.value.map((battle) =>
    battle.battle.result === "victory" ||
    (battle.battle.rank && battle.battle.rank <= 3)
      ? true
      : false,
  );

  // Calculate win rate by counting true values and dividing by total battles
  const winRateResponse = results.filter(Boolean).length / battles.value.length;

  return winRateResponse;
});

/**
 * Retrieves the details of the last recorded battle.
 *
 * @returns {BattleLog} The details of the last battle.
 */
const lastBattle = computed((): BattleLog => {
  // Use reduce to find the battle with the latest battle time
  return battles.value.reduce(
    (prev, current) => (prev.battleTime > current.battleTime ? prev : current),
    battles.value[0],
  );
});

// Define a function to fetch data from the API
const fetchData = async () => {
  try {
    // Fetch battles to calculate win rate etc
    const url = `${
      import.meta.env.VITE_API_URL || ""
    }/api/player/${encodeURIComponent(props.member.tag)}/battles`;
    const response = await axios.get(url);
    battles.value = response.data.items;

    // Set stats
    winRateString.value = `${Math.round(winRate.value * 100)}%`;
    lastBattleString.value = timeAgoString(lastBattle.value.battleTime);
    secondsSinceLastBattle.value = timeAgo(
      lastBattle.value.battleTime,
    ).asSeconds();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Use the onMounted lifecycle hook to fetch data when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <tr
    class="club-table-row border-b border-zinc-900 group transition bg-zinc-800 hover:bg-zinc-700"
  >
    <th scope="row" class="p-3 w-20">
      <img
        :src="props.icon.imageUrl"
        alt="icon"
        srcset=""
        class="w-full aspect-square"
      />
    </th>
    <td class="p-3">
      <h3>{{ props.member.name }}</h3>
      <p class="opacity-20">{{ props.member.tag }}</p>
    </td>
    <td class="p-3">
      <RoleBadge
        :role="props.member.role"
        :key="props.member.tag + props.member.role"
      />
    </td>
    <td class="p-3">{{ props.member.trophies.toLocaleString() }}</td>
    <td class="p-3">
      <template v-if="winRateString !== ''">
        {{ winRateString }}
      </template>
      <template v-else>
        <Spinner />
      </template>
    </td>
    <td class="p-3">
      <div class="inline-flex h-full items-center">
        <template v-if="lastBattleString !== ''">
          {{ lastBattleString }}
        </template>
        <template v-else>
          <Spinner />
        </template>
        <template
          v-if="secondsSinceLastBattle !== 0 && secondsSinceLastBattle > 259200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 fill-red-500 ml-3"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>
        </template>
      </div>
    </td>
  </tr>
</template>
