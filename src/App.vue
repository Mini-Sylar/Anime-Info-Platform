<script setup>
import NavbarVue from "./components/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <NavbarVue />
    <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
  </header>
  <RouterView />
</template>

<style scoped>

</style>
