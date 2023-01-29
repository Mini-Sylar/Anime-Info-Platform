<script setup>
import NavbarVue from "./components/NavBar/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
import { useAnimeData } from '@/stores/anime_data';
import { computed } from 'vue'


const setColor = computed(() => {
  return useAnimeData().getAccentColor
});

</script>

<template>
  <header>
    <NavbarVue />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </main>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  position: absolute;
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  position: absolute;
  transform: translateX(-30%);
}

.is-url:hover {
  color: v-bind("setColor") !important;
  transition: color .5s ease-in-out;
}

::selection {
  background-color: v-bind("setColor + '80'");
}
</style>
