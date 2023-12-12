<!-- <script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref(null)
const error = ref(null)

const fetchData = () => {
  error.value = data.value = null
  loading.value = true

  // replace `getPost` with your data fetching util / API wrapper
  getPost(route.params.id, (err, post) => {
    loading.value = false
    if (err) {
      error.value = err.toString()
    } else {
      post.value = post
    }
  })
}
</script>

<template>
  <div class="parent">
    <div v-if="loading" class="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="data" class="content">
      <h2>{{ data.title }}</h2>
      <p>{{ data.body }}</p>
    </div>
  </div>
</template> -->
