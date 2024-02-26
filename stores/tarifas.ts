import { defineStore } from 'pinia'

const LOCALSTORAGE_KEY = 'tarifas'

function consultarLocalStorage(): Tarifa[] {
  var result = [] as Tarifa[]
  //result = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '[]') as Tarifa[];
  return _sortBy(result, 'Tiempo')
}

function guardarLocalStorage(tarifas: Tarifa[]) {
  //localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(tarifas))
}

/*export const useTarifasStore = defineStore('tarifasStore', {
  state: () => ({
    listaTarifas: reactive(consultarLocalStorage())
  }),
  getters: {
    tarifas: (state) => [...state.listaTarifas]
  },
  actions: {
    agregarTarifa(value: Tarifa) {
      this.listaTarifas.push(value)
      guardarLocalStorage(this.listaTarifas)
    },
    quitarTarifa(index: number) {
      this.listaTarifas.splice(index, 1);
      guardarLocalStorage(this.listaTarifas)
    },
    actualizarLocalStorage() {
      guardarLocalStorage(this.listaTarifas)
    }
  },
})*/

export const useTarifasStore = defineStore('tarifasStore', () => {
  const listaTarifas = ref(consultarLocalStorage())

  const tarifas = computed(() => [...listaTarifas.value])

  const agregarTarifa = (value: Tarifa) => {
    listaTarifas.value.push(value)
    guardarLocalStorage(listaTarifas.value)
  }
  const quitarTarifa = (index: number) => {
    listaTarifas.value.splice(index, 1);
    guardarLocalStorage(listaTarifas.value)
  }
  const actualizarLocalStorage = () => {
    guardarLocalStorage(listaTarifas.value)
  }

  return { listaTarifas, tarifas, agregarTarifa, quitarTarifa, actualizarLocalStorage }
})