<script setup>
const stats = [
  { label: 'Total Employees', value: '248', change: '+12', icon: 'i-lucide-users', color: 'primary' },
  { label: 'Present Today', value: '212', change: '+5', icon: 'i-lucide-user-check', color: 'success' },
  { label: 'On Leave', value: '18', change: '-3', icon: 'i-lucide-calendar-off', color: 'warning' },
  { label: 'Open Positions', value: '7', change: '+2', icon: 'i-lucide-briefcase', color: 'info' }
]

const recentActivity = [
  { name: 'James Anderson', action: 'Joined Engineering team', time: '2 hours ago', icon: 'i-lucide-user-plus' },
  { name: 'Maria Garcia', action: 'Leave request approved', time: '3 hours ago', icon: 'i-lucide-check-circle' },
  { name: 'David Kim', action: 'Promoted to Senior Developer', time: '5 hours ago', icon: 'i-lucide-award' },
  { name: 'Sophie Turner', action: 'Completed onboarding', time: '1 day ago', icon: 'i-lucide-graduation-cap' },
  { name: 'Alex Johnson', action: 'Submitted timesheet', time: '1 day ago', icon: 'i-lucide-clock' }
]

const upcomingEvents = [
  { title: 'Team Standup', date: 'Today, 10:00 AM', type: 'Meeting' },
  { title: 'Performance Reviews', date: 'Mar 15, 2026', type: 'Review' },
  { title: 'Company Town Hall', date: 'Mar 20, 2026', type: 'Event' },
  { title: 'New Hire Orientation', date: 'Mar 22, 2026', type: 'Onboarding' }
]

const pendingLeaves = [
  { name: 'Emily Chen', department: 'Design', dates: 'Mar 10 - Mar 12', type: 'Vacation' },
  { name: 'Robert Lee', department: 'Engineering', dates: 'Mar 11 - Mar 11', type: 'Sick Leave' },
  { name: 'Anna White', department: 'Marketing', dates: 'Mar 14 - Mar 18', type: 'Personal' }
]

const departments = [
  { name: 'Engineering', count: 68, color: 'primary' },
  { name: 'Marketing', count: 34, color: 'success' },
  { name: 'Sales', count: 42, color: 'warning' },
  { name: 'HR', count: 18, color: 'info' },
  { name: 'Design', count: 24, color: 'error' },
  { name: 'Finance', count: 22, color: 'neutral' }
]

const totalDeptCount = departments.reduce((s, d) => s + d.count, 0)
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Stat cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.label">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-(--ui-text-muted)">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ stat.value }}</p>
            <p class="text-xs mt-1">
              <UBadge :color="stat.change.startsWith('+') ? 'success' : 'warning'" variant="subtle" size="xs">
                {{ stat.change }} this month
              </UBadge>
            </p>
          </div>
          <div class="flex items-center justify-center size-12 rounded-xl bg-primary-50 dark:bg-primary-950">
            <UIcon :name="stat.icon" class="size-6 text-primary-500" />
          </div>
        </div>
      </UCard>
    </div>

    <!-- Charts row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Department breakdown -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-(--ui-text-highlighted)">Department Breakdown</h3>
            <UBadge variant="subtle" color="neutral">{{ totalDeptCount }} Total</UBadge>
          </div>
        </template>
        <div class="flex flex-col gap-4">
          <div v-for="dept in departments" :key="dept.name" class="flex items-center gap-3">
            <span class="text-sm text-(--ui-text-muted) w-24 shrink-0">{{ dept.name }}</span>
            <UProgress
              :model-value="(dept.count / 68) * 100"
              :color="dept.color"
              size="sm"
              class="flex-1"
            />
            <span class="text-sm font-medium text-(--ui-text-highlighted) w-8 text-right">{{ dept.count }}</span>
          </div>
        </div>
      </UCard>

      <!-- Recent activity -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-(--ui-text-highlighted)">Recent Activity</h3>
        </template>
        <div class="flex flex-col gap-4">
          <div v-for="activity in recentActivity" :key="activity.name" class="flex items-start gap-3">
            <div class="flex items-center justify-center size-9 rounded-lg bg-primary-50 dark:bg-primary-950 shrink-0 mt-0.5">
              <UIcon :name="activity.icon" class="size-4 text-primary-500" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-(--ui-text-highlighted)">{{ activity.name }}</p>
              <p class="text-xs text-(--ui-text-muted)">{{ activity.action }}</p>
            </div>
            <span class="text-xs text-(--ui-text-dimmed) shrink-0">{{ activity.time }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Bottom row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Upcoming events -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-(--ui-text-highlighted)">Upcoming Events</h3>
            <UButton label="View All" variant="link" size="xs" color="primary" />
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <div
            v-for="event in upcomingEvents"
            :key="event.title"
            class="flex items-center justify-between p-3 rounded-lg bg-(--ui-bg-elevated)/50 border border-(--ui-border)"
          >
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-calendar" class="size-4 text-(--ui-text-muted)" />
              <div>
                <p class="text-sm font-medium text-(--ui-text-highlighted)">{{ event.title }}</p>
                <p class="text-xs text-(--ui-text-muted)">{{ event.date }}</p>
              </div>
            </div>
            <UBadge variant="subtle" color="neutral" size="xs">{{ event.type }}</UBadge>
          </div>
        </div>
      </UCard>

      <!-- Pending leave requests -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-(--ui-text-highlighted)">Pending Leave Requests</h3>
            <UBadge color="warning" variant="subtle" size="xs">{{ pendingLeaves.length }} Pending</UBadge>
          </div>
        </template>
        <div class="flex flex-col gap-3">
          <div
            v-for="leave in pendingLeaves"
            :key="leave.name"
            class="flex items-center justify-between p-3 rounded-lg bg-(--ui-bg-elevated)/50 border border-(--ui-border)"
          >
            <div class="flex items-center gap-3">
              <UAvatar :alt="leave.name" size="sm" />
              <div>
                <p class="text-sm font-medium text-(--ui-text-highlighted)">{{ leave.name }}</p>
                <p class="text-xs text-(--ui-text-muted)">{{ leave.department }} -- {{ leave.dates }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UBadge variant="subtle" color="neutral" size="xs">{{ leave.type }}</UBadge>
              <UButton icon="i-lucide-check" size="xs" color="success" variant="soft" />
              <UButton icon="i-lucide-x" size="xs" color="error" variant="soft" />
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
