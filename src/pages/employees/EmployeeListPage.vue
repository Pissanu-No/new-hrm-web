<template>
  <div>
    <PageHeader
      title="Employee List"
      description="Browse employee master records and open individual profiles."
    >
      <template #actions>
        <RouterLink
          to="/employees/new"
          class="inline-flex items-center gap-2 rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900"
        >
          <UserPlus class="h-4 w-4" />
          New Employee
        </RouterLink>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :rows="items" :loading="loading" id-key="employeeId">
      <template #toolbar>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            v-model="filters.search"
            type="search"
            class="w-full rounded border border-slate-300 px-3 py-2 text-sm sm:max-w-sm"
            placeholder="Search employees"
          />
          <button class="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700" @click="loadEmployees">
            Refresh
          </button>
        </div>
      </template>
      <template #cell-fullName="{ row }">
        {{ getFullName(row) }}
      </template>
      <template #cell-employeeStatus="{ value }">
        <StatusBadge :status="value === 'ACTIVE' || value === 'active' ? 'active' : 'neutral'" :label="value || 'Unknown'" />
      </template>
      <template #actions="{ row }">
        <RouterLink :to="`/employees/${row.employeeId || row.id}`" class="text-sm font-medium text-brand-700 hover:text-brand-900">
          View
        </RouterLink>
      </template>
    </DataTable>

    <p v-if="error" class="mt-4 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ error.message }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { UserPlus } from 'lucide-vue-next'
import DataTable from '@/components/ui/DataTable.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const columns = [
  { key: 'employeeCode', label: 'Employee Code' },
  { key: 'fullName', label: 'Name' },
  { key: 'workEmail', label: 'Work Email' },
  { key: 'mobilePhone', label: 'Mobile Phone' },
  { key: 'employeeStatus', label: 'Status' }
]

const filters = reactive({ search: '' })
const employeeStore = useEmployeeStore()
const { items, loading, error } = storeToRefs(employeeStore)

async function loadEmployees() {
  try {
    await employeeStore.fetchEmployees({ search: filters.search || undefined })
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadEmployees)

function getFullName(employee) {
  return [employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' ')
}
</script>
