<template>
  <div class="min-h-screen bg-slate-50">
    <AppSidebar />
    <div class="lg:pl-72">
      <AppTopbar />
      <main class="px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppTopbar from '@/components/layout/AppTopbar.vue'
</script>

