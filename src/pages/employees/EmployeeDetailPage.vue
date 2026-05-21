<template>
  <div>
    <PageHeader
      title="Employee Detail"
      description="Employee profile shell prepared for backend profile data."
    >
      <template #actions>
        <RouterLink
          :to="`/employees/${route.params.id}/edit`"
          class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white hover:bg-brand-900"
        >
          Edit Employee
        </RouterLink>
      </template>
    </PageHeader>

    <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
      <div v-if="loading" class="text-sm text-slate-500">Loading employee profile...</div>
      <div v-else-if="current" class="grid gap-5 md:grid-cols-2">
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Employee No.</p>
          <p class="mt-1 text-sm font-semibold text-slate-900">{{ current.employeeCode }}</p>
        </div>
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Full Name</p>
          <p class="mt-1 text-sm font-semibold text-slate-900">{{ getFullName(current) }}</p>
        </div>
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Work Email</p>
          <p class="mt-1 text-sm font-semibold text-slate-900">{{ current.workEmail || '-' }}</p>
        </div>
        <div>
          <p class="text-xs font-medium uppercase tracking-wide text-slate-400">Status</p>
          <p class="mt-1 text-sm font-semibold text-slate-900">{{ current.employeeStatus }}</p>
        </div>
      </div>
      <EmptyState
        v-else
        title="Employee profile unavailable"
        description="The detail endpoint did not return a profile record."
        :icon="UserRound"
      />
    </div>

    <section class="mt-6 rounded border border-slate-200 bg-white p-5 shadow-panel">
      <h3 class="text-base font-semibold text-slate-950">Emergency Contacts</h3>
      <form class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4" @submit.prevent="createEmergencyContact">
        <input v-model.trim="emergencyContactForm.contactName" class="form-input" required maxlength="255" placeholder="Contact name" />
        <input v-model.trim="emergencyContactForm.relationship" class="form-input" required maxlength="100" placeholder="Relationship" />
        <input v-model.trim="emergencyContactForm.mobilePhone" class="form-input" maxlength="50" placeholder="Mobile phone" />
        <button class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" :disabled="saving">
          Add Contact
        </button>
      </form>
      <div class="mt-4 divide-y divide-slate-100">
        <div v-for="contact in emergencyContacts" :key="contact.emergencyContactId" class="flex items-center justify-between gap-4 py-3">
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ contact.contactName }}</p>
            <p class="text-sm text-slate-500">{{ contact.relationship }} · {{ contact.mobilePhone || '-' }}</p>
          </div>
          <button class="text-sm font-medium text-rose-600" @click="deleteEmergencyContact(contact.emergencyContactId)">Delete</button>
        </div>
        <p v-if="!relatedLoading && emergencyContacts.length === 0" class="py-4 text-sm text-slate-500">No emergency contacts.</p>
      </div>
    </section>

    <section class="mt-6 rounded border border-slate-200 bg-white p-5 shadow-panel">
      <h3 class="text-base font-semibold text-slate-950">Educations</h3>
      <form class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4" @submit.prevent="createEducation">
        <input v-model.trim="educationForm.educationLevel" class="form-input" required maxlength="100" placeholder="Education level" />
        <input v-model.trim="educationForm.institutionName" class="form-input" required maxlength="255" placeholder="Institution" />
        <input v-model.trim="educationForm.major" class="form-input" maxlength="255" placeholder="Major" />
        <button class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" :disabled="saving">
          Add Education
        </button>
      </form>
      <div class="mt-4 divide-y divide-slate-100">
        <div v-for="education in educations" :key="education.educationId" class="flex items-center justify-between gap-4 py-3">
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ education.institutionName }}</p>
            <p class="text-sm text-slate-500">{{ education.educationLevel }} · {{ education.major || '-' }}</p>
          </div>
          <button class="text-sm font-medium text-rose-600" @click="deleteEducation(education.educationId)">Delete</button>
        </div>
        <p v-if="!relatedLoading && educations.length === 0" class="py-4 text-sm text-slate-500">No education records.</p>
      </div>
    </section>

    <section class="mt-6 rounded border border-slate-200 bg-white p-5 shadow-panel">
      <h3 class="text-base font-semibold text-slate-950">Certifications</h3>
      <form class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4" @submit.prevent="createCertification">
        <input v-model.trim="certificationForm.certificationName" class="form-input" required maxlength="255" placeholder="Certification name" />
        <input v-model.trim="certificationForm.issuingOrganization" class="form-input" maxlength="255" placeholder="Issuing organization" />
        <input v-model="certificationForm.issuedDate" class="form-input" type="date" />
        <button class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" :disabled="saving">
          Add Certification
        </button>
      </form>
      <div class="mt-4 divide-y divide-slate-100">
        <div v-for="certification in certifications" :key="certification.certificationId" class="flex items-center justify-between gap-4 py-3">
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ certification.certificationName }}</p>
            <p class="text-sm text-slate-500">{{ certification.issuingOrganization || '-' }} · {{ certification.issuedDate || '-' }}</p>
          </div>
          <button class="text-sm font-medium text-rose-600" @click="deleteCertification(certification.certificationId)">Delete</button>
        </div>
        <p v-if="!relatedLoading && certifications.length === 0" class="py-4 text-sm text-slate-500">No certifications.</p>
      </div>
    </section>

    <section class="mt-6 rounded border border-slate-200 bg-white p-5 shadow-panel">
      <h3 class="text-base font-semibold text-slate-950">Attachment Files</h3>
      <form class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4" @submit.prevent="createAttachmentFile">
        <input v-model.trim="attachmentFileForm.attachmentCategory" class="form-input" required maxlength="100" placeholder="Category" />
        <input v-model.trim="attachmentFileForm.attachmentType" class="form-input" required maxlength="100" placeholder="Type" />
        <input v-model.trim="attachmentFileForm.attachmentName" class="form-input" required maxlength="255" placeholder="Attachment name" />
        <input v-model.trim="attachmentFileForm.fileName" class="form-input" required maxlength="255" placeholder="File name" />
        <input v-model.trim="attachmentFileForm.fileUrl" class="form-input lg:col-span-3" maxlength="1000" placeholder="File URL" />
        <button class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white disabled:bg-slate-300" :disabled="saving">
          Add Attachment
        </button>
      </form>
      <div class="mt-4 divide-y divide-slate-100">
        <div v-for="attachment in attachmentFiles" :key="attachment.attachmentFileId" class="flex items-center justify-between gap-4 py-3">
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ attachment.attachmentName }}</p>
            <p class="text-sm text-slate-500">{{ attachment.attachmentCategory }} · {{ attachment.fileName }}</p>
          </div>
          <button class="text-sm font-medium text-rose-600" @click="deleteAttachmentFile(attachment.attachmentFileId)">Delete</button>
        </div>
        <p v-if="!relatedLoading && attachmentFiles.length === 0" class="py-4 text-sm text-slate-500">No attachment file metadata.</p>
      </div>
    </section>

    <p v-if="error" class="mt-4 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ error.message }}
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { UserRound } from 'lucide-vue-next'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const route = useRoute()
const employeeStore = useEmployeeStore()
const {
  current,
  emergencyContacts,
  educations,
  certifications,
  attachmentFiles,
  loading,
  relatedLoading,
  saving,
  error
} = storeToRefs(employeeStore)

