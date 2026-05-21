<template>
  <div class="flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-slate-500">
    <div class="flex items-center gap-3">
      <span class="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      <span class="text-sm font-medium">{{ text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: { type: String, default: 'Loading data...' }
})
</script>
