<script setup>
import { h, resolveComponent } from 'vue'

const tab = ref('daily')

const attendanceData = [
  { id: 'EMP-001', name: 'James Anderson', department: 'Engineering', checkIn: '08:55 AM', checkOut: '06:10 PM', status: 'present', hours: '9h 15m' },
  { id: 'EMP-002', name: 'Maria Garcia', department: 'Marketing', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'late', hours: '8h 30m' },
  { id: 'EMP-003', name: 'David Kim', department: 'Engineering', checkIn: '08:45 AM', checkOut: '05:45 PM', status: 'present', hours: '9h 00m' },
  { id: 'EMP-004', name: 'Sophie Turner', department: 'Design', checkIn: '--', checkOut: '--', status: 'absent', hours: '0h' },
  { id: 'EMP-005', name: 'Alex Johnson', department: 'Sales', checkIn: '09:00 AM', checkOut: '01:00 PM', status: 'half-day', hours: '4h 00m' },
  { id: 'EMP-006', name: 'Emily Chen', department: 'Design', checkIn: '08:50 AM', checkOut: '06:05 PM', status: 'present', hours: '9h 15m' },
  { id: 'EMP-007', name: 'Robert Lee', department: 'Engineering', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'late', hours: '9h 15m' },
  { id: 'EMP-008', name: 'Michael Brown', department: 'HR', checkIn: '08:58 AM', checkOut: '05:50 PM', status: 'present', hours: '8h 52m' }
]

const deptStats = [
  { name: 'Engineering', present: 62, total: 68, rate: 91 },
  { name: 'Marketing', present: 30, total: 34, rate: 88 },
  { name: 'Sales', present: 39, total: 42, rate: 93 },
  { name: 'HR', present: 16, total: 18, rate: 89 },
  { name: 'Design', present: 20, total: 24, rate: 83 },
  { name: 'Finance', present: 21, total: 22, rate: 95 }
]

const summaryStats = [
  { label: 'Present', value: '212', icon: 'i-lucide-user-check', color: 'success' },
  { label: 'Late', value: '14', icon: 'i-lucide-clock', color: 'warning' },
  { label: 'Absent', value: '10', icon: 'i-lucide-user-x', color: 'error' },
  { label: 'Half Day', value: '12', icon: 'i-lucide-timer', color: 'info' }
]

const UBadge = resolveComponent('UBadge')
const UAvatar = resolveComponent('UAvatar')

const columns = [
  {
    accessorKey: 'name',
    header: 'Employee',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, { alt: row.original.name, size: 'sm' }),
        h('div', {}, [
          h('p', { class: 'text-sm font-medium' }, row.original.name),
          h('p', { class: 'text-xs text-(--ui-text-muted)' }, row.original.department)
        ])
      ])
    }
  },
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'checkIn', header: 'Check In' },
  { accessorKey: 'checkOut', header: 'Check Out' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const colorMap = {
        present: 'success', late: 'warning', absent: 'error', 'half-day': 'info'
      }
      return h(UBadge, {
        color: colorMap[row.original.status] || 'neutral',
        variant: 'subtle',
        size: 'xs',
        class: 'capitalize'
      }, () => row.original.status.replace('-', ' '))
    }
  },
  { accessorKey: 'hours', header: 'Hours' }
]

const items = [
  { label: 'Daily Log', value: 'daily' },
  { label: 'Department Overview', value: 'department' }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Summary cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <UCard v-for="stat in summaryStats" :key="stat.label">
        <div class="flex items-center gap-3">
          <div class="flex items-center justify-center size-10 rounded-lg bg-primary-50 dark:bg-primary-950">
            <UIcon :name="stat.icon" class="size-5 text-primary-500" />
          </div>
          <div>
            <p class="text-xs text-(--ui-text-muted)">{{ stat.label }}</p>
            <p class="text-xl font-bold text-(--ui-text-highlighted)">{{ stat.value }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Tabs -->
    <UTabs v-model="tab" :items="items" class="w-full">
      <template #content="{ item }">
        <!-- Daily Log -->
        <UCard v-if="item.value === 'daily'" class="mt-4" :ui="{ body: 'p-0' }">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-(--ui-text-highlighted)">Today's Attendance</h3>
              <UBadge variant="subtle" color="neutral" size="xs">Feb 23, 2026</UBadge>
            </div>
          </template>
          <UTable :data="attendanceData" :columns="columns" />
        </UCard>

        <!-- Department overview -->
        <UCard v-if="item.value === 'department'" class="mt-4">
          <template #header>
            <h3 class="font-semibold text-(--ui-text-highlighted)">Department Attendance Rate</h3>
          </template>
          <div class="flex flex-col gap-4">
            <div v-for="dept in deptStats" :key="dept.name" class="flex items-center gap-4">
              <span class="text-sm w-28 shrink-0 text-(--ui-text-muted)">{{ dept.name }}</span>
              <UProgress
                :model-value="dept.rate"
                :color="dept.rate >= 90 ? 'success' : dept.rate >= 80 ? 'warning' : 'error'"
                size="sm"
                class="flex-1"
              />
              <span class="text-sm font-medium w-20 text-right">{{ dept.present }}/{{ dept.total }} ({{ dept.rate }}%)</span>
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
