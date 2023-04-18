<template >
    <div>
        <div class="min-container">
            <Tips></Tips>
            <BookmarkList></BookmarkList>
        </div>
        <Background v-memo="mainAnimeData.getBackground" :backgroundImage="mainAnimeData.getBackground"
            class="image-background"></Background>
    </div>
</template>
<script setup>
import Tips from '../components/BookMarks/Tips/Tips.vue';
import BookmarkList from '../components/BookMarks/BookMarkList/BookmarkList.vue';
import Background from '../components/Body/Background/Background.vue';
import { useAnimeData } from '../stores/anime_data';

const mainAnimeData = useAnimeData()
</script>
<style scoped>
.min-container {
    width: min(95%, 1600px);
    margin: 0 auto;
}

.image-background {
    filter: blur(5px) brightness(0.7)
}
</style>