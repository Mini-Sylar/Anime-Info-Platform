import { defineStore } from "pinia";
import { prepareAnimeData, headersList } from "../js/AnimeQuery";

// Store Anime data
let response = await fetch("https://graphql.anilist.co/?id", {
  method: "POST",
  body: prepareAnimeData(),
  headers: headersList,
});

let main_data = await response.json();
// console.log(data);

export const useAnimeData = defineStore("animeData", {
  state: () => ({
    // put anime data here
    animeData: {
      main_data,
    },
    getters:{
        getAnimeTitle(){
            
        }
    }
  }),
});
