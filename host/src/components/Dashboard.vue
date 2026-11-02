<script setup>
import RemoteMount from './RemoteMount.vue'
const loadReact = () => import('remote_react/mount')
const loadVue = () => import('remote_vue/mount')
const loadAngular = () => import('remote_angular/mount')
</script>

<template>
  <div class="grid">
    <RemoteMount :loader="loadReact" :app-props="{ user: 'Alice' }" />
    <RemoteMount :loader="loadVue" :app-props="{ user: 'Alice' }" />
    <RemoteMount :loader="loadAngular" :app-props="{ user: 'Alice' }" />
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
</style>
