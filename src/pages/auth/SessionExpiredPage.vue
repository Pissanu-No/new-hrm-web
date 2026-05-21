<template>
  <main class="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
    <section class="w-full max-w-md rounded border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex h-12 w-12 items-center justify-center rounded bg-amber-100 text-amber-700">
        <ClockAlert class="h-6 w-6" aria-hidden="true" />
      </div>

      <h1 class="mt-6 text-2xl font-semibold text-slate-950">Session expired</h1>
      <p class="mt-3 text-sm leading-6 text-slate-600">
        Your login session has expired. Please sign in again to continue using HRIS.
      </p>

      <div v-if="centraEndpoint" class="mt-6 rounded border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        Redirecting to sign in in {{ remainingSeconds }} seconds.
      </div>
      <div v-else class="mt-6 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        VITE_CENTRA_ENDPOINT is not configured.
      </div>

      <button
        type="button"
        class="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        :disabled="!centraEndpoint"
        @click="redirectToCentra"
      >
        <LogIn class="h-4 w-4" aria-hidden="true" />
        Sign in again
      </button>
    </section>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ClockAlert, LogIn } from 'lucide-vue-next'

const REDIRECT_DELAY_SECONDS = 3

const remainingSeconds = ref(REDIRECT_DELAY_SECONDS)
const redirectTimer = ref(null)
const countdownTimer = ref(null)
const centraEndpoint = computed(() => import.meta.env.VITE_CENTRA_ENDPOINT || '')

function redirectToCentra() {
  if (!centraEndpoint.value) return

  window.location.assign(centraEndpoint.value)
}

onMounted(() => {
  if (!centraEndpoint.value) return

  countdownTimer.value = window.setInterval(() => {
    remainingSeconds.value = Math.max(remainingSeconds.value - 1, 0)
  }, 1000)

  redirectTimer.value = window.setTimeout(redirectToCentra, REDIRECT_DELAY_SECONDS * 1000)
})

onBeforeUnmount(() => {
  if (countdownTimer.value) {
    window.clearInterval(countdownTimer.value)
  }

  if (redirectTimer.value) {
    window.clearTimeout(redirectTimer.value)
  }
})
</script>
