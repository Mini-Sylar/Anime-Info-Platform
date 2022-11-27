<template>
    <div class="is-a-container body-container">
        <TitleSynopsis :titleDescription="mainAnimeData.getAnimeTitleDescription"></TitleSynopsis>
        <AnimeData :animeMetaData="mainAnimeData.getMetaDescription" />
        <Rating :rate="mainAnimeData.getRating" />
        <Actions />
        <MoreInfo />
        <Trailer :trailer="mainAnimeData.getTrailer" />
    </div>
</template>
<script setup>
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue';
import AnimeData from './AnimeData/AnimeData.vue';
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
import MoreInfo from './MoreInfo/MoreInfo.vue';
import Trailer from './Trailer/Trailer.vue';
// useAnimeDataHere
import { useAnimeData } from '@/stores/anime_data.js'
const mainAnimeData = useAnimeData()
</script>

<style scoped>
.body-container {
    padding-inline: 1.5rem;
}
</style>