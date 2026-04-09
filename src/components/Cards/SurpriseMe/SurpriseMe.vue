<template>
  <div class="surprise-me-container">
    <div v-if="showGenre" class="genre-backdrop" aria-hidden="true"></div>
    <form @submit.prevent="handleSubmit">
      <div class="split-button">
        <button type="submit" class="btn-surprise" :disabled="isLoading">
          <svg
            v-if="isLoading"
            class="spin-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.8zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
            />
          </svg>
          <svg v-else class="dice-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <!-- Font Awesome dice-d6 -->
            <path
              d="M0 96C0 43 43 0 96 0H384c53 0 96 43 96 96V416c0 53-43 96-96 96H96c-53 0-96-43-96-96V96zM128 176a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm192 160a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48 80a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM160 432a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm-32-144a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm192-96a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
            />
          </svg>
          Surprise Me
        </button>

        <GenreSelector
          v-model="genreQuery"
          :is-open="showGenre"
          :genres="genres"
          @toggle="toggleGenre"
          @close="closeGenre"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAnimeData } from '@/stores/anime_data.js'
import { ref, computed, watch } from 'vue'
import mixpanel from 'mixpanel-browser'
import GenreSelector from './GenreSelector.vue'
import { setOpacity } from '@/js/helpers.js'

const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller',
  'Current Season'
]

const showGenre = ref(false)
const mainAnimeData = useAnimeData()
const genreQuery = ref('Action')

const isLoading = computed(() => mainAnimeData.cardsLoading)
const accentColor = computed(() => mainAnimeData.getAccentColor)
const accentSoft = computed(() => setOpacity(accentColor.value, 0.9))
const accentHover = computed(() => setOpacity(accentColor.value, 1))
const splitBg = computed(() => setOpacity(accentColor.value, 0.2))
const splitBorder = computed(() => setOpacity(accentColor.value, 0.42))
const splitGlow = computed(() => setOpacity(accentColor.value, 0.18))

const handleSubmit = () => {
  if (isLoading.value) return

  if (genreQuery.value === 'Current Season') {
    mainAnimeData.fetchCurrentSeason()
  } else {
    mainAnimeData.fetchSurprise(genreQuery.value)
  }

  mixpanel.track('Surprise Me', { genre: genreQuery.value })
}

const toggleGenre = () => {
  showGenre.value = !showGenre.value
}

const closeGenre = () => {
  showGenre.value = false
}

// Prevent body scroll when genre picker is open
watch(showGenre, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto'
})
</script>

<style scoped>
.surprise-me-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.85rem;
  gap: 1rem;
  position: relative;
  z-index: 120;
  isolation: isolate;
}

.genre-backdrop {
  position: fixed;
  inset: 0;
  z-index: 121;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  backdrop-filter: blur(14px) saturate(120%);
}

.split-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 125;
  border-radius: 999px;
  overflow: visible;
  border: 1px solid v-bind('splitBorder');
  background: linear-gradient(145deg, v-bind('splitBg'), rgba(255, 255, 255, 0.08));
  backdrop-filter: blur(16px) saturate(125%);
  -webkit-backdrop-filter: blur(16px) saturate(125%);
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.3),
    0 0 24px v-bind('splitGlow'),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
}

.btn-surprise {
  display: flex !important;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.4rem !important;
  border-radius: 999px 0 0 999px !important;
  border: none;
  cursor: pointer;
  font-weight: 900;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  transition: all 0.2s ease;
  min-width: unset !important;
  background: linear-gradient(135deg, v-bind('accentSoft'), v-bind('accentColor')) !important;
  color: #fff !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
}

.btn-surprise:hover:not(:disabled) {
  background: linear-gradient(135deg, v-bind('accentHover'), v-bind('accentColor')) !important;
}

.btn-surprise:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dice-icon,
.spin-icon {
  width: 14px;
  height: 14px;
  fill: white;
  flex-shrink: 0;
}

.spin-icon {
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 500px) {
  .surprise-me-container {
    margin-block: 1.2rem;
    padding-inline: 0.45rem;
  }

  .split-button {
    width: 100%;
    justify-content: stretch;
  }

  .btn-surprise {
    min-height: 2.7rem;
  }
}
</style>
