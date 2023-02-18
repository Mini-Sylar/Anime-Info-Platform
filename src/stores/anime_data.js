import { defineStore } from "pinia";
import {
  prepareAnimeData,
  headersList,
  main_data,
  surpriseMe,
} from "../js/AnimeQuery";
import router from "../router";

import { shadeColor, shareAnime } from "../js/helpers";

let omitNull = (obj) => {
  Object.keys(obj)
    .filter((k) => obj[k] === null)
    .forEach((k) => delete obj[k]);
  return obj;
};

main_data.data.Media.recommendations.nodes =
  main_data.data.Media.recommendations.nodes.filter(
    (item) => item.mediaRecommendation !== null
  );

export const useAnimeData = defineStore("animeData", {
  state: () => ({
    animeData: main_data,
    // recomendationData:
  }),
  getters: {
    getAnimeTitleDescription: (state) => {
      // set Anime Title and Description
      const animeTitle = state.animeData.data.Media.title.english
        ? state.animeData.data.Media.title.english
        : state.animeData.data.Media.title.romaji;
      // set Anime Description
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
      // TODO: Add way to shade color dynamically
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
    async fetchAnimeData(searchQuery) {
      let response = await fetch("https://graphql.anilist.co/?id", {
        method: "POST",
        body: prepareAnimeData(searchQuery),
        headers: headersList,
      });
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
    },
    async fetchSurprise(genre) {
      // Add loading parameters here
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
    },
    async fetchFromRecommended(title) {
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
      localStorage.setItem("searchQuery", title);
    },
    async shareAnimeMain() {
      const animeTitle = this.animeData.data.Media.title.english
        ? this.animeData.data.Media.title.english
        : this.animeData.data.Media.title.romaji;
      const animeUrl = router.currentRoute.value.fullPath;
      shareAnime(animeTitle, animeUrl);
    },
  },
});
