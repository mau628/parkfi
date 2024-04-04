<template>
  <b-navbar :fixed-top="true" type="is-light">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon icon="car-brake-parking" type="is-link">
        </b-icon>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ path: '/ingreso' }">
        $Ingreso
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ path: '/egreso' }">
        $Egreso
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="router-link" :to="{ path: '/tarifas' }">
        $Tarifas
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-success">
            $Colaborar
          </a>
        </div>
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
</template>

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
</style>