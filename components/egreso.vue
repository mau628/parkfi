<template>
  <div>
    <div v-if="horaIngreso">
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
const matricula = ref('')
const horaIngreso = ref<Date | null>(null)

const leerQR = (valor: any) => {
  mostrarCamara.value = false

  const valores = valor.split('^')
  if (valores.length !== 2) {
    alert('$QR invalido')
    return
  }

  const fechaIngreso = valores[1]
  if (fechaIngreso! instanceof Date || !isFinite(+fechaIngreso)) {
    alert('$QR invalido')
    return
  }

  matricula.value = valores[0]
  horaIngreso.value = new Date(parseInt(fechaIngreso))
}

</script>
