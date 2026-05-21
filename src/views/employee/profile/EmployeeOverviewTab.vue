<template>
  <AppCard :title="employmentOnly ? 'Employment Summary' : 'Profile Overview'" :description="employmentOnly ? 'Current employment status.' : 'Key employee profile information.'">
    <dl class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="item in items" :key="item.label" class="rounded-2xl bg-slate-50 p-4">
        <dt class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ item.label }}</dt>
        <dd class="mt-1 text-sm font-semibold text-slate-950">{{ item.value || '-' }}</dd>
      </div>
    </dl>
  </AppCard>
</template>

<script setup>
import { computed } from 'vue'
import AppCard from '@/components/common/AppCard.vue'

const props = defineProps({
  employee: { type: Object, default: () => ({}) },
  employmentOnly: { type: Boolean, default: false }
})

const overviewItems = computed(() => [
  { label: 'Employee code', value: props.employee.employeeCode },
  { label: 'Preferred name', value: props.employee.preferredName },
  { label: 'Work email', value: props.employee.workEmail },
  { label: 'Personal email', value: props.employee.personalEmail },
  { label: 'Mobile phone', value: props.employee.mobilePhone },
  { label: 'Nationality', value: props.employee.nationality },
  { label: 'Birth date', value: props.employee.birthDate },
  { label: 'Marital status', value: props.employee.maritalStatus },
  { label: 'Blood type', value: props.employee.bloodType },
  { label: 'National ID', value: props.employee.nationalId },
  { label: 'Passport No.', value: props.employee.passportNo },
  { label: 'Highest education', value: props.employee.highestEducationLevel }
])

const employmentItems = computed(() => [
  { label: 'Employee status', value: props.employee.employeeStatus },
  { label: 'Employee code', value: props.employee.employeeCode },
  { label: 'Work email', value: props.employee.workEmail }
])

const items = computed(() => props.employmentOnly ? employmentItems.value : overviewItems.value)
</script>
