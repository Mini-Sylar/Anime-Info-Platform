<template>
    <div class="bookmarked-container">
        <h4>Bookmarked Shows</h4>
        <hr class="line">
        <div class="bookmark-content" v-if="bookmarks.length > 0">
            <div class="has-bookmarks">
                <ul>
                    <li v-for="(bookmark, index) in bookmarks" :key="index">
                        <button type="button" class="bookmarked-show" @click="searchAnime(bookmark.title)">{{ bookmark.title
                        }}</button>
                    </li>
                </ul>
            </div>
            <div class="button-container"><button class="btn" @click="$router.push('/bookmarks')">View All
                    Bookmarks</button></div>

        </div>
        <div v-else class="no-bookmarks">
            <h4>No Bookmarks Yet 😢</h4>
        </div>
    </div>
</template>
<script setup>
import { useBookmarks } from '../../../stores/bookmarks';
import { useAnimeData } from '../../../stores/anime_data';
import { ref, computed } from 'vue';
const bookmarks = ref([])
const searchAnime = (bookmark) => {

    useAnimeData().fetchAnimeData(bookmark, false);
}

const hasTrailer = computed(() => useAnimeData().getTrailer == null ? "7rem" : "17rem");

useBookmarks().getSavedShows().then((data) => {
    bookmarks.value = data.slice(0, 10) || []
    console.log(bookmarks.value)
})
</script>
<style scoped>
.bookmarked-container {
    position: absolute;
    bottom: 7rem;
    background-color: #0195ff2c;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    height: 21em;
    overflow: hidden;
    width: 20rem;
    left: 5rem;
    transition: height .2s ease-in-out, visibility .2s ease-in-out, opacity .2s ease-in-out;
}

.has-bookmarks {
    height: 15rem;
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 1rem;
}

ul {
    list-style: none;
    padding: 0;
}

.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
}

.btn {
    width: 50%;
    background-color: #0195ff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: .5rem;
    margin: 0 auto;
    cursor: pointer;
}

.bookmarked-show {
    margin-block: 1rem;
    background-color: transparent !important;
    border: none;
    text-align: left;
}

.bookmarked-show:hover {
    text-decoration: underline;
    cursor: pointer;
}

.no-bookmarks {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

@media screen and (max-width: 821px) {
    .bookmarked-container {
        left: min(3rem, 1rem);
        width: 90%;
        bottom: v-bind(hasTrailer);
    }

    .has-bookmarks {
        width: auto;
    }

}
</style>