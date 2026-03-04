<script setup>
const tab = ref('general')

const org = ref({
  name: 'Acme Corporation',
  email: 'admin@acme.com',
  timezone: 'UTC-5 (Eastern)',
  workStart: '09:00',
  workEnd: '17:00'
})

const notifications = ref({
  leaveRequests: true,
  newHires: true,
  payroll: false,
  attendance: true,
  performance: false
})

const toast = useToast()

function saveGeneral() {
  toast.add({ title: 'Settings saved', color: 'success', icon: 'i-lucide-check-circle' })
}

const items = [
  { label: 'General', value: 'general', icon: 'i-lucide-settings' },
  { label: 'Notifications', value: 'notifications', icon: 'i-lucide-bell' },
  { label: 'Security', value: 'security', icon: 'i-lucide-shield' }
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-3xl">
    <UTabs v-model="tab" :items="items" class="w-full">
      <template #content="{ item }">
        <!-- General -->
        <UCard v-if="item.value === 'general'" class="mt-4">
          <div class="flex flex-col gap-4">
            <UFormField label="Organization Name">
              <UInput v-model="org.name" />
            </UFormField>
            <UFormField label="Admin Email">
              <UInput v-model="org.email" type="email" />
            </UFormField>
            <UFormField label="Timezone">
              <UInput v-model="org.timezone" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Work Start Time">
                <UInput v-model="org.workStart" type="time" />
              </UFormField>
              <UFormField label="Work End Time">
                <UInput v-model="org.workEnd" type="time" />
              </UFormField>
            </div>
            <div class="flex justify-end">
              <UButton label="Save Changes" @click="saveGeneral" />
            </div>
          </div>
        </UCard>

        <!-- Notifications -->
        <UCard v-if="item.value === 'notifications'" class="mt-4">
          <div class="flex flex-col gap-4">
            <div v-for="(value, key) in notifications" :key="key" class="flex items-center justify-between py-2">
              <div>
                <p class="text-sm font-medium text-(--ui-text-highlighted) capitalize">{{ String(key).replace(/([A-Z])/g, ' $1') }}</p>
                <p class="text-xs text-(--ui-text-muted)">Receive email notifications for {{ String(key).replace(/([A-Z])/g, ' $1').toLowerCase() }}</p>
              </div>
              <USwitch v-model="notifications[key]" />
            </div>
            <div class="flex justify-end">
              <UButton label="Save Preferences" @click="saveGeneral" />
            </div>
          </div>
        </UCard>

        <!-- Security -->
        <UCard v-if="item.value === 'security'" class="mt-4">
          <div class="flex flex-col gap-4">
            <UFormField label="Current Password">
              <UInput type="password" placeholder="Enter current password" />
            </UFormField>
            <UFormField label="New Password">
              <UInput type="password" placeholder="Enter new password" />
            </UFormField>
            <UFormField label="Confirm New Password">
              <UInput type="password" placeholder="Confirm new password" />
            </UFormField>
            <USeparator />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-(--ui-text-highlighted)">Two-Factor Authentication</p>
                <p class="text-xs text-(--ui-text-muted)">Add an extra layer of security to your account</p>
              </div>
              <UButton label="Enable" variant="outline" color="neutral" size="sm" />
            </div>
            <div class="flex justify-end">
              <UButton label="Update Password" @click="saveGeneral" />
            </div>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
