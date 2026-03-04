<script setup>
const route = useRoute()

const pageTitles = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/attendance': 'Attendance',
  '/leaves': 'Leave Management',
  '/payroll': 'Payroll',
  '/departments': 'Departments',
  '/org-chart': 'Organization Chart',
  '/reports': 'Reports',
  '/settings': 'Settings',
  '/help': 'Help Center'
}

const currentTitle = computed(() => pageTitles[route.path] || 'Dashboard')
</script>

<template>
  <div class="flex h-screen bg-(--ui-bg)">
    <AppSidebar />

    <div class="flex flex-col flex-1 min-w-0">
      <!-- Top header -->
      <header class="flex items-center justify-between h-16 px-6 border-b border-(--ui-border) bg-(--ui-bg) shrink-0">
        <div>
          <h1 class="text-xl font-semibold text-(--ui-text-highlighted)">{{ currentTitle }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <UInput
            icon="i-lucide-search"
            placeholder="Search..."
            size="sm"
            class="w-64"
          />
          <UButton icon="i-lucide-bell" variant="ghost" color="neutral" size="sm" />
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <slot />
      </main>
    </div>
  </div>
</template>
