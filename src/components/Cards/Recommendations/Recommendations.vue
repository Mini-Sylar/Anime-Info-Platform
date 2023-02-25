<template>
  <div class="is-a-container swiper-container noselect">
    <transition appear mode="out-in">
      <div class="swiper-loading" v-if="isCardsLoading">
        <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
          y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
          <rect x="20" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
              begin="0" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="30" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
              begin="0.2s" dur="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="40" y="50" width="4" height="10" fill="#fff">
            <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0"
              begin="0.4s" dur="0.6s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>
    </transition>
    <transition appear mode="out-in">
      <swiper :slides-per-view="numberofCards" :space-between="2" :effect="'coverflow'" :centeredSlides="true"
        :coverflowEffect="{
          rotate: 10,
          stretch: 1,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }" :modules="modules" :grabCursor="true" :autoplay="{
  delay: 2500,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
  // Disable preloading of all images
  preloadImages: false,
  // Enable lazy loading
  lazy: true,
}" :key="populateCards">
        <swiper-slide class="swiper-slide-instance" v-for="(item, index) in populateCards" :key="index">
          <p class="noselect card-hovered" role="link" @click="searchFromRecommended(item.mediaRecommendation.title)">
            {{
              item.mediaRecommendation.title.english != null
              ? item.mediaRecommendation.title.english
              : item.mediaRecommendation.title.romaji
            }}
          </p>
          <transition appear mode="out-in">
            <img :src="item.mediaRecommendation.coverImage.large" alt="" class="anime-images"
              :key="item.mediaRecommendation.coverImage.large" />
          </transition>

        </swiper-slide>
      </swiper>
    </transition>
  </div>
</template>
<script>
import { useAnimeData } from "@/stores/anime_data.js";
import { ref, onMounted } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const mainAnimeData = ref([])
    const getAnimeData = async () => {
      mainAnimeData.value = await useAnimeData()
    }
    await getAnimeData()
    let useFetchFromRecommendations = mainAnimeData.value.fetchFromRecommended
    // useAnimeStoreHere
    return {
      modules: [
        Navigation,
        Pagination,
        Scrollbar,
        A11y,
        EffectCoverflow,
        Autoplay,
      ],
      mainAnimeData,
      useFetchFromRecommendations
    };
  },
  computed: {
    populateCards() {
      return this.mainAnimeData.getRecommendations
    },
    numberofCards() {
      return this.mainAnimeData.getRecommendations.length < 2 ? 2 : 4
    },
    isCardsLoading() {
      console.log(this.mainAnimeData.cardsLoading)
      return this.mainAnimeData.cardsLoading
    }
  },
  methods: {
    searchFromRecommended(query) {
      let getTitle = query.english ? query.english : query.romaji;
      this.useFetchFromRecommendations(getTitle);
    },
  },
};
</script>
<style scoped>
.swiper-container {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  min-width: 40rem;
  height: 90%;
  position: relative;
  /* background-color: red; */
}

.swiper-slide-instance {
  background-color: transparent;
  width: 100%;
  height: 15rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  position: relative;
  min-width: 10rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  position: absolute;
  filter: brightness(0.4);
}

p {
  z-index: 100;
  color: hsl(0, 0%, 90%);
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  height: 10vh;
  /* background-color: red; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.swiper-loading {
  position: absolute;
  top: -1rem;
  left: 0;
  width: 100%;
  height: 140%;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  z-index: 200;
  overflow: hidden;
}

.swiper-loading svg {
  width: 100px;
  height: 100px;
  display: inline-block;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-70%, -70%);
}
</style>
