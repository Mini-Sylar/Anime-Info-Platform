<template>
  <div>
    <div class="min-container">
      <BookmarkList></BookmarkList>
    </div>
    <Background
      :backgroundImage="mainAnimeData.getBackground"
      class="image-background"
    ></Background>
  </div>
</template>
<script setup>
import BookmarkList from '../components/BookMarks/BookMarkList/BookmarkList.vue'
import Background from '../components/Body/Background/Background.vue'
import { useAnimeData } from '../stores/anime_data'
import { useHead } from '@unhead/vue'
const mainAnimeData = useAnimeData()

useHead({
  title: 'Anime Info Platform | Bookmarks',
  meta: [
    {
      name: 'description',
      content:
        'Keep track of your favorite anime and get information, recommendations, and more using the anime info platform.'
    },
    {
      name: 'keywords',
      content: 'anime, anime info, anime info platform, anime info website, anime information'
    }
  ]
})
</script>
<style scoped>
.min-container {
  width: min(95%, 1600px);
  margin: 0 auto;
}

.image-background {
  filter: blur(5px) brightness(0.7);
}
</style>
