<script setup>
const topics = [
  { title: 'Getting Started', description: 'Learn the basics of PeopleOS and how to set up your account.', icon: 'i-lucide-rocket', articles: 12 },
  { title: 'Employee Management', description: 'Add, edit and manage employee profiles and records.', icon: 'i-lucide-users', articles: 18 },
  { title: 'Leave & Attendance', description: 'Configure leave policies, track attendance and manage requests.', icon: 'i-lucide-calendar', articles: 15 },
  { title: 'Payroll', description: 'Set up payroll processing, tax configurations and payment schedules.', icon: 'i-lucide-dollar-sign', articles: 10 },
  { title: 'Reports & Analytics', description: 'Generate reports, export data and understand your HR metrics.', icon: 'i-lucide-bar-chart-3', articles: 8 },
  { title: 'Account & Security', description: 'Manage your account settings, roles and security preferences.', icon: 'i-lucide-shield', articles: 7 }
]

const contacts = [
  { title: 'Live Chat', description: 'Chat with our support team in real-time.', icon: 'i-lucide-message-circle', action: 'Start Chat' },
  { title: 'Email Support', description: 'Send us an email and we will respond within 24 hours.', icon: 'i-lucide-mail', action: 'Send Email' },
  { title: 'Phone Support', description: 'Call us during business hours (9 AM - 5 PM EST).', icon: 'i-lucide-phone', action: 'Call Now' }
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-4xl">
    <!-- Search -->
    <UInput icon="i-lucide-search" placeholder="Search for help articles..." size="lg" />

    <!-- Topics -->
    <div>
      <h2 class="text-lg font-semibold text-(--ui-text-highlighted) mb-4">Browse Topics</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard v-for="topic in topics" :key="topic.title" class="cursor-pointer hover:border-primary-300 transition-colors">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-center size-10 rounded-lg bg-primary-50 dark:bg-primary-950">
              <UIcon :name="topic.icon" class="size-5 text-primary-500" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">{{ topic.title }}</h3>
              <p class="text-xs text-(--ui-text-muted) mt-1">{{ topic.description }}</p>
            </div>
            <UBadge variant="subtle" color="neutral" size="xs" class="self-start">{{ topic.articles }} articles</UBadge>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Contact support -->
    <div>
      <h2 class="text-lg font-semibold text-(--ui-text-highlighted) mb-4">Contact Support</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <UCard v-for="contact in contacts" :key="contact.title">
          <div class="flex flex-col items-center text-center gap-3">
            <div class="flex items-center justify-center size-12 rounded-full bg-primary-50 dark:bg-primary-950">
              <UIcon :name="contact.icon" class="size-6 text-primary-500" />
            </div>
            <div>
              <h3 class="text-sm font-semibold text-(--ui-text-highlighted)">{{ contact.title }}</h3>
              <p class="text-xs text-(--ui-text-muted) mt-1">{{ contact.description }}</p>
            </div>
            <UButton :label="contact.action" variant="soft" size="sm" />
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
