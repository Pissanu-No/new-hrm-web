<template>
  <section class="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div v-if="$slots.header || title" class="border-b border-slate-100 px-5 py-4">
      <slot name="header">
        <h2 class="text-base font-semibold text-slate-950">{{ title }}</h2>
        <p v-if="description" class="mt-1 text-sm text-slate-500">{{ description }}</p>
      </slot>
    </div>
    <div :class="bodyClass">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  bodyClass: { type: String, default: 'p-5' }
})
</script>
