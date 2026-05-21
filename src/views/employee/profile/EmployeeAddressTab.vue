<template>
  <div class="space-y-6">
    <div class="grid gap-4 lg:grid-cols-2">
      <AppCard title="Registered Address" description="Official address for legal HR records.">
        <AddressSummary :address="registeredAddress" />
      </AppCard>
      <AppCard title="Contact Address" description="Address used for employee communication.">
        <AddressSummary :address="contactAddress" />
      </AppCard>
    </div>

    <AppCard title="All Address Records" description="Maintain address history and effective dates.">
      <template #header>
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-base font-semibold text-slate-950">All Address Records</h2>
            <p class="mt-1 text-sm text-slate-500">Maintain address history and effective dates.</p>
          </div>
          <AppButton :icon="Plus" @click="openCreate">Add address</AppButton>
        </div>
      </template>

      <AppLoading v-if="loading" />
      <div v-else-if="error" class="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-700">{{ error }}</div>
      <AppEmptyState v-else-if="items.length === 0" title="No address records" description="Add registered or contact address records for this employee." />
      <div v-else class="grid gap-3">
        <div v-for="address in items" :key="address.addressId || address.id" class="rounded-2xl border border-slate-200 p-4">
          <div class="flex flex-wrap items-start justify-between gap-3">
            <AddressSummary :address="address" />
            <div class="flex flex-wrap gap-2">
              <AppButton variant="secondary" size="sm" @click="setRegistered(address)">Set registered</AppButton>
              <AppButton variant="secondary" size="sm" @click="setContact(address)">Set contact</AppButton>
              <AppButton variant="ghost" size="sm" @click="openEdit(address)">Edit</AppButton>
              <AppButton variant="danger" size="sm" @click="remove(address)">Delete</AppButton>
            </div>
          </div>
        </div>
      </div>
    </AppCard>

    <AppModal v-model="modalOpen" :title="editingId ? 'Edit Address' : 'Add Address'">
      <div class="grid gap-4 md:grid-cols-2">
        <AppSelect v-model="form.addressType" label="Address Type" :options="['REGISTERED_ADDRESS', 'CONTACT_ADDRESS', 'CURRENT_ADDRESS', 'OTHER']" />
        <AppInput v-model="form.addressLabel" label="Address Label" />
        <AppInput v-model="form.houseNo" label="House No." />
        <AppInput v-model="form.villageNo" label="Village No." />
        <AppInput v-model="form.villageName" label="Village Name" />
        <AppInput v-model="form.buildingName" label="Building Name" />
        <AppInput v-model="form.floorNo" label="Floor No." />
        <AppInput v-model="form.roomNo" label="Room No." />
        <AppInput v-model="form.alley" label="Alley" />
        <AppInput v-model="form.road" label="Road" />
        <AppInput v-model="form.subDistrict" label="Sub District" />
        <AppInput v-model="form.district" label="District" />
        <AppInput v-model="form.province" label="Province" />
        <AppInput v-model="form.postalCode" label="Postal Code" />
        <AppInput v-model="form.country" label="Country" />
        <AppInput v-model="form.effectiveStartDate" label="Effective Start Date" type="date" />
        <AppInput v-model="form.effectiveEndDate" label="Effective End Date" type="date" />
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="form.isPrimary" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Primary address
        </label>
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="form.isSameAsRegisteredAddress" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Same as registered address
        </label>
        <AppTextarea v-model="form.fullAddress" class="md:col-span-2" label="Full Address" />
        <AppTextarea v-model="form.note" class="md:col-span-2" label="Note" />
      </div>
      <template #footer>
        <AppButton variant="secondary" @click="modalOpen = false">Cancel</AppButton>
        <AppButton :loading="saving" @click="save">Confirm</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup>
import { computed, h, onMounted, reactive, ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppEmptyState from '@/components/common/AppEmptyState.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppModal from '@/components/common/AppModal.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppTextarea from '@/components/common/AppTextarea.vue'
import employeeAddressService from '@/services/employeeAddressService'

const props = defineProps({ employeeId: { type: [String, Number], required: true } })

const emptyForm = {
  addressType: 'REGISTERED_ADDRESS',
  addressLabel: '',
  houseNo: '',
  villageNo: '',
  villageName: '',
  buildingName: '',
  floorNo: '',
  roomNo: '',
  alley: '',
  road: '',
  subDistrict: '',
  district: '',
  province: '',
  postalCode: '',
  country: 'Thailand',
  fullAddress: '',
  isPrimary: false,
  isSameAsRegisteredAddress: false,
  effectiveStartDate: '',
  effectiveEndDate: '',
  note: ''
}

const items = ref([])
const loading = ref(false)
const saving = ref(false)
const error = ref('')
const modalOpen = ref(false)
const editingId = ref('')
const form = reactive({ ...emptyForm })

const registeredAddress = computed(() => items.value.find((item) => item.addressType === 'REGISTERED_ADDRESS' || item.isRegisteredAddress))
const contactAddress = computed(() => items.value.find((item) => item.addressType === 'CONTACT_ADDRESS' || item.isContactAddress))

const AddressSummary = {
  props: { address: Object },
  setup(componentProps) {
    return () => componentProps.address
      ? h('div', { class: 'space-y-2' }, [
          h('div', { class: 'flex flex-wrap gap-2' }, [
            h('span', { class: 'rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700' }, componentProps.address.addressType || 'ADDRESS'),
            componentProps.address.isSameAsRegisteredAddress
              ? h('span', { class: 'rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700' }, 'Same as registered address')
              : null
          ]),
          h('p', { class: 'text-sm font-semibold text-slate-950' }, componentProps.address.addressLabel || componentProps.address.fullAddress || '-'),
          h('p', { class: 'text-sm text-slate-500' }, [componentProps.address.fullAddress, componentProps.address.province, componentProps.address.postalCode].filter(Boolean).join(', ') || '-')
        ])
      : h('p', { class: 'text-sm text-slate-500' }, 'No address selected.')
  }
}

function normalize(result) {
  return Array.isArray(result) ? result : result?.items || result?.content || []
}

function resetForm(payload = emptyForm) {
  Object.assign(form, { ...emptyForm, ...payload })
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    items.value = normalize(await employeeAddressService.getAll(props.employeeId))
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function openCreate() {
  editingId.value = ''
  resetForm()
  modalOpen.value = true
}

function openEdit(address) {
  editingId.value = address.addressId || address.id
  resetForm(address)
  modalOpen.value = true
}

async function save() {
  saving.value = true
  try {
    if (editingId.value) await employeeAddressService.update(props.employeeId, editingId.value, { ...form })
    else await employeeAddressService.create(props.employeeId, { ...form })
    modalOpen.value = false
    await load()
  } finally {
    saving.value = false
  }
}

async function remove(address) {
  await employeeAddressService.delete(props.employeeId, address.addressId || address.id)
  await load()
}

async function setRegistered(address) {
  await employeeAddressService.setRegistered(props.employeeId, address.addressId || address.id)
  await load()
}

async function setContact(address) {
  await employeeAddressService.setContact(props.employeeId, address.addressId || address.id)
  await load()
}

onMounted(load)
</script>
