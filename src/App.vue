<script setup>
import NavbarVue from "./components/NavBar/Navbar.vue";
import BodyVue from "./components/Body/Body.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <NavbarVue />
  </header>
  <main>
    <div class="left-side-main">
      <BodyVue />
    </div>
    <div class="right-side-main"></div>

  </main>
  <RouterView />
</template>

<style scoped>

</style>
