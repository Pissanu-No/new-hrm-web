<template>
  <div>
    <PageHeader
      title="Position Management"
      description="Maintain roles, job titles, and position assignments."
    >
      <template #actions>
        <button class="inline-flex items-center gap-2 rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900">
          <Plus class="h-4 w-4" />
          New Position
        </button>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :rows="items" :loading="loading" id-key="positionId">
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
import { usePositionStore } from '@/stores/positionStore'

const columns = [
  { key: 'positionCode', label: 'Code' },
  { key: 'positionName', label: 'Position Name' },
  { key: 'departmentId', label: 'Department ID' },
  { key: 'jobLevelId', label: 'Job Level' },
  { key: 'isActive', label: 'Status' }
]

const positionStore = usePositionStore()
const { items, loading, error } = storeToRefs(positionStore)

async function loadPositions() {
  try {
    await positionStore.fetchPositions()
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadPositions)
</script>
