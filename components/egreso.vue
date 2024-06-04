<template>
  <div>
    <titulo />
    <div v-if="horaIngreso">
      <calculo :hora-ingreso="horaIngreso" :matricula="matricula" />
    </div>
    <div v-else>
      <b-field v-if="usarQR">
        <b-switch v-model="mostrarCamara">$Abrir camara</b-switch>
      </b-field>
      <b-field v-else>
        <b-numberinput v-model="codigo" placeholder="1712270640" v-focus></b-numberinput>
        <b-button type="is-primary" @click="leerQR" icon-left="qrcode">$Leer QR</b-button>
      </b-field>
      <qrcode-stream @decode="leerQR" v-if="mostrarCamara"></qrcode-stream>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrcodeStream } from 'qrcode-reader-vue3'

const store = useConfiguracionStore()
const mostrarCamara = ref(false)
const matricula = ref(store.configuracion.Nombre)
const horaIngreso = ref<Date | null>(null)
const usarQR = computed(() => store.configuracion.UsarQR)
const codigo = ref(0)

const leerQR = (valor: any) => {
  mostrarCamara.value = false

  if (usarQR) {
    const valores = valor.split('^')
    if (valores.length !== 3) {
      alert('$QR invalido')
      return
    }
    matricula.value = valores[0]
    if (store.configuracion.Nombre !== matricula.value) {
      alert('$Parqueo invalido')
      return
    }
    matricula.value = valores[1]
    codigo.value = valores[2]
  }

  const fechaIngreso = (codigo.value * 1000) as any
  if (fechaIngreso! instanceof Date || !isFinite(+fechaIngreso)) {
    alert('$QR invalido')
    return
  }

  horaIngreso.value = new Date(parseInt(fechaIngreso))
}

</script>
