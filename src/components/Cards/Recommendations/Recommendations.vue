<template>
  <div class="is-a-container swiper-container noselect" id="recommendations">
    <transition appear mode="out-in">
      <Swiper
        :slides-per-view="numberofCards"
        :space-between="0"
        :effect="'coverflow'"
        :centeredSlides="centerSlides"
        :coverflowEffect="{
          rotate: 10,
          stretch: 1,
          depth: 100,
          modifier: 3,
          slideShadows: true
        }"
        :grabCursor="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :preload-images="false"
        :lazy="true"
        ref="swiperContainer"
        :keyboard="true"
        :key="mainAnimeData.getRecommendations"
        @swiper="onSwiper"
      >
        <swiper-slide
          class="swiper-slide-instance"
          v-for="(item, index) in populateCards"
          :key="index"
        >
          <p
            class="noselect card-hovered"
            role="link"
            aria-label="link to anime in card"
            @click="searchFromRecommended(item.mediaRecommendation.title)"
          >
            {{
              item.mediaRecommendation.title.english != null
                ? item.mediaRecommendation.title.english
                : item.mediaRecommendation.title.romaji
            }}
          </p>
          <transition appear mode="out-in">
            <img
              loading="lazy"
              :src="item.mediaRecommendation.coverImage.large"
              alt=""
              class="anime-images"
              :key="item.mediaRecommendation.coverImage.large"
            />
          </transition>
        </swiper-slide>
        <swiper-slide
          class="swiper-slide-instance"
          v-if="populateCards.length > 19"
          @click="showMore"
        >
          <p class="noselect card-hovered" role="link" aria-label="Show more recommended">
            Show More <br />&rarr;
          </p>
        </swiper-slide>
      </Swiper>
    </transition>
    <transition appear mode="out-in">
      <div class="swiper-loading" v-if="isCardsLoading">
        <Bars></Bars>
      </div>
    </transition>
  </div>
</template>

<script setup lang="js">
import { useAnimeData } from '@/stores/anime_data.js'
import { ref,computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/element/css/autoplay'
import Bars from '../../Loaders/Bars.vue'

const swiper = ref(null)
const slice = ref(true)

   const mainAnimeData = ref([])
    const getAnimeData = async () => {
      mainAnimeData.value = await useAnimeData()
    }
    const swiperContainer = ref(null)
    await getAnimeData()
    let useFetchFromRecommendations = mainAnimeData.value.fetchFromRecommended
    // useAnimeStoreHere

    const populateCards = computed(() => {
      if (slice.value == true) {
        return mainAnimeData.value.getRecommendations.slice(0, 20) // TODO: fix slicing issue
      }
      return mainAnimeData.value.getRecommendations.slice(20, 50)
    })

    const numberofCards = computed(() => {
      if (screen.width < 768) return 2.7
      return mainAnimeData.value.getRecommendations.length <= 2 ? 2 : 4
    })

    const isCardsLoading = computed(() => {
      return mainAnimeData.value.cardsLoading
    })

    const centerSlides = computed(() => {
      return mainAnimeData.value.getRecommendations.length <= 2 ? false : true
    })


    const searchFromRecommended = (query) => {
      let getTitle = query.romaji ? query.romaji : query.english
      useFetchFromRecommendations(getTitle)
    }

    const showMore = () => {
      slice.value = !slice.value
      mainAnimeData.value.cardsLoading = true
      swiper.value.slideTo(0)
      setTimeout(() => {
        mainAnimeData.value.cardsLoading = false
      }, 1000)
    }

    const onSwiper = (swiper) => {
      swiper.value = swiper
    }
   

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
  height: 17rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  position: relative;
  min-width: 12rem;
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
    height: 15rem;
    min-width: 10rem;
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
