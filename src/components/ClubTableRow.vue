<script setup lang="ts">
import { defineProps, ref } from "vue";

const props = defineProps(["member", "icons"]);
const defaultImageUrl = "https://placekitten.com/400/400";
const icon = ref(
  props.icons.player[props.member.icon.id]?.imageUrl || defaultImageUrl,
);
</script>

<template>
  <tr
    class="bg-zinc-800 border-b border-zinc-900 group hover:bg-zinc-700 transition"
  >
    <th scope="row" class="p-3 w-20">
      <img :src="icon" alt="icon" srcset="" class="w-full aspect-square" />
    </th>
    <td class="p-3">{{ member.name }}</td>
    <td class="p-3 text-zinc-500">{{ member.tag }}</td>
    <td class="p-3">
      <span
        class="bg-orange-400 text-zinc-900 font-medium me-2 px-2.5 py-0.5 rounded"
        >{{ member.role }}</span
      >
    </td>
    <td class="p-3">{{ member.trophies }}</td>
  </tr>
</template>
