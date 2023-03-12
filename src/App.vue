<script setup>
import NavbarVue from "./components/NavBar/Navbar.vue";
import { RouterView } from "vue-router";
import { useAnimeData } from '@/stores/anime_data';
import { computed, watch } from 'vue'
import { useNetwork } from '@vueuse/core'
import { useToast } from "vue-toastification";

const toast = useToast();
const setColor = computed(() => {
  return useAnimeData().getAccentColor
});

const { isOnline } = useNetwork()

watch(isOnline, (value) => {
  if (value) {
    toast.success("Back Online!", { duration: 1000 })
  } else {
    toast.error("Offline!, You won't be able to search for anime or reach out to me.", { duration: 1000 })
  }
})
</script>

<template>
  <header>
    <NavbarVue />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component"></component>
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

.router-link-active {
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
.history-container,
.send-message {
  background-color: v-bind("setColor + '20'") !important;
}


* {
  accent-color: v-bind("setColor") !important;
  transition: accent-color .5s ease-in-out;
}

.history-title:hover,
.go-back-home {
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

.first,
.send-message {
  background: v-bind('setColor') !important;
}

.uses-dynamic {
  color: v-bind('setColor') !important;
  fill: v-bind('setColor') !important;
}

.dividers {
  background-color: v-bind('setColor') !important;
}

.arrow-icon-divider * {
  border: 3px solid v-bind('setColor') !important;
}

.contact-form {
  background-color: v-bind('setColor + "20"') !important;
  box-shadow: 0 0 10px 0 v-bind('setColor + "20"') !important;
  ;
}

.send-message,
.go-back-home {
  background-color: v-bind('setColor + "30"') !important;
}

.form-input {
  border-bottom: 1px solid v-bind('setColor') !important;
}
</style>
