<template>
  <div>
    <PageHeader
      title="Users and Roles"
      description="Access management placeholder prepared for backend identity and RBAC contracts."
    />

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Users</h3>
            <p class="mt-1 text-sm text-slate-500">Application user accounts will appear here.</p>
          </div>
          <StatusBadge status="draft" label="Placeholder" />
        </div>
        <EmptyState
          class="mt-5"
          title="User API pending"
          description="This panel will connect to the users endpoint when available."
          :icon="Users"
        />
      </div>

      <div class="rounded border border-slate-200 bg-white p-5 shadow-panel">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h3 class="text-base font-semibold text-slate-950">Roles</h3>
            <p class="mt-1 text-sm text-slate-500">Permission groups and role assignments will appear here.</p>
          </div>
          <StatusBadge status="draft" label="Placeholder" />
        </div>
        <EmptyState
          class="mt-5"
          title="Role API pending"
          description="This panel will connect to the roles endpoint when available."
          :icon="ShieldCheck"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheck, Users } from 'lucide-vue-next'
import EmptyState from '@/components/ui/EmptyState.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
</script>

