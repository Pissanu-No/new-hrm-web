<template>
  <AppCard title="Education" description="Academic background and highest education records.">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-slate-950">Education</h2>
          <p class="mt-1 text-sm text-slate-500">Academic background and highest education records.</p>
        </div>
        <AppButton :icon="Plus" @click="openCreate">Add education</AppButton>
      </div>
    </template>

    <AppLoading v-if="loading" />
    <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{{ error }}</div>
    <AppEmptyState v-else-if="items.length === 0" title="No education records" description="Add employee education history." />
    <div v-else class="space-y-4">
      <div v-for="item in items" :key="item.educationId || item.id" class="rounded-2xl border border-slate-200 p-5">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div class="flex flex-wrap gap-2">
              <h3 class="font-semibold text-slate-950">{{ item.degreeName || item.educationLevel || '-' }}</h3>
              <AppBadge v-if="item.isHighestEducation" tone="success">Highest</AppBadge>
            </div>
            <p class="mt-1 text-sm text-slate-500">{{ item.institutionName || '-' }}</p>
            <p class="mt-3 text-sm text-slate-600">{{ item.major || item.faculty || '-' }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <AppButton variant="secondary" size="sm" @click="setHighest(item)">Set highest</AppButton>
            <AppButton variant="ghost" size="sm" @click="openEdit(item)">Edit</AppButton>
            <AppButton variant="danger" size="sm" @click="remove(item)">Delete</AppButton>
          </div>
        </div>
      </div>
    </div>

    <AppModal v-model="modalOpen" :title="editingId ? 'Edit Education' : 'Add Education'">
      <div class="grid gap-4 md:grid-cols-2">
        <AppSelect v-model="form.educationLevel" label="Education Level" :options="['HIGH_SCHOOL', 'DIPLOMA', 'BACHELOR', 'MASTER', 'DOCTORATE', 'OTHER']" />
        <AppInput v-model="form.institutionName" label="Institution Name" />
        <AppInput v-model="form.institutionNameLocal" label="Institution Name Local" />
        <AppInput v-model="form.faculty" label="Faculty" />
        <AppInput v-model="form.major" label="Major" />
        <AppInput v-model="form.degreeName" label="Degree Name" />
        <AppInput v-model="form.degreeNameLocal" label="Degree Name Local" />
        <AppInput v-model="form.country" label="Country" />
        <AppInput v-model="form.startDate" label="Start Date" type="date" />
        <AppInput v-model="form.graduationDate" label="Graduation Date" type="date" />
        <AppInput v-model="form.gpa" label="GPA" />
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="form.isHighestEducation" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Highest education
        </label>
        <AppTextarea v-model="form.description" class="md:col-span-2" label="Description" />
      </div>
      <template #footer>
        <AppButton variant="secondary" @click="modalOpen = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Confirm</AppButton>
      </template>
    </AppModal>
  </AppCard>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import AppBadge from '@/components/common/AppBadge.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppModal from '@/components/common/AppModal.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppTextarea from '@/components/common/AppTextarea.vue'
import employeeEducationService from '@/services/employeeEducationService'

const props = defineProps({ employeeId: { type: [String, Number], required: true } })
const emptyForm = { educationLevel: '', institutionName: '', institutionNameLocal: '', faculty: '', major: '', degreeName: '', degreeNameLocal: '', country: '', startDate: '', graduationDate: '', gpa: '', isHighestEducation: false, description: '' }
const items = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const modalOpen = ref(false)
const editingId = ref('')
const form = reactive({ ...emptyForm })

function normalize(result) { return Array.isArray(result) ? result : result?.items || result?.content || [] }
async function load() { loading.value = true; error.value = ''; try { items.value = normalize(await employeeEducationService.getAll(props.employeeId)) } catch (err) { error.value = err.message } finally { loading.value = false } }
function openCreate() { editingId.value = ''; Object.assign(form, emptyForm); modalOpen.value = true }
function openEdit(item) { editingId.value = item.educationId || item.id; Object.assign(form, emptyForm, item); modalOpen.value = true }
async function save() { saving.value = true; try { if (editingId.value) await employeeEducationService.update(props.employeeId, editingId.value, { ...form }); else await employeeEducationService.create(props.employeeId, { ...form }); modalOpen.value = false; await load() } finally { saving.value = false } }
async function remove(item) { await employeeEducationService.delete(props.employeeId, item.educationId || item.id); await load() }
async function setHighest(item) { await employeeEducationService.setHighest(props.employeeId, item.educationId || item.id); await load() }
onMounted(load)
</script>
