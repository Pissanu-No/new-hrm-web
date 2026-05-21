<template>
  <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-sm font-medium text-slate-500">{{ label }}</p>
        <p class="mt-2 text-3xl font-semibold text-slate-950">{{ value }}</p>
      </div>
      <div class="grid h-10 w-10 place-items-center rounded bg-slate-100 text-brand-700">
        <component :is="icon" v-if="icon" class="h-5 w-5" />
      </div>
    </div>
    <p v-if="hint" class="mt-4 text-sm text-slate-500">{{ hint }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    default: null
  }
})
</script>

