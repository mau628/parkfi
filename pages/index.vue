<template>
    {{ store.listaTarifas }}
</template>

<script setup lang="ts">

const store = useTarifasStore()
const { listaTarifas } = storeToRefs(store)
watch(() => store.$state, (newValue, oldValue) => {
    console.log('listaTarifas', newValue)
}, { deep: true })
</script>