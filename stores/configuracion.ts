import { defineStore } from 'pinia'
import type Configuracion from '~/types/configuracion';
import type Tarifa from '~/types/tarifa';

const LOCALSTORAGE_KEY = 'configuracion'

function consultarLocalStorage(): Configuracion {
  var result: Configuracion
  result = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '{}') as Configuracion;
  console.log({ leida: result })
  result.Tarifas = _sortBy(result.Tarifas, 'Tiempo') as Tarifa[]
  result.Nombre = result.Nombre || 'Parkfi'
  result.UsarQR = result.UsarQR || false
  return result
}

function guardarLocalStorage(configuracion: Configuracion) {
  console.log(configuracion)
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(configuracion))
}

export const useConfiguracionStore = defineStore('configuracionStore', () => {
  const configuracion = ref(consultarLocalStorage())

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

  return { configuracion, agregarTarifa, quitarTarifa, actualizarLocalStorage }
})