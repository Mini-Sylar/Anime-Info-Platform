<template >
    <div>
        <div class="min-container">
            <Tips></Tips>
            <BookmarkList></BookmarkList>
        </div>
    </div>
</template>
<script setup>
import Tips from '../components/BookMarks/Tips/Tips.vue';
import BookmarkList from '../components/BookMarks/BookMarkList/BookmarkList.vue';
</script>
<style scoped>
.min-container {
    width: min(95%, 1600px);
    margin: 0 auto;
}
</style>