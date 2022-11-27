import { defineStore } from "pinia";
import { prepareAnimeData, headersList } from "../js/AnimeQuery";

// Store Anime data
let response = await fetch("https://graphql.anilist.co/?id", {
  method: "POST",
  body: prepareAnimeData(),
  headers: headersList,
});
// Main Data Here
let main_data = await response.json();

export const useAnimeData = defineStore("animeData", {
  state: () => ({
    animeData: main_data,
  }),
  getters: {
    getAnimeData: (state) => {
      const animeTitle = state.animeData.data.Media.title.english
        ? state.animeData.data.Media.title.english
        : state.animeData.data.Media.title.romaji;
      const description = state.animeData.data.Media.description;
      return { animeTitle, description };
    },
  },
});
