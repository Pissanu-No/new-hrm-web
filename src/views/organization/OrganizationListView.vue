<template>
  <div class="space-y-6">
    <AppPageHeader :title="title" eyebrow="Organization" :description="description">
      <template #actions>
        <AppButton :icon="Plus" disabled>Add record</AppButton>
      </template>
    </AppPageHeader>

    <AppCard>
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <AppInput v-model="search" class="w-full sm:max-w-sm" placeholder="Search records" />
        <AppButton variant="secondary" :icon="RefreshCcw" @click="load">Refresh</AppButton>
      </div>
    </AppCard>

    <AppLoading v-if="loading" />
    <div v-else-if="error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
      {{ error }}
      <AppButton class="mt-3" variant="secondary" size="sm" @click="load">Retry</AppButton>
    </div>
    <AppEmptyState v-else-if="filteredRows.length === 0" title="No organization records" description="No data was returned for this organization master." />
    <AppTable v-else :columns="columns" :rows="filteredRows" :row-key="rowKey" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Plus, RefreshCcw } from 'lucide-vue-next'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'
import AppTable from '@/components/common/AppTable.vue'
import organizationService from '@/services/organizationService'

const route = useRoute()
const rows = ref([])
const loading = ref(false)
const error = ref('')
const search = ref('')

const resource = computed(() => route.meta.resource)
const title = computed(() => route.meta.title || 'Organization')
const description = computed(() => `Maintain ${title.value.toLowerCase()} master data used across HR operations.`)
const rowKey = computed(() => route.meta.rowKey || 'id')

const columns = [
  { key: 'code', label: 'Code' },
  { key: 'name', label: 'Name' },
  { key: 'status', label: 'Status' }
]

const filteredRows = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return rows.value
  return rows.value.filter((row) => JSON.stringify(row).toLowerCase().includes(term))
})

function normalizeRows(result) {
  if (Array.isArray(result)) return result
  return result?.items || result?.content || result?.records || []
}

async function load() {
  loading.value = true
  error.value = ''

  try {
    rows.value = normalizeRows(await organizationService.getAll(resource.value))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

watch(resource, load)
onMounted(load)
</script>
