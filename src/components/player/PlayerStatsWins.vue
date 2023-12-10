<script setup lang="ts">
import type { Player } from '@/models/player.model'

defineProps<{
  player: Player
}>()
</script>

<template>
  <div
    id="stats-wins"
    class="flex-col gap-3 items-center rounded-md overflow-hidden bg-zinc-800 p-2 md:p-3 lg:p-6 mb-1"
  >
    <div class="grid grid-cols-3">
      <h4 class="uppercase font-display text-2xl md:text-4xl font-bold col-span-3">Wins</h4>
      <div>
        <p class="font-display text-4xl md:text-6xl font-bold text-orange-400">
          {{ player.soloVictories.toLocaleString() }}
        </p>
        <h4 class="text-zinc-500">Solo</h4>
      </div>
      <div>
        <p class="font-display text-4xl md:text-6xl font-bold text-red-400">
          {{ player.duoVictories.toLocaleString() }}
        </p>
        <h4 class="text-zinc-500">Duo</h4>
      </div>
      <div>
        <p class="font-display text-4xl md:text-6xl font-bold text-pink-400">
          {{ player['3vs3Victories'].toLocaleString() }}
        </p>
        <h4 class="text-zinc-500">3v3</h4>
      </div>
    </div>
  </div>
</template>
