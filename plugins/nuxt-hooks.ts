export default defineNuxtPlugin((nuxtApp) => {
  const store = useConfiguracionStore()
  const { $i18n } = nuxtApp as any;
  if ($i18n.locale !== store.configuracion.Idioma) {
    $i18n.setLocale(store.configuracion.Idioma)
  }
})