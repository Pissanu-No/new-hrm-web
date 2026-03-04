<script setup>

const route = useRoute()

const collapsed = ref(false)

const mainNav = computed(() => [
  [
    { label: 'Main', type: 'label' },
    {
      label: 'Dashboard',
      icon: 'i-lucide-layout-dashboard',
      to: '/',
      active: route.path === '/'
    },
    {
      label: 'Employees',
      icon: 'i-lucide-users',
      to: '/employees',
      active: route.path === '/employees'
    },
    {
      label: 'Attendance',
      icon: 'i-lucide-calendar-check',
      to: '/attendance',
      active: route.path === '/attendance'
    },
    {
      label: 'Leave Management',
      icon: 'i-lucide-calendar-off',
      to: '/leaves',
      active: route.path === '/leaves'
    },
    {
      label: 'Payroll',
      icon: 'i-lucide-dollar-sign',
      to: '/payroll',
      active: route.path === '/payroll'
    },
    {
      label: 'Departments',
      icon: 'i-lucide-building-2',
      to: '/departments',
      active: route.path === '/departments'
    },
    {
      label: 'Org Chart',
      icon: 'i-lucide-network',
      to: '/org-chart',
      active: route.path === '/org-chart'
    }
  ],
  [
    { label: 'System', type: 'label' },
    {
      label: 'Reports',
      icon: 'i-lucide-file-text',
      to: '/reports',
      active: route.path === '/reports'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings',
      active: route.path === '/settings'
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      to: '/help',
      active: route.path === '/help'
    }
  ]
])
</script>

<template>
  <aside
    class="flex flex-col border-r border-(--ui-border) bg-(--ui-bg-elevated) transition-all duration-300"
    :class="collapsed ? 'w-16' : 'w-64'"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 h-16 border-b border-(--ui-border)">
      <div class="flex items-center justify-center size-8 rounded-lg bg-primary-500 shrink-0">
        <UIcon name="i-lucide-users" class="text-white size-4" />
      </div>
      <span v-if="!collapsed" class="font-bold text-lg text-(--ui-text-highlighted) truncate">
        PeopleOS
      </span>
      <UButton
        :icon="collapsed ? 'i-lucide-panel-right-open' : 'i-lucide-panel-left-open'"
        variant="ghost"
        color="neutral"
        size="xs"
        class="ml-auto"
        :class="collapsed ? 'mx-auto' : ''"
        @click="collapsed = !collapsed"
      />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-2 px-2">
      <UNavigationMenu
        :items="mainNav"
        orientation="vertical"
        :collapsed="collapsed"
        class="w-full"
      />
    </nav>

    <!-- User -->
    <div class="border-t border-(--ui-border) p-3">
      <div class="flex items-center gap-3">
        <UAvatar
          src="https://i.pravatar.cc/120?img=68"
          alt="Admin User"
          size="sm"
        />
        <div v-if="!collapsed" class="flex-1 min-w-0">
          <p class="text-sm font-medium text-(--ui-text-highlighted) truncate">Sarah Wilson</p>
          <p class="text-xs text-(--ui-text-muted) truncate">HR Administrator</p>
        </div>
        <UDropdownMenu
          v-if="!collapsed"
          :items="[
            [{ label: 'Profile', icon: 'i-lucide-user' }],
            [{ label: 'Notifications', icon: 'i-lucide-bell' }],
            [{ label: 'Sign out', icon: 'i-lucide-log-out' }]
          ]"
        >
          <UButton icon="i-lucide-chevron-down" variant="ghost" color="neutral" size="xs" />
        </UDropdownMenu>
      </div>
    </div>
  </aside>
</template>
