<template>
  <div class="history-container">
    <h4>Search History</h4>
    <hr class="line" />
    <div v-if="getHistory.length == 0" class="no-search-history">
      <h4>No Search History Yet 😢</h4>
    </div>
    <div class="search-history" v-else>
      <div class="clear-history-loading" v-if="checkClearHistory">
        <Bars></Bars>
      </div>
      <ul>
        <li v-for="(history, index) in getHistory" :key="index">
          <div class="history-content">
            <button type="button" class="history-title" @click.prevent="searchHistory(history)">
              {{ history }}
            </button>
          </div>
        </li>
      </ul>
      <button type="button" class="clear-history" @click="clearHistory">Clear History</button>
    </div>
  </div>
</template>
<script setup>
import { useAnimeData } from '../../../stores/anime_data'
import { computed } from 'vue'
import Bars from '../../Loaders/Bars.vue'

const mainAnimeData = useAnimeData()
const getHistory = computed(() => mainAnimeData.searchHistory)
const searchHistory = (history) => {
  mainAnimeData.fetchAnimeData(history, false)
}


const checkClearHistory = computed(() => {
  return mainAnimeData.clearHistoryLoading
})
const clearHistory = () => {
  mainAnimeData.clearHistory()
}
</script>
<style scoped>
.history-container {
  position: absolute;
  bottom: 7rem;
  background-color: #0195ff2c;
  border-radius: 10px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 9;
  height: 20em;
  overflow: hidden;
  width: 20rem;
  left: 5rem;
  transition:
    height 0.2s ease-in-out,
    visibility 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
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
  gap: 0.5rem;
  margin-top: 1rem;
  min-height: 90%;
}

.no-search-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15rem;
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
  width: 100%;
  height: 18rem;
  background-color: #0195ff2c;
  border-radius: 10px;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  z-index: 28 !important;
}

.clear-history-loading svg {
  transform: translate(-35%, -50%) !important;
}

@media screen and (max-width: 821px) {
  .history-container {
    left: min(3rem, 1rem);
    width: 90%;
  }

  .search-history {
    width: auto;
  }
}
</style>
