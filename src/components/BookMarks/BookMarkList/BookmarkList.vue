<template>
  <div>
    <div class="search-box">
      <div class="tips">
        <Tips></Tips>
      </div>
      <div class="search-item">
        <input type="text" class="search-bookmark" placeholder="Search" v-model="search" />
      </div>
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
        <li
          class="table-item"
          v-for="(bookmark, index) in allBookmarks"
          :key="index"
          v-if="allBookmarks.length > 0"
        >
          <div class="contains-title">
            <div class="bg-image">
              <img
                :src="bookmark.showDetails.coverImage.medium"
                :alt="
                  bookmark.showDetails.title.english
                    ? bookmark.showDetails.title.english
                    : bookmark.showDetails.title.romaji
                "
              />
            </div>
            <div
              class="title animetitle"
              role="button"
              aria-label="search anime"
              @click="searchAnime(bookmark.showDetails.title.romaji)"
            >
              <p>
                {{
                  bookmark.showDetails.title.english
                    ? bookmark.showDetails.title.english
                    : bookmark.showDetails.title.romaji
                }}
              </p>
            </div>
          </div>
          <div class="latest-episode">
            <p>
              {{
                bookmark.showDetails.airingSchedule.nodes[0].episode
                  ? bookmark.showDetails.airingSchedule.nodes[0].episode
                  : bookmark.showDetails?.episodes
              }}
              <transition name="pop">
                <span class="watched" v-if="bookmark.watched"> Watched </span>
                <span class="unwatched" v-else> Unwatched </span>
              </transition>
            </p>
          </div>

          <div class="schedule">
            <p>{{ formatDate(bookmark.showDetails.airingSchedule.nodes[0].airingAt) }}</p>
          </div>

          <div class="season">
            <p>{{ bookmark.showDetails.season }} {{ bookmark.showDetails.startDate.year }}</p>
          </div>

          <div class="status">
            <span :class="[bookmark.showDetails.status == 'FINISHED' ? 'finished' : 'releasing']">
              {{ bookmark.showDetails.status }}
            </span>
          </div>

          <div class="action">
            <button class="delete-button" @click="toggleWatched(bookmark.id)">
              <div
                role="button"
                :title="bookmark.watched ? 'Mark as unwatched' : 'Mark as watched'"
                :class="[bookmark.watched ? `check check-watched` : `check uses-dynamic`]"
              ></div>
            </button>
            <button title="Share" class="delete-button" @click="shareAnime(bookmark.title)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                class="uses-dynamic delete-icon share-hover"
              >
                <path
                  d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"
                />
              </svg>
            </button>
            <button
              title="Remove show from your bookmarks"
              type="button"
              class="delete-button"
              @click="removeStar(bookmark)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="uses-dynamic delete-icon"
                viewBox="0 0 448 512"
              >
                <path
                  d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                />
              </svg>
            </button>
          </div>
        </li>
        <div class="empty" v-else-if="bookmarkloading == true"></div>
        <div class="empty" v-else>
          <h2>NO SHOWS BOOKMARKED...😢</h2>
        </div>
      </TransitionGroup>
    </div>

    <transition name="fade">
      <div class="pagination" v-if="allBookmarks.length > 0">
        <Pagination
          :total-pages="totalPages"
          :total="total"
          :per-page="10"
          :current-page="currentPage"
          @pagechanged="onPageChange"
        />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { useBookmarks } from '../../../stores/bookmarks'
import { useAnimeData } from '../../../stores/anime_data'
import { useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'
import Bars from '../../Loaders/Bars.vue'
import Pagination from '../Pagination/Pagination.vue'
import Tips from '../Tips/Tips.vue'

const router = useRouter()
const fetchBookmarks = useBookmarks()
const search = ref('')
const bookmarkloading = computed(() => fetchBookmarks.bookmarksloading)
// pagination
const currentPage = ref(1)

async function loadBookmarks() {
  const fetchedData = await fetchBookmarks.getSavedShows()
  await fetchBookmarks.fetchFromBookmarks(fetchedData)
}

loadBookmarks()

const allBookmarks = computed(() => {
  return fetchBookmarks.getBookmarks
    .filter((show) => {
      return (
        show.showDetails.title?.english?.toLowerCase().includes(search.value.toLowerCase()) ||
        show.showDetails.title?.romaji?.toLowerCase().includes(search.value.toLowerCase())
      )
    })
    .slice((currentPage.value - 1) * 10, currentPage.value * 10)
})
//  pagination functions
const total = computed(() => fetchBookmarks.getBookmarks.length)
const totalPages = computed(() => Math.ceil(total.value / 10))
const onPageChange = (page) => {
  currentPage.value = page
}

const formatDate = (date) => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  if (isNaN(date)) {
    return 'Finished Airing'
  }
  return `${new Date(date * 1000).toLocaleString('en-US', options)} at ${new Date(
    date * 1000
  ).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })}`
}

