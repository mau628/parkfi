import { defineStore } from 'pinia'

export const usePasosStore = defineStore('pasosStore', () => {
  const pasos = ref([{ }])

  const agregarPaso = (paso: {}) => {
    pasos.value.push(paso)
  }
  const quitarPasos = () => {
    pasos.value.splice(0, pasos.value.length)
  }

  return { pasos, agregarPaso, quitarPasos }
})