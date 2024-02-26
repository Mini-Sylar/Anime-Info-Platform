<template>
  <div class="is-a-container">
    <div class="body-container">
      <transition appear mode="out-in">
        <div class="image-mobile">
          <img :src="mainAnimeData.getBackground" alt="Show Image" />
        </div>
      </transition>
      <transition appear mode="out-in">
        <div class="body-loading-blur" v-if="setBodyLoading">
          <Bars></Bars>
        </div>
      </transition>
      <TitleSynopsis :titleDescription="mainAnimeData.getAnimeTitleDescription"></TitleSynopsis>
      <div class="info-trailer-container">
        <div class="info-container">
          <AnimeData :animeMetaData="mainAnimeData.getMetaDescription" />
          <Rating :rate="rating" :accentColor="mainAnimeData.getAccentColor" />
          <Actions />
          <MoreInfo :animeID="mainAnimeData.getAnimeId" />
        </div>
        <div class="trailer-container">
          <Trailer :trailer="mainAnimeData.getTrailer" />
        </div>
      </div>
    </div>

    <Background :backgroundImage="mainAnimeData.getBackground"></Background>
  </div>
</template>
<script setup>
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue'
import AnimeData from './AnimeData/AnimeData.vue'
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
import MoreInfo from './MoreInfo/MoreInfo.vue'
import Trailer from './Trailer/Trailer.vue'
import Background from './Background/Background.vue'
import Bars from '../Loaders/Bars.vue'
import { useAnimeData } from '@/stores/anime_data.js'
import {  computed } from 'vue'
const mainAnimeData = useAnimeData()


const setBodyLoading = computed(() => {
  return mainAnimeData.bodyLoading
})

const rating = computed(() => {
  return mainAnimeData.getRating 
})

</script>

<style scoped>
.body-container {
  padding-inline: 1.5rem;
  position: relative;
}

.body-loading-blur {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120%;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background: transparent;
  z-index: 1;
  padding: 1rem;
  border-radius: 20px;
  padding: 20px;
}

.body-loading-blur svg {
  transform: translate(-80%, -50%) !important;
}

.image-mobile {
  display: none;
}

@media screen and (max-width: 768px) {
  .body-loading-blur {
    height: 100%;
  }

  .body-loading-blur svg {
    transform: translate(-40%, -60%) !important;
  }

  .image-mobile {
    display: block;
    width: 100%;
    height: 15rem;
    display: flex;
    margin: 0 auto;
    margin-top: 10rem;
    border-radius: 20px;
    overflow: hidden;
  }

  .image-mobile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
