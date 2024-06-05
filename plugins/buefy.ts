import '@mdi/font/css/materialdesignicons.css'
import Buefy from '@ntohq/buefy-next'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Buefy, {})
})