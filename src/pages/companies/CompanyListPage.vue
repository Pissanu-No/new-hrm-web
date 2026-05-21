<template>
  <div>
    <PageHeader
      title="Company Management"
      description="Manage legal entities and company profile records."
    >
      <template #actions>
        <button class="inline-flex items-center gap-2 rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900">
          <Plus class="h-4 w-4" />
          New Company
        </button>
      </template>
    </PageHeader>

    <DataTable :columns="columns" :rows="items" :loading="loading" id-key="companyId">
      <template #toolbar>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            v-model="filters.search"
            type="search"
            class="w-full rounded border border-slate-300 px-3 py-2 text-sm sm:max-w-sm"
            placeholder="Search companies"
          />
          <button class="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700" @click="loadCompanies">
            Refresh
          </button>
        </div>
      </template>
      <template #cell-isActive="{ value }">
        <StatusBadge :status="value ? 'active' : 'inactive'" :label="value ? 'Active' : 'Inactive'" />
      </template>
      <template #actions>
        <button class="text-sm font-medium text-brand-700 hover:text-brand-900">View</button>
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
import { Plus } from 'lucide-vue-next'
import DataTable from '@/components/ui/DataTable.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useCompanyStore } from '@/stores/companyStore'

const columns = [
  { key: 'companyCode', label: 'Code' },
  { key: 'companyName', label: 'Company Name' },
  { key: 'taxId', label: 'Tax ID' },
  { key: 'isActive', label: 'Status' }
]

const filters = reactive({ search: '' })
const companyStore = useCompanyStore()
const { items, loading, error } = storeToRefs(companyStore)

async function loadCompanies() {
  try {
    await companyStore.fetchCompanies({ search: filters.search || undefined })
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadCompanies)
</script>
