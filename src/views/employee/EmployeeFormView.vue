<template>
  <form class="space-y-6" @submit.prevent="submit">
    <AppPageHeader
      eyebrow="Employees"
      :title="isEdit ? 'Edit Employee' : 'Create Employee'"
      description="Create the employee profile first, then save addresses, emergency contacts, education, certificates, and files with the generated employee ID."
    >
      <template #actions>
        <RouterLink to="/employees">
          <AppButton variant="secondary">Cancel</AppButton>
        </RouterLink>
        <AppButton type="submit" :loading="employeeStore.saving || savingRelated">
          {{ isEdit ? 'Save changes' : 'Create employee' }}
        </AppButton>
      </template>
    </AppPageHeader>

    <AppLoading v-if="employeeStore.loading" />
    <template v-else>
      <div class="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div class="space-y-6">
          <AppCard title="Name in English" description="Legal or official employee name in English.">
            <div class="grid gap-4 md:grid-cols-2">
              <AppInput v-model="form.employeeCode" label="Employee Code" :error="errors.employeeCode" />
              <AppSelect v-model="form.titleName" label="Title" placeholder="Select title" :options="englishTitles" />
              <AppInput v-model="form.firstName" label="First Name" :error="errors.firstName" />
              <AppInput v-model="form.middleName" label="Middle Name" />
              <AppInput v-model="form.lastName" label="Last Name" :error="errors.lastName" />
              <AppInput v-model="form.preferredName" label="Preferred Name" />
            </div>
          </AppCard>

          <AppCard title="Name in Thai" description="Local language name used in employee documents and HR records.">
            <div class="grid gap-4 md:grid-cols-2">
              <AppSelect v-model="form.titleNameLocal" label="คำนำหน้า" placeholder="เลือกคำนำหน้า" :options="thaiTitles" />
              <AppInput v-model="form.firstNameLocal" label="ชื่อ" />
              <AppInput v-model="form.middleNameLocal" label="ชื่อกลาง" />
              <AppInput v-model="form.lastNameLocal" label="นามสกุล" />
            </div>
          </AppCard>

          <AppCard title="Personal Information" description="Contact and demographic information for HR administration.">
            <div class="grid gap-4 md:grid-cols-2">
              <AppSelect v-model="form.gender" label="Gender" placeholder="Select gender" :options="['MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED']" />
              <AppInput v-model="form.birthDate" label="Birth Date" type="date" />
              <AppInput v-model="form.nationality" label="Nationality" />
              <AppSelect v-model="form.maritalStatus" label="Marital Status" placeholder="Select status" :options="['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']" />
              <AppSelect v-model="form.bloodType" label="Blood Type" placeholder="Select blood type" :options="['A', 'B', 'AB', 'O']" />
              <AppInput v-model="form.mobilePhone" label="Mobile Phone" />
              <AppInput v-model="form.personalEmail" label="Personal Email" type="email" />
              <AppInput v-model="form.workEmail" label="Work Email" type="email" />
            </div>
          </AppCard>
        </div>

        <div class="space-y-6">
          <AppCard title="Employment" description="Current employment status and account visibility.">
            <AppSelect v-model="form.employeeStatus" label="Employee Status" placeholder="Select status" :options="statusOptions" :error="errors.employeeStatus" />
          </AppCard>

          <AppCard
            title="Organization Assignment"
            description="Capture where this employee belongs and who they report to. These fields are kept separate until the assignment API is available."
          >
            <div class="grid gap-4">
              <AppInput v-model="organizationAssignment.departmentId" label="Department ID" placeholder="Department or organization unit" />
              <AppInput v-model="organizationAssignment.positionId" label="Position ID" placeholder="Position or role" />
              <AppInput v-model="organizationAssignment.locationId" label="Location ID" placeholder="Work location" />
              <AppInput v-model="organizationAssignment.jobLevelId" label="Job Level ID" placeholder="Job level" />
              <AppInput v-model="organizationAssignment.costCenterId" label="Cost Center ID" placeholder="Cost center" />
              <AppInput v-model="organizationAssignment.reportsToEmployeeId" label="Reports To Employee ID" placeholder="Manager employee ID" />
            </div>
          </AppCard>

          <AppCard title="Government and Education" description="Sensitive identifiers are kept out of the directory table and shown only in profile detail.">
            <div class="grid gap-4">
              <AppInput v-model="form.nationalId" label="National ID" />
              <AppInput v-model="form.passportNo" label="Passport No." />
              <AppInput v-model="form.taxNo" label="Tax No." />
              <AppInput v-model="form.socialSecurityNo" label="Social Security No." />
              <AppSelect v-model="form.highestEducationLevel" label="Highest Education Level" placeholder="Select level" :options="educationLevels" />
            </div>
          </AppCard>
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-2">
        <RelatedSection
          title="Address"
          description="Hold registered and contact address records. Existing records are updated with the Swagger address update API."
          button-label="Add address"
          :items="addresses"
          item-title-key="addressLabel"
          item-subtitle-key="fullAddress"
          @add="openModal('address')"
          @edit="openModal('address', $event.index)"
          @remove="removeItem('address', $event.index)"
        />
        <RelatedSection
          title="Emergency Contact"
          description="Add contacts one row at a time. Priority and primary values can remain null until managed later."
          button-label="Add contact"
          :items="emergencyContacts"
          item-title-key="contactName"
          item-subtitle-key="relationship"
          @add="openModal('emergency')"
          @edit="openModal('emergency', $event.index)"
          @remove="removeItem('emergency', $event.index)"
        />
        <RelatedSection
          title="Education"
          description="Add education history before saving. Highest education can be handled by the profile action later."
          button-label="Add education"
          :items="educations"
          item-title-key="degreeName"
          item-subtitle-key="institutionName"
          @add="openModal('education')"
          @edit="openModal('education', $event.index)"
          @remove="removeItem('education', $event.index)"
        />
        <RelatedSection
          title="Certificate"
          description="Track professional credentials and expiry behavior."
          button-label="Add certificate"
          :items="certifications"
          item-title-key="certificationName"
          item-subtitle-key="issuingOrganization"
          @add="openModal('certificate')"
          @edit="openModal('certificate', $event.index)"
          @remove="removeItem('certificate', $event.index)"
        />
      </div>

      <AppCard title="Attachment Files" description="Select files now. They will upload after the employee ID is available.">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input type="file" multiple class="text-sm text-slate-600" @change="addAttachments" />
          <p class="text-sm text-slate-500">Upload API: /v1/s/employees/{employeeId}/attachment-files/upload</p>
        </div>
        <div v-if="attachments.length" class="mt-4 grid gap-2">
          <div v-for="(attachment, index) in attachments" :key="`${attachment.file.name}-${index}`" class="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
            <span class="text-sm font-medium text-slate-700">{{ attachment.file.name }}</span>
            <AppButton variant="ghost" size="sm" @click="attachments.splice(index, 1)">Remove</AppButton>
          </div>
        </div>
      </AppCard>
    </template>

    <div v-if="employeeStore.error || relatedError" class="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm font-medium text-red-700">
      {{ employeeStore.error || relatedError }}
    </div>

    <AppModal v-model="modalOpen" :title="modalTitle">
      <div v-if="modalType === 'address'" class="grid gap-4 md:grid-cols-2">
        <AppSelect v-model="draft.addressType" label="Address Type" :options="['REGISTERED_ADDRESS', 'CONTACT_ADDRESS', 'CURRENT_ADDRESS', 'OTHER']" />
        <AppInput v-model="draft.addressLabel" label="Address Label" />
        <AppInput v-model="draft.houseNo" label="House No." />
        <AppInput v-model="draft.villageNo" label="Village No." />
        <AppInput v-model="draft.villageName" label="Village Name" />
        <AppInput v-model="draft.buildingName" label="Building Name" />
        <AppInput v-model="draft.floorNo" label="Floor No." />
        <AppInput v-model="draft.roomNo" label="Room No." />
        <AppInput v-model="draft.alley" label="Alley" />
        <AppInput v-model="draft.road" label="Road" />
        <AppInput v-model="draft.subDistrict" label="Sub District" />
        <AppInput v-model="draft.district" label="District" />
        <AppInput v-model="draft.province" label="Province" />
        <AppInput v-model="draft.postalCode" label="Postal Code" />
        <AppInput v-model="draft.country" label="Country" />
        <AppInput v-model="draft.effectiveStartDate" label="Effective Start Date" type="date" />
        <AppInput v-model="draft.effectiveEndDate" label="Effective End Date" type="date" />
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="draft.isPrimary" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Primary address
        </label>
        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 p-3 text-sm font-medium text-slate-700">
          <input v-model="draft.isSameAsRegisteredAddress" type="checkbox" class="h-4 w-4 rounded border-slate-300 text-indigo-600" />
          Same as registered address
        </label>
        <AppTextarea v-model="draft.fullAddress" class="md:col-span-2" label="Full Address" />
        <AppTextarea v-model="draft.note" class="md:col-span-2" label="Note" />
      </div>

      <div v-else-if="modalType === 'emergency'" class="grid gap-4 md:grid-cols-2">
        <AppInput v-model="draft.contactName" label="Contact Name" />
        <AppInput v-model="draft.relationship" label="Relationship" />
        <AppInput v-model="draft.mobilePhone" label="Mobile Phone" />
        <AppInput v-model="draft.alternatePhone" label="Alternate Phone" />
        <AppInput v-model="draft.email" label="Email" type="email" />
        <AppInput v-model="draft.province" label="Province" />
        <AppInput v-model="draft.country" label="Country" />
        <AppInput v-model="draft.postalCode" label="Postal Code" />
        <AppTextarea v-model="draft.addressLine1" label="Address Line 1" />
        <AppTextarea v-model="draft.addressLine2" label="Address Line 2" />
        <AppTextarea v-model="draft.note" class="md:col-span-2" label="Note" />
      </div>

      <div v-else-if="modalType === 'education'" class="grid gap-4 md:grid-cols-2">
        <AppSelect v-model="draft.educationLevel" label="Education Level" :options="educationLevels" />
        <AppInput v-model="draft.institutionName" label="Institution Name" />
        <AppInput v-model="draft.institutionNameLocal" label="Institution Name Local" />
        <AppInput v-model="draft.faculty" label="Faculty" />
        <AppInput v-model="draft.major" label="Major" />
        <AppInput v-model="draft.degreeName" label="Degree Name" />
        <AppInput v-model="draft.degreeNameLocal" label="Degree Name Local" />
        <AppInput v-model="draft.country" label="Country" />
        <AppInput v-model="draft.startDate" label="Start Date" type="date" />
        <AppInput v-model="draft.graduationDate" label="Graduation Date" type="date" />
        <AppInput v-model="draft.gpa" label="GPA" />
        <AppTextarea v-model="draft.description" class="md:col-span-2" label="Description" />
      </div>

      <div v-else-if="modalType === 'certificate'" class="grid gap-4 md:grid-cols-2">
        <AppInput v-model="draft.certificationName" label="Certification Name" />
        <AppInput v-model="draft.certificationCode" label="Certification Code" />
        <AppInput v-model="draft.issuingOrganization" label="Issuing Organization" />
        <AppInput v-model="draft.credentialId" label="Credential ID" />
        <AppInput v-model="draft.credentialUrl" label="Credential URL" />
        <AppSelect v-model="draft.certificationStatus" label="Status" :options="['ACTIVE', 'EXPIRED', 'REVOKED', 'PENDING']" />
        <label class="md:col-span-2 flex items-center justify-between rounded-2xl border border-slate-200 p-4">
          <span>
            <span class="block text-sm font-semibold text-slate-950">Never expires</span>
            <span class="text-xs text-slate-500">When enabled, issued and expired dates are not required.</span>
          </span>
          <input v-model="draft.neverExpires" type="checkbox" class="h-5 w-5 rounded border-slate-300 text-indigo-600" />
        </label>
        <template v-if="!draft.neverExpires">
          <AppInput v-model="draft.issuedDate" label="Issued Date" type="date" />
          <AppInput v-model="draft.expiredDate" label="Expired Date" type="date" />
        </template>
        <AppTextarea v-model="draft.description" class="md:col-span-2" label="Description" />
      </div>

      <template #footer>
        <AppButton variant="secondary" @click="modalOpen = false">Cancel</AppButton>
        <AppButton @click="confirmDraft">Confirm</AppButton>
      </template>
    </AppModal>
  </form>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import AppInput from '@/components/common/AppInput.vue'
