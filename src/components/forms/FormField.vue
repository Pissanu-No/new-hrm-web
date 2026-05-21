<template>
  <label class="block">
    <span class="text-sm font-medium text-slate-700">{{ label }}</span>
    <span v-if="required" class="ml-1 text-rose-600">*</span>
    <div class="mt-1">
      <slot />
    </div>
    <span v-if="hint && !error" class="mt-1 block text-xs text-slate-500">{{ hint }}</span>
    <span v-if="error" class="mt-1 block text-xs text-rose-600">{{ error }}</span>
  </label>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

