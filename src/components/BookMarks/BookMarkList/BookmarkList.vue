<template>
    <div>
        <div class="tbl-header bookmarked-container">
            <table cellpadding="0" cellspacing="0" border="0">
                <thead>
                    <tr>
                        <th>Anime Title</th>
                        <th>Latest Episode</th>
                        <th>Next Episode Air Date</th>
                        <th>Season/Year</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div class="tbl-content">
            <transition name="fade">
                <div class="bookmarks-loading" v-if="bookmarkloading">
                    <Bars></Bars>
                </div>
            </transition>
            <table cellpadding="0" cellspacing="0" border="0">
                <tbody>

                    <TransitionGroup name="pop">
                        <tr v-for="(bookmark, index) in bookmark_details" :key="index" v-if="bookmark_details.length > 0">
                            <td>
                                <div class="contains-title">
                                    <div class="bg-image"><img :src="bookmark.coverImage.medium" alt=""></div>
                                    <div class="title">{{ bookmark.title.english ? bookmark.title.english :
                                        bookmark.title.romaji }}</div>
                                </div>
                            </td>
                            <td>{{ bookmark.airingSchedule.nodes[0]?.episode || `N/A` }}</td>
                            <td>{{ formatDate(bookmark.airingSchedule.nodes[0]?.airingAt) }}</td>
                            <td>{{ bookmark?.season }} {{ bookmark?.startDate.year }}</td>
                            <td>{{ bookmark.status }}</td>
                            <td><button title="Remove show from your bookmarks" type="button" class="delete-button"
                                    @click="removeStar(bookmark)">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="uses-dynamic delete-icon"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                    </svg>
                                </button></td>

                        </tr>
                        <div class="empty" v-else>
                            <h2>
                                NO SHOWS BOOKMARKED...😢
                            </h2>
                        </div>
                    </TransitionGroup>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { useBookmarks } from '../../../stores/bookmarks';
import { ref, computed } from 'vue'
import Bars from '../../Loaders/Bars.vue';

const bookmarks = useBookmarks();
const gotBookMarks = ref([])
const bookmark_details = ref([])

const bookmarkloading = computed(() => bookmarks.bookmarksloading)

bookmarks.getSavedShows().then((data) => {
    gotBookMarks.value = data
    bookmarks.fetchFromBookmarks().then(() => {
        bookmark_details.value = bookmarks.getBookmarkedDetials
    })
})


const formatDate = (date) => {
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    if (isNaN(date)) {
        return "";
    }
    return `${new Date(date * 1000).toLocaleString('en-US', options)} at ${new Date(date * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
}


const removeStar = (show) => {
    const showID = show.id.toString()
    const showTitle = show.title.english ? show.title.english : show.title.romaji
    bookmarks.starAnime(showID, showTitle)
    // use splice instead of filter to remove the item from the array

    bookmark_details.value.splice(bookmark_details.value.indexOf(show), 1)

}

</script>
<style scoped>
table {
    width: 100%;
    table-layout: fixed;
}

.tbl-header {
    background-color: #0195ff2c;
    backdrop-filter: blur(10px);
}

.tbl-content {
    position: relative;
    height: min(750px, 75vh);
    min-height: 100%;
    overflow-x: auto;
    margin-top: 0px;
    border: 1px solid #0195ff2c;
}

tbody {
    position: relative;
}

th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
}

td {
    padding: 15px;
    text-align: left;
    vertical-align: middle;
    font-weight: 300;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px #0195ff2c;
}

.contains-title {
    display: flex;
    align-items: center;
    gap: 1rem;
}

img {
    width: 50px;
    object-fit: contain;
}

.delete-icon {
    width: 20px;
    height: 20px;
    fill: #fff;
}

.delete-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.pop-move,
.pop-enter-active,
.pop-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.pop-enter-from,
.pop-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
/* .pop-leave-active {
    position: absolute;
} */

.bookmarks-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    backdrop-filter: blur(10px);
}

.empty {
    position: absolute;
    height: min(100px, 200px);
    display: flex;
    align-items: center;
}
</style>