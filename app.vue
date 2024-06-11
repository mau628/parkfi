<template>
  <b-navbar :fixed-top="true" type="is-light">
    <template #brand>

      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="car-brake-parking" type="is-link"></b-icon>&nbsp;
        <span v-if="!!store.configuracion.Nombre">
          {{ store.configuracion.Nombre }}
        </span>
      </b-navbar-item>

    </template>

    <template #start>

      <b-navbar-item tag="router-link" :to="{ path: '/ingreso' }">
        {{ $t('ingreso.titulo') }}
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ path: '/egreso' }">
        {{ $t('egreso.titulo') }}
      </b-navbar-item>

    </template>

    <template #end>

      <b-navbar-dropdown :label="$t('idioma')">
        <b-navbar-item href="#" @click="cambiarIdioma('es')">
          Español
        </b-navbar-item>
        <b-navbar-item href="#" @click="cambiarIdioma('en')">
          English
        </b-navbar-item>
      </b-navbar-dropdown>

      <b-navbar-item v-if="false">
        <b-field>
          <b-switch v-model="modoOscuro" true-value="dark" false-value="light">Dark mode</b-switch>
        </b-field>
      </b-navbar-item>

      <b-navbar-item tag="router-link" :to="{ path: '/configuracion' }">
        {{ $t('configuracion.titulo') }}
      </b-navbar-item>

      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-success">
            {{ $t('colaborar') }}
          </a>
        </div>
      </b-navbar-item>

    </template>

  </b-navbar>
  <div class="block">
    <div class="container">
      {{ modoOscuro }}
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useConfiguracionStore()
const { locale, setLocale } = useI18n()
const themeMediaValue = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
const modoOscuro = ref(store.configuracion.Tema || themeMediaValue) // Debe agregar la clase theme-dark a la etiqueta html para que funcione

const cambiarIdioma = (idioma: string) => {
  console.log(idioma)
  setLocale(idioma)
  store.configuracion.Idioma = idioma
}

watch(() => modoOscuro.value, (value: string) => cambiarTema(value))

const cambiarTema = (tema: string) => {
  store.configuracion.Tema = tema
  document.documentElement.dataset.theme = tema
}

cambiarTema(store.configuracion.Tema)

if (locale.value !== store.configuracion.Idioma) {
  setLocale(store.configuracion.Idioma)
}

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