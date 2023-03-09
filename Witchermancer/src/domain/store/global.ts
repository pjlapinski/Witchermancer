import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', () => {
  const isSidebarOpen: Ref<boolean> = ref(false)
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  return { isSidebarOpen, toggleSidebar }
})
