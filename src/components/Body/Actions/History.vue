<template >
    <div class="history-container">
        <h4>Search History</h4>
        <hr class="line">
        <div v-if="getHistory.length == 0" class="no-search-history">
            <h4>No Search History Yet 😢</h4>
        </div>
        <div class="search-history" v-else>
            <div class="clear-history-loading"></div>
            <ul>
                <li v-for="(history, index) in getHistory" :key="index">
                    <div class="history-content">
                        <button class="history-title" @click="searchHistory(history)">{{ history }}</button>
                    </div>
                </li>
            </ul>
            <button class="clear-history" @click="clearHistory">Clear History</button>
        </div>
    </div>
</template>
<script setup>
import { useAnimeData } from '../../../stores/anime_data';
import { computed } from 'vue';

const mainAnimeData = useAnimeData();
const getHistory = computed(() => mainAnimeData.searchHistory);
const searchHistory = (history) => {
    mainAnimeData.fetchAnimeData(history, false);
}

const hasTrailer = computed(() => mainAnimeData.getTrailer == null ? "7rem" : "17rem");

const clearHistory = () => {
    mainAnimeData.clearHistory();
}
</script>
<style scoped>
.history-container {
    position: absolute;
    bottom: 7rem;
    background-color: #0195ff2c;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    height: 0;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    /* padding: 1rem; */
    width: 20rem;
    left: 5rem;
    transition: height .2s ease-in-out, visibility .2s ease-in-out, opacity .2s ease-in-out;
}

.show-history {
    height: 20rem;
    visibility: visible;
    opacity: 1;
}

.history-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.history-content * {
    font-size: clamp(1rem, 1rem, 2rem);
}

ul {
    list-style: none;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin-top: 1rem;
    min-height: 90%;
}

.no-search-history {
    display: flex;
    justify-content: center;
    align-items: center;
}

.history-title {
    background-color: transparent !important;
    border: none;
    cursor: pointer;
    font-size: clamp(1rem, 1rem, 2rem);
}

.search-history {
    width: 20rem;
    overflow-y: auto;
    height: 17rem;
    margin: 0;
    position: relative;
    min-height: 16rem;
}

h4 {
    margin-left: 1rem;
}

.clear-history {
    border: none;
    cursor: pointer;
    font-size: clamp(1rem, 1rem, 2rem);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    width: 50%;
}

.clear-history-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0195ff2c;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    z-index: 1;
    display: none;
}

@media screen and (max-width: 821px) {
    .history-container {
        left: min(3rem, 1rem);
        width: 90%;
        bottom: v-bind(hasTrailer);
    }

    .search-history {
        width: auto;
    }

}
</style>