// local storage set query
import { randomIntFromInterval } from "./helpers";

export let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json",
};

export function prepareAnimeData(
  searchQuery = localStorage.getItem("searchQuery")
    ? localStorage.getItem("searchQuery")
    : "Naruto"
) {
  let gqlBody = {
    query: `query ($id: Int,$search: String) {
  Media (id: $id, search: $search type: ANIME) { 
    id
    title {
      english
      romaji
    }
    coverImage {
        large
        color
  }
  bannerImage
  description
  seasonYear
  genres
  episodes
  averageScore
  trailer{
      id
    }
# Recommendations
 recommendations(page: 1,perPage:10,sort:RATING_DESC) {
      nodes { # Array of character nodes
        mediaRecommendation {
          id
          title{
            english
            romaji
            }
        coverImage
            {
              large
            }
        }
      }
  }
  }
}
`,
    variables: { search: searchQuery },
  };
  return JSON.stringify(gqlBody);
}
// Store Anime data
let response = await fetch("https://graphql.anilist.co/?id", {
  method: "POST",
  body: prepareAnimeData(),
  headers: headersList,
})

export let main_data = await response.json()

// Surprise Me Cards
export function surpriseMe(genre = "action") {
  let gqlBody_Cards = {
    query: `query ( $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      perPage
    }
    media ( genre: $search  type: ANIME) {
      id
      title {
        english
        romaji
      }
      
       coverImage {
        large
        color
  }
    }
    
  }
}`,
    variables: {
      search: genre,
      page:
        genre !== "Ecchi" &&
        genre !== "Horror" && // remove horror
        genre !== "Mahou Shoujo" && // remove horror
        genre !== "Mecha" &&
        genre !== "Music" && //Remove Music
        genre !== "Mystery" &&
        genre !== "Psychological"
          ? randomIntFromInterval(1, 200) // for none of the values above
          : genre !== "Horror" && genre !== "Mahou Shoujo" && genre !== "Music"
          ? randomIntFromInterval(1, 90)
          : randomIntFromInterval(1, 50),
      perPage: 10,
    },
  };
  return JSON.stringify(gqlBody_Cards);
}
