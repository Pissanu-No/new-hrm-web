<template>
  <div>
    <PageHeader
      :title="isEditMode ? 'Edit Employee' : 'Create Employee'"
      description="Create or update employee master data using the EmployeeRequest API contract."
    />

    <form class="rounded border border-slate-200 bg-white p-5 shadow-panel" @submit.prevent="handleSubmit">
      <section>
        <div class="rounded border border-slate-200 bg-slate-50 p-5">
          <div class="grid gap-5 md:grid-cols-[120px_1fr] md:items-center">
            <div class="grid h-28 w-28 place-items-center overflow-hidden rounded border border-slate-200 bg-white">
              <img
                v-if="profileImagePreviewUrl || form.profileImageUrl"
                :src="profileImagePreviewUrl || form.profileImageUrl"
                alt="Profile preview"
                class="h-full w-full object-cover"
              />
              <span v-else class="text-center text-xs font-medium text-slate-400">Profile image</span>
            </div>
            <div>
              <h3 class="text-base font-semibold text-slate-950">Profile Image</h3>
              <p class="mt-1 text-sm text-slate-500">
                Upload the employee photo first so the profile is visually identifiable while the record is being completed.
              </p>
              <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input class="form-input sm:max-w-md" type="file" accept="image/*" @change="handleProfileImageChange" />
                <button
                  v-if="profileImagePreviewUrl || form.profileImageUrl"
                  type="button"
                  class="rounded border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600"
                  @click="clearProfileImage"
                >
                  Remove image
                </button>
              </div>
              <p v-if="profileImageFileName" class="mt-2 truncate text-xs text-slate-500">
                {{ profileImageFileName }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Employment</h3>
        <div class="mt-4 grid gap-5 md:grid-cols-2">
          <FormField label="Employee Code" required>
            <input v-model.trim="form.employeeCode" class="form-input" type="text" required maxlength="50" />
          </FormField>
          <FormField label="Employee Status" required>
            <select v-model="form.employeeStatus" class="form-input" required>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="PROBATION">PROBATION</option>
              <option value="RESIGNED">RESIGNED</option>
              <option value="TERMINATED">TERMINATED</option>
            </select>
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Name in English</h3>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FormField label="Title">
            <select v-model="form.titleName" class="form-input">
              <option value="">Select title</option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Other">Other</option>
            </select>
          </FormField>
          <FormField label="First Name" required>
            <input v-model.trim="form.firstName" class="form-input" type="text" required maxlength="255" />
          </FormField>
          <FormField label="Middle Name">
            <input v-model.trim="form.middleName" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Last Name" required>
            <input v-model.trim="form.lastName" class="form-input" type="text" required maxlength="255" />
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Name in Thai</h3>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <FormField label="Title">
            <select v-model="form.titleNameLocal" class="form-input">
              <option value="">เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นางสาว">นางสาว</option>
              <option value="นาง">นาง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>
          </FormField>
          <FormField label="First Name">
            <input v-model.trim="form.firstNameLocal" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Middle Name">
            <input v-model.trim="form.middleNameLocal" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Last Name">
            <input v-model.trim="form.lastNameLocal" class="form-input" type="text" maxlength="255" />
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Personal Information</h3>
        <p class="mt-1 text-sm text-slate-500">
          Record demographic and personal profile details used for employee master data and HR records.
        </p>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField label="Preferred Name">
            <input v-model.trim="form.preferredName" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Gender">
            <select v-model="form.gender" class="form-input">
              <option value="">Select gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
              <option value="NOT_SPECIFIED">NOT_SPECIFIED</option>
            </select>
          </FormField>
          <FormField label="Birth Date">
            <input v-model="form.birthDate" class="form-input" type="date" />
          </FormField>
          <FormField label="Nationality">
            <input v-model.trim="form.nationality" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Marital Status">
            <select v-model="form.maritalStatus" class="form-input">
              <option value="">Select marital status</option>
              <option value="SINGLE">SINGLE</option>
              <option value="MARRIED">MARRIED</option>
              <option value="DIVORCED">DIVORCED</option>
              <option value="WIDOWED">WIDOWED</option>
            </select>
          </FormField>
          <FormField label="Blood Type">
            <select v-model="form.bloodType" class="form-input">
              <option value="">Select blood type</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="AB">AB</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </FormField>
          <FormField label="Address">
            <textarea v-model.trim="form.address" class="form-input min-h-24 resize-y" maxlength="500" />
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Government and Education</h3>
        <p class="mt-1 text-sm text-slate-500">
          Capture government identification numbers and the highest education level stored directly on the employee profile.
        </p>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField label="National ID">
            <input v-model.trim="form.nationalId" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Passport No.">
            <input v-model.trim="form.passportNo" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Tax No.">
            <input v-model.trim="form.taxNo" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Social Security No.">
            <input v-model.trim="form.socialSecurityNo" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Highest Education Level">
            <select v-model="form.highestEducationLevel" class="form-input">
              <option value="">Select education level</option>
              <option value="HIGH_SCHOOL">HIGH_SCHOOL</option>
              <option value="DIPLOMA">DIPLOMA</option>
              <option value="BACHELOR">BACHELOR</option>
              <option value="MASTER">MASTER</option>
              <option value="DOCTORATE">DOCTORATE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Contact</h3>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField label="Personal Email">
            <input v-model.trim="form.personalEmail" class="form-input" type="email" maxlength="255" />
          </FormField>
          <FormField label="Work Email">
            <input v-model.trim="form.workEmail" class="form-input" type="email" maxlength="255" />
          </FormField>
          <FormField label="Mobile Phone">
            <input v-model.trim="form.mobilePhone" class="form-input" type="tel" maxlength="50" />
          </FormField>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Emergency Contact</h3>
            <p class="mt-1 text-sm text-slate-500">
              Add people HR can contact in urgent situations. Entries are held until the employee profile is saved.
            </p>
          </div>
          <button type="button" class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white" @click="openEmergencyContactModal">
            Add Contact
          </button>
        </div>
        <div class="mt-4 overflow-hidden rounded border border-slate-200">
          <div v-for="(contact, index) in draftEmergencyContacts" :key="index" class="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ contact.contactName }}</p>
              <p class="text-sm text-slate-500">{{ contact.relationship }} · {{ contact.mobilePhone || '-' }}</p>
            </div>
            <button type="button" class="text-sm font-medium text-rose-600" @click="removeEmergencyContactDraft(index)">Remove</button>
          </div>
          <p v-if="draftEmergencyContacts.length === 0" class="px-4 py-6 text-sm text-slate-500">No emergency contacts added.</p>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Education</h3>
            <p class="mt-1 text-sm text-slate-500">
              Capture education history one record at a time. Records are submitted after the employeeId is created.
            </p>
          </div>
          <button type="button" class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white" @click="openEducationModal">
            Add Education
          </button>
        </div>
        <div class="mt-4 overflow-hidden rounded border border-slate-200">
          <div v-for="(education, index) in draftEducations" :key="index" class="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ education.institutionName }}</p>
              <p class="text-sm text-slate-500">{{ education.educationLevel }} · {{ education.major || '-' }}</p>
            </div>
            <button type="button" class="text-sm font-medium text-rose-600" @click="removeEducationDraft(index)">Remove</button>
          </div>
          <p v-if="draftEducations.length === 0" class="px-4 py-6 text-sm text-slate-500">No education records added.</p>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Certificate</h3>
            <p class="mt-1 text-sm text-slate-500">
              Track licenses, credentials, and training certificates as separate rows before final submission.
            </p>
          </div>
          <button type="button" class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white" @click="openCertificationModal">
            Add Certificate
          </button>
        </div>
        <div class="mt-4 overflow-hidden rounded border border-slate-200">
          <div v-for="(certification, index) in draftCertifications" :key="index" class="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ certification.certificationName }}</p>
              <p class="text-sm text-slate-500">{{ certification.issuingOrganization || '-' }} · {{ certification.issuedDate || '-' }}</p>
            </div>
            <button type="button" class="text-sm font-medium text-rose-600" @click="removeCertificationDraft(index)">Remove</button>
          </div>
          <p v-if="draftCertifications.length === 0" class="px-4 py-6 text-sm text-slate-500">No certificates added.</p>
        </div>
      </section>

      <section class="mt-8 border-t border-slate-200 pt-6">
        <h3 class="text-base font-semibold text-slate-950">Attachment Files</h3>
        <div class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <FormField label="Upload Document" class="flex-1">
            <input class="form-input" type="file" @change="handleAttachmentFileChange" />
            <p v-if="selectedAttachmentFileName" class="mt-1 truncate text-xs text-slate-500">
              {{ selectedAttachmentFileName }}
            </p>
          </FormField>
          <button type="button" class="rounded bg-brand-700 px-3 py-2 text-sm font-semibold text-white" @click="confirmAttachmentFileDraft">
            Add Attachment
          </button>
        </div>
        <div class="mt-4 overflow-hidden rounded border border-slate-200">
          <div v-for="(attachment, index) in draftAttachmentFiles" :key="index" class="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3 last:border-b-0">
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ attachment.attachmentName }}</p>
            </div>
            <button type="button" class="text-sm font-medium text-rose-600" @click="removeAttachmentFileDraft(index)">Remove</button>
          </div>
          <p v-if="draftAttachmentFiles.length === 0" class="px-4 py-6 text-sm text-slate-500">No attachments added.</p>
        </div>
      </section>

      <div class="mt-6 flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <RouterLink to="/employees" class="rounded border border-slate-300 px-4 py-2 text-center text-sm font-medium text-slate-700">
          Cancel
        </RouterLink>
        <button
          type="submit"
          class="rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900 disabled:bg-slate-300"
          :disabled="saving"
        >
          {{ saving ? 'Saving...' : 'Save Employee' }}
        </button>
      </div>
    </form>

    <p v-if="error" class="mt-4 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
      {{ error.message }}
    </p>

    <div v-if="emergencyContactModalOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div class="w-full max-w-3xl rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-950">Add Emergency Contact</h3>
        </div>
        <div class="mt-4 grid gap-5 md:grid-cols-2">
          <FormField label="Contact Name" required>
            <input v-model.trim="emergencyContactForm.contactName" class="form-input" type="text" required maxlength="255" />
          </FormField>
          <FormField label="Relationship" required>
            <input v-model.trim="emergencyContactForm.relationship" class="form-input" type="text" required maxlength="100" />
          </FormField>
          <FormField label="Mobile Phone">
            <input v-model.trim="emergencyContactForm.mobilePhone" class="form-input" type="tel" maxlength="50" />
          </FormField>
          <FormField label="Alternate Phone">
            <input v-model.trim="emergencyContactForm.alternatePhone" class="form-input" type="tel" maxlength="50" />
          </FormField>
          <FormField label="Email">
            <input v-model.trim="emergencyContactForm.email" class="form-input" type="email" maxlength="255" />
          </FormField>
          <FormField label="Note">
            <textarea v-model.trim="emergencyContactForm.note" class="form-input min-h-24 resize-y" maxlength="1000" />
          </FormField>
        </div>
        <div class="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button type="button" class="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" @click="emergencyContactModalOpen = false">Cancel</button>
          <button type="button" class="rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white" @click="confirmEmergencyContactDraft">Confirm</button>
        </div>
      </div>
    </div>

    <div v-if="educationModalOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div class="w-full max-w-4xl rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-950">Add Education</h3>
        </div>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField label="Education Level" required>
            <input v-model.trim="educationForm.educationLevel" class="form-input" type="text" required maxlength="100" />
          </FormField>
          <FormField label="Institution Name" required>
            <input v-model.trim="educationForm.institutionName" class="form-input" type="text" required maxlength="255" />
          </FormField>
          <FormField label="Institution Thai Name">
            <input v-model.trim="educationForm.institutionNameLocal" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Faculty">
            <input v-model.trim="educationForm.faculty" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Major">
            <input v-model.trim="educationForm.major" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="GPA">
            <input v-model.number="educationForm.gpa" class="form-input" type="number" min="0" max="4" step="0.01" />
          </FormField>
          <FormField label="Description">
            <textarea v-model.trim="educationForm.description" class="form-input min-h-24 resize-y" maxlength="1000" />
          </FormField>
        </div>
        <div class="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button type="button" class="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" @click="educationModalOpen = false">Cancel</button>
          <button type="button" class="rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white" @click="confirmEducationDraft">Confirm</button>
        </div>
      </div>
    </div>

    <div v-if="certificationModalOpen" class="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4">
      <div class="w-full max-w-4xl rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-slate-950">Add Certificate</h3>
        </div>
        <div class="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FormField label="Certification Name" required>
            <input v-model.trim="certificationForm.certificationName" class="form-input" type="text" required maxlength="255" />
          </FormField>
          <FormField label="Certification Code">
            <input v-model.trim="certificationForm.certificationCode" class="form-input" type="text" maxlength="100" />
          </FormField>
          <FormField label="Issuing Organization">
            <input v-model.trim="certificationForm.issuingOrganization" class="form-input" type="text" maxlength="255" />
          </FormField>
          <FormField label="Credential ID">
            <input v-model.trim="certificationForm.credentialId" class="form-input" type="text" maxlength="255" />
          </FormField>
          <div class="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-4 py-3 lg:col-span-3">
            <span class="text-sm font-medium text-slate-700">Never expires</span>
            <button
              type="button"
              role="switch"
              :aria-checked="certificationForm.neverExpires"
              aria-label="Never expires"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              :class="certificationForm.neverExpires ? 'bg-brand-700' : 'bg-slate-300'"
              @click="toggleCertificationNeverExpires"
            >
              <span
                class="inline-block h-5 w-5 rounded-full bg-white transition-transform"
                :class="certificationForm.neverExpires ? 'translate-x-5' : 'translate-x-1'"
              />
            </button>
          </div>
          <FormField v-if="!certificationForm.neverExpires" label="Issued Date">
            <input v-model="certificationForm.issuedDate" class="form-input" type="date" />
          </FormField>
          <FormField v-if="!certificationForm.neverExpires" label="Expired Date">
            <input v-model="certificationForm.expiredDate" class="form-input" type="date" />
          </FormField>
          <FormField label="Description" class="lg:col-span-3">
            <textarea v-model.trim="certificationForm.description" class="form-input min-h-28 resize-y" maxlength="1000" />
          </FormField>
        </div>
        <div class="mt-5 flex justify-end gap-3 border-t border-slate-200 pt-4">
          <button type="button" class="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" @click="certificationModalOpen = false">Cancel</button>
          <button type="button" class="rounded bg-brand-700 px-4 py-2 text-sm font-semibold text-white" @click="confirmCertificationDraft">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import FormField from '@/components/forms/FormField.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { useEmployeeStore } from '@/stores/employeeStore'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => Boolean(route.params.id))
