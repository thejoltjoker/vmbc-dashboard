<script setup lang="ts">
import ClubTableRow from "./components/ClubTableRow.vue";
</script>

<template>
  <h1
    class="font-display text-white text-7xl font-black uppercase text-center m-4"
  >
    Vacay Mania Brawl Club
  </h1>
  <div class="max-w-screen-lg mx-auto text-white">
    <div class="relative overflow-x-auto rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right bg-zinc-700">
        <thead class="text-xs uppercase bg-zinc-700">
          <tr>
            <th scope="col" class="p-3">Icon</th>
            <th scope="col" class="p-3">Name</th>
            <th scope="col" class="p-3">Tag</th>
            <th scope="col" class="p-3">Role</th>
            <th scope="col" class="p-3">Trophies</th>
          </tr>
        </thead>
        <tbody>
          <ClubTableRow
            v-for="member in members"
            :key="member.tag"
            :member="member"
            :icons="icons"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Club from "./models/Club";
import ClubMember from "./models/ClubMember";

export default {
  data() {
    return {
      members: [] as ClubMember[],
      icons: {},
    };
  },
  created() {
    this.fetchData();
    this.fetchIcons();
  },
  methods: {
    async fetchIcons() {
      try {
        const response = await axios.get("http://localhost:7071/api/icons");
        this.icons = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async fetchData() {
      try {
        const response = await axios.get("http://localhost:7071/api/club");
        const club: Club = response.data;
        this.members = club.members;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  components: { ClubTableRow },
};
</script>