import AppLoading from '@/components/common/AppLoading.vue'
import AppModal from '@/components/common/AppModal.vue'
import AppPageHeader from '@/components/common/AppPageHeader.vue'
import AppSelect from '@/components/common/AppSelect.vue'
import AppTextarea from '@/components/common/AppTextarea.vue'
import employeeAddressService from '@/services/employeeAddressService'
import employeeAttachmentFileService from '@/services/employeeAttachmentFileService'
import employeeCertificationService from '@/services/employeeCertificationService'
import employeeEducationService from '@/services/employeeEducationService'
import emergencyContactService from '@/services/emergencyContactService'
import { useEmployeeStore } from '@/stores/employeeStore'

const RelatedSection = defineComponent({
  props: {
    title: String,
    description: String,
    buttonLabel: String,
    items: { type: Array, default: () => [] },
    itemTitleKey: String,
    itemSubtitleKey: String
  },
  emits: ['add', 'edit', 'remove'],
  setup(props, { emit }) {
    return () => h(AppCard, { title: props.title, description: props.description }, {
      default: () => [
        h('div', { class: 'mb-4 flex justify-end' }, [
          h(AppButton, { onClick: () => emit('add') }, () => props.buttonLabel)
        ]),
        props.items.length
          ? h('div', { class: 'grid gap-3' }, props.items.map((item, index) => h('div', { class: 'flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3' }, [
              h('div', [
                h('p', { class: 'text-sm font-semibold text-slate-950' }, item[props.itemTitleKey] || item.file?.name || '-'),
                h('p', { class: 'text-xs text-slate-500' }, item[props.itemSubtitleKey] || '-')
              ]),
              h('div', { class: 'flex gap-2' }, [
                h(AppButton, { variant: 'ghost', size: 'sm', onClick: () => emit('edit', { item, index }) }, () => 'Edit'),
                h(AppButton, { variant: 'ghost', size: 'sm', onClick: () => emit('remove', { item, index }) }, () => 'Remove')
              ])
            ])))
          : h('p', { class: 'rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500' }, `No ${props.title.toLowerCase()} added yet.`)
      ]
    })
  }
})

