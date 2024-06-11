<template>
  <section>
    <titulo :titulo="$t('configuracion.titulo')" />
    <b-message type="is-info" has-icon icon="cogs">
      {{ $t('configuracion.mensaje') }}
    </b-message>
    <b-field :label="$t('configuracion.nombre')">
      <b-input v-model="store.configuracion.Nombre"></b-input>
    </b-field>
    <b-field>
      <b-switch v-model="store.configuracion.UsarQR">{{ $t('configuracion.usarQR') }}</b-switch>
    </b-field>
    <b-field>
      <b-switch v-model="store.configuracion.AutoImprimir">{{ $t('configuracion.imprimirAutomaticamente') }}</b-switch>
    </b-field>
    <table class="table">
      <thead>
        <tr>
          <th>{{ $t('configuracion.tiempoMinutos') }}</th>
          <th>{{ $t('configuracion.precio') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tarifa, index) in store.configuracion.Tarifas">
          <td>
            <b-input icon="timer" v-model="tarifa.Tiempo" type="number" ref="inputRefs"></b-input>
          </td>
          <td>
            <b-input icon="cash" v-model="tarifa.Precio" type="number"></b-input>
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
const store = useConfiguracionStore()
const inputRefs = ref([])

watch(store, () => store.actualizarLocalStorage(), { deep: true })

function agregarTarifa() {
  store.agregarTarifa({ Tiempo: 0, Precio: 0 })
  nextTick(() => {
    const index = store.configuracion.Tarifas.length - 1
    const input = inputRefs.value[index] as HTMLInputElement
    if (input) input.focus()
  })
}
</script>