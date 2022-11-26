<template>
    <div class="is-a-container body-container">
        <TitleSynopsis />
        <AnimeData />
        <Rating />
        <Actions />
    </div>
</template>
<script setup>
import TitleSynopsis from './TitleSynopsis/TitleSynopsis.vue';
import AnimeData from './AnimeData/AnimeData.vue';
import Rating from './Rating/Rating.vue'
import Actions from './Actions/Actions.vue'
</script>

<style scoped>
.body-container {
    padding: 1.5rem;
}
</style>