const route = useRoute()
const router = useRouter()
const employeeStore = useEmployeeStore()
const isEdit = computed(() => Boolean(route.params.employeeId))
const savingRelated = ref(false)
const relatedError = ref('')
const modalOpen = ref(false)
const modalType = ref('')
const editIndex = ref(-1)
const draft = reactive({})

const englishTitles = ['Mr.', 'Ms.', 'Mrs.', 'Other']
const thaiTitles = ['นาย', 'นางสาว', 'นาง', 'อื่นๆ']
const statusOptions = ['ACTIVE', 'INACTIVE', 'RESIGNED', 'TERMINATED', 'ON_LEAVE', 'PROBATION']
const educationLevels = ['HIGH_SCHOOL', 'DIPLOMA', 'BACHELOR', 'MASTER', 'DOCTORATE', 'OTHER']

const addresses = ref([])
const emergencyContacts = ref([])
const educations = ref([])
const certifications = ref([])
const attachments = ref([])
const organizationAssignment = reactive({
  departmentId: '',
  positionId: '',
  locationId: '',
  jobLevelId: '',
  costCenterId: '',
  reportsToEmployeeId: ''
})

const modalTitle = computed(() => {
  const labels = { address: 'Address', emergency: 'Emergency Contact', education: 'Education', certificate: 'Certificate' }
  return `${editIndex.value >= 0 ? 'Edit' : 'Add'} ${labels[modalType.value] || 'Record'}`
})

