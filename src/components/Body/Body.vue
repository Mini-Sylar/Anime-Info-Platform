<template>
    <div class="is-a-container ">
        <div class="body-container">
            <TitleSynopsis :titleDescription="mainAnimeData.getAnimeTitleDescription"></TitleSynopsis>
            <div class="info-trailer-container">
                <div class="info-container">
                    <AnimeData :animeMetaData="mainAnimeData.getMetaDescription" />
                    <Rating :rate="mainAnimeData.getRating" :accentColor="mainAnimeData.getAccentColor" />
                    <Actions />
                    <MoreInfo />
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
// useAnimeStoreHere
import { useAnimeData } from '@/stores/anime_data.js'
import { ref,onErrorCaptured,onBeforeMount } from 'vue';
const mainAnimeData = ref(null)
const getAnimeData = async () => {
    mainAnimeData.value = await useAnimeData()
    return mainAnimeData.value
}
onBeforeMount(async () => {
    await getAnimeData()
})

</script>

<style scoped>
.body-container {
    padding-inline: 1.5rem;
}
</style>