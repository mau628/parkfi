export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('focus', {
    mounted(el, binding, vnode) {
      const input = el.querySelector('input')
      nextTick(() => input.focus())
      console.log({ el, b: binding, v: vnode, input })
    }
  })
})