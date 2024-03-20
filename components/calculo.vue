<template>
    <div v-if="!hayTarifas">
        <b-button tag="router-link" to="tarifas" type="is-link">
            $Ir a configuración...
        </b-button>
    </div>
    <div v-else>
        <section>
            <h3 class="subtitle is-3">$Ingreso/Egreso</h3>
            <b-field grouped>
                <b-field label="$Ingreso" expanded>
                    <b-datetimepicker v-model="horaIngreso" rounded placeholder="$Elegir..." icon="calendar-today"
                        inline @change="calcularTarifa">
                    </b-datetimepicker>
                </b-field>
                <b-field label="$Salida" expanded>
                    <b-datetimepicker v-model="horaSalida" rounded placeholder="$Elegir..." icon="calendar-today" inline
                        @change="calcularTarifa">
                    </b-datetimepicker>
                </b-field>
            </b-field>
        </section>
        <br>
        <section>
            <h4 class="subtitle is-4">$Tiempo total: {{ tiempoLegible(minutosTotales) }}</h4>
            <h4 class="subtitle is-4">$Monto total: {{ montoTotalLegible }}</h4>
            <b-field>
                <b-switch v-model="verDetalle">$Ver detalle</b-switch>
            </b-field>
            <table class="table" v-show="verDetalle">
                <thead>
                    <tr>
                        <th>$Tiempo</th>
                        <th>$Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in detalleCobro">
                        <td>
                            {{ tiempoLegible(item.tiempo) }}
                        </td>
                        <td>
                            $Q{{ item.subtotal }}
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
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
</template>

<script lang="ts" setup>
import type Tarifa from '~/types/tarifa';

let verDetalle = ref(false)
let minutosTotales = ref(0)
let horaIngreso = ref<Date>()
let horaSalida = ref<Date>()

const store = useTarifasStore()
const hayTarifas = ref(store.listaTarifas.length > 0)
const detalleCobro = ref<Array<{ tiempo: number, precioUnitario: number, subtotal: number }>>()

watch(horaIngreso, () => calcularTarifa())
watch(horaSalida, () => calcularTarifa())

const montoTotalLegible = computed(() => {
    return `$Q${detalleCobro.value?.reduce((acc, item) => acc + item.subtotal, 0)}`
})

const calcularTarifa = () => {
    if (horaIngreso.value === undefined || horaSalida.value === undefined) return
    if (detalleCobro.value) {
        detalleCobro.value.splice(0, detalleCobro.value.length)
    }
    else
        detalleCobro.value = []

    const tarifas = _reverse(_sortBy(store.tarifas, 'Tiempo')) as Tarifa[]
    const segundos = (horaSalida.value.getTime() - horaIngreso.value.getTime()) / 1000

    let unidadesTiempo = 0
    let precio = 0
    let minutos = Math.floor(segundos / 60);
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
</script>