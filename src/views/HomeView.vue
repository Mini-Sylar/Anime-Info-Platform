<script>
import BodyVue from '../components/Body/Body.vue';
import Recommendations from '../components/Cards/Recommendations/Recommendations.vue';
import SurpriseMe from '../components/Cards/SurpriseMe/SurpriseMe.vue';
import { ref } from 'vue';
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
}

.action-button {
  background-color: transparent !important;
  color: v-bind("setColor");
}

iframe {
  border: 2px solid v-bind('setColor');
}

*::-webkit-scrollbar-thumb {
  background-color: v-bind("setColor") !important;
}

.input-search{
  background-color: v-bind('setColor') !important;
}
</style>