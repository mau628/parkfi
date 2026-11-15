// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ["~/assets/css/global.scss"],
  // Nuxt DevTools expone un servidor RPC local; solo se habilita en desarrollo.
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  i18n: {
    // El idioma se guarda en el store (configuracion.Idioma) y se aplica en plugins/nuxt-hooks.ts,
    // por eso no se usan prefijos en las rutas ni detección automática del navegador.
    strategy: 'no_prefix',
    defaultLocale: 'es',
    locales: [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' }
    ],
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts'
  },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"]
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-lodash'
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  ssr: false,
})
