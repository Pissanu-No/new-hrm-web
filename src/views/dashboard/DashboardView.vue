<template>
  <div class="space-y-6">
    <AppPageHeader
      eyebrow="HR Workspace"
      title="Dashboard"
      description="A clear operational view for people data, organization structure, and HR actions."
    />

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <AppCard v-for="metric in metrics" :key="metric.label">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm font-medium text-slate-500">{{ metric.label }}</p>
            <p class="mt-2 text-3xl font-bold text-slate-950">{{ metric.value }}</p>
          </div>
          <div :class="['rounded-2xl p-3', metric.tone]">
            <component :is="metric.icon" class="h-5 w-5" />
          </div>
        </div>
      </AppCard>
    </section>

    <section class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <AppCard title="Workforce Snapshot" description="Employee distribution and movement indicators.">
        <div class="space-y-4">
          <div v-for="item in distribution" :key="item.label">
            <div class="mb-2 flex justify-between text-sm">
              <span class="font-medium text-slate-700">{{ item.label }}</span>
              <span class="text-slate-500">{{ item.value }}%</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100">
              <div class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" :style="{ width: `${item.value}%` }" />
            </div>
          </div>
        </div>
      </AppCard>

      <AppCard title="Quick Actions" description="Common HR admin tasks.">
        <div class="grid gap-3">
          <RouterLink
            v-for="action in actions"
            :key="action.label"
            :to="action.to"
            class="flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <span>
              <span class="block text-sm font-semibold text-slate-950">{{ action.label }}</span>
              <span class="text-xs text-slate-500">{{ action.description }}</span>
            </span>
            <ArrowRight class="h-4 w-4 text-slate-400" />
          </RouterLink>
        </div>
      </AppCard>
    </section>
  </div>
</template>

<script setup>
import { ArrowRight, BriefcaseBusiness, Building2, Clock3, Users } from 'lucide-vue-next'
import AppCard from '@/components/common/AppCard.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'

const metrics = [
  { label: 'Total employees', value: '1,248', icon: Users, tone: 'bg-blue-50 text-blue-700' },
  { label: 'Active employees', value: '1,189', icon: Users, tone: 'bg-emerald-50 text-emerald-700' },
  { label: 'Departments', value: '32', icon: Building2, tone: 'bg-indigo-50 text-indigo-700' },
  { label: 'Positions', value: '116', icon: BriefcaseBusiness, tone: 'bg-cyan-50 text-cyan-700' },
  { label: 'New hires this month', value: '18', icon: Clock3, tone: 'bg-amber-50 text-amber-700' },
  { label: 'Pending HR actions', value: '7', icon: Clock3, tone: 'bg-red-50 text-red-700' }
]

const distribution = [
  { label: 'Corporate Services', value: 72 },
  { label: 'Operations', value: 58 },
  { label: 'Technology', value: 46 },
  { label: 'Sales', value: 38 }
]

const actions = [
  { label: 'Add employee', description: 'Create a new employee profile', to: '/employees/create' },
  { label: 'Manage departments', description: 'Maintain organization structure', to: '/organization/departments' },
  { label: 'Manage positions', description: 'Review role catalog', to: '/organization/positions' },
  { label: 'Review employee profiles', description: 'Open the employee directory', to: '/employees' }
]
</script>
