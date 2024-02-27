<script setup>
import { RouterLink } from 'vue-router'
import SearchboxVue from './componentsNavBar/Searchbox.vue'
import MobileHeader from './mobile/MobileHeader.vue'
import { computed } from 'vue'
import { useAnimeData } from '../../stores/anime_data'
import { detectMobile } from '../../js/helpers'
import { useRouter } from 'vue-router'
const animeData = useAnimeData()
const isMobile = computed(() => {
  return detectMobile()
})

const router = useRouter()

const redirectToHomeAndFetch = () => {
  router.push('/')
  animeData.fetchCurrentSeason()
}
</script>

<template>
  <header>
    <nav class="navigation-bar">
      <div class="main-links" v-if="!isMobile">
        <a
          role="button"
          title="get current season list"
          class="is-url is-link current-season"
          @click="redirectToHomeAndFetch"
          >Current Season</a
        >
        <RouterLink to="/" class="is-url">Home</RouterLink>
        <RouterLink to="/bookmarks" class="is-url">Bookmarks</RouterLink>
        <RouterLink to="/about" class="is-url">About</RouterLink>
        <RouterLink to="/contact" class="is-url">Contact</RouterLink>
      </div>
      <div v-else>
        <MobileHeader> </MobileHeader>
      </div>
      <div class="search-bar" v-if="$route.path === '/' || $route.params.search">
        <SearchboxVue />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navigation-bar {
  display: flex;
  padding: 1rem;
  width: min(90%, 1400px);
  height: 4rem;
}

.main-links {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: min(5rem, 10rem);
  padding-left: 0.5rem;
}

header {
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all 0.5s ease;
  position: relative;
  z-index: 10;
}

.is-link {
  cursor: pointer;
}

@media screen and (max-width: 1025px) {
  .search-bar {
    display: flex;
    justify-content: center;
    position: relative;
    left: 1rem;
    margin-top: 1rem;
  }

  header {
    position: relative;
    top: 0;
    width: 100%;
    height: 6rem;
    z-index: 300;
  }

  .main-links {
    gap: min(4rem, 10rem);
    justify-content: center;
  }

  .navigation-bar {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
