<template>
    <div>
        <div class="search-box">
            <input type="text" class="search-bookmark" placeholder="Search" v-model="search">
        </div>
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

            <TransitionGroup name="pop" tag="ul" class="container">
                <li class="table-item" v-for="(bookmark, index) in bookmark_details" :key="index"
                    v-if="bookmark_details.length > 0">
                    <div class="contains-title">
                        <div class="bg-image"><img :src="bookmark.coverImage.medium" :alt="
                            bookmark.title.english ? bookmark.title.english :
                                bookmark.title.romaji
                        "></div>
                        <div class="title">
                            <p>
                                {{ bookmark.title.english ? bookmark.title.english :
                                    bookmark.title.romaji }}
                            </p>
                        </div>
                    </div>
                    <div class="latest-episode">
                        <p>{{ bookmark.airingSchedule.nodes[0]?.episode ? bookmark.airingSchedule.nodes[0]?.episode
                            : bookmark?.episodes }}

                            {{ bookmarkWithStatusComputed}}
                            <transition name="pop">
                                <span class="watched" v-if="bookmarkWithStatusComputed[index]?.value[0].watched">
                                    Watched
                                </span>
                                <span class="unwatched" v-else>
                                    Unwatched
                                </span>
                            </transition>

                        </p>

                    </div>

                    <div class="schedule">
                        <p>{{ formatDate(bookmark.airingSchedule.nodes[0]?.airingAt) }}</p>
                    </div>

                    <div class="season">
                        <p>{{ bookmark?.season }} {{ bookmark?.startDate.year }}</p>
                    </div>

                    <div class="status">
                        <span :class="[bookmark.status == 'FINISHED' ? 'finished' : 'releasing']">
                            {{ bookmark.status }}
                        </span>
                    </div>

                    <div class="action">
                        <button class="delete-button" @click="toggleWatched(bookmark.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="uses-dynamic delete-icon" viewBox="0 0 448 512">
                                <path
                                    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                            </svg>
                        </button>
                        <button title="Remove show from your bookmarks" type="button" class="delete-button"
                            @click="removeStar(bookmark)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="uses-dynamic delete-icon" viewBox="0 0 448 512">
                                <path
                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </button>

                    </div>

                </li>
                <div class="empty" v-else>
                    <h2>
                        NO SHOWS BOOKMARKED...😢
                    </h2>
                </div>
            </TransitionGroup>
        </div>

        <transition name="fade">
            <div class="pagination" v-if="bookmark_details.length > 0">
                <Pagination :total-pages="totalPages" :total="total" :per-page="10" :current-page="currentPage"
                    @pagechanged="onPageChange" />
            </div>
        </transition>
    </div>
</template>
<script setup>
import { useBookmarks } from '../../../stores/bookmarks';
import { ref, computed, watch } from 'vue'
import Bars from '../../Loaders/Bars.vue';
import Pagination from '../Pagination/Pagination.vue';

const bookmarks = useBookmarks();
const search = ref('')
const bookRef = ref([])
const bookmarkWithStatus = ref([])
const bookmarkloading = computed(() => bookmarks.bookmarksloading)

async function loadBookmarks() {
    const fetchedData = await bookmarks.getSavedShows();
    await bookmarks.fetchFromBookmarks(fetchedData);
    bookRef.value = bookmarks.bookmarked_details;
    console.log(bookRef.value, "Book Ref Value")
    bookmarkWithStatus.value = bookmarks.bookmarks;
}

loadBookmarks()


const bookmark_details = computed(() => {
    const filteredShows = bookRef.value.filter((show) => {
        return (
            show.title.english?.toLowerCase().includes(search.value.toLowerCase()) ||
            show.title.romaji?.toLowerCase().includes(search.value.toLowerCase())
        );
    });

    return filteredShows;
});


const bookmarkWithStatusComputed = computed(() => {
    return bookmarkWithStatus.value.filter((show) => {
        return show.value[0].title.toLowerCase().includes(search.value.toLowerCase())
    }).slice((currentPage.value - 1) * 10, currentPage.value * 10)
})

