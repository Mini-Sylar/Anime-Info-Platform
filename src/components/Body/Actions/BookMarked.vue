<template>
    <div class="bookmarked-container">
        <h4>Bookmarked Shows</h4>
        <hr class="line">
       
    </div>
</template>
<script setup>
import { useBookmarks } from '../../../stores/bookmarks';
import { ref } from 'vue';



const bookmarks = ref(useBookmarks().getBookmarks || [])
</script>
<style scoped>
.bookmarked-container {
    position: absolute;
    bottom: 7rem;
    background-color: #0195ff2c;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    height: 20em;
    overflow: hidden;
    width: 20rem;
    left: 5rem;
    transition: height .2s ease-in-out, visibility .2s ease-in-out, opacity .2s ease-in-out;
}
</style>