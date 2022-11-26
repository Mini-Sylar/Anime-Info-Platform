<script setup>
import NavbarVue from "./components/NavBar/Navbar.vue";
import BodyVue from "./components/Body/Body.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <NavbarVue />
  </header>
  <RouterView />
</template>

<style scoped>

</style>
