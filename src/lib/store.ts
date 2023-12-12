// store.js
import { ref } from 'vue'
import { createGlobalState } from '@vueuse/core'

export const globalStateAvgWinRate = createGlobalState((value) => {
  const avgWinRate = ref(value)
  return { avgWinRate }
})
