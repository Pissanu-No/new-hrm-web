<script setup>
const orgTree = {
  id: '1',
  name: 'Richard Adams',
  role: 'Chief Executive Officer',
  department: 'Executive',
  email: 'richard@company.com',
  children: [
    {
      id: '2',
      name: 'David Kim',
      role: 'VP of Engineering',
      department: 'Engineering',
      email: 'david@company.com',
      children: [
        { id: '5', name: 'James Anderson', role: 'Senior Developer', department: 'Engineering', email: 'james@company.com' },
        { id: '6', name: 'Robert Lee', role: 'Backend Developer', department: 'Engineering', email: 'robert@company.com' },
        { id: '7', name: 'Priya Patel', role: 'Frontend Developer', department: 'Engineering', email: 'priya@company.com' }
      ]
    },
    {
      id: '3',
      name: 'Maria Garcia',
      role: 'VP of Marketing',
      department: 'Marketing',
      email: 'maria@company.com',
      children: [
        { id: '8', name: 'Anna White', role: 'Content Strategist', department: 'Marketing', email: 'anna@company.com' },
        { id: '9', name: 'Tom Richards', role: 'SEO Specialist', department: 'Marketing', email: 'tom@company.com' }
      ]
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      role: 'VP of HR',
      department: 'HR',
      email: 'sarah@company.com',
      children: [
        { id: '10', name: 'Michael Brown', role: 'HR Specialist', department: 'HR', email: 'michael@company.com' },
        { id: '11', name: 'Jessica Adams', role: 'Recruiter', department: 'HR', email: 'jessica@company.com' }
      ]
    },
    {
      id: '12',
      name: 'Sophie Turner',
      role: 'Head of Design',
      department: 'Design',
      email: 'sophie@company.com',
      children: [
        { id: '13', name: 'Emily Chen', role: 'Product Designer', department: 'Design', email: 'emily@company.com' }
      ]
    },
    {
      id: '14',
      name: 'Alex Johnson',
      role: 'VP of Sales',
      department: 'Sales',
      email: 'alex@company.com',
      children: [
        { id: '15', name: 'Daniel Park', role: 'Account Executive', department: 'Sales', email: 'daniel@company.com' }
      ]
    }
  ]
}

const selectedNode = ref(null)
const expandedNodes = ref(new Set(['1', '2', '3', '4', '12', '14']))

function toggleExpand(id) {
  if (expandedNodes.value.has(id)) {
    expandedNodes.value.delete(id)
  } else {
    expandedNodes.value.add(id)
  }
  expandedNodes.value = new Set(expandedNodes.value)
}

function selectNode(node) {
  selectedNode.value = node
}
</script>

<template>
  <div class="flex gap-6">
    <!-- Tree -->
    <div class="flex-1 overflow-x-auto">
      <div class="flex flex-col items-center min-w-max py-4">
        <!-- Root node -->
        <OrgChartNode
          :node="orgTree"
          :expanded-nodes="expandedNodes"
          :selected-id="selectedNode?.id"
          @toggle="toggleExpand"
          @select="selectNode"
        />
      </div>
    </div>

    <!-- Detail panel -->
    <Transition name="slide">
      <UCard v-if="selectedNode" class="w-80 shrink-0 self-start sticky top-0">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-(--ui-text-highlighted)">Profile</h3>
            <UButton icon="i-lucide-x" variant="ghost" color="neutral" size="xs" @click="selectedNode = null" />
          </div>
        </template>
        <div class="flex flex-col items-center gap-4">
          <UAvatar :alt="selectedNode.name" size="xl" />
          <div class="text-center">
            <p class="font-semibold text-(--ui-text-highlighted)">{{ selectedNode.name }}</p>
            <p class="text-sm text-(--ui-text-muted)">{{ selectedNode.role }}</p>
          </div>
          <USeparator />
          <div class="w-full flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-building-2" class="size-4 text-(--ui-text-muted)" />
              <span class="text-sm">{{ selectedNode.department }}</span>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-mail" class="size-4 text-(--ui-text-muted)" />
              <span class="text-sm">{{ selectedNode.email }}</span>
            </div>
            <div v-if="selectedNode.children?.length" class="flex items-center gap-2">
              <UIcon name="i-lucide-users" class="size-4 text-(--ui-text-muted)" />
              <span class="text-sm">{{ selectedNode.children.length }} direct report{{ selectedNode.children.length > 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>
      </UCard>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
