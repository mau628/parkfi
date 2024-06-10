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
  modules: ['@pinia/nuxt', 'nuxt-lodash', "@nuxtjs/i18n"],
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  ssr: false,
})