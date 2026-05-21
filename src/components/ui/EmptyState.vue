<template>
  <div class="rounded border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
    <div class="mx-auto grid h-12 w-12 place-items-center rounded bg-slate-100 text-slate-500">
      <component :is="icon" v-if="icon" class="h-6 w-6" />
    </div>
    <h3 class="mt-4 text-sm font-semibold text-slate-950">{{ title }}</h3>
    <p v-if="description" class="mx-auto mt-2 max-w-md text-sm text-slate-500">
      {{ description }}
    </p>
    <div v-if="$slots.actions" class="mt-5 flex justify-center">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: [Object, Function],
    default: null
  }
})
</script>

