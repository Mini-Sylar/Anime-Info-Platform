import { defineStore } from "pinia";
import { prepareAnimeData, headersList, main_data,surpriseMe } from "../js/AnimeQuery";



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
    getRecommendations: (state,whichState=state.animeData) => {
      console.log(whichState.data.Media.recommendations.nodes);
      const recommendations = whichState.data.Media.recommendations.nodes;
      return recommendations;
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
      this.animeData = main_data;
      //   Set to local storage to save search query after refresh
      localStorage.setItem("searchQuery", searchQuery);
    },
    async fetchSurprise(genre){
      let response_cards = await fetch("https://graphql.anilist.co/?id", {
        method: "POST",
        body: surpriseMe(genre),
        headers: headersList,
      });
      let surpriseCards_gotten = await response_cards.json()
      this.animeData.data.Media.recommendations =
        surpriseCards_gotten.data.Media.recommendations;
    },
  }
});