const employeeStore = useEmployeeStore()
const {
  current,
  saving,
  error,
  draftEmergencyContacts,
  draftEducations,
  draftCertifications,
  draftAttachmentFiles
} = storeToRefs(employeeStore)
const profileImageFile = ref(null)
const profileImageFileName = ref('')
const profileImagePreviewUrl = ref('')
const selectedAttachmentFile = ref(null)
const selectedAttachmentFileName = ref('')
const emergencyContactModalOpen = ref(false)
const educationModalOpen = ref(false)
const certificationModalOpen = ref(false)

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
  address: '',
  maritalStatus: '',
  bloodType: '',
  nationalId: '',
  passportNo: '',
  taxNo: '',
  socialSecurityNo: '',
  highestEducationLevel: '',
  personalEmail: '',
  workEmail: '',
  mobilePhone: '',
  employeeStatus: 'ACTIVE',
  profileImageUrl: ''
})

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
  priorityNo: null,
  isPrimary: null,
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
  isHighestEducation: null,
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

async function loadEmployeeForEdit() {
  if (!isEditMode.value) return

  try {
    await employeeStore.fetchEmployee(route.params.id)
    Object.assign(form, current.value || {})
  } catch {
    // Store state owns the displayed error.
  }
}

async function handleSubmit() {
  try {
    const payload = buildEmployeePayload()
    let employeeId = route.params.id

    if (isEditMode.value) {
      await employeeStore.updateEmployee(employeeId, payload)
    } else {
      const createdEmployee = await employeeStore.createEmployee(payload)
      employeeId = createdEmployee?.employeeId
    }

    if (employeeId) {
      await saveRelatedRecords(employeeId)
    }

    await router.push('/employees')
  } catch {
    // Store state owns the displayed error.
  }
}

