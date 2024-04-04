export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el) {
      const input = el.querySelector('input')
      nextTick(() => input.focus())
    }
  })
})