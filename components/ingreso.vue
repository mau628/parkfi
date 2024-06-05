<template>
  <section>
    <titulo subtitulo="$Registro del ingreso" />
    <div class="columns is-mobile is-centered">
      <div class="column is-4-desktop">
        <h3 class="subtitle is-3">$Ingreso</h3>
        <b-field grouped>
          <b-field label="$Matricula" label-position="on-border">
            <b-input v-model.trim="matricula" placeholder="ABC123" v-focus ref="inputMatricula"></b-input>
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
        <b-button type="is-primary" @click="generarCodigo" icon-left="receipt-text-clock-outline">$Generar</b-button>
      </div>
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-danger" @click="limpiarTodo" icon-left="eraser">$Limpiar</b-button>
      </div>
    </div>

    <div class="columns is-mobile is-centered" ref="divImpresion">
      <div class="column is-4-desktop">
        <div class="card" v-if="verCodigo">
          <div class="card-content">
            <p class="title">
              <span v-if="!!store.configuracion.Nombre">
                {{ store.configuracion.Nombre }}
              </span>
            </p>
            <p class="subtitle">
              <small><time :datetime="horaIngresoLegible">{{ horaIngresoLegible }}</time></small>
              <br>
              <strong>{{ token36 }}</strong>
              <br>
              <small>
                <span v-if="!!matricula">
                  <b-icon icon="car-info" size="is-small"></b-icon>
                  {{ matricula }}
                </span>
              </small>
            </p>
            <b-button type="is-danger" icon-left="eraser" @click="imprimir" v-if="!autoImprimir">$Imprimir</b-button>
          </div>
          <div class="card-image" v-if="usarQR">
            <div v-html="svgString"></div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script lang="ts" setup>
import { generateSVGString } from '@intosoft/custoqr';

const store = useConfiguracionStore()
const horaIngreso = ref<Date | null>(new Date())
const svgString = ref('')
const matricula = ref('')
const inputMatricula = ref()
const divImpresion = ref()
const usarQR = computed(() => store.configuracion.UsarQR)
const autoImprimir = computed(() => store.configuracion.AutoImprimir)
const verCodigo = ref(false)
const horaIngresoLegible = computed(() => {
  var fecha = horaIngreso.value?.toLocaleDateString([], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  var hora = horaIngreso.value?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })
  return `${fecha} ${hora}`
})

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

const generarCodigo = () => {
  if (!horaIngreso.value) return
  verCodigo.value = true

  if (!usarQR) return
  const valoresQR = [store.configuracion.Nombre, matricula.value, token36.value]
  configQR.value = valoresQR.join("^")
  svgString.value = generateSVGString(configQR)

  setTimeout(() => {
    if (autoImprimir.value) {
      imprimir()
      return
    }

    if (divImpresion.value) divImpresion.value.scrollIntoView({ behavior: 'smooth' })
  }, 150)
}

const limpiarTodo = () => {
  verCodigo.value = false
  matricula.value = ''
  horaIngreso.value = new Date()
  limiparQR()
  if (inputMatricula.value) inputMatricula.value.focus()
}

const limiparQR = () => {
  if (!usarQR) return
  configQR.value = ''
  svgString.value = ''
}

const imprimir = () => {
  var contenido = divImpresion.value?.innerHTML
  var nuevoDiv = document.createElement('div')
  nuevoDiv.classList.add('printable')
  nuevoDiv.innerHTML = contenido
  document.body.insertBefore(nuevoDiv, document.body.firstChild)
  window.print()
}

const token36 = computed(() => {
  if (!horaIngreso.value) return ''
  const ms = horaIngreso.value.getTime()
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const token36 = m.toString(36).toUpperCase()
  return token36
})

if (usarQR) {
  watch(token36, limiparQR)
  watch(matricula, limiparQR)
}

window.onafterprint = (event) => {
  document.querySelectorAll('.printable').forEach(e => e.remove());
  limpiarTodo()
};
</script>
