<template>
    <section>
        <h3 class="subtitle is-3">Tarifas</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Tiempo (Minutos)</th>
                    <th>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tarifa, index) in store.listaTarifas">
                    <td>
                        <b-input icon="timer" v-model="tarifa.Tiempo" type="number" ref="inputRefs"></b-input>
                    </td>
                    <td>
                        <b-input icon="cash" v-model="tarifa.Valor" type="number"></b-input>
                    </td>
                    <td>
                        <b-button type="is-danger" @click="store.quitarTarifa(index)" icon-right="delete"></b-button>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-button type="is-success" @click="agregarTarifa()" icon-right="plus"></b-button>
    </section>
</template>
  
<script setup lang="ts">
const store = useTarifasStore()
const inputRefs = ref([])

watch(store, () => store.actualizarLocalStorage(), { deep: true })

function agregarTarifa() {
    store.agregarTarifa({ Tiempo: 0, Valor: 0 })
    nextTick(() => {
        const index = store.tarifas.length - 1
        const input = inputRefs.value[index]
        if (input) input.focus()
    })
}
</script>