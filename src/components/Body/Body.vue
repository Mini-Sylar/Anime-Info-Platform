<template>
    <div class="is-a-container body-container">
        <TitleSynopsis :titleDescription="mainAnimeData.getAnimeTitleDescription"></TitleSynopsis>

        <div class="info-trailer-container">
            <div class="info-container">
                <AnimeData :animeMetaData="mainAnimeData.getMetaDescription" />
                <Rating :rate="mainAnimeData.getRating"  :accentColor ="mainAnimeData.getAccentColor"/>
                <Actions :accentColor ="mainAnimeData.getAccentColor"/>
                <MoreInfo :accentColor ="mainAnimeData.getAccentColor"/>
            </div>
            <div class="trailer-container">
                <Trailer :trailer="mainAnimeData.getTrailer" :accentColor ="mainAnimeData.getAccentColor" />
            </div>
        </div>


    </div>
</template>
<script setup>
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue';
import AnimeData from './AnimeData/AnimeData.vue';
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
import MoreInfo from './MoreInfo/MoreInfo.vue';
import Trailer from './Trailer/Trailer.vue';
// useAnimeStoreHere
import { useAnimeData } from '@/stores/anime_data.js'
const mainAnimeData = useAnimeData()
</script>

<style scoped>
.body-container {
    padding-inline: 1.5rem;
}
</style>