const removeStar = (show) => {
  const showID = show.id.toString()
  const showTitle = show.title.english ? show.title.english : show.title.romaji
  fetchBookmarks.starAnime(showID, showTitle)
  // use splice instead of filter to remove the item from the array
  // allBookmarks.value.splice(allBookmarks.value.indexOf(show), 1);
}

watch(allBookmarks, () => {
  if (allBookmarks.value.length === 0 && currentPage.value !== 1) {
    currentPage.value = 1
  }
})

// toggle watched
const toggleWatched = async (showId) => {
  try {
    await fetchBookmarks.toggleWatched(showId)
  } catch (error) {
    return
  }
}

const searchAnime = (showTitle) => {
  router.push('/')
  useAnimeData().fetchAnimeData(showTitle, false)
}

const shareAnime = (showTitle) => {
  const formattedTitle = showTitle
    .replace(/[^\w\s]/g, '') // Replace special characters with empty string
    .replace(/\s+/g, '-') //
  const useHomeUrl = `/`
  useAnimeData().shareAnimeCard(showTitle, useHomeUrl, formattedTitle)
}
</script>
<style scoped>
table {
  width: 100%;
  table-layout: fixed;
  position: relative;
}

.tbl-header {
  background-color: #0195ff2c;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.tbl-content {
  position: relative;
  height: min(750px, 65vh);
  min-height: 100%;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid #0195ff2c;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  z-index: 10;
  overflow-x: hidden;
}

.tbl-content::-webkit-scrollbar {
  width: 15px;
}

.tbl-content::-webkit-scrollbar-thumb {
  background-color: #004b81;
  border-radius: 20px;
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
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

.share-hover {
  width: 25px;
  height: 25px;
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

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.pop-leave-active {
  position: absolute;
  width: 100% !important;
}

.bookmarks-loading {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 10;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.search-box input {
  width: 300px;
  padding: 10px;
  border: none;
  outline: none;
  background-color: #0195ff2c;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  z-index: 10;
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
  list-style: none !important;
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
  gap: 0.5rem;
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

.check {
  font-size: 16px;
  position: relative;
  /* color: white; */
  width: 1.3em;
  height: 1.3em;
}

.check::before {
  content: '';
  height: 0.2em;
  width: 0.7em;
  border-radius: 3px;
  background: white;
  position: absolute;
  top: 0.85em;
  left: 0em;
  transform: rotate(45deg);
  transition:
    transform 0.5s ease-in-out,
    width 0.5s ease-in-out,
    top 0.5s ease-in-out,
    left 0.5s ease-in-out;
}

.check::after {
  content: '';
  height: 0.2em;
  width: 1.2em;
  border-radius: 3px;
  background: white;
  position: absolute;
  top: 0.6em;
  left: 0.25em;
  transform: rotate(-55deg);
  transition: transform 0.5s ease-in-out;
}

.check-watched::before {
  transform: rotate(-45deg);
  width: 1.2em;
  top: 0.6em;
  left: 0.25em;
}

.check-watched::after {
  transform: rotate(45deg);
}

.animetitle p {
  transition: all 0.3s ease;
}

.animetitle:hover p {
  cursor: pointer;
  color: #004b81;
}

@media screen and (max-width: 1025px) {
  .table-item {
    flex-direction: column;
    gap: 1rem;
  }

  .search-box {
    flex-direction: column;
    gap: 3rem;
  }

  .tbl-content {
    min-height: 100%;
    overflow-x: hidden;
  }

  .tbl-header {
    display: none;
  }

  .latest-episode {
    border-top: 1px solid #0195ff2c;
    padding-top: 1rem;
  }

  .latest-episode::before {
    content: 'latest Episode';
    width: 100%;
  }

  .season::before {
    content: 'Season/Year';
    width: 100%;
  }

  .schedule::before {
    content: 'Next Episode';
    width: 100%;
  }

  .status::before {
    content: 'Status';
    width: 100%;
  }

  .action::before {
    content: 'Action';
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
    left: 25%;
  }

  .bookmarks-loading svg {
    transform: translateX(-25%);
  }

  .tbl-content {
    margin-top: 2rem;
  }

  .pagination {
    align-items: flex-start;
    margin-top: 2rem;
    min-height: 8rem;
  }

  .action {
    gap: 15%;
  }
}

* {
  color: white;
}
</style>
