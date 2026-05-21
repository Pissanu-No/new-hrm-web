<template>
  <AppCard title="Certifications" description="Professional certifications, credentials, and expiry status.">
    <template #header>
      <div class="flex items-start justify-between gap-4">
        <div>
          <h2 class="text-base font-semibold text-slate-950">Certifications</h2>
          <p class="mt-1 text-sm text-slate-500">Professional certifications, credentials, and expiry status.</p>
        </div>
        <AppButton :icon="Plus" @click="openCreate">Add certification</AppButton>
      </div>
    </template>

    <AppLoading v-if="loading" />
    <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{{ error }}</div>
    <AppEmptyState v-else-if="items.length === 0" title="No certifications" description="Add professional certifications for this employee." />
    <div v-else class="grid gap-4 lg:grid-cols-2">
      <div v-for="item in items" :key="item.certificationId || item.id" class="rounded-2xl border border-slate-200 p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="flex flex-wrap gap-2">
              <h3 class="font-semibold text-slate-950">{{ item.certificationName || '-' }}</h3>
              <AppBadge :tone="certTone(item)">{{ item.certificationStatus || expiryLabel(item) }}</AppBadge>
            </div>
            <p class="mt-1 text-sm text-slate-500">{{ item.issuingOrganization || '-' }}</p>
            <p class="mt-3 text-sm text-slate-600">{{ item.credentialId || item.certificationCode || '-' }}</p>
            <p class="mt-1 text-xs text-slate-500">{{ item.neverExpires ? 'Never expires' : `Expires: ${item.expiredDate || '-'}` }}</p>
          </div>
          <div class="flex flex-col gap-2">
            <AppButton variant="ghost" size="sm" @click="openEdit(item)">Edit</AppButton>
            <AppButton variant="danger" size="sm" @click="remove(item)">Delete</AppButton>
          </div>
        </div>
      </div>
    </div>

    <AppModal v-model="modalOpen" :title="editingId ? 'Edit Certification' : 'Add Certification'">
      <div class="grid gap-4 md:grid-cols-2">
        <AppInput v-model="form.certificationName" label="Certification Name" />
        <AppInput v-model="form.certificationCode" label="Certification Code" />
        <AppInput v-model="form.issuingOrganization" label="Issuing Organization" />
        <AppInput v-model="form.credentialId" label="Credential ID" />
        <AppInput v-model="form.credentialUrl" label="Credential URL" />
        <AppSelect v-model="form.certificationStatus" label="Status" :options="['ACTIVE', 'EXPIRED', 'REVOKED', 'PENDING']" />
        <label class="md:col-span-2 flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4">
          <span>
            <span class="block text-sm font-semibold text-slate-950">Never expires</span>
            <span class="text-xs text-slate-500">Hide issue and expiry dates for non-expiring credentials.</span>
          </span>
          <input v-model="form.neverExpires" type="checkbox" class="h-5 w-5 rounded border-slate-300 text-indigo-600" @change="clearDatesWhenNeverExpires" />
        </label>
        <template v-if="!form.neverExpires">
          <AppInput v-model="form.issuedDate" label="Issued Date" type="date" />
          <AppInput v-model="form.expiredDate" label="Expired Date" type="date" />
        </template>
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
import employeeCertificationService from '@/services/employeeCertificationService'

const props = defineProps({ employeeId: { type: [String, Number], required: true } })
const emptyForm = { certificationName: '', certificationCode: '', issuingOrganization: '', credentialId: '', credentialUrl: '', issuedDate: '', expiredDate: '', neverExpires: false, certificationStatus: 'ACTIVE', description: '' }
const items = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const modalOpen = ref(false)
const editingId = ref('')
const form = reactive({ ...emptyForm })

function normalize(result) { return Array.isArray(result) ? result : result?.items || result?.content || [] }
function expiryLabel(item) { return item.neverExpires ? 'ACTIVE' : new Date(item.expiredDate) < new Date() ? 'EXPIRED' : 'ACTIVE' }
function certTone(item) { return expiryLabel(item) === 'EXPIRED' || item.certificationStatus === 'EXPIRED' ? 'danger' : 'success' }
function clearDatesWhenNeverExpires() { if (form.neverExpires) { form.issuedDate = ''; form.expiredDate = '' } }
async function load() { loading.value = true; error.value = ''; try { items.value = normalize(await employeeCertificationService.getAll(props.employeeId)) } catch (err) { error.value = err.message } finally { loading.value = false } }
function openCreate() { editingId.value = ''; Object.assign(form, emptyForm); modalOpen.value = true }
function openEdit(item) { editingId.value = item.certificationId || item.id; Object.assign(form, emptyForm, item); modalOpen.value = true }
async function save() { saving.value = true; try { clearDatesWhenNeverExpires(); if (editingId.value) await employeeCertificationService.update(props.employeeId, editingId.value, { ...form }); else await employeeCertificationService.create(props.employeeId, { ...form }); modalOpen.value = false; await load() } finally { saving.value = false } }
async function remove(item) { await employeeCertificationService.delete(props.employeeId, item.certificationId || item.id); await load() }
onMounted(load)
</script>
