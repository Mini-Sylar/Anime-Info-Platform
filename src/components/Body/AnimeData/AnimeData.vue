<template>
  <div class="is-a-container">
    <p>{{ animeMetaData.year }}</p>
    <p>{{ formatGenre }}</p>
    <p>{{ animeMetaData.episodes }} episodes</p>
  </div>
</template>
<script setup>
import {computed} from 'vue'


const props = defineProps({
  animeMetaData: {
    type: Object,
    required: true
  }
})

const formatGenre = computed(() => {
  return props.animeMetaData.genre.join(' / ')
})

</script>
<style scoped>
div p {
  font-size: clamp(0.7rem, 0.9vw, 2rem);
}

@media screen and (max-width: 2025px) {
  p {
    color: #f1f1f1;
  }
}
</style>
