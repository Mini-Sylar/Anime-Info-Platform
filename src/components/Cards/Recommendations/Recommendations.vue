<template>
  <div class="is-a-container swiper-container noselect">
    <transition appear mode="out-in">
      <swiper :slides-per-view="numberofCards" :space-between="0" :effect="'coverflow'" :centeredSlides="centerSlides"
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
          <p class="noselect card-hovered" role="link" aria-label="link to anime in card"
            @click="searchFromRecommended(item.mediaRecommendation.title)">
            {{
              item.mediaRecommendation.title.english != null
              ? item.mediaRecommendation.title.english
              : item.mediaRecommendation.title.romaji
            }}
          </p>
          <transition appear mode="out-in">
            <img loading="lazy" :src="item.mediaRecommendation.coverImage.large" alt="" class="anime-images"
              :key="item.mediaRecommendation.coverImage.large" />
          </transition>

        </swiper-slide>
      </swiper>
    </transition>
    <transition appear mode="out-in">
      <div class="swiper-loading" v-if="isCardsLoading">
        <Bars></Bars>
      </div>
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
import Bars from "../../Loaders/Bars.vue";
export default {
  components: {
    Swiper,
    SwiperSlide,
    Bars
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
      if (screen.width < 768) return 2.7
      return this.mainAnimeData.getRecommendations.length < 2 ? 2 : 4
    },
    isCardsLoading() {
      return this.mainAnimeData.cardsLoading
    },
    centerSlides() {
      return this.mainAnimeData.getRecommendations.length < 2 ? false : true
    }
  },
  methods: {
    searchFromRecommended(query) {
      let getTitle = query.romaji ? query.romaji : query.english;
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



.swiper-loading {
  position: absolute;
  bottom: -4.5rem;
  left: 0;
  width: 100%;
  height: 25rem;
  backdrop-filter: blur(10px);
  border-radius: 20px;
  z-index: 200;
  overflow: hidden;
  border-radius: 20px;
  padding: 20px;
}

.swiper-loading svg {
  width: 100px;
  height: 100px;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-70%, -70%);
}

@media screen and (max-width: 768px) {
  .swiper-container {
    min-width: 100%;
    height: 100%;
  }

  .swiper-slide-instance {
    height: 12rem;
    min-width: 7rem;
    max-width: 10rem;
  }

  .swiper-loading {
    height: 20rem;
  }

  p {
    font-size: 12px;
  }

  .swiper-loading svg {
    transform: translate(-30%, -60%);
  }
}
</style>
