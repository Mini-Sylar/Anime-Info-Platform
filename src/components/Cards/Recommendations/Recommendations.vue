<template>
    <div class="is-a-container swiper-container">
        <swiper :slides-per-view="4" :space-between="2" @swiper="onSwiper" @slideChange="onSlideChange">
            <swiper-slide class="swiper-slide-instance" v-for="(item, index) in recommended" :key="index"> {{
                    item.mediaRecommendation.title ? item.mediaRecommendation.title.english :
                        item.mediaRecommendation.romaji
            }}
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { useAnimeData } from '@/stores/anime_data.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        // useAnimeStoreHere

        const mainAnimeData = useAnimeData()
        const recommended = mainAnimeData.getRecommendations
        // Container Here
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            modules: [Navigation, Pagination, Scrollbar, A11y],
            recommended
        };
    },
};
</script>
<style scoped>
.swiper-container {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 90%;
}

.swiper-slide-instance {
    background-color: #fff;
    width: 100%;
    height: 10rem;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>