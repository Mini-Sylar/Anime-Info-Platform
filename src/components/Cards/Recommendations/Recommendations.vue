<template>
  <div class="is-a-container swiper-container noselect">
    <transition appear mode="out-in">
      <swiper :slides-per-view="4" :space-between="2" :effect="'coverflow'" :centeredSlides="true" :coverflowEffect="{
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
import { ref } from 'vue';
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
  data() {
    return {
      recommended: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const mainAnimeData = ref(null)
    const getAnimeData = async () => {
      mainAnimeData.value = await useAnimeData()
    }
    await getAnimeData()

    let useFetchFromRecommendations = mainAnimeData.value.fetchFromRecommended;
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
      useFetchFromRecommendations,
    };
  },
  computed: {
    populateCards() {
      return this.mainAnimeData.getRecommendations;
    },
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
</style>
