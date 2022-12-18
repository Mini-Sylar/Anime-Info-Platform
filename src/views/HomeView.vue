<script>
import BodyVue from '../components/Body/Body.vue';
import Recommendations from '../components/Cards/Recommendations/Recommendations.vue';
import SurpriseMe from '../components/Cards/SurpriseMe/SurpriseMe.vue';
import { useAnimeData } from '../stores/anime_data';

export default {
  name: 'Home',
  components: {
    BodyVue,
    Recommendations,
    SurpriseMe
  },
  computed: {
    setColor() {
      const mainAnimeData = useAnimeData()
      return mainAnimeData.getAccentColor;
    }
  },
}

</script>

<template>
  <div class="left-side-main">
    <BodyVue />
  </div>
  <div class="right-side-main">
    <Recommendations />
    <SurpriseMe></SurpriseMe>
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

.card-hovered:hover{
  color: v-bind("setColor") !important;
  transition: all .2s ease;
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
</style>