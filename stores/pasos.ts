import { defineStore } from 'pinia'
import type { PasoTour } from '~/types/paso-tour'

export const usePasosStore = defineStore('pasosStore', () => {
  const pasos = ref([{ target: '.mdi-robot-happy', content: 'this is a placeholder' }])
  const botones = ref({})

  const agregarPaso = (paso: PasoTour) => {
    pasos.value.push(paso.ToComponentItem())
  }
  const quitarPasos = () => {
    pasos.value.splice(0, pasos.value.length)
  }

  return { pasos, botones, agregarPaso, quitarPasos }
})