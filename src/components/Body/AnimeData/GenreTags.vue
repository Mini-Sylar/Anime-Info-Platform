<template>
  <div class="genre-tags">
    <button
      v-for="genre in genres"
      :key="genre"
      class="genre-tag"
      type="button"
      :title="`Find ${genre} anime`"
      @click="onGenreClick(genre)"
    >
      {{ genre }}
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAnimeData } from '@/stores/anime_data.js'
import { setOpacity } from '@/js/helpers.js'

const props = defineProps({
  genres: {
    type: Array,
    required: true
  }
})

const accentColor = computed(() => useAnimeData().getAccentColor)

// Derive tinted shades of the accent color for borders and backgrounds
const tagBg = computed(() => setOpacity(accentColor.value, 0.1))
const tagBorder = computed(() => setOpacity(accentColor.value, 0.3))
const tagHoverBg = computed(() => setOpacity(accentColor.value, 0.22))
const tagHoverBorder = computed(() => setOpacity(accentColor.value, 0.65))

const onGenreClick = (genre) => {
  useAnimeData().fetchSurprise(genre)
}
</script>

<style scoped>
.genre-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-block: 0.6rem;
}

.genre-tag {
  padding: 0.22rem 0.65rem !important;
  border-radius: 20px !important;
  border: 1px solid v-bind('tagBorder') !important;
  background: v-bind('tagBg') !important;
  color: rgba(230, 230, 230, 0.9) !important;
  font-size: clamp(0.6rem, 0.75vw, 0.8rem) !important;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
  font-weight: 500;
  min-width: unset !important;
  letter-spacing: 0.02em;
  box-shadow: 0 0 0 0 v-bind('tagBorder');
}

.genre-tag:hover {
  background: v-bind('tagHoverBg') !important;
  border-color: v-bind('tagHoverBorder') !important;
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px v-bind('tagBg');
}

@media screen and (max-width: 1025px) {
  .genre-tags {
    justify-content: center;
  }

  .genre-tag {
    font-size: 0.72rem !important;
  }
}

@media screen and (max-width: 768px) {
  .genre-tags {
    justify-content: flex-start;
  }
}
</style>