const form = reactive({
  employeeCode: '',
  titleName: '',
  firstName: '',
  middleName: '',
  lastName: '',
  titleNameLocal: '',
  firstNameLocal: '',
  middleNameLocal: '',
  lastNameLocal: '',
  preferredName: '',
  gender: '',
  birthDate: '',
  nationality: '',
  personalEmail: '',
  workEmail: '',
  mobilePhone: '',
  employeeStatus: 'ACTIVE',
  maritalStatus: '',
  bloodType: '',
  nationalId: '',
  passportNo: '',
  taxNo: '',
  socialSecurityNo: '',
  highestEducationLevel: ''
})

const errors = reactive({
  employeeCode: '',
  firstName: '',
  lastName: '',
  employeeStatus: ''
})

const emptyDrafts = {
  address: { addressType: 'REGISTERED_ADDRESS', addressLabel: '', houseNo: '', villageNo: '', villageName: '', buildingName: '', floorNo: '', roomNo: '', alley: '', road: '', subDistrict: '', district: '', province: '', postalCode: '', country: 'Thailand', fullAddress: '', isPrimary: false, isSameAsRegisteredAddress: false, effectiveStartDate: '', effectiveEndDate: '', note: '' },
  emergency: { contactName: '', relationship: '', mobilePhone: '', alternatePhone: '', email: '', addressLine1: '', addressLine2: '', province: '', country: 'Thailand', postalCode: '', priorityNo: null, isPrimary: null, note: '' },
  education: { educationLevel: '', institutionName: '', institutionNameLocal: '', faculty: '', major: '', degreeName: '', degreeNameLocal: '', country: '', startDate: '', graduationDate: '', gpa: '', isHighestEducation: null, description: '' },
  certificate: { certificationName: '', certificationCode: '', issuingOrganization: '', credentialId: '', credentialUrl: '', issuedDate: '', expiredDate: '', neverExpires: false, certificationStatus: 'ACTIVE', description: '' }
}

