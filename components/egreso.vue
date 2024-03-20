<template>
  <div>
    <div v-if="hayIngreso">
      <calculo :hora-ingreso="horaIngreso" :matricula="matricula" />
    </div>
    <div v-else>
      <b-field>
        <b-switch v-model="mostrarCamara">$Abrir camara</b-switch>
      </b-field>
      <qrcode-stream @decode="leerQR" v-if="mostrarCamara"></qrcode-stream>
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