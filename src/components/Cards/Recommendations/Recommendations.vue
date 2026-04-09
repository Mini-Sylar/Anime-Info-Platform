<template>
  <div class="is-a-container swiper-container noselect" id="recommendations">
    <transition appear mode="out-in">
      <Swiper
        :slides-per-view="numberOfCards"
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
            class="noselect card-hovered card-title"
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
          class="swiper-slide-instance show-more-slide"
          v-if="hasMoreCards"
          @click="showMore"
        >
          <p
            class="noselect card-hovered show-more-label"
            role="button"
            aria-label="Show more recommendations"
          >
            <span>{{ isShowingMore ? '← Less' : 'More →' }}</span>
          </p>
        </swiper-slide>
      </Swiper>
    </transition>

    <transition appear mode="out-in">
      <div class="swiper-loading" v-if="isCardsLoading">
        <Bars />
      </div>
    </transition>
  </div>
</template>

<script setup lang="js">
import { useAnimeData } from '@/stores/anime_data.js'
import { ref, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/element/css/autoplay'
import Bars from '../../Loaders/Bars.vue'

// Fix: use a clearly named ref to avoid shadowing in the onSwiper callback
const swiperInstance = ref(null)
const showingMore = ref(false)

const mainAnimeData = useAnimeData()
await Promise.resolve() // keeps Suspense working without async store call

const totalRecommendations = computed(() => mainAnimeData.getRecommendations.length)

const populateCards = computed(() => {
  const all = mainAnimeData.getRecommendations
  if (!showingMore.value) {
    return all.slice(0, 20)
  }
  return all.slice(20)
})

// Show the toggle slide only when there are more than 20 recommendations
const hasMoreCards = computed(() => totalRecommendations.value > 20)
const isShowingMore = computed(() => showingMore.value)

const numberOfCards = computed(() => {
  if (window.screen.width < 1025) return 2.7
  return totalRecommendations.value <= 2 ? 2 : 4
})

const isCardsLoading = computed(() => mainAnimeData.cardsLoading)

const centerSlides = computed(() => totalRecommendations.value > 2)

// Fix: prefer English title, fallback to romaji
const searchFromRecommended = (titleObj) => {
  const title = titleObj.english ? titleObj.english : titleObj.romaji
  mainAnimeData.fetchFromRecommended(title)
}

const showMore = () => {
  showingMore.value = !showingMore.value
  mainAnimeData.cardsLoading = true
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(0)
  }
  setTimeout(() => {
    mainAnimeData.cardsLoading = false
  }, 800)
}

// Fix: renamed parameter to avoid shadowing the swiperInstance ref
const onSwiper = (swiper) => {
  swiperInstance.value = swiper
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

.show-more-slide {
  cursor: pointer;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  position: absolute;
  filter: brightness(0.4);
}

.card-title {
  z-index: 100;
  color: hsl(0, 0%, 90%);
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  height: 10vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.show-more-label {
  z-index: 100;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.045em;
  text-transform: uppercase;
  color: rgba(245, 245, 245, 0.95);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  border: 1px dashed rgba(255, 255, 255, 0.34);
  box-shadow:
    0 10px 26px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  transition: all 0.2s ease;
}

.show-more-label span {
  transition: transform 0.2s ease;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}

.show-more-label:hover span {
  transform: scale(1.1);
}

.show-more-label:hover {
  border-color: rgba(255, 255, 255, 0.55);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.07));
}

.swiper-loading {
  position: absolute;
  bottom: -4.5rem;
  left: 0;
  width: 100%;
  height: 25rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  z-index: 200;
  overflow: hidden;
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

@media screen and (max-width: 1025px) {
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

  .card-title {
    font-size: 12px;
  }

  .swiper-loading svg {
    transform: translate(-30%, -60%);
  }
}
</style>
