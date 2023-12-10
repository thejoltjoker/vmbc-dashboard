<script setup lang="ts">
defineProps<{
  player: {
    tag: string
    name: string
    nameColor: string
    icon: { id: number }
    trophies: number
    highestTrophies: number
    expLevel: number
    expPoints: number
    isQualifiedFromChampionshipChallenge: boolean
    '3vs3Victories': number
    soloVictories: number
    duoVictories: number
    bestRoboRumbleTime: number
    bestTimeAsBigBrawler: number
    club: { tag: string; name: string }
    brawlers: {
      id: number
      name: string
      power: number
      rank: number
      trophies: number
      highestTrophies: number
      gears: { id: number; name: string; level: number }[]
      starPowers: { id: number; name: string }[]
      gadgets: { id: number; name: string }[]
    }[]
  }
}>()
</script>

<template>
  <div
    id="stats-trophies"
    class="flex-col gap-3 items-center rounded-md overflow-hidden bg-zinc-800 p-2 md:p-3 lg:p-6 mb-1"
  >
    <div class="grid grid-cols-2">
      <div>
        <h4 class="uppercase font-display text-2xl md:text-4xl font-bold">Trophies</h4>
        <p class="font-display text-5xl md:text-6xl font-bold text-amber-400">
          {{ player.trophies.toLocaleString() }}
        </p>
      </div>
      <div>
        <h4 class="uppercase font-display text-2xl md:text-4xl font-bold text-zinc-500">Highest</h4>
        <p class="font-display text-5xl md:text-6xl font-bold text-zinc-600">
          {{ player.highestTrophies.toLocaleString() }}
        </p>
      </div>
    </div>
    <!-- 
	          <div class="inline-flex gap-1">
	            <svg
	              xmlns="http://www.w3.org/2000/svg"
	              viewBox="0 0 24 24"
	              fill="currentColor"
	              class="w-6 h-6 fill-green-500"
	            >
	              <path
	                fill-rule="evenodd"
	                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z"
	                clip-rule="evenodd"
	              />
	            </svg>
	
	            <p>234 trophies <span class="opacity-50">since last week</span></p>
	          </div> -->
  </div>
</template>
