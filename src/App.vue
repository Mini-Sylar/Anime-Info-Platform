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
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view>
  </main>
</template>

<style>
/* Slide Animation */
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


/* Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scale Animation */
.scale-enter-active,
.scale-leave-active {
  transition: transform 1s;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

.is-url:hover {
  color: v-bind("setColor") !important;
  transition: color .5s ease-in-out;
}

::selection {
  background-color: v-bind("setColor + '80'");
}


.carrette_button {
  background-color: v-bind("setColor") !important;
  transition: background-color .5s ease-in-out;
}

.contains-genres,
.history-container {
  background-color: v-bind("setColor + '20'") !important;
}

header:hover {
  box-shadow: 0 -10px 50px v-bind("setColor + '20'") !important;
  transition: all .5s ease-in-out;
}

* {
  accent-color: v-bind("setColor") !important;
  transition: accent-color .5s ease-in-out;
}

.history-title:hover {
  color: v-bind("setColor") !important;
  transition: color .2s ease-in-out;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.is-loader * {
  fill: v-bind('setColor') !important;
  transition: fill .2s ease-in-out;
}

#nav-icon1 span {
  background: v-bind('setColor') !important;
}

.first {
  background: v-bind('setColor') !important;
}
</style>