function fillForm(employee) {
  Object.keys(form).forEach((key) => {
    form[key] = employee?.[key] ?? form[key]
  })

  Object.keys(organizationAssignment).forEach((key) => {
    organizationAssignment[key] = employee?.[key] ?? organizationAssignment[key]
  })
}

function validate() {
  errors.employeeCode = form.employeeCode ? '' : 'Employee code is required.'
  errors.firstName = form.firstName ? '' : 'First name is required.'
  errors.lastName = form.lastName ? '' : 'Last name is required.'
  errors.employeeStatus = form.employeeStatus ? '' : 'Employee status is required.'
  return !errors.employeeCode && !errors.firstName && !errors.lastName && !errors.employeeStatus
}

function openModal(type, index = -1) {
  modalType.value = type
  editIndex.value = index
  const source = index >= 0 ? getCollection(type).value[index] : emptyDrafts[type]
  Object.keys(draft).forEach((key) => delete draft[key])
  Object.assign(draft, JSON.parse(JSON.stringify(source)))
  modalOpen.value = true
}

function confirmDraft() {
  if (draft.neverExpires) {
    draft.issuedDate = ''
    draft.expiredDate = ''
  }

  const collection = getCollection(modalType.value)
  const payload = { ...draft }

  if (editIndex.value >= 0) collection.value.splice(editIndex.value, 1, payload)
  else collection.value.push(payload)

  modalOpen.value = false
}

