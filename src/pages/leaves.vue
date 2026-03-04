<script setup>
import { h, resolveComponent } from 'vue'

const toast = useToast()

const balances = [
  { type: 'Annual Leave', used: 8, total: 20, color: 'primary' },
  { type: 'Sick Leave', used: 3, total: 10, color: 'warning' },
  { type: 'Personal Leave', used: 1, total: 5, color: 'info' },
  { type: 'Comp Off', used: 0, total: 3, color: 'success' }
]

const requests = ref([
  { id: 'LR-001', name: 'Emily Chen', department: 'Design', type: 'Vacation', from: 'Mar 10', to: 'Mar 12', days: 3, status: 'pending', reason: 'Family vacation' },
  { id: 'LR-002', name: 'Robert Lee', department: 'Engineering', type: 'Sick Leave', from: 'Mar 11', to: 'Mar 11', days: 1, status: 'pending', reason: 'Not feeling well' },
  { id: 'LR-003', name: 'Anna White', department: 'Marketing', type: 'Personal', from: 'Mar 14', to: 'Mar 18', days: 5, status: 'pending', reason: 'Personal matters' },
  { id: 'LR-004', name: 'James Anderson', department: 'Engineering', type: 'Vacation', from: 'Mar 5', to: 'Mar 7', days: 3, status: 'approved', reason: 'Holiday trip' },
  { id: 'LR-005', name: 'Maria Garcia', department: 'Marketing', type: 'Sick Leave', from: 'Feb 28', to: 'Feb 28', days: 1, status: 'approved', reason: 'Doctor appointment' },
  { id: 'LR-006', name: 'David Kim', department: 'Engineering', type: 'Personal', from: 'Mar 1', to: 'Mar 1', days: 1, status: 'rejected', reason: 'Deadline week' }
])

const statusFilter = ref('all')

const filtered = computed(() => {
  if (statusFilter.value === 'all') return requests.value
  return requests.value.filter(r => r.status === statusFilter.value)
})

function approveLeave(id) {
  const req = requests.value.find(r => r.id === id)
  if (req) {
    req.status = 'approved'
    toast.add({ title: `${req.name}'s leave approved`, color: 'success', icon: 'i-lucide-check-circle' })
  }
}

function rejectLeave(id) {
  const req = requests.value.find(r => r.id === id)
  if (req) {
    req.status = 'rejected'
    toast.add({ title: `${req.name}'s leave rejected`, color: 'error', icon: 'i-lucide-x-circle' })
  }
}

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
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
  { accessorKey: 'type', header: 'Type' },
  {
    id: 'dates',
    header: 'Dates',
    cell: ({ row }) => `${row.original.from} - ${row.original.to}`
  },
  { accessorKey: 'days', header: 'Days' },
  { accessorKey: 'reason', header: 'Reason' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const colorMap = {
        pending: 'warning', approved: 'success', rejected: 'error'
      }
      return h(UBadge, {
        color: colorMap[row.original.status],
        variant: 'subtle',
        size: 'xs',
        class: 'capitalize'
      }, () => row.original.status)
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      if (row.original.status !== 'pending') return null
      return h('div', { class: 'flex gap-1' }, [
        h(UButton, {
          icon: 'i-lucide-check',
          size: 'xs',
          color: 'success',
          variant: 'soft',
          onClick: () => approveLeave(row.original.id)
        }),
        h(UButton, {
          icon: 'i-lucide-x',
          size: 'xs',
          color: 'error',
          variant: 'soft',
          onClick: () => rejectLeave(row.original.id)
        })
      ])
    }
  }
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Leave balances -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="b in balances" :key="b.type">
        <div class="flex flex-col gap-2">
          <p class="text-sm font-medium text-(--ui-text-highlighted)">{{ b.type }}</p>
          <div class="flex items-end justify-between">
            <p class="text-2xl font-bold text-(--ui-text-highlighted)">{{ b.total - b.used }}</p>
            <p class="text-xs text-(--ui-text-muted)">{{ b.used }}/{{ b.total }} used</p>
          </div>
          <UProgress :model-value="(b.used / b.total) * 100" :color="b.color" size="xs" />
        </div>
      </UCard>
    </div>

    <!-- Filter -->
    <div class="flex items-center justify-between">
      <USelectMenu
        v-model="statusFilter"
        :items="[
          { label: 'All Requests', value: 'all' },
          { label: 'Pending', value: 'pending' },
          { label: 'Approved', value: 'approved' },
          { label: 'Rejected', value: 'rejected' }
        ]"
        value-key="value"
        size="sm"
        class="w-48"
      />
      <UBadge variant="subtle" color="warning" size="sm">
        {{ requests.filter(r => r.status === 'pending').length }} Pending
      </UBadge>
    </div>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable :data="filtered" :columns="columns" />
    </UCard>
  </div>
</template>
