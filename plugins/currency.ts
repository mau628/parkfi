export default defineNuxtPlugin(() => {
  return {
    provide: {
      format: (price: number | undefined) => {
        const store = useConfiguracionStore()
        const moneda = store.configuracion.Moneda

        if (!store.monedas[moneda]) return new Intl.NumberFormat().format(price ?? 0)

        return new Intl.NumberFormat(
          store.monedas[moneda].locale,
          {
            style: "currency",
            currency: store.monedas[moneda].codigo
          })
          .format(price ?? 0)
      }
    }
  }
})
