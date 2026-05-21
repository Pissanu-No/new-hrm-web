<template>
  <div>
    <div
      v-if="appStore.sidebarOpen"
      class="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
      @click="appStore.closeSidebar"
    />

    <aside
      :class="[
        'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform lg:translate-x-0 lg:shadow-none',
        appStore.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
        <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-sm font-bold text-white">
          HR
        </div>
        <div>
          <p class="text-sm font-bold text-slate-950">Enterprise HRIS</p>
          <p class="text-xs text-slate-500">People and growth platform</p>
        </div>
      </div>

      <nav class="flex-1 space-y-6 overflow-y-auto px-4 py-5">
        <div v-for="section in navigation" :key="section.label">
          <p class="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ section.label }}</p>
          <div class="mt-2 space-y-1">
            <RouterLink
              v-for="item in section.items"
              :key="item.label"
              :to="item.to || '#'"
              :class="[
                'flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm font-semibold transition',
                item.disabled
                  ? 'cursor-not-allowed text-slate-300'
                  : isActive(item)
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
              ]"
              @click="item.disabled ? $event.preventDefault() : appStore.closeSidebar()"
            >
              <span class="flex items-center gap-3">
                <component :is="item.icon" class="h-4 w-4" />
                {{ item.label }}
              </span>
              <span v-if="item.disabled" class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-400">
                Soon
              </span>
            </RouterLink>
          </div>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import {
  BarChart3,
  Building2,
  BriefcaseBusiness,
  GraduationCap,
  GitBranch,
  Layers3,
  MapPin,
  Network,
  Target,
  Users,
  WalletCards
} from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/appStore'

const route = useRoute()
const appStore = useAppStore()

const navigation = [
  {
    label: 'Workspace',
    items: [{ label: 'Dashboard', to: '/dashboard', icon: BarChart3 }]
  },
  {
    label: 'Organization',
    items: [
      { label: 'Company', to: '/organization/companies', icon: Building2 },
      { label: 'Branch', to: '/organization/branches', icon: Network },
      { label: 'Location', to: '/organization/locations', icon: MapPin },
      { label: 'Department', to: '/organization/departments', icon: Layers3 },
      { label: 'Position', to: '/organization/positions', icon: BriefcaseBusiness },
      { label: 'Job Level', to: '/organization/job-levels', icon: Target },
      { label: 'Cost Center', to: '/organization/cost-centers', icon: WalletCards }
    ]
  },
  {
    label: 'Employees',
    items: [
      { label: 'Employee Profiles', to: '/employees', icon: Users },
      { label: 'Reporting Line', to: '/employees/reporting-lines', icon: GitBranch },
      { label: 'Employee Assignment', to: '/employees/assignments', icon: Users }
    ]
  },
  {
    label: 'HRD',
    items: [
      { label: 'Learning & Development', icon: GraduationCap, disabled: true },
      { label: 'Competency', icon: Target, disabled: true },
      { label: 'Performance', icon: BarChart3, disabled: true },
      { label: 'Career Path', icon: Network, disabled: true }
    ]
  }
]

function isActive(item) {
  return item.to && route.path.startsWith(item.to)
}
</script>
