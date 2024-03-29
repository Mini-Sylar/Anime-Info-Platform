<script setup>
import BodyVue from '../components/Body/Body.vue'
import SurpriseMe from '../components/Cards/SurpriseMe/SurpriseMe.vue'
import Recommendations from '../components/Cards/Recommendations/Recommendations.vue'
import BodyLoading from '../components/Body/Loading/BodyLoading.vue'
import CardLoading from '../components/Cards/Loading/CardLoading.vue'
import { useAnimeData } from '../stores/anime_data'
import { onMounted,onErrorCaptured,computed,inject} from 'vue'
import { useHead } from '@unhead/vue'
import { useRouter } from 'vue-router'


const mixpanel = inject('mixpanel')
const mainAnimeData = useAnimeData()
const router = useRouter()


const setColor = computed(() => {
  return mainAnimeData.getAccentColor
})

 useHead({
      title: 'Anime Info Platform | Home',
      meta: [
        {
          name: 'description',
          content:
            'Search for your favorite anime and get information, recommendations, and more using the anime info platform.'
        },
        {
          name: 'keywords',
          content: 'anime, anime info, anime info platform, anime info website, anime information'
        }
      ]
    })



onMounted(() => {
     mixpanel.track('Home Page')
});

onErrorCaptured((error) => {
  console.error('Error captured in HomeView.vue: ', error.message)
  router.push('/not-found')
})


</script>

<template>
  <div class="main-div">
    <div class="left-side-main">
      <Suspense>
        <template #default>
          <BodyVue />
        </template>
        <template #fallback>
          <div class="loading-container">
            <BodyLoading></BodyLoading>
          </div>
        </template>
      </Suspense>
    </div>
    <div class="right-side-main">
      <Suspense :timeout="2000">
        <template #default>
          <div class="main-card-section">
            <Recommendations />
            <SurpriseMe></SurpriseMe>
          </div>
        </template>
        <template #fallback>
          <div class="main-card-section">
            <CardLoading></CardLoading>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style>
button {
  background-color: v-bind('setColor') !important;
  color: white !important;
  transition: all 0.5s ease-in-out;
}

.action-button {
  background-color: transparent !important;
  color: v-bind('setColor') !important;
  fill: v-bind('setColor') !important;
}

iframe {
  border: 2px solid v-bind('setColor');
  transition: border 0.5s ease-in-out;
}

*::-webkit-scrollbar-thumb {
  background-color: v-bind('setColor') !important;
  transition: all 0.5s ease-in-out;
}

.card-hovered:hover {
  color: v-bind('setColor') !important;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.622);
  transition: all 0.2s ease;
  filter: brightness(200%);
}

select {
  background-color: v-bind('setColor') !important;
  color: white !important;
  transition: all 0.5s ease-in-out;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.loading-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 60%;
  padding-left: 2rem;
}

.main-div {
  display: flex;
  width: 100%;
  /* overflow: hidden; */
  position: absolute;
  top: 0;
  z-index: -1;
}

@media screen and (max-width: 821px) {
  .main-div {
    flex-direction: column;
    gap: 4rem;
  }
}
</style>
