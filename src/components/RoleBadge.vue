<script setup lang="ts">
import { camelCaseToTitleCase } from "../lib/utility";
defineProps<{
  role: any;
}>();

const getRoleClass = (role: any) => {
  let classList = "text-zinc-900 px-2.5 py-0.5 rounded-full";
  switch (role) {
    case "member":
      return classList + " bg-zinc-500";
    case "senior":
      return classList + " bg-amber-500";
    case "vicePresident":
      return classList + " bg-pink-500";
    case "president":
      return classList + " bg-sky-500";

    default:
      return classList + " bg-zinc-300";
  }
};
</script>

<template>
  <span :class="getRoleClass(role)">{{ camelCaseToTitleCase(role) }}</span>
</template>
