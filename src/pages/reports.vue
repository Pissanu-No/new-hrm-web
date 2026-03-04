<script setup>
const reports = [
  { title: 'Headcount Report', description: 'Total employees by department, location and employment type.', icon: 'i-lucide-users', category: 'People' },
  { title: 'Payroll Summary', description: 'Monthly payroll breakdown including bonuses and deductions.', icon: 'i-lucide-dollar-sign', category: 'Finance' },
  { title: 'Attendance Report', description: 'Daily, weekly and monthly attendance trends and patterns.', icon: 'i-lucide-calendar-check', category: 'Time' },
  { title: 'Leave Analysis', description: 'Leave utilization rates, patterns and balance forecasts.', icon: 'i-lucide-calendar-off', category: 'Time' },
  { title: 'Turnover Report', description: 'Employee turnover rates, exit reasons and retention metrics.', icon: 'i-lucide-trending-down', category: 'People' },
  { title: 'Department Performance', description: 'Department-level KPIs, budget utilization and growth.', icon: 'i-lucide-bar-chart-3', category: 'Performance' }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="text-sm text-(--ui-text-muted)">Generate and export HR reports for your organization.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <UCard v-for="report in reports" :key="report.title">
        <div class="flex flex-col gap-4">
          <div class="flex items-start gap-3">
            <div class="flex items-center justify-center size-10 rounded-lg bg-primary-50 dark:bg-primary-950 shrink-0">
              <UIcon :name="report.icon" class="size-5 text-primary-500" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">{{ report.title }}</h3>
                <UBadge variant="subtle" color="neutral" size="xs">{{ report.category }}</UBadge>
              </div>
              <p class="text-xs text-(--ui-text-muted)">{{ report.description }}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <UButton label="Generate" size="xs" variant="soft" icon="i-lucide-file-text" />
            <UButton label="Export CSV" size="xs" variant="outline" color="neutral" icon="i-lucide-download" />
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
