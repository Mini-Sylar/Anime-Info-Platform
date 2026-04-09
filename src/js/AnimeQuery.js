// local storage set query
import { randomIntFromInterval } from './helpers'

export let headersList = {
  Accept: '*/*',
  'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
  'Content-Type': 'application/json'
}

// Global Variables
let sharedValue = window.location.href.split('/')[3]
// Prevent shared value from using reserved route names
let doNotUse = ['about', 'contact', 'bookmarks']
sharedValue = doNotUse.includes(sharedValue) ? '' : sharedValue
let storedValue = localStorage.getItem('searchQuery')
let currentYear = new Date().getFullYear()

export function prepareAnimeData(
  searchQuery = sharedValue
    ? sharedValue
    : storedValue
      ? storedValue
      : 'Zom-100-Bucket-List-of-the-Dead'
) {
  let gqlBody = {
    query: `query ($id: Int, $search: String) {
  Media(id: $id, search: $search, type: ANIME) {
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
    trailer {
      id
    }
    recommendations(page: 1, perPage: 10, sort: RATING_DESC) {
      nodes {
        mediaRecommendation {
          id
          title {
            english
            romaji
          }
          coverImage {
            large
          }
        }
      }
    }
  }
}`,
    variables: { search: searchQuery }
  }
  return JSON.stringify(gqlBody)
}

// Store Anime data on initial load
let response = await fetch('https://graphql.anilist.co/', {
  method: 'POST',
  body: prepareAnimeData(),
  headers: headersList
})
export let main_data = await response.json()
if (main_data.data.Media === null) {
  window.location.href = '/not-found'
}

// Step 1 of 2 for Surprise Me: get the real last page for the genre
// so we can pick a truly random page across all available results
export function surpriseMePageCount(genre) {
  return JSON.stringify({
    query: `query ($search: String) {
  Page(page: 1, perPage: 20) {
    pageInfo {
      lastPage
    }
    media(genre: $search, type: ANIME, sort: POPULARITY_DESC) {
      id
    }
  }
}`,
    variables: { search: genre }
  })
}

// Step 2 of 2 for Surprise Me: fetch actual anime from the chosen random page
export function surpriseMeAtPage(genre, page) {
  return JSON.stringify({
    query: `query ($page: Int, $search: String) {
  Page(page: $page, perPage: 10) {
    media(genre: $search, type: ANIME) {
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
    variables: { search: genre, page }
  })
}

export function currentSeason() {
  let gqlBody = {
    query: `query ($seasonYear: Int!) {
  Page(page: 1, perPage: 50) {
    media(seasonYear: $seasonYear, status: RELEASING, type: ANIME, sort: POPULARITY_DESC) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
    }
  }
}`,
    variables: { seasonYear: currentYear }
  }

  return JSON.stringify(gqlBody)
}
