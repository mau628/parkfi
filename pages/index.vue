<template>
  <section>
    <titulo :titulo="nombre" subtitulo="$Servicio de estacionamiento" />
    <div class="columns">
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              $Ingreso
            </p>
            <p class="subtitle">
              $Registro de ingreso de vehículos <b-icon icon="car" size="is-small"></b-icon> al estacionamiento
            </p>
            <b-button type="is-success" icon-left="clock-in" tag="router-link"
              :to="{ path: '/ingreso' }">$Ingreso</b-button>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">
              $Egreso
            </p>
            <p class="subtitle">
              $Registro de egreso de vehículos <b-icon icon="car" size="is-small"></b-icon> al estacionamiento
            </p>
            <b-button type="is-danger" icon-left="clock-out" tag="router-link"
              :to="{ path: '/egreso' }">$Egreso</b-button>
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