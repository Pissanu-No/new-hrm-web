<template>
  <header class="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
    <button
      type="button"
      class="rounded-2xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      @click="appStore.toggleSidebar"
    >
      <Menu class="h-5 w-5" />
    </button>

    <div class="hidden min-w-0 flex-1 md:block">
      <label class="relative block max-w-md">
        <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search employee, organization, or action"
          class="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
        />
      </label>
    </div>

    <div class="ml-auto flex items-center gap-3">
      <button type="button" class="rounded-2xl p-2 text-slate-500 hover:bg-slate-100">
        <Bell class="h-5 w-5" />
      </button>
      <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {{ initials }}
        </div>
        <div class="hidden sm:block">
          <p class="text-sm font-semibold text-slate-950">{{ authStore.displayName }}</p>
          <p class="text-xs text-slate-500">{{ authStore.workspaceName }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { Bell, Menu, Search } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'
import { useAuthStore } from '@/stores/authStore'

const appStore = useAppStore()
const authStore = useAuthStore()

const initials = computed(() => {
  return authStore.displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
})

onMounted(() => {
  authStore.fetchUserProfile(true)
})
</script>
