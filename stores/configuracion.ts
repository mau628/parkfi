import { defineStore } from 'pinia'

const LOCALSTORAGE_KEY = 'configuracion'

function consultarLocalStorage(): Configuracion {
  var result: Configuracion
  result = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}') as Configuracion;
  result.Tarifas = _sortBy(result.Tarifas, 'Tiempo')
  return result
}

function guardarLocalStorage(configuracion: Configuracion) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(configuracion))
}

export const useConfiguracionStore = defineStore('configuracionStore', () => {
  const configuracion = ref(consultarLocalStorage())

  const tarifas = computed(() => [...configuracion.value.Tarifas])

  const agregarTarifa = (value: Tarifa) => {
    configuracion.value.Tarifas.push(value)
    actualizarLocalStorage()
  }
  const quitarTarifa = (index: number) => {
    configuracion.value.Tarifas.splice(index, 1);
    actualizarLocalStorage()
  }
  const actualizarLocalStorage = () => {
    guardarLocalStorage(configuracion.value)
  }

  return { configuracion, tarifas, agregarTarifa, quitarTarifa, actualizarLocalStorage }
})