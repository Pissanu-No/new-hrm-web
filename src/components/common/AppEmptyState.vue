<template>
  <div class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
    <component :is="icon" v-if="icon" class="mx-auto h-10 w-10 text-slate-400" />
    <h3 class="mt-3 text-base font-semibold text-slate-950">{{ title }}</h3>
    <p class="mx-auto mt-1 max-w-md text-sm text-slate-500">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'No data found' },
  description: { type: String, default: 'There is nothing to display yet.' },
  icon: { type: [Object, Function], default: null }
})
</script>
