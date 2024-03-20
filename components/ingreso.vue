<template>
    <div>
        <h3 class="subtitle is-3">$Ingreso</h3>
        <b-field grouped>
            <b-field label="$Matricula" label-position="on-border">
                <b-input required v-model="matricula" placeholder="ABC123"></b-input>
            </b-field>
        </b-field>
        <b-field label="$Hora de ingreso" label-position="on-border">
            <b-datetimepicker v-model="horaIngreso" rounded placeholder="$Elegir..." icon="calendar-today" inline>
            </b-datetimepicker>
        </b-field>
        <b-button type="is-primary" @click="generarQR">$Generar</b-button>
        <b-button type="is-danger" @click="limpiarTodo">$Limpiar</b-button>
        <b-button type="is-info" @click="horaIngresoEsAhora">$Ahora</b-button>
        <div v-html="svgString"></div>
    </div>
</template>

<script lang="ts" setup>
import { generateSVGString } from '@intosoft/custoqr';

let horaIngreso = ref<Date | null>()
let svgString = ref('')
let matricula = ref('')

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
    if (!matricula.value || !horaIngreso.value) return
    configQR.value = `${matricula.value}^${horaIngresoEpoch.value}`
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
