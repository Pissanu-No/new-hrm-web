<template>
  <div class="space-y-6">
    <AppLoading v-if="employeeStore.loading" />
    <div v-else-if="employeeStore.error" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
      {{ employeeStore.error }}
      <AppButton class="mt-3" variant="secondary" size="sm" @click="load">Retry</AppButton>
    </div>
    <template v-else>
      <AppCard>
        <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-4">
            <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-2xl font-bold text-white">
              {{ initials }}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h1 class="text-2xl font-bold text-slate-950">{{ employeeName }}</h1>
                <AppBadge :tone="statusTone(employee.employeeStatus)">{{ employee.employeeStatus || '-' }}</AppBadge>
              </div>
              <p class="mt-1 text-sm text-slate-500">{{ employee.employeeCode || '-' }}</p>
              <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                <span>{{ employee.workEmail || '-' }}</span>
                <span>{{ employee.mobilePhone || '-' }}</span>
              </div>
            </div>
          </div>
          <RouterLink :to="`/employees/${employeeId}/edit`">
            <AppButton variant="secondary">Edit profile</AppButton>
          </RouterLink>
        </div>
      </AppCard>

      <AppTabs v-model="activeTab" :tabs="tabs" />

      <EmployeeOverviewTab v-if="activeTab === 'overview'" :employee="employee" />
      <EmployeeOverviewTab v-else-if="activeTab === 'employment'" :employee="employee" employment-only />
      <EmployeeAddressTab v-else-if="activeTab === 'address'" :employee-id="employeeId" />
      <EmergencyContactTab v-else-if="activeTab === 'emergency'" :employee-id="employeeId" />
      <EducationTab v-else-if="activeTab === 'education'" :employee-id="employeeId" />
      <CertificationTab v-else-if="activeTab === 'certifications'" :employee-id="employeeId" />
      <DocumentsPlaceholderTab v-else-if="activeTab === 'documents'" />
      <AppEmptyState v-else title="Activity placeholder" description="Employee activity timeline will be added in a later phase." />
    </template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppBadge from '@/components/common/AppBadge.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppTabs from '@/components/common/AppTabs.vue'
import CertificationTab from '@/views/employee/profile/CertificationTab.vue'
import DocumentsPlaceholderTab from '@/views/employee/profile/DocumentsPlaceholderTab.vue'
import EducationTab from '@/views/employee/profile/EducationTab.vue'
import EmergencyContactTab from '@/views/employee/profile/EmergencyContactTab.vue'
import EmployeeAddressTab from '@/views/employee/profile/EmployeeAddressTab.vue'
import EmployeeOverviewTab from '@/views/employee/profile/EmployeeOverviewTab.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()
const activeTab = ref('overview')
const employeeId = computed(() => route.params.employeeId)
const employee = computed(() => employeeStore.selectedEmployee || {})
const employeeName = computed(() => [employee.value.titleName, employee.value.firstName, employee.value.middleName, employee.value.lastName].filter(Boolean).join(' ') || 'Employee Profile')
const initials = computed(() => [employee.value.firstName, employee.value.lastName].filter(Boolean).map((part) => part[0]).join('').toUpperCase() || 'HR')

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'employment', label: 'Employment' },
  { value: 'address', label: 'Address' },
  { value: 'emergency', label: 'Emergency Contacts' },
  { value: 'education', label: 'Education' },
  { value: 'certifications', label: 'Certifications' },
  { value: 'documents', label: 'Documents' },
  { value: 'activity', label: 'Activity' }
]

function statusTone(value) {
  if (value === 'ACTIVE') return 'success'
  if (value === 'TERMINATED' || value === 'RESIGNED') return 'danger'
  if (value === 'ON_LEAVE' || value === 'PROBATION') return 'warning'
  return 'neutral'
}

function load() {
  employeeStore.fetchEmployeeById(employeeId.value).catch(() => {})
}

onMounted(load)
</script>