function removeItem(type, index) {
  getCollection(type).value.splice(index, 1)
}

function getCollection(type) {
  return {
    address: addresses,
    emergency: emergencyContacts,
    education: educations,
    certificate: certifications
  }[type]
}

function addAttachments(event) {
  const files = Array.from(event.target.files || [])
  attachments.value.push(...files.map((file) => ({ file })))
  event.target.value = ''
}

function normalizeList(result) {
  if (Array.isArray(result)) return result
  return result?.items || result?.content || []
}

async function loadRelated(employeeId) {
  const [addressResult, emergencyResult, educationResult, certificationResult] = await Promise.allSettled([
    employeeAddressService.getAll(employeeId),
    emergencyContactService.getAll(employeeId),
    employeeEducationService.getAll(employeeId),
    employeeCertificationService.getAll(employeeId)
  ])

  if (addressResult.status === 'fulfilled') addresses.value = normalizeList(addressResult.value)
  if (emergencyResult.status === 'fulfilled') emergencyContacts.value = normalizeList(emergencyResult.value)
  if (educationResult.status === 'fulfilled') educations.value = normalizeList(educationResult.value)
  if (certificationResult.status === 'fulfilled') certifications.value = normalizeList(certificationResult.value)
}

async function saveRelated(employeeId) {
  savingRelated.value = true
  relatedError.value = ''

  try {
    for (const item of addresses.value) {
      const id = item.addressId || item.id
      if (id) await employeeAddressService.update(employeeId, id, stripIds(item))
      else await employeeAddressService.create(employeeId, stripIds(item))
    }

    for (const item of emergencyContacts.value) {
      const id = item.emergencyContactId || item.id
      const payload = { ...stripIds(item), priorityNo: item.priorityNo ?? null, isPrimary: item.isPrimary ?? null }
      if (id) await emergencyContactService.update(employeeId, id, payload)
      else await emergencyContactService.create(employeeId, payload)
    }

    for (const item of educations.value) {
      const id = item.educationId || item.id
      const payload = { ...stripIds(item), isHighestEducation: item.isHighestEducation ?? null }
      if (id) await employeeEducationService.update(employeeId, id, payload)
      else await employeeEducationService.create(employeeId, payload)
    }

    for (const item of certifications.value) {
      const id = item.certificationId || item.id
      const payload = stripIds(item)
      if (payload.neverExpires) {
        payload.issuedDate = ''
        payload.expiredDate = ''
      }
      if (id) await employeeCertificationService.update(employeeId, id, payload)
      else await employeeCertificationService.create(employeeId, payload)
    }

    for (const attachment of attachments.value) {
      await employeeAttachmentFileService.upload(employeeId, attachment.file, {
        ownerTable: 'employees',
        ownerId: employeeId,
        attachmentCategory: 'EMPLOYEE_DOCUMENT',
        attachmentType: 'FILE',
        attachmentName: attachment.file.name,
        accessLevel: 'PRIVATE',
        isConfidential: false
      })
    }
  } catch (error) {
    relatedError.value = error.message || 'Employee was saved, but related records could not be completed.'
    throw error
  } finally {
    savingRelated.value = false
  }
}

function stripIds(payload) {
  const clone = { ...payload }
  delete clone.id
  delete clone.employeeId
  delete clone.addressId
  delete clone.emergencyContactId
  delete clone.educationId
  delete clone.certificationId
  delete clone.createdAt
  delete clone.updatedAt
  return clone
}

async function submit() {
  if (!validate()) return
  const saved = await employeeStore.saveEmployee({ ...form }, route.params.employeeId)
  const employeeId = saved.employeeId || saved.id || route.params.employeeId
  await saveRelated(employeeId)
  router.push(`/employees/${employeeId}`)
}

onMounted(async () => {
  if (!isEdit.value) return
  const employee = await employeeStore.fetchEmployeeById(route.params.employeeId).catch(() => null)
  fillForm(employee)
  await loadRelated(route.params.employeeId)
})
</script>
