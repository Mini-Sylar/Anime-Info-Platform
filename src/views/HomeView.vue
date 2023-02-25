<script>
import BodyVue from '../components/Body/Body.vue';
import SurpriseMe from '../components/Cards/SurpriseMe/SurpriseMe.vue';
import Recommendations from '../components/Cards/Recommendations/Recommendations.vue';
import BodyLoading from '../components/Body/Loading/BodyLoading.vue';
import CardLoading from '../components/Cards/Loading/CardLoading.vue';
import { useAnimeData } from '../stores/anime_data';
import { defineAsyncComponent } from 'vue'

const RecommendationsWrapper = defineAsyncComponent(() => import('../components/Cards/Recommendations/Recommendations.vue'));

export default {
  name: 'Home',
  components: {
    BodyVue,
    RecommendationsWrapper,
    Recommendations,
    SurpriseMe,
    BodyLoading,
    CardLoading
  },
  computed: {
    setColor() {
      const mainAnimeData = useAnimeData()
      return mainAnimeData.getAccentColor;
    }
  },
  errorCaptured() {
    this.$router.push({ name: '404' })
    this.$router.go(1)
  }
}

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
  background-color: v-bind("setColor") !important;
  color: white !important;
  transition: all .5s ease-in-out;
}

.action-button {
  background-color: transparent !important;
  color: v-bind("setColor") !important;
}

iframe {
  border: 2px solid v-bind('setColor');
  transition: border .5s ease-in-out;
}

*::-webkit-scrollbar-thumb {
  background-color: v-bind("setColor") !important;
  transition: all .5s ease-in-out;
}

.card-hovered:hover {
  color: v-bind("setColor") !important;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.622);
  transition: all .2s ease;
  filter: brightness(200%);
}

select {
  background-color: v-bind("setColor") !important;
  color: white !important;
  transition: all .5s ease-in-out;
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
</style>