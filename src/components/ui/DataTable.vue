<template>
  <div class="overflow-hidden rounded border border-slate-200 bg-white shadow-panel">
    <div v-if="$slots.toolbar" class="border-b border-slate-200 p-4">
      <slot name="toolbar" />
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {{ column.label }}
            </th>
            <th v-if="$slots.actions" scope="col" class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 bg-white">
          <tr v-if="loading">
            <td :colspan="columnCount" class="px-4 py-8 text-center text-sm text-slate-500">
              Loading records...
            </td>
          </tr>
          <tr v-else-if="rows.length === 0">
            <td :colspan="columnCount" class="px-4 py-8 text-center text-sm text-slate-500">
              No records found.
            </td>
          </tr>
          <tr v-for="(row, rowIndex) in rows" v-else :key="getRowKey(row, rowIndex)" class="hover:bg-slate-50">
            <td v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-4 text-sm text-slate-700">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="whitespace-nowrap px-4 py-4 text-right text-sm">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  idKey: {
    type: String,
    default: 'id'
  }
})

const slots = defineSlots()
const columnCount = computed(() => props.columns.length + (slots.actions ? 1 : 0))

function getRowKey(row, rowIndex) {
  return row?.[props.idKey] || row?.id || row?.uuid || rowIndex
}
</script>