const formatDate = (date) => {
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    };
    if (isNaN(date)) {
        return "Finished Airing";
    }
    return `${new Date(date * 1000).toLocaleString('en-US', options)} at ${new Date(date * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
}


const removeStar = (show) => {
    const showID = show.id.toString()
    const showTitle = show.title.english ? show.title.english : show.title.romaji
    bookmarks.starAnime(showID, showTitle)
    // use splice instead of filter to remove the item from the array
    bookRef.value.splice(bookRef.value.indexOf(show), 1)
}
// pagination
const currentPage = ref(1)
const onPageChange = (page) => {
    currentPage.value = page;
}
const total = computed(() => bookRef.value.length)
const totalPages = computed(() => Math.ceil(total.value / 10))


watch(bookmark_details, () => {
    if (bookmark_details.value.length === 0 && currentPage.value !== 1) {
        currentPage.value = 1
    }
})


// toggle watched
const toggleWatched = async (showId) => {
    try {
        await bookmarks.toggleWatched(showId.toString());
        // update the bookmarkWithStatus ref to reflect the new watched status
        bookmarkWithStatus.value = bookmarkWithStatus.value.map((show) => {
            if (show.key === showId.toString()) {
                const updatedShow = { ...show };
                updatedShow.value[0].watched = !updatedShow.value[0].watched;
                return updatedShow;
            }
            return show;
        });

    } catch (error) {
        return
    }


};


</script>
<style scoped>
table {
    width: 100%;
    table-layout: fixed;
    position: relative;
}

.tbl-header {
    background-color: #0195ff2c;
    backdrop-filter: blur(10px);
}

.tbl-content {
    position: relative;
    height: min(750px, 65vh);
    min-height: 100%;
    overflow-x: auto;
    margin-top: 0px;
    border: 1px solid #0195ff2c;
    backdrop-filter: blur(30px);
}


th {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
}



.table-item {
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
.pop-leave-active {
    position: absolute;
    width: 100% !important;

}

.bookmarks-loading {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 5;
    backdrop-filter: blur(10px);
}

.empty {
    position: absolute;
    height: min(500px, 600px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.search-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: .5rem;
}

.search-box input {
    width: 300px;
    padding: 10px;
    border: none;
    /* border-radius: 5px; */
    outline: none;
    background-color: #0195ff2c;
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}


.container {
    position: relative;
    display: flex;
    flex-direction: column;
}

.new-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* background-color: saddlebrown; */
}

.table-item {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.table-item * {
    align-self: center;
    width: 100%;
    font-size: 13px;
    color: white;
    /* background-color: springgreen; */
}

img {
    width: 50px !important;
    object-fit: contain;
}

.bg-image {
    width: auto;
}

.action {
    display: flex;
    gap: 2rem;
}


.action * {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: auto;
}

.finished {
    color: #ee1838;
}

.releasing {
    color: #10de77;
}

.latest-episode,
.season,
.status,
.schedule {
    margin-left: 20px;
}

.latest-episode {
    position: relative;
}

.latest-episode p {
    display: flex;
    position: relative;
    gap: .5rem;
}

.watched {
    position: absolute;
    color: #10de77;
    left: 3rem;
}

.unwatched {
    position: absolute;
    color: #ee1838;
    left: 3rem;
}


@media screen and (max-width:768px) {
    .table-item {
        flex-direction: column;
        gap: 1rem;
    }

    .search-box {
        justify-content: center;
    }

    .tbl-content {
        min-height: 100%;
    }

    .tbl-header {
        display: none;
    }

    .latest-episode {
        border-top: 1px solid #0195ff2c;
        padding-top: 1rem;
    }

    .latest-episode::before {
        content: "latest Episode";
        width: 100%;
    }

    .season::before {
        content: "Season/Year";
        width: 100%;
    }

    .schedule::before {
        content: "Next Episode";
        width: 100%;
    }

    .status::before {
        content: "Status";
        width: 100%;
    }

    .action::before {
        content: "Action";
        width: 100%;
    }

    .latest-episode,
    .season,
    .status,
    .schedule,
    .action {
        display: flex;
        width: 100%;
        margin-left: auto;
    }

    .watched,
    .unwatched {
        left: 20%;
    }



    .action button {
        position: relative;
        right: 30% !important;
    }
}
</style>