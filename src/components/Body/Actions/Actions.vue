<template>
  <div>
    <div class="actions-container" v-on-click-outside="hideWhenClickedOutside">
      <div class="Starred">
        <button @click="starShow" :title="isStarred ? 'Unstar Show' : 'Star Show'" :class="[
          isStarred == true
            ? 'star-show-container starred'
            : 'star-show-container unstarred',
        ]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="star-button star-icon">
            <path
              d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
          </svg>
        </button>
      </div>
      <div class="share">
        <button type="button" class="action-button share-main" title="Share show" @click="useShareAnime">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="share-hover">
            <path
              d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z" />
          </svg>
        </button>
        <transition name="show-history">
          <History v-if="showModal == true" />
        </transition>
        <button type="button" class="action-button history-show" title="View History" @click="showHistoryMenu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="history-icon">
            <path
              d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
          </svg>
        </button>
        <button type="button" class="action-button bookmarks" title="show bookmarked anime" @click="showMiniBookmarkMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 448 512" class="show-bookmark">
            <path
              d="M0 96C0 43 43 0 96 0h96V190.7c0 13.4 15.5 20.9 26 12.5L272 160l54 43.2c10.5 8.4 26 .9 26-12.5V0h32 32c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384 96c-53 0-96-43-96-96V96zM64 416c0 17.7 14.3 32 32 32H352V384H96c-17.7 0-32 14.3-32 32z" />
          </svg>
        </button>
        <button type="button" class="action-button bookmarks" title="Show Release Notes" @click="showReleaseNotes">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="uses-dynamic">
            <path
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
          </svg>
        </button>
        <transition name="show-history">
          <BookMarked v-if="showBookmark == true" />
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAnimeData } from "@/stores/anime_data";
import { ref, computed } from "vue";
import History from "./History.vue";
import BookMarked from "./BookMarked.vue";
import { vOnClickOutside } from "@vueuse/components";

const useShareAnime = () => {
  useAnimeData().shareAnimeMain();
};
const showID = computed(() => {
  return useAnimeData().getAnimeId.toString();
});
// check if anime was starred
useAnimeData().initializeIsStarred(showID);

const showModal = ref(false);
const showBookmark = ref(false);

const showHistoryMenu = () => {
  showModal.value = !showModal.value;
  if (showBookmark.value == true) {
    showBookmark.value = false;
  }
};

const hideWhenClickedOutside = () => {
  if (showModal.value == true) {
    showModal.value = false;
  }
  if (showBookmark.value == true) {
    showBookmark.value = false;
  }
};

const isStarred = computed(() => {
  return useAnimeData().isStarred;
});

const starShow = () => {
  const title = useAnimeData().getAnimeTitleDescription.animeTitle;
  useAnimeData().toggleStarredStatus(showID.value, title, !isStarred.value);
};

const showMiniBookmarkMenu = () => {
  showBookmark.value = !showBookmark.value;
  if (showModal.value == true) {
    showModal.value = false;
  }
};

const showReleaseNotes = () => {
  useAnimeData().showReleaseNotes();
};
</script>
<style scoped>
button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

button:hover * {
  cursor: pointer;
}

button * {
  /* padding: .2rem; */
  font-size: clamp(1rem, 1.5rem, 2rem);
  padding: 5px;
}

.actions-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 20rem;
}

.settings {
  display: flex;
  align-items: center;
  border-left: 2px solid rgba(110, 110, 110, 0.311);
  padding-left: 5px;
  justify-content: flex-end;
  width: 100%;
}

.share {
  display: flex;
  gap: 1rem;
  margin-right: 1.5rem;
}

.settings-icon:hover {
  animation: elastic-spin 3000ms;
}

.history-icon:hover {
  animation: elastic-spin 1500ms reverse;
}

/* CSS animation to grow and shrink while bouncing */
.grow-shrink:hover {
  animation: hithere 1s ease;
}

.share-main:hover .share-hover {
  animation: flip 1s ease-in;
}

.show-history-active,
.show-history-leave-active {
  height: 20em;
  transition: opacity 0.3s ease height 0.2 ease;
}

.show-history-enter-from,
.show-history-leave-to {
  height: 0;
  opacity: 0;
}

.action-button svg {
  width: 40px;
  height: 40px;
}

.star-show-container {
  background-color: transparent !important;
}

.star-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in;
  color: #fff;
}

.star-button {
  width: 40px;
  height: 40px;
  padding: 5px;
  font-size: clamp(1rem, 1.5rem, 2rem);
  fill: #969696;
}

.starred {
  animation: spin 0.6s forwards;
  transform-origin: 50% 50%;
  transition-timing-function: ease-in-out;
}

.starred .star-icon {
  fill: yellow;
  animation: spin 0.6s forwards;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transition-timing-function: ease-in-out;
}

.unstarred .star-icon {
  animation: unspin 0.3s forwards;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transition-timing-function: ease-in-out;
}

.unstarred .star-icon:hover {
  animation: hithere 1s ease;
}

.starred .star-icon:hover,
.bookmarks:hover {
  animation: gelatine 1s ease-in;
}
</style>
