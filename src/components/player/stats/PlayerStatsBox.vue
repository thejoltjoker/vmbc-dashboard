<script setup lang="ts">
import BoxGray from '@/components/boxes/BoxGray.vue'
</script>

<template>
  <BoxGray>
    <article class="p-3 md:p-5 flex flex-col gap-3 justify-between h-full">
      <h4 class="uppercase font-medium text-zinc-500 text-sm">
        <slot name="title">Default title</slot>
      </h4>

      <div class="font-display uppercase font-bold text-white text-6xl">
        <slot name="content"></slot>
      </div>

      <div class="inline-flex gap-2 border-t-[1px] pt-2 border-zinc-100/10">
        <div>
          <slot name="svg"></slot>
        </div>

        <p class="text-zinc-500 text-sm">
          <slot name="subtitle">Default subtitle</slot>
        </p>
      </div>
    </article>
  </BoxGray>
</template>
