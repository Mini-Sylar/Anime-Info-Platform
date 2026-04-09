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

  <Teleport to="body">
    <Modal :show="showNotificationSettings" @close="closeNotificationSettings">
      <template #header>
        <h3>Notification Settings 🔔</h3>
      </template>
      <template #body>
        <Settings />
      </template>
    </Modal>
  </Teleport>
</template>

<script setup>
import NavbarVue from './components/NavBar/Navbar.vue'
import { RouterView } from 'vue-router'
import { useAnimeData } from '@/stores/anime_data'
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import { useNetwork } from '@vueuse/core'
import { useToast } from 'vue-toastification'
import NewestFeatures from './components/Modals/NewestFeatures.vue'
import Modal from './components/Modals/Modal.vue'
import Settings from './components/Body/Settings/Settings.vue'
import { useBookmarks } from './stores/bookmarks'

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
    timestamp: '09-04-2026'
  },
  {
    title: 'Smart Notifications (09-04-2026) 🔔',
    description:
      'You can now get low-noise release notifications for your bookmarked shows. Alerts are deduped, throttled, and grouped by digest to avoid spam.'
  },
  {
    title: 'Notification Settings Panel ⚙️',
    description:
      'Added a dedicated settings panel with quiet hours, cooldown control, and max alerts per digest. You can tune how chatty notifications should be.'
  },
  {
    title: 'Settings Shortcut in Navbar 🧭',
    description:
      'Settings is now accessible from both desktop and mobile navigation, with a bell indicator so it is easy to find.'
  }
])

// const showNewFeatures = ref(false)
const showNewFeatures = computed(() => {
  return useAnimeData().showNewFeatures
})

const showNotificationSettings = computed(() => {
  return useAnimeData().showNotificationSettings
})

const closeNotificationSettings = () => {
  useAnimeData().closeNotificationSettings()
}

const bookmarksStore = useBookmarks()
let notificationInterval = null

const runNotificationCheck = async () => {
  try {
    await bookmarksStore.checkForReleaseNotifications()
  } catch {
    // Silent by design: this loop should never annoy users with runtime noise.
  }
}

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

onMounted(() => {
  runNotificationCheck()
  notificationInterval = setInterval(runNotificationCheck, 45 * 60 * 1000)
})

onUnmounted(() => {
  if (notificationInterval) {
    clearInterval(notificationInterval)
    notificationInterval = null
  }
})

watch([showNewFeatures, showNotificationSettings], ([featuresOpen, notificationOpen]) => {
  if (featuresOpen || notificationOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
})
</script>

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
