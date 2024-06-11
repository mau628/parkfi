<template>
  <section>
    <titulo :titulo="nombre" :subtitulo="$t('subtitulo')" />
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              {{ $t('ingreso.titulo') }}
            </p>
            <p class="subtitle">
              {{ $t('indice.ingreso.subtitulo1') }} <b-icon icon="car" size="is-small"></b-icon> {{
      $t('indice.ingreso.subtitulo2') }}
            </p>
            <b-button type="is-success" icon-left="clock-in" tag="router-link" :to="{ path: '/ingreso' }">{{
      $t('ingreso.titulo') }}</b-button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              {{ $t('egreso.titulo') }}
            </p>
            <p class="subtitle">
              {{ $t('indice.egreso.subtitulo1') }} <b-icon icon="car" size="is-small"></b-icon> {{
      $t('indice.egreso.subtitulo2') }}
            </p>
            <b-button type="is-danger" icon-left="clock-out" tag="router-link" :to="{ path: '/egreso' }">{{
              $t('egreso.titulo') }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const store = useConfiguracionStore()
const nombre = computed(() => store.configuracion.Nombre)
</script>