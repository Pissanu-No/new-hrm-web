<template>
  <div class="overflow-x-auto">
    <div class="flex min-w-max gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        :class="[
          'rounded-xl px-4 py-2 text-sm font-semibold transition',
          modelValue === tab.value
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
        ]"
        @click="$emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, required: true },
  tabs: { type: Array, default: () => [] }
})

defineEmits(['update:modelValue'])
</script>
