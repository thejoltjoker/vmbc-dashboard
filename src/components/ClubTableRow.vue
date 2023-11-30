<script setup lang="ts">
import { defineProps, ref, onMounted, computed, Ref } from "vue";
import RoleBadge from "./RoleBadge.vue";
import Spinner from "./Spinner.vue";
import axios from "axios";
import BattleLog from "../models/BattleLog";
import { timeAgoString, timeAgo } from "../lib/utility";

const props = defineProps(["member", "icons", "battles", "winRate"]);
const defaultImageUrl = "https://cdn-old.brawlify.com/profile/28000000.png";
const icon = ref(defaultImageUrl);
const lastBattle = computed((): BattleLog => {
  return battles.value.reduce(
    (prev, current) => (prev.battleTime > current.battleTime ? prev : current),
    battles.value[0],
  );
});

const battles = ref([]); // Initialize battles as an empty array

const winRate = computed(() => {
  const results = battles.value.map((battle) =>
    battle.battle.result == "victory" ||
    (battle.battle.rank && battle.battle.rank <= 3)
      ? true
      : false,
  );

  const winRateResponse = results.filter(Boolean).length / battles.value.length;
  return winRateResponse;
});

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
</script>

<template>
  <tr
    class="club-table-row border-b border-zinc-900 group transition bg-zinc-800 hover:bg-zinc-700"
  >
    <th scope="row" class="p-3 w-20">
      <img :src="icon" alt="icon" srcset="" class="w-full aspect-square" />
    </th>
    <td class="p-3">
      <h3>{{ member.name }}</h3>
      <p class="opacity-20">{{ member.tag }}</p>
    </td>
    <td class="p-3">
      <RoleBadge :role="member.role" :key="member.tag + member.role" />
    </td>
    <td class="p-3">{{ member.trophies.toLocaleString() }}</td>
    <td class="p-3">
      <template v-if="winRateString !== null">
        {{ winRateString }}
      </template>
      <template v-else>
        <Spinner />
      </template>
    </td>
    <td class="p-3">
      <div class="inline-flex h-full items-center">
        <template v-if="lastBattleString !== null">
          {{ lastBattleString }}
        </template>
        <template v-else>
          <Spinner />
        </template>
        <template
          v-if="hoursSinceLastBattle !== null && hoursSinceLastBattle > 120"
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
