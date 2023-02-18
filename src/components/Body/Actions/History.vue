<template >
    <div class="history-container">
        <ul>
            <li v-for="(history, index) in getHistory" :key="index">{{ history }}</li>
        </ul>
    </div>
</template>
<script setup>
import { useAnimeData } from '../../../stores/anime_data';
import { ref, computed } from 'vue';

const mainAnimeData = useAnimeData();
const getHistory = computed(() => mainAnimeData.searchHistory);

</script>
<style scoped>
.history-container {
    position: absolute;
    bottom: 7rem;
    background-color: #0195ff2c;
    padding: 2rem;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    height: 0;
    overflow: hidden;
    visibility: hidden;
    transition: height .2s ease-in-out, visibility .2s ease-in-out;
}

.show-history {
    height: 20rem;
    visibility: visible;
}
</style>