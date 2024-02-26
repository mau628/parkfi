<template>
  <b-navbar fixed-top="true" type="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="car-brake-parking" type="is-link">
        </b-icon>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/tarifas' }">
        Tarifas
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-success">
            Colaborar
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
  <br>
  <section>
    <div class="container">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </section>
</template>