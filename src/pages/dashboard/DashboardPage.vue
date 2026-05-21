<template>
  <div>
    <PageHeader
      title="Dashboard"
      description="Operational overview for workforce, organization structure, and access readiness."
    />

    <section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Employees" value="-" hint="Connects to employee summary API" :icon="Users" />
      <MetricCard label="Companies" value="-" hint="Connects to company summary API" :icon="Building2" />
      <MetricCard label="Departments" value="-" hint="Connects to department summary API" :icon="Network" />
      <MetricCard label="Positions" value="-" hint="Connects to position summary API" :icon="BriefcaseBusiness" />
    </section>

    <section class="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Workforce Activity</h3>
            <p class="mt-1 text-sm text-slate-500">Prepared for attendance, movement, and profile events.</p>
          </div>
          <StatusBadge status="draft" label="API pending" />
        </div>
        <div class="mt-6 grid h-64 place-items-center rounded border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
          Analytics module placeholder
        </div>
      </div>

      <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
        <h3 class="text-base font-semibold text-slate-950">Phase 1 Readiness</h3>
        <div class="mt-4 space-y-3">
          <div v-for="item in readiness" :key="item" class="flex items-center gap-3 text-sm text-slate-700">
            <CheckCircle2 class="h-4 w-4 text-emerald-600" />
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { BriefcaseBusiness, Building2, CheckCircle2, Network, Users } from 'lucide-vue-next'
import MetricCard from '@/components/ui/MetricCard.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'

const readiness = [
  'Layout-based routing',
  'Route meta for title and permission',
  'Axios service contracts',
  'Reusable list and form patterns'
]
</script>

