<script setup>
import { h, resolveComponent } from 'vue'

const stats = [
  { label: 'Total Payroll', value: '$486,200', change: '+3.2%', icon: 'i-lucide-dollar-sign' },
  { label: 'Avg. Salary', value: '$62,400', change: '+1.8%', icon: 'i-lucide-trending-up' },
  { label: 'Bonuses Paid', value: '$24,800', change: '+12%', icon: 'i-lucide-gift' },
  { label: 'Deductions', value: '$38,900', change: '-2.1%', icon: 'i-lucide-receipt' }
]

const payrollData = [
  { department: 'Engineering', employees: 68, baseSalary: '$198,500', bonuses: '$12,400', deductions: '$18,200', netPay: '$192,700' },
  { department: 'Marketing', employees: 34, baseSalary: '$72,800', bonuses: '$4,200', deductions: '$6,800', netPay: '$70,200' },
  { department: 'Sales', employees: 42, baseSalary: '$94,600', bonuses: '$8,600', deductions: '$7,400', netPay: '$95,800' },
  { department: 'HR', employees: 18, baseSalary: '$38,200', bonuses: '$1,800', deductions: '$3,200', netPay: '$36,800' },
  { department: 'Design', employees: 24, baseSalary: '$52,400', bonuses: '$3,600', deductions: '$4,800', netPay: '$51,200' },
  { department: 'Finance', employees: 22, baseSalary: '$48,600', bonuses: '$2,200', deductions: '$4,100', netPay: '$46,700' }
]

const UBadge = resolveComponent('UBadge')

const columns = [
  { accessorKey: 'department', header: 'Department' },
  {
    accessorKey: 'employees',
    header: 'Employees',
    cell: ({ row }) => h(UBadge, { variant: 'subtle', color: 'neutral', size: 'xs' }, () => row.original.employees)
  },
  { accessorKey: 'baseSalary', header: 'Base Salary', meta: { class: { td: 'font-medium' } } },
  { accessorKey: 'bonuses', header: 'Bonuses', meta: { class: { td: 'text-green-600 dark:text-green-400' } } },
  { accessorKey: 'deductions', header: 'Deductions', meta: { class: { td: 'text-red-500' } } },
  { accessorKey: 'netPay', header: 'Net Pay', meta: { class: { td: 'font-bold' } } }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-10 rounded-lg bg-primary-50 dark:bg-primary-950">
            <UIcon :name="stat.icon" class="size-5 text-primary-500" />
          </div>
          <div>
            <p class="text-xs text-(--ui-text-muted)">{{ stat.label }}</p>
            <p class="text-lg font-bold text-(--ui-text-highlighted)">{{ stat.value }}</p>
            <UBadge :color="stat.change.startsWith('+') ? 'success' : 'error'" variant="subtle" size="xs">
              {{ stat.change }}
            </UBadge>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-(--ui-text-highlighted)">Payroll by Department</h3>
          <UButton label="Export" icon="i-lucide-download" variant="outline" color="neutral" size="xs" />
        </div>
      </template>
      <UTable :data="payrollData" :columns="columns" />
    </UCard>
  </div>
</template>