onMounted(loadEmployeeForEdit)
onBeforeUnmount(revokeProfileImagePreview)

function buildEmployeePayload() {
  const payload = {}

  for (const [key, value] of Object.entries(form)) {
    payload[key] = typeof value === 'string' ? value.trim() : value
  }

  return payload
}

function handleProfileImageChange(event) {
  const file = event.target.files?.[0]

  revokeProfileImagePreview()
  profileImageFile.value = file || null
  profileImageFileName.value = file?.name || ''

  if (file) {
    profileImagePreviewUrl.value = URL.createObjectURL(file)
  }
}

function clearProfileImage() {
  revokeProfileImagePreview()
  profileImageFile.value = null
  profileImageFileName.value = ''
  form.profileImageUrl = ''
}

function revokeProfileImagePreview() {
  if (profileImagePreviewUrl.value) {
    URL.revokeObjectURL(profileImagePreviewUrl.value)
    profileImagePreviewUrl.value = ''
  }
}

async function saveRelatedRecords(employeeId) {
  const tasks = []

  tasks.push(
    ...draftEmergencyContacts.value.map((contact) => employeeStore.createEmergencyContact(employeeId, contact)),
    ...draftEducations.value.map((education) => employeeStore.createEducation(employeeId, education)),
    ...draftCertifications.value.map((certification) => employeeStore.createCertification(employeeId, certification)),
    ...draftAttachmentFiles.value.map((attachmentFile) =>
      employeeStore.createAttachmentFile(employeeId, { ...attachmentFile, ownerId: employeeId })
    )
  )

  await Promise.all(tasks)
  employeeStore.clearRelatedDrafts()
}

