<template>
  <main class="grid min-h-screen bg-slate-50 lg:grid-cols-[1fr_460px]">
    <section class="hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
      <div class="flex items-center gap-3">
        <div class="grid h-10 w-10 place-items-center rounded bg-brand-600 text-sm font-bold">HR</div>
        <span class="text-lg font-semibold">HRIS Platform</span>
      </div>
      <div class="max-w-xl">
        <p class="text-sm font-medium uppercase tracking-wide text-cyan-200">Enterprise HR Suite</p>
        <h1 class="mt-4 text-4xl font-semibold leading-tight">
          A clean operating layer for HRIS and HRD workflows.
        </h1>
        <p class="mt-5 text-base leading-7 text-slate-300">
          Authentication will connect to the backend identity provider when the API contract is available.
        </p>
      </div>
    </section>

    <section class="flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm">
        <div class="mb-8 lg:hidden">
          <div class="grid h-10 w-10 place-items-center rounded bg-brand-700 text-sm font-bold text-white">
            HR
          </div>
        </div>
        <h2 class="text-2xl font-semibold text-slate-950">Sign in</h2>
        <p class="mt-2 text-sm text-slate-600">
          Login UI placeholder for Phase 1. Backend authentication is intentionally not simulated.
        </p>

        <form class="mt-8 space-y-5">
          <FormField label="Email">
            <input
              type="email"
              disabled
              class="w-full rounded border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
              placeholder="name@company.com"
            />
          </FormField>
          <FormField label="Password">
            <input
              type="password"
              disabled
              class="w-full rounded border border-slate-300 bg-slate-100 px-3 py-2 text-sm text-slate-500"
              placeholder="Password"
            />
          </FormField>
          <button
            type="button"
            disabled
            class="w-full rounded bg-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
          >
            Authentication pending backend
          </button>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import FormField from '@/components/forms/FormField.vue'
</script>

