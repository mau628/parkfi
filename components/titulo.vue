<template>
  <section class="hero is-info">
    <div class="hero-body">
      <p class="title">{{ textoTitulo }}</p>
      <p class="subtitle">{{ textoSubtitulo }}</p>
    </div>
  </section>
  <br>
</template>

<script lang="ts" setup>
const route = useRoute()

const textoTitulo = computed(() => props.titulo || _capitalize(route.name) as string)
const textoSubtitulo = computed(() => props.subtitulo || '')

const props = defineProps({
  titulo: String,
  subtitulo: String
})
</script>
