// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ["~/assets/css/global.scss"],
  devtools: { enabled: true },
  lodash: {
    prefix: "_",
    prefixSkip: ["string"],
    upperAfterPrefix: false,
    exclude: ["map"]
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    'nuxt-lodash',
    'nuxt-tour',
  ],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  ssr: false,
})