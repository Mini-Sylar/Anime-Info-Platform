
   export let headersList = {
     Accept: "*/*",
     "User-Agent": "Thunder Client (https://www.thunderclient.com)",
     "Content-Type": "application/json",
   };

export function prepareAnimeData(animeID = 111) {
  let gqlBody = {
    query: `query ($id: Int) {
  Media (id: $id, type: ANIME) { 
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
    variables: { id: animeID },
  };

  return JSON.stringify(gqlBody);
}

// let response = await fetch("https://graphql.anilist.co/?id", {
//   method: "POST",
//   body: prepareAnimeData(),
//   headers: headersList,
// });

// let data = await response.text();
// console.log(data);
