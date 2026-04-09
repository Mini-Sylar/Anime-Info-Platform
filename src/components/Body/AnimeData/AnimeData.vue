<template>
  <div class="is-a-container anime-data">
    <p class="meta-year">{{ animeMetaData.year }}</p>
    <GenreTags :genres="animeMetaData.genre" />
    <p class="meta-episodes">
      {{ animeMetaData.episodes ? animeMetaData.episodes + ' episodes' : 'Ongoing' }}
    </p>
  </div>
</template>

<script setup>
import GenreTags from './GenreTags.vue'

defineProps({
  animeMetaData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.anime-data {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.meta-year,
.meta-episodes {
  font-size: clamp(0.7rem, 0.9vw, 1rem);
  color: #f1f1f1;
}

@media screen and (max-width: 1025px) {
  .meta-year,
  .meta-episodes {
    text-align: center;
  }
}

@media screen and (max-width: 768px) {
  .meta-year,
  .meta-episodes {
    text-align: left;
    color: #f1f1f1;
  }
}
</style>
