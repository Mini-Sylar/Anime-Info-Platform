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

async function getInitialSearchQuery() {
  if (sharedValue) return sharedValue
  if (storedValue) return storedValue

  try {
    const seasonResponse = await fetch('https://graphql.anilist.co/', {
      method: 'POST',
      body: currentSeason(),
      headers: headersList
    })

    if (!seasonResponse.ok) {
      throw new Error('Unable to fetch current season list.')
    }

    const seasonData = await seasonResponse.json()
    const media = seasonData?.data?.Page?.media || []
    if (!media.length) {
      throw new Error('No current season anime found.')
    }

    const chosen = media[randomIntFromInterval(0, media.length - 1)]
    return chosen?.title?.english || chosen?.title?.romaji || 'Zom-100-Bucket-List-of-the-Dead'
  } catch (error) {
    return 'Zom-100-Bucket-List-of-the-Dead'
  }
}

export function prepareAnimeData(searchQuery) {
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

// Autocomplete suggestions — lightweight query (title + cover + year only)
// Designed for debounced calls from the search box; perPage kept low to stay fast
export function searchSuggestions(query) {
  return JSON.stringify({
    query: `query ($search: String) {
  Page(page: 1, perPage: 7) {
    media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
      id
      title { english romaji }
      coverImage { medium }
      seasonYear
    }
  }
}`,
    variables: { search: query }
  })
}

const defaultSearchQuery = await getInitialSearchQuery()
// Store Anime data on initial load
let response = await fetch('https://graphql.anilist.co/', {
  method: 'POST',
  body: prepareAnimeData(defaultSearchQuery),
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
