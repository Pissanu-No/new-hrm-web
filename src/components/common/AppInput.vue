<template>
  <label class="block">
    <span v-if="label" class="mb-1.5 block text-sm font-medium text-slate-700">{{ label }}</span>
    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'w-full rounded-2xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition',
        'placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100',
        error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200',
        disabled ? 'cursor-not-allowed bg-slate-50 text-slate-500' : ''
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <span v-if="helper && !error" class="mt-1.5 block text-xs text-slate-500">{{ helper }}</span>
    <span v-if="error" class="mt-1.5 block text-xs font-medium text-red-600">{{ error }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  helper: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

defineEmits(['update:modelValue'])
</script>
