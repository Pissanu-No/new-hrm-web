<script setup>
const toast = useToast()

const departments = ref([
  { name: 'Engineering', head: 'David Kim', employeeCount: 68, budget: '$2.4M', utilization: 85, growth: 12, color: 'primary', members: [{ name: 'James Anderson', role: 'Senior Developer' }, { name: 'Robert Lee', role: 'Backend Developer' }] },
  { name: 'Marketing', head: 'Maria Garcia', employeeCount: 34, budget: '$890K', utilization: 72, growth: 8, color: 'success', members: [{ name: 'Anna White', role: 'Content Strategist' }] },
  { name: 'Sales', head: 'Alex Johnson', employeeCount: 42, budget: '$1.2M', utilization: 90, growth: 15, color: 'warning', members: [{ name: 'Tom Richards', role: 'Account Executive' }] },
  { name: 'HR', head: 'Sarah Wilson', employeeCount: 18, budget: '$450K', utilization: 65, growth: 5, color: 'info', members: [{ name: 'Michael Brown', role: 'HR Specialist' }] },
  { name: 'Design', head: 'Sophie Turner', employeeCount: 24, budget: '$680K', utilization: 78, growth: 10, color: 'error', members: [{ name: 'Emily Chen', role: 'Product Designer' }] },
  { name: 'Finance', head: 'Lisa Martinez', employeeCount: 22, budget: '$520K', utilization: 70, growth: 3, color: 'neutral', members: [{ name: 'Paul Walker', role: 'Accountant' }] }
])

// Add employee modal
const addEmployeeOpen = ref(false)
const selectedDept = ref('')
const empForm = ref({ name: '', email: '', role: '' })

function openAddEmployee(deptName) {
  selectedDept.value = deptName
  empForm.value = { name: '', email: '', role: '' }
  addEmployeeOpen.value = true
}

function handleAddEmployee() {
  if (!empForm.value.name || !empForm.value.role) return

  const dept = departments.value.find(d => d.name === selectedDept.value)
  if (dept) {
    dept.members.push({ name: empForm.value.name, role: empForm.value.role })
    dept.employeeCount++
  }
  addEmployeeOpen.value = false
  toast.add({ title: `${empForm.value.name} added to ${selectedDept.value}`, color: 'success', icon: 'i-lucide-check-circle' })
}

// Add department modal
const addDeptOpen = ref(false)
const deptForm = ref({ name: '', head: '', budget: '' })

function handleAddDept() {
  if (!deptForm.value.name || !deptForm.value.head) return

  departments.value.push({
    name: deptForm.value.name,
    head: deptForm.value.head,
    employeeCount: 0,
    budget: deptForm.value.budget || '$0',
    utilization: 0,
    growth: 0,
    color: 'primary',
    members: []
  })
  addDeptOpen.value = false
  deptForm.value = { name: '', head: '', budget: '' }
  toast.add({ title: `${departments.value[departments.value.length - 1].name} department created`, color: 'success', icon: 'i-lucide-check-circle' })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-(--ui-text-muted)">{{ departments.length }} departments in your organization</p>
      <UModal v-model:open="addDeptOpen" title="Add Department">
        <UButton label="Add Department" icon="i-lucide-plus" size="sm" />
        <template #body>
          <div class="flex flex-col gap-4">
            <UFormField label="Department Name" required>
              <UInput v-model="deptForm.name" placeholder="e.g. Operations" />
            </UFormField>
            <UFormField label="Department Head" required>
              <UInput v-model="deptForm.head" placeholder="e.g. John Smith" />
            </UFormField>
            <UFormField label="Budget">
              <UInput v-model="deptForm.budget" placeholder="e.g. $500K" />
            </UFormField>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton label="Cancel" variant="outline" color="neutral" @click="addDeptOpen = false" />
            <UButton label="Create" :disabled="!deptForm.name || !deptForm.head" @click="handleAddDept" />
          </div>
        </template>
      </UModal>
    </div>

    <!-- Department Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="dept in departments" :key="dept.name">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center size-10 rounded-lg bg-primary-50 dark:bg-primary-950">
                <UIcon name="i-lucide-building-2" class="size-5 text-primary-500" />
              </div>
              <div>
                <h3 class="font-semibold text-(--ui-text-highlighted)">{{ dept.name }}</h3>
                <p class="text-xs text-(--ui-text-muted)">Head: {{ dept.head }}</p>
              </div>
            </div>
            <UDropdownMenu
              :items="[
                [{ label: 'Edit', icon: 'i-lucide-pencil' }],
                [{ label: 'Delete', icon: 'i-lucide-trash-2' }]
              ]"
            >
              <UButton icon="i-lucide-ellipsis-vertical" variant="ghost" color="neutral" size="xs" />
            </UDropdownMenu>
          </div>
        </template>

        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-(--ui-text-muted)">Employees</p>
              <p class="text-lg font-bold text-(--ui-text-highlighted)">{{ dept.employeeCount }}</p>
            </div>
            <div>
              <p class="text-xs text-(--ui-text-muted)">Budget</p>
              <p class="text-lg font-bold text-(--ui-text-highlighted)">{{ dept.budget }}</p>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <p class="text-xs text-(--ui-text-muted)">Budget Utilization</p>
              <p class="text-xs font-medium">{{ dept.utilization }}%</p>
            </div>
            <UProgress :model-value="dept.utilization" :color="dept.color" size="xs" />
          </div>

          <div>
            <p class="text-xs text-(--ui-text-muted) mb-2">Recent Members</p>
            <div class="flex flex-col gap-2">
              <div v-for="member in dept.members.slice(0, 3)" :key="member.name" class="flex items-center gap-2">
                <UAvatar :alt="member.name" size="2xs" />
                <span class="text-xs text-(--ui-text-highlighted)">{{ member.name }}</span>
                <span class="text-xs text-(--ui-text-muted) ml-auto">{{ member.role }}</span>
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex items-center justify-between">
            <UBadge :color="dept.growth > 0 ? 'success' : 'error'" variant="subtle" size="xs">
              {{ dept.growth > 0 ? '+' : '' }}{{ dept.growth }}% growth
            </UBadge>
            <UButton label="Add Employee" size="xs" variant="soft" icon="i-lucide-user-plus" @click="openAddEmployee(dept.name)" />
          </div>
        </template>
      </UCard>
    </div>

    <!-- Add Employee to Department Modal -->
    <UModal v-model:open="addEmployeeOpen" :title="`Add Employee to ${selectedDept}`">
      <template #default />
      <template #body>
        <div class="flex flex-col gap-4">
          <UFormField label="Full Name" required>
            <UInput v-model="empForm.name" placeholder="e.g. John Doe" />
          </UFormField>
          <UFormField label="Email">
            <UInput v-model="empForm.email" type="email" placeholder="john@company.com" />
          </UFormField>
          <UFormField label="Role" required>
            <UInput v-model="empForm.role" placeholder="e.g. Senior Developer" />
          </UFormField>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton label="Cancel" variant="outline" color="neutral" @click="addEmployeeOpen = false" />
          <UButton label="Add" :disabled="!empForm.name || !empForm.role" @click="handleAddEmployee" />
        </div>
      </template>
    </UModal>
  </div>
</template>