function openEmergencyContactModal() {
  resetForm(emergencyContactForm, { priorityNo: null, isPrimary: null })
  emergencyContactModalOpen.value = true
}

function confirmEmergencyContactDraft() {
  if (!hasRequiredValues(emergencyContactForm, ['contactName', 'relationship'])) return
  employeeStore.addDraftEmergencyContact({
    ...buildPayload(emergencyContactForm),
    priorityNo: null,
    isPrimary: null
  })
  emergencyContactModalOpen.value = false
}

function removeEmergencyContactDraft(index) {
  employeeStore.removeDraftEmergencyContact(index)
}

function openEducationModal() {
  resetForm(educationForm, { gpa: null, isHighestEducation: null })
  educationModalOpen.value = true
}

function confirmEducationDraft() {
  if (!hasRequiredValues(educationForm, ['educationLevel', 'institutionName'])) return
  employeeStore.addDraftEducation({
    ...buildPayload(educationForm),
    isHighestEducation: null
  })
  educationModalOpen.value = false
}

function removeEducationDraft(index) {
  employeeStore.removeDraftEducation(index)
}

function openCertificationModal() {
  resetForm(certificationForm, { neverExpires: false })
  certificationModalOpen.value = true
}

function toggleCertificationNeverExpires() {
  certificationForm.neverExpires = !certificationForm.neverExpires

  if (certificationForm.neverExpires) {
    certificationForm.issuedDate = ''
    certificationForm.expiredDate = ''
  }
}

