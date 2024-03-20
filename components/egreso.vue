<template>
  <div>
    <div v-if="hayIngreso">
      <b-field grouped>
        <b-field label="$Matricula" label-position="on-border">
          <b-input required v-model="matricula" placeholder="ABC123" disabled></b-input>
        </b-field>
      </b-field>
      <b-field label="$Hora de ingreso" label-position="on-border">
        <b-datetimepicker v-model="horaIngreso" rounded placeholder="$Elegir..." icon="calendar-today" inline disabled>
        </b-datetimepicker>
      </b-field>
      <b-field label="$Hora de egreso" label-position="on-border">
        <b-datetimepicker v-model="horaEgreso" rounded placeholder="$Elegir..." icon="calendar-today" inline>
        </b-datetimepicker>
      </b-field>
      <b-button type="is-primary" @click="calcularTarifa">$Calcular tarifa</b-button>
    </div>
    <div v-else>
      <b-field>
        <b-switch v-model="mostrarCamara">$Abrir camara</b-switch>
      </b-field>
      <qrcode-stream @decode="leerQR" v-if="mostrarCamara"></qrcode-stream>
    </div>

    <div v-if="mostrarCalculo">
      <calculo :prop-hora-ingreso="horaIngreso" :prop-hora-egreso="horaEgreso" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrcodeStream } from 'qrcode-reader-vue3'

const mostrarCamara = ref(false)
const valorQR = ref('')
const matricula = ref('')
const horaIngreso = ref<Date | null>(null)
const horaEgreso = ref<Date | null>(null)
const hayIngreso = ref(false)
const mostrarCalculo = ref(false)

const leerQR = (valor: any) => {
  valorQR.value = valor
  mostrarCamara.value = false

  const valores = valor.split('^')
  matricula.value = valores[0]
  horaIngreso.value = new Date(parseInt(valores[1]))
  hayIngreso.value = true
  horaEgreso.value = new Date()
}

const calcularTarifa = () => {
  mostrarCalculo.value = (!!horaEgreso.value && !!horaIngreso.value)
}

</script>