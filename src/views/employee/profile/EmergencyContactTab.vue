<template>
  <AppCard title="Emergency Contacts" description="People HR can contact during urgent situations.">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-slate-950">Emergency Contacts</h2>
          <p class="mt-1 text-sm text-slate-500">People HR can contact during urgent situations.</p>
        </div>
        <AppButton :icon="Plus" @click="openCreate">Add contact</AppButton>
      </div>
    </template>

    <AppLoading v-if="loading" />
    <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{{ error }}</div>
    <AppEmptyState v-else-if="items.length === 0" title="No emergency contacts" description="Add at least one contact for employee safety records." />
    <div v-else class="grid gap-4 md:grid-cols-2">
      <div v-for="item in items" :key="item.emergencyContactId || item.id" class="rounded-2xl border border-slate-200 p-4">
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-semibold text-slate-950">{{ item.contactName || '-' }}</h3>
              <AppBadge v-if="item.isPrimary" tone="success">Primary</AppBadge>
            </div>
            <p class="mt-1 text-sm text-slate-500">{{ item.relationship || '-' }}</p>
            <p class="mt-3 text-sm text-slate-700">{{ item.mobilePhone || '-' }}</p>
            <p class="text-sm text-slate-500">{{ item.email || '-' }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <AppButton variant="secondary" size="sm" @click="setPrimary(item)">Set primary</AppButton>
            <AppButton variant="ghost" size="sm" @click="openEdit(item)">Edit</AppButton>
            <AppButton variant="danger" size="sm" @click="remove(item)">Delete</AppButton>
          </div>
        </div>
      </div>
    </div>

    <AppModal v-model="modalOpen" :title="editingId ? 'Edit Emergency Contact' : 'Add Emergency Contact'">
      <div class="grid gap-4 md:grid-cols-2">
        <AppInput v-model="form.contactName" label="Contact Name" />
        <AppInput v-model="form.relationship" label="Relationship" />
        <AppInput v-model="form.mobilePhone" label="Mobile Phone" />
        <AppInput v-model="form.alternatePhone" label="Alternate Phone" />
        <AppInput v-model="form.email" label="Email" type="email" />
        <AppInput v-model="form.province" label="Province" />
        <AppInput v-model="form.country" label="Country" />
        <AppInput v-model="form.postalCode" label="Postal Code" />
        <AppTextarea v-model="form.addressLine1" label="Address Line 1" />
        <AppTextarea v-model="form.addressLine2" label="Address Line 2" />
        <AppInput v-model="form.priorityNo" label="Priority No." type="number" />
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="form.isPrimary" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Primary contact
        </label>
        <AppTextarea v-model="form.note" class="md:col-span-2" label="Note" />
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
import AppTextarea from '@/components/common/AppTextarea.vue'
import emergencyContactService from '@/services/emergencyContactService'

const props = defineProps({ employeeId: { type: [String, Number], required: true } })
const emptyForm = {
  contactName: '',
  relationship: '',
  mobilePhone: '',
  alternatePhone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  province: '',
  country: 'Thailand',
  postalCode: '',
  priorityNo: '',
  isPrimary: false,
  note: ''
}
const items = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const modalOpen = ref(false)
const editingId = ref('')
const form = reactive({ ...emptyForm })

function normalize(result) {
  return Array.isArray(result) ? result : result?.items || result?.content || []
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    items.value = normalize(await emergencyContactService.getAll(props.employeeId))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = ''
  Object.assign(form, emptyForm)
  modalOpen.value = true
}

function openEdit(item) {
  editingId.value = item.emergencyContactId || item.id
  Object.assign(form, emptyForm, item)
  modalOpen.value = true
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) await emergencyContactService.update(props.employeeId, editingId.value, { ...form })
    else await emergencyContactService.create(props.employeeId, { ...form })
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(item) {
  await emergencyContactService.delete(props.employeeId, item.emergencyContactId || item.id)
  await load()
}

async function setPrimary(item) {
  await emergencyContactService.setPrimary(props.employeeId, item.emergencyContactId || item.id)
  await load()
}

onMounted(load)
</script>
