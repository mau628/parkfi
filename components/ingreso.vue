<template>
  <section>
    <titulo :subtitulo="$t('ingreso.subtitulo')" />
    <b-message type="is-info" has-icon icon="receipt-clock-outline">
      {{ $t('ingreso.mensaje') }}
    </b-message>
    <div class="columns is-mobile is-centered">
      <div class="column is-4-desktop">
        <b-field grouped>
          <b-field>
            <template #label>
              <b-icon icon="car" size="is-medium" type="is-success"></b-icon>
              {{ $t('ingreso.matricula') }}
            </template>
            <b-input v-model.trim="matricula" placeholder="ABC123" v-focus ref="inputMatricula"
              :required="!usarQR"></b-input>
          </b-field>
        </b-field>
        <b-field>
          <template #label>
            <b-icon icon="clock-in" size="is-medium" type="is-success"></b-icon>
            {{ $t('ingreso.titulo') }}
          </template>
          <b-datetimepicker v-model="horaIngreso" rounded :placeholder="$t('elegir')" icon="calendar-today" inline
            :locale="locale">
          </b-datetimepicker>
        </b-field>
      </div>
    </div>
    <div class="columns is-mobile is-centered">
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-primary" @click="generarCodigo" icon-left="receipt-text-clock-outline">{{
      $t('ingreso.generar')
    }}</b-button>
      </div>
      <div class="column is-2-desktop is-4-mobile">
        <b-button type="is-danger" @click="limpiarTodo" icon-left="eraser">{{ ($t('limpiar')) }}</b-button>
      </div>
    </div>

    <div class="columns is-mobile is-centered" ref="divImpresion" v-show="mostrarImpresion">
      <div class="column is-4-desktop">
        <div class="card">
          <div class="card-content">
            <p class="title">
              <span v-if="!!store.configuracion.Nombre">
                {{ store.configuracion.Nombre }}
              </span>
            </p>
            <p class="subtitle">
              <small><time :datetime="horaIngresoLegible">{{ horaIngresoLegible }}</time></small>
              <br>
              <strong><code>{{ token36 }}</code></strong>
              <br>
              <small>
                <span v-if="!!matricula">
                  <b-icon icon="car-info" size="is-small"></b-icon>
                  {{ matricula }}
                </span>
              </small>
            </p>
            <b-button type="is-danger" icon-left="eraser" @click="imprimir" v-if="!autoImprimir">{{ $t('imprimir')
              }}</b-button>
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
import { generateSVGString } from '@intosoft/custoqr'

const { locale } = useI18n()
const { t } = useI18n()
const store = useConfiguracionStore()
const horaIngreso = ref<Date | null>(new Date())
const svgString = ref('')
const matricula = ref('')
const inputMatricula = ref()
const divImpresion = ref()
const usarQR = computed(() => store.configuracion.UsarQR)
const autoImprimir = computed(() => store.configuracion.AutoImprimir)
const mostrarImpresion = ref(false)
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
} as any

const generarCodigo = () => {
  if (!horaIngreso.value) return

  if (!usarQR.value && !matricula.value) {
    alert(t('errores.matriculaRequerida'))
    return
  }
  else {
    const valoresQR = [store.configuracion.Nombre, matricula.value, token36.value]
    configQR.value = valoresQR.join("^")
    svgString.value = generateSVGString(configQR)
  }
  mostrarImpresion.value = true
  setTimeout(() => {
    if (autoImprimir.value) {
      imprimir()
      return
    }

    if (divImpresion.value) divImpresion.value.scrollIntoView({ behavior: 'smooth' })
  }, 150)
}

const limpiarTodo = () => {
  matricula.value = ''
  horaIngreso.value = new Date()
  mostrarImpresion.value = false
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
  document.querySelectorAll('.printable').forEach(e => e.remove())
  limpiarTodo()
};
</script>
