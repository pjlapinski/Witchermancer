import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const isAuthenticated: Ref<boolean> = ref(false)

  return { isAuthenticated }
})
