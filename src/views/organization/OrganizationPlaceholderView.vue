<template>
  <div class="space-y-6">
    <AppPageHeader
      eyebrow="Organization"
      :title="title"
      :description="description"
    />

    <AppCard title="Module preparation" :description="cardDescription">
      <div class="grid gap-4 md:grid-cols-3">
        <div v-for="item in items" :key="item.label" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p class="text-sm font-semibold text-slate-950">{{ item.label }}</p>
          <p class="mt-1 text-sm text-slate-500">{{ item.description }}</p>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppCard from '@/components/common/AppCard.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'

const route = useRoute()
const title = computed(() => route.meta.title || 'Organization Management')
const description = computed(() => route.meta.description || 'Manage organization relationships and employee placement.')
const cardDescription = computed(() => route.meta.cardDescription || 'This area is ready for the backend API contract.')
const items = computed(() => route.meta.items || [])
</script>
