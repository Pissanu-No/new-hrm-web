<template>
  <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <div class="flex min-w-0 items-center gap-3">
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Open sidebar"
          @click="appStore.openSidebar"
        >
          <Menu class="h-5 w-5" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="grid h-10 w-10 place-items-center rounded border border-slate-200 text-slate-600 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell class="h-4 w-4" />
        </button>
        <div class="hidden items-center gap-3 rounded border border-slate-200 bg-slate-50 px-3 py-2 sm:flex">
          <div class="grid h-8 w-8 place-items-center rounded bg-slate-800 text-xs font-semibold text-white">
            AD
          </div>
          <div>
            <p class="text-sm font-medium text-slate-900">Admin User</p>
            <p class="text-xs text-slate-500">HR Administrator</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { Bell, Menu } from 'lucide-vue-next'
import { useAppStore } from '@/stores/appStore'

const appStore = useAppStore()
</script>
