<template>
  <b-navbar :fixed-top="true" type="is-light">
    <template #brand>

      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="car-brake-parking" type="is-link"></b-icon>&nbsp;
        <span v-if="!!store.configuracion.Nombre">
          <strong>{{ store.configuracion.Nombre }}</strong>
        </span>
      </b-navbar-item>

    </template>

    <template #start>

      <b-navbar-item tag="router-link" :to="{ path: '/ingreso' }">
        <b-icon icon="clock-in" type="is-success" size="is-small"></b-icon>&nbsp;
        {{ $t('ingreso.titulo') }}
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ path: '/egreso' }">
        <b-icon icon="clock-out" type="is-danger" size="is-small"></b-icon>&nbsp;
        {{ $t('egreso.titulo') }}
      </b-navbar-item>

    </template>

    <template #end>

      <b-navbar-dropdown :label="$t('idioma')">
        <b-navbar-item href="#" @click="cambiarIdioma('es')">
          <country-flag country="es" size="small" />
          Español
        </b-navbar-item>
        <b-navbar-item href="#" @click="cambiarIdioma('en')">
          <country-flag country="gb" size="small" />
          English
        </b-navbar-item>
      </b-navbar-dropdown>

      <b-navbar-item v-if="false">
        <b-field>
          <b-switch v-model="modoOscuro" true-value="dark" false-value="light">Dark mode</b-switch>
        </b-field>
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ path: '/configuracion' }">
        <b-icon icon="cogs" size="is-small"></b-icon>&nbsp;
        {{ $t('configuracion.titulo') }}
      </b-navbar-item>

      <b-navbar-item tag="div">
        <b-button type="is-link" @click="mostrarModalColaboracion = true" icon-left="robot-happy">
          {{ $t('colaborar.titulo') }}
        </b-button>
      </b-navbar-item>

    </template>

  </b-navbar>
  <div class="block">
    <div class="container">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>

  <b-modal v-model="mostrarModalColaboracion" :width="640" scroll="keep">
    <colaborar />
  </b-modal>
</template>

<script setup lang="ts">
const store = useConfiguracionStore()
const { setLocale } = useI18n()
const themeMediaValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
/* DARK MODE
  Debe agregar la clase theme-dark a la etiqueta html para que funcione.
  Disponible en bulma 1, sin embargo hay que esperar a que se integre en buefy
*/
const modoOscuro = ref(store.configuracion.Tema || themeMediaValue)
const mostrarModalColaboracion = ref(false)

const cambiarIdioma = (idioma: string) => {
  setLocale(idioma)
  store.configuracion.Idioma = idioma
}

watch(() => modoOscuro.value, (value: string) => cambiarTema(value))

const cambiarTema = (tema: string) => {
  store.configuracion.Tema = tema
  document.documentElement.dataset.theme = tema
}

cambiarTema(store.configuracion.Tema)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

@media print {
  .card {
    margin: 0;
    padding: 0;
    border: none;
    box-shadow: none;
  }

  body> :not(.printable) {
    display: none !important;
  }

  .printable {
    display: block !important;
    visibility: visible !important;
    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
}
</style>