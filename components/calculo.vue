<template>
  <section>
    <div v-if="!hayTarifas">
      <b-button tag="router-link" to="tarifas" type="is-link">
        $Ir a configuración...
      </b-button>
    </div>
    <div v-else>
      <section>
        <h3 class="subtitle is-3">{{ $t('ingreso.titulo') }} / {{ $t('egreso.titulo') }}</h3>
        <div v-if="!!matricula">
          <b-icon icon="car" size="is-small"></b-icon>
          <h2 class="subtitle is-2">{{ matricula }}</h2>
        </div>
        <b-field grouped>
          <b-field expanded>
            <template #label>
              <b-icon icon="clock-in" size="is-medium" type="is-success"></b-icon>
              {{ $t('ingreso.titulo') }}
            </template>
            <b-datetimepicker v-model="valorHoraIngreso" rounded :placeholder="$t('elegir')" icon="calendar-today"
              inline @change="calcularTarifa" :disabled="hayHoraIngreso" :locale="locale">
            </b-datetimepicker>
          </b-field>
          <b-field>
            <template #label>
              <b-icon icon="clock-out" size="is-medium" type="is-danger"></b-icon>
              {{ $t('egreso.titulo') }}
            </template>
            <b-datetimepicker v-model="valorHoraEgreso" rounded :placeholder="$t('elegir')" icon="calendar-today" inline
              @change="calcularTarifa" :locale="locale">
            </b-datetimepicker>
          </b-field>
        </b-field>
      </section>
      <br>
      <section>
        <h4 class="subtitle is-4"><b-icon icon="timer" size="is-small" type="is-info"></b-icon>&nbsp;{{
      tiempoLegible(minutosTotales) }}&nbsp;<span class="is-size-7">(hh:mm)</span></h4>
        <h4 class="subtitle is-4"><b-icon icon="cash-register" size="is-small" type="is-primary"></b-icon>&nbsp;{{
      montoTotalLegible }}</h4>
        <b-field>
          <b-switch v-model="verDetalle">{{ $t('verDetalle') }}</b-switch>
        </b-field>
        <table class="table" v-show="verDetalle">
          <thead>
            <tr>
              <th>{{ $t('tiempo') }}&nbsp;(hh:mm)</th>
              <th>{{ $t('subtotal') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in detalleCobro">
              <td>
                {{ tiempoLegible(item.tiempo) }}
              </td>
              <td>
                {{ $format(item.subtotal) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="has-text-weight-bold">
              <td>
                {{ tiempoLegible(minutosTotales) }}
              </td>
              <td>
                {{ montoTotalLegible }}
              </td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type Tarifa from '~/types/tarifa';
const { $format } = useNuxtApp()

const props = defineProps({
  matricula: String,
  horaIngreso: Date
})

let estaCargando = true
const { locale } = useI18n()

const verDetalle = ref(false)
const minutosTotales = ref(0)
const valorHoraIngreso = ref<Date>()
const valorHoraEgreso = ref<Date>()

if (props.horaIngreso) valorHoraIngreso.value = props.horaIngreso

const store = useConfiguracionStore()
const hayTarifas = ref(store.configuracion.Tarifas.length > 0)
const detalleCobro = ref<Array<{ tiempo: number, precioUnitario: number, subtotal: number }>>()

const hayHoraIngreso = computed(() => !!valorHoraIngreso.value)
const hayValores = computed(() => hayHoraIngreso && valorHoraEgreso.value !== undefined)
const montoTotalLegible = computed(() => {
  return $format(detalleCobro.value?.reduce((acc, item) => acc + item.subtotal, 0))
})

watch(valorHoraIngreso, () => calcularTarifa())
watch(valorHoraEgreso, () => calcularTarifa())

const tarifas = _reverse(_sortBy(store.configuracion.Tarifas, 'Tiempo')) as Tarifa[]

const calcularTarifa = () => {
  if (estaCargando || !hayValores.value) return

  if (detalleCobro.value) {
    detalleCobro.value.splice(0, detalleCobro.value.length)
  }
  else
    detalleCobro.value = []

  const segundos = ((valorHoraEgreso.value?.getTime() ?? 0) - (valorHoraIngreso.value?.getTime() ?? 0)) / 1000

  if (segundos < 0) {
    valorHoraEgreso.value = new Date()
    alert('$La hora de ingreso no puede ser mayor a la de egreso')
    return
  }

  let unidadesTiempo = 0
  let precio = 0
  let minutos = Math.floor(segundos / 60);
  if (minutos === 0) minutos = 1
  minutosTotales.value = minutos

  tarifas.forEach((tarifa) => {
    unidadesTiempo = Math.floor(minutos / tarifa.Tiempo)
    precio += unidadesTiempo * tarifa.Precio
    minutos -= tarifa.Tiempo * unidadesTiempo

    if (unidadesTiempo > 0) {
      detalleCobro.value ??= [];
      detalleCobro.value.push({ tiempo: tarifa.Tiempo * unidadesTiempo, precioUnitario: tarifa.Precio, subtotal: unidadesTiempo * tarifa.Precio })
    }
  });
  if (minutos > 0) {
    precio += 1 * tarifas[tarifas.length - 1].Precio
    detalleCobro.value.push({ tiempo: minutos, precioUnitario: tarifas[tarifas.length - 1].Precio, subtotal: 1 * tarifas[tarifas.length - 1].Precio })
    minutos = 0
  }
}

const tiempoLegible = (valor: number) => {
  const horas = Math.floor(valor / 60)
  const minutos = valor % 60
  const horasString = horas < 10 ? `0${horas}` : horas
  const minutosString = minutos < 10 ? `0${minutos}` : minutos
  return `${horasString}:${minutosString}`
}

if (hayHoraIngreso) valorHoraEgreso.value = new Date()
if (hayValores) calcularTarifa()

estaCargando = false
</script>