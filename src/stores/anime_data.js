import { defineStore } from "pinia";
import {
  prepareAnimeData,
  headersList,
  main_data,
  surpriseMe,
  currentSeason,
} from "../js/AnimeQuery";
import router from "../router";
import mixpanel from "mixpanel-browser";
import {
  shadeColor,
  shareAnime,
  generateNewNodes,
  omitNull,
} from "../js/helpers";
import { useToast } from "vue-toastification";

import { useBookmarks } from "./bookmarks";

main_data.data.Media.recommendations.nodes =
  main_data.data.Media.recommendations.nodes.filter(
    (item) => item.mediaRecommendation !== null
  );

let toast = useToast();

export const useAnimeData = defineStore("animeData", {
  state: () => ({
    animeData: main_data,
    searchHistory: JSON.parse(localStorage.getItem("searchHistory")) || [],
    cardsLoading: false,
    bodyLoading: false,
    clearHistoryLoading: false,
    aboutWidth: "20%",
    toggleAbout: false,
    isStarred: false,
    bookMarkStore: useBookmarks(),
    showNewFeatures: false,
  }),
  getters: {
    getAnimeTitleDescription: (state) => {
      // set Anime Title and Description
      const animeTitle = state.animeData.data.Media.title.english
        ? state.animeData.data.Media.title.english
        : state.animeData.data.Media.title.romaji;
      const description = state.animeData.data.Media.description;
      return { animeTitle, description };
    },
    getMetaDescription: (state) => {
      const year = state.animeData.data.Media.seasonYear;
      const genre = state.animeData.data.Media.genres;
      const episodes = state.animeData.data.Media.episodes
        ? state.animeData.data.Media.episodes
        : "Unknown";
      return { year, genre, episodes };
    },
    getRating: (state) => {
      const rating = state.animeData.data.Media.averageScore / 10;
      return rating;
    },
    getTrailer: (state) => {
      const trailer = state.animeData.data.Media.trailer
        ? state.animeData.data.Media.trailer.id
        : null;
      return trailer;
    },
    getRecommendations: (state) => {
      const recommendations = state.animeData.data.Media.recommendations.nodes;
      return recommendations;
    },
    getAccentColor: (state) => {
      const color = state.animeData.data.Media.coverImage.color;
      return color !== null ? shadeColor(color, -10) : "#0195ff";
    },
    getBackground: (state) => {
      const background = state.animeData.data.Media.bannerImage;
      return background !== null ? background : "/images/404-no-wallpaper.jpg";
    },
    getAnimeId: (state) => {
      const animeID = state.animeData.data.Media.id;
      return animeID;
    },
  },
  actions: {
    async fetchAnimeData(searchQuery, logHistory = true) {
      this.cardsLoading = true;
      this.bodyLoading = true;
      let response = await fetch("https://graphql.anilist.co/?id", {
        method: "POST",
        body: prepareAnimeData(searchQuery),
        headers: headersList,
      });
      try {
        // Main Data Here
        let main_data = await response.json();
        // loop through array  main_data.data.Media.recommendations.nodes and drop object with null values using filter
        main_data.data.Media.recommendations.nodes =
          main_data.data.Media.recommendations.nodes.filter(
            (item) => item.mediaRecommendation !== null
          );
        this.animeData = main_data;
        //   Set to local storage to save search query after refresh
        localStorage.setItem("searchQuery", searchQuery);
        //  Add to search history
        if (logHistory) {
          this.addToHistory();
        }
        //check if starred
        this.bookMarkStore
          .isShowStarred(main_data.data.Media.id)
          .then((value) => {
            this.isStarred = value;
          });
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setTimeout(() => {
        this.cardsLoading = false;
        this.bodyLoading = false;
      }, 1000);
    },
    async fetchSurprise(genre) {
      // Add loading parameters here
      try {
        this.cardsLoading = true;
        let response_cards = await fetch("https://graphql.anilist.co/?id", {
          method: "POST",
          body: surpriseMe(genre),
          headers: headersList,
        });
        let surpriseCards_gotten = await response_cards.json();
        // Create a new object to store the data
        let newNodes = [
          ...surpriseCards_gotten.data.Page.media.map((item) => {
            return { mediaRecommendation: item };
          }),
        ];
        this.animeData.data.Media.recommendations.nodes = newNodes;
      } catch (error) {
        toast.error("There was an issue fetching the this show");
      }
      setTimeout(() => {
        this.cardsLoading = false;
      }, 1000);
    },
    async fetchFromRecommended(title) {
      this.bodyLoading = true;
      try {
        let response = await fetch("https://graphql.anilist.co/?id", {
          method: "POST",
          body: prepareAnimeData(title),
          headers: headersList,
        });
        this.animeData.data.Media.trailer = null;
        let main_data = await response.json();
        main_data.data.Media.recommendations = null;
        // Set background to no image if not found
        if (main_data.data.Media.bannerImage === null) {
          main_data.data.Media.bannerImage = "/images/404-no-wallpaper.jpg";
        }
        this.animeData.data.Media = {
          ...omitNull(this.animeData.data.Media),
          ...omitNull(main_data.data.Media),
        };
        //check if starred
        this.bookMarkStore
          .isShowStarred(main_data.data.Media.id)
          .then((value) => {
            this.isStarred = value;
          });
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setTimeout(() => {
        this.bodyLoading = false;
      }, 1000);
      localStorage.setItem("searchQuery", title);
    },
    async shareAnimeMain() {
      const animeTitle = this.animeData.data.Media.title.english
        ? this.animeData.data.Media.title.english
        : this.animeData.data.Media.title.romaji;
      const formattedTitle = animeTitle
        .replace(/[^\w\s]/g, "") // Replace special characters with empty string
        .replace(/\s+/g, "-"); //
      const animeUrl = router.currentRoute.value.fullPath;
      shareAnime(animeTitle, animeUrl, formattedTitle);
      mixpanel.track("Shared Anime", {
        title: animeTitle,
      });
    },
    async shareAnimeCard(animeTitle, animeUrl, formattedTitle) {
      shareAnime(animeTitle, animeUrl, formattedTitle);
      mixpanel.track("Shared Anime Bookmark", {
        title: animeTitle,
      });
    },
    async addToHistory() {
      const animeTitle = this.animeData.data.Media.title.english
        ? this.animeData.data.Media.title.english
        : this.animeData.data.Media.title.romaji;
      this.searchHistory.push(animeTitle);
      if (this.searchHistory.length > 10) {
        this.searchHistory.shift();
      }
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    },
    async clearHistory() {
      this.clearHistoryLoading = true;
      this.searchHistory = [];
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
      setTimeout(() => {
        this.clearHistoryLoading = false;
      }, 1000);
    },
    async reduceWidth(reduce) {
      this.toggleAbout = reduce;
      if (this.toggleAbout == true) {
        this.aboutWidth = "170%";
      } else {
        this.aboutWidth = "20%";
      }
    },
    async fetchCurrentSeason() {
      this.cardsLoading = true;
      try {
        let response = await fetch("https://graphql.anilist.co/", {
          method: "POST",
          body: currentSeason(),
          headers: headersList,
        });
        const currentSeasonList = await response.json();
        this.animeData.data.Media.recommendations.nodes =
          generateNewNodes(currentSeasonList);
      } catch (error) {
        toast.error("There was an issue fetching the current season list");
      }
      this.cardsLoading = false;
    },
    async toggleStarredStatus(showId, showName, isStarred) {
      try {
        const result = await this.bookMarkStore.starAnime(
          showId,
          showName,
          isStarred
        );
        this.$state.isStarred = result;
      } catch (error) {
        toast.error(
          "There was an issue checking the starred status of this show"
        );
      }
    },
    async initializeIsStarred(showId) {
      const starred = await this.bookMarkStore.isShowStarred(showId.value);
      // const starred = await isShowStarred(showId.value);
      this.$state.isStarred = starred;
    },
    showReleaseNotes() {
      this.showNewFeatures = true;
    },
  },
});
