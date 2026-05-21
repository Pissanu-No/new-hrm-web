<template>
  <AppModal :model-value="modelValue" :title="title" :description="description">
    <template #footer>
      <AppButton variant="secondary" @click="$emit('update:modelValue', false)">Cancel</AppButton>
      <AppButton :variant="variant" :loading="loading" @click="$emit('confirm')">{{ confirmText }}</AppButton>
    </template>
  </AppModal>
</template>

<script setup>
import AppButton from '@/components/common/AppButton.vue'
import AppModal from '@/components/common/AppModal.vue'

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm action' },
  description: { type: String, default: 'Please confirm before continuing.' },
  confirmText: { type: String, default: 'Confirm' },
  variant: { type: String, default: 'danger' },
  loading: { type: Boolean, default: false }
})

defineEmits(['update:modelValue', 'confirm'])
</script>
