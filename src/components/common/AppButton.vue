<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition',
      'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
      variantClass,
      sizeClass,
      (disabled || loading) ? 'cursor-not-allowed opacity-60' : ''
    ]"
  >
    <component :is="icon" v-if="icon" class="h-4 w-4" />
    <span v-if="loading">Processing...</span>
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
  size: { type: String, default: 'md' },
  icon: { type: [Object, Function], default: null },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700',
  secondary: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700',
  ghost: 'text-slate-600 hover:bg-slate-100',
  soft: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
}

const variantClass = computed(() => variants[props.variant] || variants.primary)
const sizeClass = computed(() => sizes[props.size] || sizes.md)
</script>
