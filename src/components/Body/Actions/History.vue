<template >
    <div class="history-container">
        <h5>Search History</h5>
        <hr>
        <div v-if="getHistory.length == 0" class="no-search-history">
            <h6>No Search History Yet 😢</h6>
        </div>
        <ul v-else>
            <li v-for="(history, index) in getHistory" :key="index">
                <div class="history-content">
                    <span class="history-title">{{ history }}</span>
                    <button>Search</button>
                </div>
            </li>
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

.history-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.history-content * {
    font-size: clamp(1rem, 1rem, 2rem);
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

}

.no-search-history {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>