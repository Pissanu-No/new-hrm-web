<template>
  <span class="inline-flex items-center rounded px-2 py-1 text-xs font-medium" :class="classes">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: 'neutral'
  },
  label: {
    type: String,
    default: ''
  }
})

const classes = computed(() => {
  const variants = {
    active: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    inactive: 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
    draft: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
    neutral: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
  }

  return variants[props.status] || variants.neutral
})
</script>

