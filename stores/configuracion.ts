import { defineStore } from 'pinia'
import type Configuracion from '~/types/configuracion'
import type Tarifa from '~/types/tarifa'

const LOCALSTORAGE_KEY = 'configuracion'

function consultarLocalStorage(): Configuracion {
  var result: Configuracion
  result = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{Tarifas: { Tiempo: 30, Precio: 10 }}') as Configuracion
  result.Tarifas = _sortBy(result.Tarifas, 'Tiempo') as Tarifa[]
  result.Nombre = result.Nombre || 'Parkfi'
  result.UsarQR = result.UsarQR || false
  result.AutoImprimir = result.AutoImprimir || false
  result.Idioma = result.Idioma || 'es'
  result.Moneda = result.Moneda || 'Quetzal'
  return result
}

function guardarLocalStorage(configuracion: Configuracion) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(configuracion))
}

export const useConfiguracionStore = defineStore('configuracionStore', () => {
  const configuracion = ref(consultarLocalStorage())

  const agregarTarifa = (value: Tarifa) => {
    configuracion.value.Tarifas.push(value)
    actualizarLocalStorage()
  }
  const quitarTarifa = (index: number) => {
    configuracion.value.Tarifas.splice(index, 1)
    actualizarLocalStorage()
  }
  const actualizarLocalStorage = () => {
    guardarLocalStorage(configuracion.value)
  }

  const monedas: { [id: string]: any } = {
    Quetzal: {
      codigo: 'GTQ',
      locale: 'es-GT',
    },
    Dolar: {
      codigo: 'USD',
      locale: 'en-US',
    }
  }

  return { configuracion, monedas, agregarTarifa, quitarTarifa, actualizarLocalStorage }
})