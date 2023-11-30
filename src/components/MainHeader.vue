<script setup lang="ts">
defineProps<{
  clubIcon: string;
  club: {
    tag: string;
    name: string;
    description: string;
    trophies: number;
    requiredTrophies: number;
    members: {
      icon: any;
      tag: string;
      name: string;
      trophies: number;
      role:
        | "member"
        | "unknown"
        | "notMember"
        | "president"
        | "senior"
        | "vicePresident";
      nameColor: string;
    }[];
    type: "unknown" | "open" | "inviteOnly" | "closed";
    badgeId: number;
  };
}>();
</script>

<template>
  <header class="mt-6 mb-16 text-center">
    <img :src="clubIcon" alt="Club Badge" class="w-40 mx-auto mb-3" />

    <h1 class="font-display text-white text-7xl font-black uppercase">
      Vacay Mania Brawl Club
    </h1>
    <p class="text-white text-xl">
      {{ club.description }}
    </p>
  </header>
</template>
