<script setup lang="ts">
import { ref } from "vue";
import _ from "lodash";
import { formatDistanceToNow, parseISO } from "date-fns";
import RoleBadge from "./RoleBadge.vue";
import Spinner from "./Spinner.vue";
import PlayerIcon from "../models/brawlapi.PlayerIcon";
import { Member } from "../../shared/models/Member";

const props = defineProps<{
  member: Member;
  icon: PlayerIcon;
}>();

const imageSrc = ref(
  props.icon.imageUrl || "https://cdn-old.brawlify.com/profile/28000000.png",
);
const setDefaultImage = () => {
  // Switch to a fallback image if the original image fails to load
  imageSrc.value = "https://cdn-old.brawlify.com/profile/28000000.png";
};

// Define a reactive variable to store the fetched data
const winRateString = ref(`${Math.round(props.member.winRate * 100)}%`);
const lastBattleString = ref(
  _.capitalize(
    formatDistanceToNow(parseISO(props.member.lastPlayed), { addSuffix: true }),
  ),
);
const secondsSinceLastBattle = ref(0);
</script>

<template>
  <tr
    class="club-table-row border-b border-zinc-900 group transition bg-zinc-800 hover:bg-zinc-700"
  >
    <th scope="row" class="p-3 w-20">
      <img
        :src="imageSrc"
        alt="icon"
        srcset=""
        class="w-full aspect-square"
        onerror="this.onerror=null;this.src='https://cdn-old.brawlify.com/profile/28000000.png';"
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
