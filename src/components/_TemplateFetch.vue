<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// Define a reactive variable to store the fetched data
const data = ref([]);

// Define a function to fetch data from the API
const fetchData = async () => {
  try {
    const url = "";
    const response = await axios.get(url);
    data.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Use the onMounted lifecycle hook to fetch data when the component is mounted
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>
