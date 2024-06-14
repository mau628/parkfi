<template>
  <section>
    <VTour :steps="pasosStore.pasos" ref="tourComponent" :name="props.nombre" v-if="mostrarTour"
      :buttonLabels="pasosStore.botones" :highlight="true" @onTourStart="iniciarTour"></VTour>
    <b-button type="is-info" icon-left="shoe-print" size="is-small" rounded @click="iniciar">
      {{ $t('tour.reiniciar') }}
    </b-button>
  </section>
</template>

<script lang="ts" setup>
import type { PasoTour } from '~/types/paso-tour';

const configuracionStore = useConfiguracionStore()
const pasosStore = usePasosStore()
const tourComponent = ref();
const { t } = useI18n()
const tourIniciado = ref(false)

const actualizarBotones = () => {
  pasosStore.botones = {
    next: t('tour.siguiente'),
    prev: t('tour.anterior'),
    skip: t('tour.saltar'),
    finish: t('tour.finalizar')
  }
}

const props = defineProps<{
  pasos: PasoTour[],
  nombre: string
}>()

const iniciar = () => {
  if (tourIniciado.value) {
    tourComponent.value.endTour()
  }
  tourComponent.value.resetTour()
  tourComponent.value.startTour()
}

const actualizarPasos = () => {
  nextTick(() => {
    if (pasosStore.pasos.length > 0) {
      pasosStore.quitarPasos()
    }
    props.pasos.forEach(paso => {
      pasosStore.agregarPaso(paso.Translate(t))
    })
  })
}
const mostrarTour = computed(() => {
  return pasosStore.pasos.length > 0
})

const iniciarTour = () => {
  tourIniciado.value = true
}

watch(() => configuracionStore, () => {
  // FIX para que se actualice el tour cuando se cambia de idioma.
  // Al parecer, el modulo de i18n no actualiza las traducciones en tiempo real.
  setTimeout(() => {
    actualizarPasos()
    actualizarBotones()
  }, 0)
},
  {
    deep: true
  })

onMounted(() => {
  actualizarPasos()
  actualizarBotones()
  tourComponent.value.startTour()
});
</script>