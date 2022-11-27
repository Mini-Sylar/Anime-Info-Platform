// local storage set query

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
// let response = await fetch("https://graphql.anilist.co/?id", {
//   method: "POST",
//   body: prepareAnimeData(),
//   headers: headersList,
// });

const getFileStream = async (url) => {
  return fetch(url, {
    method: "POST",
    body: prepareAnimeData(),
    headers: headersList,
  });
};

export let containsAnimeData = (async () => {
  const stream = await getFileStream("https://graphql.anilist.co/?id");
  const data = await stream.json();
  return data;
})();

console.log(await containsAnimeData);
