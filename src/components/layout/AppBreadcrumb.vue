<template>
  <nav class="flex items-center gap-2 text-sm text-slate-500">
    <RouterLink to="/dashboard" class="font-medium text-slate-600 hover:text-indigo-700">Home</RouterLink>
    <ChevronRight class="h-4 w-4" />
    <span class="font-semibold text-slate-900">{{ title }}</span>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const title = computed(() => route.meta.title || 'Workspace')
</script>
