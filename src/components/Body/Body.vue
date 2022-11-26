<template>
    <div class="is-a-container body-container">
        <TitleSynopsis />
        <AnimeData />
        <Rating />
        <Actions />
        <MoreInfo />
        <Trailer />
    </div>
</template>
<script setup>
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue';
import AnimeData from './AnimeData/AnimeData.vue';
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
import MoreInfo from './MoreInfo/MoreInfo.vue';
import Trailer from './Trailer/Trailer.vue';
</script>

<style scoped>
.body-container {
    padding-inline: 1.5rem;
}
</style>