function confirmCertificationDraft() {
  if (!hasRequiredValues(certificationForm, ['certificationName'])) return
  employeeStore.addDraftCertification(buildPayload(certificationForm))
  certificationModalOpen.value = false
}

function removeCertificationDraft(index) {
  employeeStore.removeDraftCertification(index)
}

function handleAttachmentFileChange(event) {
  const file = event.target.files?.[0] || null
  selectedAttachmentFile.value = file
  selectedAttachmentFileName.value = file?.name || ''
}

function confirmAttachmentFileDraft() {
  const file = selectedAttachmentFile.value
  if (!file) return

  employeeStore.addDraftAttachmentFile(buildAttachmentFilePayload(file))
  selectedAttachmentFile.value = null
  selectedAttachmentFileName.value = ''
}

function removeAttachmentFileDraft(index) {
  employeeStore.removeDraftAttachmentFile(index)
}

function hasRequiredValues(source, keys) {
  return keys.every((key) => {
    const value = source[key]
    return typeof value === 'string' ? value.trim() : value !== null && value !== undefined && value !== ''
  })
}

function buildPayload(source) {
  const payload = {}

  for (const [key, value] of Object.entries(source)) {
    payload[key] = typeof value === 'string' ? value.trim() : value
  }

  return payload
}

function buildAttachmentFilePayload(file) {
  return {
    ownerTable: 'employees',
    ownerId: '',
    attachmentCategory: 'EMPLOYEE_DOCUMENT',
    attachmentType: 'FILE',
    attachmentName: file.name,
    description: null,
    fileName: file.name,
    originalFileName: file.name,
    fileExtension: getFileExtension(file.name),
    mimeType: file.type || null,
    fileSize: file.size,
    storageProvider: null,
    blobContainerName: null,
    blobName: null,
    filePath: null,
    fileUrl: null,
    checksum: null,
    accessLevel: null,
    isConfidential: null,
    uploadedAt: null,
    uploadedBy: null
  }
}

function getFileExtension(fileName) {
  const extension = fileName.split('.').pop()
  return extension && extension !== fileName ? extension : null
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
