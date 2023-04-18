export function fetchDataFromBookmarks(ids = []) {
  let gqlBody = {
    query: `query ($ids: [Int!]!) {
  Page {
    media(id_in: $ids) {
      id
      title {
        english
        romaji
      }
      coverImage {
        medium
        color
      }
      status
      season
      startDate {
        year
      }
      episodes
      airingSchedule(notYetAired: true, perPage: 1) {
        nodes {
          episode
          airingAt
        }
      }
    }
  }
}
`,
    variables: { ids: ids },
  };

  return JSON.stringify(gqlBody);
}
