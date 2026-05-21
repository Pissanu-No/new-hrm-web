<template>
  <div>
    <PageHeader
      title="Department Management"
      description="Maintain department hierarchy and reporting structure."
    >
      <template #actions>
        <button class="inline-flex items-center gap-2 rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900">
          <Plus class="h-4 w-4" />
          New Department
        </button>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :rows="items" :loading="loading" id-key="departmentId">
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'active' : 'inactive'" :label="value ? 'Active' : 'Inactive'" />
      </template>
    </DataTable>

    <p v-if="error" class="mt-4 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ error.message }}
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Plus } from 'lucide-vue-next'
import DataTable from '@/components/ui/DataTable.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useDepartmentStore } from '@/stores/departmentStore'

const columns = [
  { key: 'departmentCode', label: 'Code' },
  { key: 'departmentName', label: 'Department Name' },
  { key: 'companyId', label: 'Company ID' },
  { key: 'parentDepartmentId', label: 'Parent Department' },
  { key: 'isActive', label: 'Status' }
]

const departmentStore = useDepartmentStore()
const { items, loading, error } = storeToRefs(departmentStore)

async function loadDepartments() {
  try {
    await departmentStore.fetchDepartments()
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadDepartments)
</script>
