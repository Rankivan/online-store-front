export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost/api',
      /** Slug do tenant (deve existir no banco após migrate + seed). */
      tenantSlug: process.env.NUXT_PUBLIC_TENANT_SLUG || 'demo'
    }
  },
  devtools: { enabled: true }
})
