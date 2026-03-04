export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'PeopleOS - Human Resource Management',
      meta: [
        { name: 'description', content: 'Modern HR management platform for teams.' }
      ]
    }
  }
})
