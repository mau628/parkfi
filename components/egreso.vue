<template>
  <section>
    <titulo />
    <b-message type="is-info" has-icon icon="receipt-clock-outline">
      $Esacanee el código QR <b-icon icon="qrcode" size="is-small"></b-icon> del ticket de ingreso o ingrese el código manualmente <b-icon icon="keyboard" size="is-small"></b-icon>
    </b-message>
    <div v-if="!!horaIngreso" class="columns is-mobile is-centered">
      <div class="column is-7">
        <calculo :hora-ingreso="horaIngreso" :matricula="matricula" />
        <b-button type="is-danger" @click="limpiar" icon-left="eraser">
          $Limpiar
        </b-button>
      </div>
    </div>
    <div v-else class="columns is-mobile is-centered">
      <div class="column is-2">
        <b-field>
          <b-button v-show="!mostrarCamara" type="is-link" @click="mostrarCamara = true" icon-left="qrcode">
            $Leer QR
          </b-button>
        </b-field>
      </div>
      <div class="column is-1">
        <span>$o</span>
      </div>
      <div class="column is-2">
        <b-field message="$Ingrese el código">
          <b-input v-model="token36" placeholder="ABC123" :controls="false" v-focus @keyup="handlerEpoch" icon="keyboard"></b-input>
        </b-field>
      </div>
    </div>
    <div v-if="mostrarCamara">
      <qrcode-stream @decode="leerQR"></qrcode-stream>
      <b-button type="is-danger" @click="mostrarCamara = false" icon-left="cancel">
        $Cancelar
      </b-button>
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
const token36 = ref('')

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
  token36.value = valores[2]
  validarCodigo(token36.value, true)
}

const handlerEpoch = (event: KeyboardEvent) => {
  validarCodigo(token36.value)
}

const limpiar = () => {
  matricula.value = ''
  token36.value = ''
  horaIngreso.value = null
}

const validarCodigo = (valor: string, mostrarError: boolean = false) => {
  let hayError = false
  let puntoError = ''
  let horaIngresoTicket = new Date()

  const validarErrores = () => {
    const epoch = parseInt(valor.toString(), 36) * 60
    if (!epoch || epoch.toString().length != 10) {
      hayError = true
      puntoError = 'epoch'
      return
    }

    const fechaHoraIngreso = (epoch * 1000) as any
    if (fechaHoraIngreso! instanceof Date || !isFinite(+fechaHoraIngreso)) {
      hayError = true
      puntoError = 'fechaHoraIngreso'
      return
    }

    const ahora = new Date()
    horaIngresoTicket = new Date(parseInt(fechaHoraIngreso))
    if (!horaIngresoTicket
      || horaIngresoTicket.toString() === 'Invalid Date'
      || horaIngresoTicket.getFullYear() < ahora.getFullYear() - 1
      || horaIngresoTicket > ahora) {
      hayError = true
      puntoError = 'horaIngresoTicket'
      return
    }
  }

  validarErrores()
  if (hayError) {
    if (mostrarError) {
      alert('$QR invalido')
    }
    return
  }

  horaIngreso.value = horaIngresoTicket
}
</script>
