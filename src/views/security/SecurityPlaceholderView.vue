<template>
  <div class="space-y-6">
    <AppPageHeader :title="title" eyebrow="Security" :description="description" />
    <AppEmptyState
      title="Security management placeholder"
      description="User, role, and permission administration will connect to the security backend when the API is ready."
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'

const route = useRoute()
const title = computed(() => route.meta.title || 'Security')
const description = computed(() => `Manage ${title.value.toLowerCase()} for enterprise access control.`)
</script>
