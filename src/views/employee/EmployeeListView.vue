<template>
  <div class="space-y-6">
    <AppPageHeader
      eyebrow="Employees"
      title="Employee Directory"
      description="Search, filter, and open employee profiles without exposing sensitive personal data."
    >
      <template #actions>
        <RouterLink to="/employees/create">
          <AppButton :icon="Plus">Create employee</AppButton>
        </RouterLink>
      </template>
    </AppPageHeader>

    <AppCard>
      <div class="grid gap-3 md:grid-cols-[1fr_220px_auto]">
        <AppInput v-model="search" placeholder="Search by code, name, email, or phone" />
        <AppSelect v-model="status" placeholder="All statuses" :options="statusOptions" />
        <AppButton variant="secondary" :icon="RefreshCcw" @click="load">Refresh</AppButton>
      </div>
    </AppCard>

    <AppLoading v-if="employeeStore.loading" />
    <div v-else-if="employeeStore.error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
      {{ employeeStore.error }}
      <AppButton class="mt-3" variant="secondary" size="sm" @click="load">Retry</AppButton>
    </div>
    <AppEmptyState
      v-else-if="pagedRows.length === 0"
      title="No employees found"
      description="Adjust the filters or create the first employee profile."
      :icon="Users"
    >
      <RouterLink to="/employees/create">
        <AppButton :icon="Plus">Create employee</AppButton>
      </RouterLink>
    </AppEmptyState>

    <div v-else class="space-y-4">
      <AppTable :columns="columns" :rows="pagedRows" row-key="employeeId" clickable @row-click="openProfile">
        <template #name="{ row }">
          <div>
            <p class="font-semibold text-slate-950">{{ employeeName(row) }}</p>
            <p class="text-xs text-slate-500">{{ row.preferredName || '-' }}</p>
          </div>
        </template>
        <template #employeeStatus="{ value }">
          <AppBadge :tone="statusTone(value)">{{ value || '-' }}</AppBadge>
        </template>
        <template #actions="{ row }">
          <div class="flex gap-2" @click.stop>
            <RouterLink :to="`/employees/${row.employeeId || row.id}`">
              <AppButton variant="ghost" size="sm">View</AppButton>
            </RouterLink>
            <RouterLink :to="`/employees/${row.employeeId || row.id}/edit`">
              <AppButton variant="ghost" size="sm">Edit</AppButton>
            </RouterLink>
          </div>
        </template>
      </AppTable>

      <div class="flex items-center justify-between text-sm text-slate-500">
        <span>Showing {{ pagedRows.length }} of {{ filteredRows.length }} employees</span>
        <div class="flex gap-2">
          <AppButton variant="secondary" size="sm" :disabled="page === 1" @click="page--">Previous</AppButton>
          <AppButton variant="secondary" size="sm" :disabled="page >= totalPages" @click="page++">Next</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, RefreshCcw, Users } from 'lucide-vue-next'
import AppBadge from '@/components/common/AppBadge.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppTable from '@/components/common/AppTable.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const router = useRouter()
const employeeStore = useEmployeeStore()
const search = ref('')
const status = ref('')
const page = ref(1)
const pageSize = 10

const statusOptions = ['ACTIVE', 'INACTIVE', 'RESIGNED', 'TERMINATED', 'ON_LEAVE', 'PROBATION']
const columns = [
  { key: 'employeeCode', label: 'Employee Code' },
  { key: 'name', label: 'Name' },
  { key: 'workEmail', label: 'Work Email' },
  { key: 'mobilePhone', label: 'Mobile Phone' },
  { key: 'employeeStatus', label: 'Status' },
  { key: 'actions', label: 'Actions' }
]

const filteredRows = computed(() => {
  const term = search.value.trim().toLowerCase()
  return employeeStore.employees.filter((employee) => {
    const matchesSearch = !term || [
      employee.employeeCode,
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.workEmail,
      employee.mobilePhone
    ].filter(Boolean).join(' ').toLowerCase().includes(term)
    const matchesStatus = !status.value || employee.employeeStatus === status.value
    return matchesSearch && matchesStatus
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize)))
const pagedRows = computed(() => filteredRows.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch([search, status], () => {
  page.value = 1
})

function employeeName(employee) {
  return [employee.titleName, employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' ') || '-'
}

function statusTone(value) {
  if (value === 'ACTIVE') return 'success'
  if (value === 'ON_LEAVE' || value === 'PROBATION') return 'warning'
  if (value === 'TERMINATED' || value === 'RESIGNED') return 'danger'
  return 'neutral'
}

function openProfile(employee) {
  router.push(`/employees/${employee.employeeId || employee.id}`)
}

function load() {
  employeeStore.fetchEmployees().catch(() => {})
}

onMounted(load)
</script>
