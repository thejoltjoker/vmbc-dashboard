<script setup lang="ts">
import BoxRed from '@/components/boxes/BoxRed.vue'
defineProps(['warningMembers'])
</script>

<template>
  <BoxRed>
    <div class="p-5 flex flex-col gap-3 justify-between h-full">
      <p class="uppercase font-medium text-red-900 text-sm">Danger zone</p>
      <p
        v-for="warningMember in warningMembers"
        :key="warningMember.tag + 'warning'"
        class="font-display font-bold text-red-950 text-4xl"
      >
        {{ warningMember.name }}
      </p>
      <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-900/10">
        <div class="text-red-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-5 h-5"
          >
            <path
              fill-rule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <p class="text-red-900 text-sm">
          <span class="text-white">{{ warningMembers.length }} players</span>
          will be kicked at next kick fiesta. <br />
          Play <span class="font-bold">Mega Pig</span> to avoid getting kicked.
        </p>
      </div>
    </div>
  </BoxRed>
</template>
