<template>
  <VTour
    autostart
    ref="tour"
    name="configuracion"
    :steps="pasos"
    :prevButton="botonAnterior"
    :nextButton="botonSiguiente"
    :skipButton="botonSaltar"
    :finishButton="botonFinalizar" />
</template>

<script lang="ts" setup>
import { VTour } from "#components"
import type { ButtonProp, TourStep } from "#nuxt-tour/props"

const { t } = useI18n()

const props = defineProps<{
  pasos: TourStep[]
}>()

const tour = ref<InstanceType<typeof VTour> | null>(null)
const botonSiguiente: ButtonProp = {
  label: t("tour.siguiente"),
}
const botonAnterior: ButtonProp = {
  label: t("tour.anterior"),
}
const botonSaltar: ButtonProp = {
  label: t("tour.saltar"),
}
const botonFinalizar: ButtonProp = {
  label: t("tour.finalizar"),
}

onMounted(() => {
  tour.value?.startTour()
})

</script>