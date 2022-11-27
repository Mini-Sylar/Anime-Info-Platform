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
console.log(main_data);
console.log(main_data.data.Media.description);

export const useAnimeData = defineStore("animeData", {
  state: () => ({
    // put anime data here
    animeData: {
      main_data,
    },
    getters: {
      getAnimeDetails() {
        let isTitleEnglish = main_data.data.Media.title.english
          ? main_data.data.Media.title.english
          : main_data.data.Media.title.romaji;
        //   Return Anime Details as object
        return {
          title: isTitleEnglish,
          synopsis: main_data.data.Media.description,
        };
      },
    },
  }),
});
