<script setup>
import { h, resolveComponent } from 'vue'

const initialEmployees = [
  { id: 'EMP-001', name: 'James Anderson', email: 'james@company.com', phone: '+1 (555) 100-1001', department: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: 'Jan 15, 2023' },
  { id: 'EMP-002', name: 'Maria Garcia', email: 'maria@company.com', phone: '+1 (555) 100-1002', department: 'Marketing', role: 'Marketing Manager', status: 'active', joinDate: 'Mar 20, 2022' },
  { id: 'EMP-003', name: 'David Kim', email: 'david@company.com', phone: '+1 (555) 100-1003', department: 'Engineering', role: 'Tech Lead', status: 'active', joinDate: 'Feb 10, 2021' },
  { id: 'EMP-004', name: 'Sophie Turner', email: 'sophie@company.com', phone: '+1 (555) 100-1004', department: 'Design', role: 'UI/UX Designer', status: 'on-leave', joinDate: 'Jul 05, 2023' },
  { id: 'EMP-005', name: 'Alex Johnson', email: 'alex@company.com', phone: '+1 (555) 100-1005', department: 'Sales', role: 'Sales Executive', status: 'active', joinDate: 'Nov 12, 2022' },
  { id: 'EMP-006', name: 'Emily Chen', email: 'emily@company.com', phone: '+1 (555) 100-1006', department: 'Design', role: 'Product Designer', status: 'active', joinDate: 'Sep 28, 2023' },
  { id: 'EMP-007', name: 'Robert Lee', email: 'robert@company.com', phone: '+1 (555) 100-1007', department: 'Engineering', role: 'Backend Developer', status: 'active', joinDate: 'Apr 02, 2022' },
  { id: 'EMP-008', name: 'Anna White', email: 'anna@company.com', phone: '+1 (555) 100-1008', department: 'Marketing', role: 'Content Strategist', status: 'inactive', joinDate: 'Jun 18, 2021' },
  { id: 'EMP-009', name: 'Michael Brown', email: 'michael@company.com', phone: '+1 (555) 100-1009', department: 'HR', role: 'HR Specialist', status: 'active', joinDate: 'Aug 30, 2022' },
  { id: 'EMP-010', name: 'Lisa Martinez', email: 'lisa@company.com', phone: '+1 (555) 100-1010', department: 'Finance', role: 'Financial Analyst', status: 'active', joinDate: 'Dec 05, 2023' }
]

const employees = ref([...initialEmployees])
const search = ref('')
const departmentFilter = ref('all')
const addModalOpen = ref(false)
const toast = useToast()

const allDepartments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations', 'Legal']

const form = ref({
  name: '',
  email: '',
  phone: '',
  department: '',
  role: ''
})

const filtered = computed(() => {
  return employees.value.filter((emp) => {
    const matchSearch = !search.value ||
      emp.name.toLowerCase().includes(search.value.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.value.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.value.toLowerCase())
    const matchDept = departmentFilter.value === 'all' || emp.department === departmentFilter.value
    return matchSearch && matchDept
  })
})

const departments = computed(() => [...new Set(employees.value.map(e => e.department))])

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UAvatar = resolveComponent('UAvatar')

const columns = [
  {
    accessorKey: 'name',
    header: 'Employee',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, { alt: row.original.name, size: 'sm' }),
        h('div', {}, [
          h('p', { class: 'text-sm font-medium' }, row.original.name),
          h('p', { class: 'text-xs text-(--ui-text-muted)' }, row.original.email)
        ])
      ])
    }
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'department',
    header: 'Department'
  },
  {
    accessorKey: 'role',
    header: 'Role'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const colorMap = {
        active: 'success',
        'on-leave': 'warning',
        inactive: 'error'
      }
      return h(UBadge, {
        color: colorMap[row.original.status] || 'neutral',
        variant: 'subtle',
        size: 'xs',
        class: 'capitalize'
      }, () => row.original.status.replace('-', ' '))
    }
  },
  {
    accessorKey: 'joinDate',
    header: 'Join Date'
  },
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => {
      return h(UDropdownMenu, {
        items: [
          [{ label: 'View Profile', icon: 'i-lucide-eye' }],
          [{ label: 'Edit', icon: 'i-lucide-pencil' }],
          [{
            label: 'Delete',
            icon: 'i-lucide-trash-2',
            onSelect: () => {
              employees.value = employees.value.filter(e => e.id !== row.original.id)
              toast.add({ title: `${row.original.name} removed`, color: 'success', icon: 'i-lucide-check-circle' })
            }
          }]
        ]
      }, () => h(UButton, {
        icon: 'i-lucide-ellipsis-vertical',
        variant: 'ghost',
        color: 'neutral',
        size: 'xs'
      }))
    }
  }
]

function handleAdd() {
  if (!form.value.name || !form.value.email || !form.value.department || !form.value.role) return

  const id = `EMP-${String(employees.value.length + 1).padStart(3, '0')}`
  const now = new Date()
  const joinDate = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  employees.value.unshift({
    id,
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone || 'N/A',
    department: form.value.department,
    role: form.value.role,
    status: 'active',
    joinDate
  })

  form.value = { name: '', email: '', phone: '', department: '', role: '' }
  addModalOpen.value = false
  toast.add({ title: 'Employee added successfully', color: 'success', icon: 'i-lucide-check-circle' })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Toolbar -->
    <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
      <div class="flex items-center gap-3">
        <UInput
          v-model="search"
          icon="i-lucide-search"
          placeholder="Search employees..."
          size="sm"
          class="w-64"
        />
        <USelectMenu
          v-model="departmentFilter"
          :items="[{ label: 'All Departments', value: 'all' }, ...departments.map(d => ({ label: d, value: d }))]"
          value-key="value"
          placeholder="Department"
          size="sm"
          class="w-48"
        />
      </div>

      <UModal v-model:open="addModalOpen" title="Add New Employee" description="Fill in the details to add a new employee.">
        <UButton label="Add Employee" icon="i-lucide-plus" size="sm" />
        <template #body>
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Full Name" required>
                <UInput v-model="form.name" placeholder="e.g. John Doe" />
              </UFormField>
              <UFormField label="Email" required>
                <UInput v-model="form.email" type="email" placeholder="john@company.com" />
              </UFormField>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Phone">
                <UInput v-model="form.phone" placeholder="+1 (555) 000-0000" />
              </UFormField>
              <UFormField label="Department" required>
                <USelectMenu
                  v-model="form.department"
                  :items="allDepartments"
                  placeholder="Select department"
                />
              </UFormField>
            </div>
            <UFormField label="Job Title / Role" required>
              <UInput v-model="form.role" placeholder="e.g. Senior Developer" />
            </UFormField>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton label="Cancel" variant="outline" color="neutral" @click="addModalOpen = false" />
            <UButton
              label="Add Employee"
              :disabled="!form.name || !form.email || !form.department || !form.role"
              @click="handleAdd"
            />
          </div>
        </template>
      </UModal>
    </div>

    <!-- Table -->
    <UCard :ui="{ body: 'p-0' }">
      <UTable :data="filtered" :columns="columns" />
    </UCard>
  </div>
</template>
