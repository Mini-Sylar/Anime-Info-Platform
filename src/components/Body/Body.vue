<template>
    <div class="is-a-container ">
        <div class="body-container">
            <transition appear mode="out-in">
                <div class="body-loading-blur" v-if="setBodyLoading">
                    <Bars></Bars>
                </div>
            </transition>
            <TitleSynopsis :titleDescription="mainAnimeData.getAnimeTitleDescription"></TitleSynopsis>
            <div class="info-trailer-container">
                <div class="info-container">
                    <AnimeData :animeMetaData="mainAnimeData.getMetaDescription" />
                    <Rating :rate="mainAnimeData.getRating" :accentColor="mainAnimeData.getAccentColor" />
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
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue';
import AnimeData from './AnimeData/AnimeData.vue';
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
import MoreInfo from './MoreInfo/MoreInfo.vue';
import Trailer from './Trailer/Trailer.vue';
import Background from './Background/Background.vue';
import Bars from '../Loaders/Bars.vue';
// useAnimeStoreHere
import { useAnimeData } from '@/stores/anime_data.js'
import { useBookmarks } from '@/stores/bookmarks.js';
import { ref, computed } from 'vue';
const mainAnimeData = ref(null)
const getAnimeData = async () => {
    mainAnimeData.value = await useAnimeData()
    return mainAnimeData.value
}
await getAnimeData()

useBookmarks().getSavedShows()

const setBodyLoading = computed(() => {
    return mainAnimeData.value.bodyLoading
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

@media screen and (max-width: 768px) {
    .body-loading-blur {
        height: 100%;
    }

    .body-loading-blur svg {
        transform: translate(-40%, -60%) !important;
    }

}
</style>