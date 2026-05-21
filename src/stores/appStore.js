import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarOpen: false,
    globalLoading: false
  }),
  actions: {
    openSidebar() {
      this.sidebarOpen = true
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    setGlobalLoading(value) {
      this.globalLoading = value
    }
  }
})
