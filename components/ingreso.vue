<template>
  <section>
    <titulo subtitulo="$Registro del ingreso" />
    <div class="columns is-mobile is-centered">
      <div class="column is-4-desktop">
        <h3 class="subtitle is-3">$Ingreso</h3>
        <b-field grouped>
          <b-field label="$Matricula" label-position="on-border">
            <b-input v-model="matricula" placeholder="ABC123" v-focus></b-input>
          </b-field>
        </b-field>
        <b-field label="$Hora de ingreso" label-position="on-border">
          <b-datetimepicker v-model="horaIngreso" rounded placeholder="$Elegir..." icon="calendar-today" inline>
          </b-datetimepicker>
        </b-field>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-primary" @click="generarQR" icon-left="receipt-text-clock-outline">$Generar</b-button>
      </div>
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-danger" @click="limpiarTodo" icon-left="eraser">$Limpiar</b-button>
      </div>
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-info" @click="horaIngresoEsAhora" icon-left="clock-in">$Ahora</b-button>
      </div>
    </div>
    <div v-html="svgString"></div>
    {{ codigoParqueo }}
  </section>
</template>

<script lang="ts" setup>
import { generateSVGString } from '@intosoft/custoqr';

const store = useConfiguracionStore()

let horaIngreso = ref<Date | null>(new Date())
let svgString = ref('')
let matricula = ref('')
let codigoParqueo = ref('')

const configQR = {
  "length": 300,
  "padding": 20,
  "errorCorrectionLevel": "H" as const,
  "logo": {
    "url": "",
    "size": 11,
    "removeBg": false
  },
  "shapes": {
    "eyeFrame": "styleB" as const,
    "eyeball": "styleC" as const,
    "body": "styleB" as const
  },
  "colors": {
    "background": "transparent",
    "body": "rgba(0, 0, 0, 1)",
    "eyeFrame": {
      "topLeft": "body",
      "topRight": "body",
      "bottomLeft": "body"
    },
    "eyeball": {
      "topLeft": "body",
      "topRight": "body",
      "bottomLeft": "body"
    }
  }
} as Config

const generarQR = () => {
  console.log(store.configuracion.Nombre)
  let prefijo = !!matricula.value ? matricula.value : store.configuracion.Nombre
  if (!horaIngreso.value) return
  codigoParqueo.value = horaIngresoEpoch.value
  configQR.value = `${prefijo}^${codigoParqueo.value}`
  svgString.value = generateSVGString(configQR)
}

const limpiarTodo = () => {
  matricula.value = ''
  horaIngreso.value = null
  limiparQR()
}

const limiparQR = () => {
  configQR.value = ''
  svgString.value = ''
}

const horaIngresoEsAhora = () => {
  limpiarTodo()
  horaIngreso.value = new Date()
}

let horaIngresoEpoch = computed(() => {
  if (!horaIngreso.value) return ''
  const ms = horaIngreso.value.getTime()
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  return ((m * 60) * 1000).toString()
})

watch(horaIngresoEpoch, limiparQR)
watch(matricula, limiparQR)
</script>
