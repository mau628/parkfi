<template>
  <section>
    <titulo />
    <div class="columns is-mobile is-centered">
      <div v-if="!!horaIngreso">
        <calculo :hora-ingreso="horaIngreso" :matricula="matricula" />
        <b-button type="is-danger" @click="limpiar" icon-left="eraser">
          $Limpiar
        </b-button>
      </div>
      <div v-else>
        <div v-if="usarQR">
          <b-field>
            <b-button v-show="!mostrarCamara" type="is-primary" @click="mostrarCamara = true" icon-left="qrcode">
              $Leer QR
            </b-button>
          </b-field>
          <div v-if="mostrarCamara">
            <qrcode-stream @decode="leerQR"></qrcode-stream>
            <b-button type="is-danger" @click="mostrarCamara = false" icon-left="cancel">
              $Cancelar
            </b-button>
          </div>
        </div>
        <div v-else>
          <b-field label="$Código">
            <b-numberinput v-model="epoch" placeholder="1712270640" :controls="false" v-focus
              @keyup="handlerEpoch"></b-numberinput>
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { QrcodeStream } from 'qrcode-reader-vue3'

const store = useConfiguracionStore()
const mostrarCamara = ref(false)
const horaIngreso = ref<Date | null>(null)
const usarQR = computed(() => store.configuracion.UsarQR)
const matricula = ref('')
const epoch = ref(0)

const leerQR = (valor: any) => {
  mostrarCamara.value = false

  const valores = valor.split('^')
  if (valores.length !== 3) {
    alert('$QR invalido')
    return
  }

  const nombreParqueo = valores[0]
  if (store.configuracion.Nombre !== nombreParqueo) {
    alert('$Parqueo invalido')
    return
  }
  matricula.value = valores[1]
  epoch.value = valores[2]
  validarCodigo(epoch.value, true)
}

const handlerEpoch = (event: KeyboardEvent) => {
  validarCodigo(epoch.value)
}

const limpiar = () => {
  matricula.value = ''
  epoch.value = 0
  horaIngreso.value = null
}

const validarCodigo = (valor: number, mostrarError: boolean = false) => {
  let hayError = false
  if (!valor || valor.toString().length != 10) hayError = true

  const fechaHoraIngreso = (valor * 1000) as any
  if (fechaHoraIngreso! instanceof Date || !isFinite(+fechaHoraIngreso)) {
    hayError = true
  }

  const ahora = new Date()
  const horaIngresoTicket = new Date(parseInt(fechaHoraIngreso))
  if (!horaIngresoTicket
    || horaIngresoTicket.toString() === 'Invalid Date'
    || horaIngresoTicket.getFullYear() < ahora.getFullYear() - 1
    || horaIngresoTicket > ahora) {
    hayError = true
  }

  if (hayError) {
    if (mostrarError) {
      alert('$QR invalido')
    }
    return
  }

  horaIngreso.value = horaIngresoTicket
}
</script>
