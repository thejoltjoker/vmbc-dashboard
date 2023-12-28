<script setup lang="ts">
import type { Player } from '@/../shared/models/player.model'
import BoxGray from '@/components/boxes/BoxGray.vue'

defineProps<{
  player: Player
}>()
</script>

<template>
  <BoxGray>
    <div class="p-5 flex flex-col gap-3 justify-between h-full">
      <p class="uppercase font-medium text-zinc-500 text-sm">Star player streak</p>
      <p class="font-display font-bold text-white text-6xl">
        {{ player.currentStarPlayerStreak ?? 0 }}
      </p>
      <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
        <div class="text-pink-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z"
            />
          </svg>
        </div>

        <p class="text-zinc-500 text-sm">
          <span class="text-white"> {{ player.bestStarPlayerStreak }} </span>
          best star player streak
        </p>
      </div>
    </div>
  </BoxGray>
</template>