const emergencyContactForm = reactive({
  contactName: '',
  relationship: '',
  mobilePhone: '',
  alternatePhone: '',
  email: '',
  addressLine1: '',
  addressLine2: '',
  province: '',
  country: '',
  postalCode: '',
  priorityNo: 1,
  isPrimary: false,
  note: ''
})

const educationForm = reactive({
  educationLevel: '',
  institutionName: '',
  institutionNameLocal: '',
  faculty: '',
  major: '',
  degreeName: '',
  degreeNameLocal: '',
  country: '',
  startDate: '',
  graduationDate: '',
  gpa: null,
  isHighestEducation: false,
  description: ''
})

const certificationForm = reactive({
  certificationName: '',
  certificationCode: '',
  issuingOrganization: '',
  credentialId: '',
  credentialUrl: '',
  issuedDate: '',
  expiredDate: '',
  neverExpires: false,
  certificationStatus: '',
  description: ''
})

const attachmentFileForm = reactive({
  ownerTable: 'employees',
  ownerId: '',
  attachmentCategory: '',
  attachmentType: '',
  attachmentName: '',
  description: '',
  fileName: '',
  originalFileName: '',
  fileExtension: '',
  mimeType: '',
  fileSize: null,
  storageProvider: '',
  blobContainerName: '',
  blobName: '',
  filePath: '',
  fileUrl: '',
  checksum: '',
  accessLevel: '',
  isConfidential: false,
  uploadedAt: '',
  uploadedBy: ''
})

async function loadEmployee() {
  try {
    await employeeStore.fetchEmployee(route.params.id)
    await employeeStore.fetchEmployeeRelated(route.params.id)
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadEmployee)

function getFullName(employee) {
  return [employee.firstName, employee.middleName, employee.lastName].filter(Boolean).join(' ')
}

async function createEmergencyContact() {
  try {
    await employeeStore.createEmergencyContact(route.params.id, buildPayload(emergencyContactForm))
    resetForm(emergencyContactForm, { priorityNo: 1, isPrimary: false })
  } catch {}
}

async function deleteEmergencyContact(emergencyContactId) {
  try {
    await employeeStore.deleteEmergencyContact(route.params.id, emergencyContactId)
  } catch {}
}

async function createEducation() {
  try {
    await employeeStore.createEducation(route.params.id, buildPayload(educationForm))
    resetForm(educationForm, { gpa: null, isHighestEducation: false })
  } catch {}
}

async function deleteEducation(educationId) {
  try {
    await employeeStore.deleteEducation(route.params.id, educationId)
  } catch {}
}

async function createCertification() {
  try {
    await employeeStore.createCertification(route.params.id, buildPayload(certificationForm))
    resetForm(certificationForm, { neverExpires: false })
  } catch {}
}

async function deleteCertification(certificationId) {
  try {
    await employeeStore.deleteCertification(route.params.id, certificationId)
  } catch {}
}

async function createAttachmentFile() {
  try {
    attachmentFileForm.ownerId = route.params.id
    await employeeStore.createAttachmentFile(route.params.id, buildPayload(attachmentFileForm))
    resetForm(attachmentFileForm, { ownerTable: 'employees', ownerId: '', fileSize: null, isConfidential: false })
  } catch {}
}

async function deleteAttachmentFile(attachmentFileId) {
  try {
    await employeeStore.deleteAttachmentFile(route.params.id, attachmentFileId)
  } catch {}
}

function buildPayload(source) {
  const payload = {}

  for (const [key, value] of Object.entries(source)) {
    payload[key] = typeof value === 'string' ? value.trim() : value
  }

  return payload
}

function resetForm(target, defaults = {}) {
  for (const key of Object.keys(target)) {
    target[key] = ''
  }

  Object.assign(target, defaults)
}
</script>

<style scoped>
.form-input {
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e1;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #0f172a;
  outline: none;
}

.form-input:focus {
  border-color: #0891b2;
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.12);
}
</style>
