<script setup>
import NavbarVue from './components/NavBar/Navbar.vue'
import { RouterView } from 'vue-router'
import { useAnimeData } from '@/stores/anime_data'
import { computed, watch, ref } from 'vue'
import { useNetwork } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import NewestFeatures from './components/Modals/NewestFeatures.vue'

const toast = useToast()
const setColor = computed(() => {
  return useAnimeData().getAccentColor
})

const { isOnline } = useNetwork()

watch(isOnline, (value) => {
  if (value) {
    toast.success('Back Online!')
  } else {
    toast.error("Offline!, You won't be able to search for anime or reach out to me.")
  }
})

const newFeatures = ref([
  {
    timestamp: '26-02-2024'
  },
  {
    title: 'PWA Mode (26-02-2024)📱',
    description:
      'You can now install the app on your device and use it offline. Hit the icon on your nav bar to install. 🚀'
  },
  {
    title: 'Bookmarks 🌟',
    description:
      'Keep track of your shows with the new bookmark feature 🚀. <br>Star your show to get started'
  },
  {
    title: 'History 📖',
    description: "Find out the 10 latest shows you've searched"
  },
  {
    title: 'Genres',
    description: 'Choose the specific genre you want and surprise yourself'
  }
])

// const showNewFeatures = ref(false)
const showNewFeatures = computed(() => {
  return useAnimeData().showNewFeatures
})

const prepareNextFeature = () => {
  localStorage.setItem('newFeatures', JSON.stringify(newFeatures.value))
  useAnimeData().showNewFeatures = false
}
// watch localStorage for changes
const checkLocalStorage = () => {
  if (localStorage.getItem('newFeatures') === null) {
    return (useAnimeData().showNewFeatures = true)
  } else {
    // check if content is the same
    const newFeaturesFromStorage = JSON.parse(localStorage.getItem('newFeatures'))
    if (
      JSON.stringify(newFeaturesFromStorage[0].timestamp) !=
      JSON.stringify(newFeatures.value[0].timestamp)
    ) {
      return (useAnimeData().showNewFeatures = true)
    }
    return (useAnimeData().showNewFeatures = false)
  }
}

checkLocalStorage()

watch(showNewFeatures, (value) => {
  if (value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

<template>
  <NavbarVue />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <Teleport to="body">
    <NewestFeatures
      :show="showNewFeatures"
      @close="prepareNextFeature"
      :newFeatures="newFeatures.slice(1)"
    >
    </NewestFeatures>
  </Teleport>
</template>

<style>
/* Slide Animation */
.slide-enter-active,
.slide-leave-active {
  position: absolute;
  transition:
    opacity 1s,
    transform 1s;
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
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.tbl-content::-webkit-scrollbar-thumb {
  background-color: v-bind('setColor') !important;
  transition: all 0.5s ease-in-out;
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
  color: v-bind('setColor') !important;
  transition: color 0.5s ease-in-out;
}

.router-link-active {
  color: v-bind('setColor') !important;
  transition: color 0.5s ease-in-out;
}

::selection {
  background-color: v-bind("setColor + '80'") !important;
}

.carrette_button {
  background-color: v-bind('setColor') !important;
  transition: background-color 0.5s ease-in-out;
}

.contains-genres,
.history-container,
.send-message,
.bookmarked-container,
.search-bookmark {
  background-color: v-bind("setColor + '20'") !important;
}

.check::before,
.check::after {
  background: v-bind('setColor') !important;
}

.tbl-content,
td,
.table-item,
.latest-episode {
  border-color: v-bind("setColor + '20'") !important;
}

* {
  accent-color: v-bind('setColor') !important;
  transition: accent-color 0.5s ease-in-out;
}

.history-title:hover,
.go-back-home,
.bookmarked-show:hover,
.title:hover p {
  color: v-bind('setColor') !important;
  transition: color 0.2s ease-in-out;
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
  transition: fill 0.2s ease-in-out;
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
}

.first-last,
.next-prev {
  background-color: v-bind('setColor + "50"') !important;
  box-shadow: 0 0 10px 0 v-bind('setColor + "50"') !important;
}

.send-message,
.go-back-home {
  background-color: v-bind('setColor + "30"') !important;
}

.form-input {
  border-bottom: 1px solid v-bind('setColor') !important;
}

.image-mobile {
  filter: drop-shadow(0 0 0.75rem v-bind('setColor')) !important;
  border: 0.5px solid v-bind('setColor') !important;
}
</style>
