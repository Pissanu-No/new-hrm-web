<template>
  <div class="min-h-screen bg-slate-50">
    <AppSidebar />
    <div class="lg:pl-72">
      <AppHeader />
      <main class="px-4 py-6 sm:px-6 lg:px-8">
        <AppBreadcrumb class="mb-5" />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>
