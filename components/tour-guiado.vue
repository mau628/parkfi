<template>
  <section>
    <VTour :steps="store.pasos" ref="tour" :name="props.nombre" v-if="mostrarTour"></VTour>
    <b-button type="is-info" icon-left="shoe-print" size="is-small" rounded @click="iniciar">
      {{ $t('tour.reiniciar') }}
    </b-button>
  </section>
</template>

<script lang="ts" setup>
const { t, locale } = useI18n()
const configuracion = useConfiguracionStore()
const store = usePasosStore()
const tour = ref();

const props = defineProps<{
  pasos: object[],
  nombre: string
}>()

const iniciar = () => {
  tour.value.resetTour()
  tour.value.startTour()
}

onMounted(() => {
  actualizarPasos()
  tour.value.startTour()
});

const idx = ref(0)

const actualizarPasos = () => {
  nextTick(() => {
    if (store.pasos.length > 0) {
      store.quitarPasos()
    }
    props.pasos.forEach(paso => {
      store.agregarPaso({ target: paso.target, content: t(paso.content) })
    })
  })
}
const mostrarTour = computed(() => {
  return store.pasos.length > 0
})

watch(() => configuracion, () => {
  // FIX para que se actualice el tour
  setTimeout(() => {
    actualizarPasos()
  }, 0)
}, { deep: true })

const pasosA = [{
  target: "[name='nombre']",
  content: t('tourConfiguracion.paso1'),
},
{
  target: "[name='moneda']",
  content: t("tourConfiguracion.paso2"),
},
{
  target: "[name='usarQR']",
  content: t("tourConfiguracion.paso3"),
},
{
  target: "[name='autoImprimir']",
  content: t("tourConfiguracion.paso4"),
},
]

</script>