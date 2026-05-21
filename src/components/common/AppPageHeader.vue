<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-wide text-indigo-600">{{ eyebrow }}</p>
      <h1 class="mt-1 text-2xl font-bold text-slate-950">{{ title }}</h1>
      <p v-if="description" class="mt-2 max-w-3xl text-sm text-slate-500">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="flex flex-wrap gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>
