export let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json",
};

export function prepareAnimeData(searchQuery = "naruto") {
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
