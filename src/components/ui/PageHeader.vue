<template>
  <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <p v-if="eyebrow" class="text-sm font-medium text-brand-700">{{ eyebrow }}</p>
      <h2 class="text-2xl font-semibold text-slate-950">{{ title }}</h2>
      <p v-if="description" class="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  }
})
</script>

