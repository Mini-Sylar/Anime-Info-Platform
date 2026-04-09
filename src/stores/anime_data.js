import { defineStore } from 'pinia'
import {
  prepareAnimeData,
  headersList,
  main_data,
  surpriseMePageCount,
  surpriseMeAtPage,
  currentSeason
} from '../js/AnimeQuery'
import router from '../router'
import mixpanel from 'mixpanel-browser'
import {
  shadeColor,
  shareAnime,
  generateNewNodes,
  omitNull,
  randomIntFromInterval
} from '../js/helpers'
import { useToast } from 'vue-toastification'
import { useBookmarks } from './bookmarks'

main_data.data.Media.recommendations.nodes = main_data.data.Media.recommendations.nodes.filter(
  (item) => item.mediaRecommendation !== null
)

let toast = useToast()

export const useAnimeData = defineStore('animeData', {
  state: () => ({
    animeData: main_data,
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
    cardsLoading: false,
    bodyLoading: false,
    clearHistoryLoading: false,
    aboutWidth: '20%',
    toggleAbout: false,
    isStarred: false,
    bookMarkStore: useBookmarks(),
    showNewFeatures: false
  }),
  getters: {
    getAnimeTitleDescription: (state) => {
      const animeTitle = state.animeData.data.Media.title.english
        ? state.animeData.data.Media.title.english
        : state.animeData.data.Media.title.romaji
      const description = state.animeData.data.Media.description
      return { animeTitle, description }
    },
    getMetaDescription: (state) => {
      const year = state.animeData.data.Media.seasonYear
      const genre = state.animeData.data.Media.genres
      const episodes = state.animeData.data.Media.episodes
        ? state.animeData.data.Media.episodes
        : null
      return { year, genre, episodes }
    },
    getRating: (state) => {
      const rating = state.animeData.data.Media.averageScore / 10
      return rating
    },
    getTrailer: (state) => {
      const trailer = state.animeData.data.Media.trailer
        ? state.animeData.data.Media.trailer.id
        : null
      return trailer
    },
    getRecommendations: (state) => {
      return state.animeData.data.Media.recommendations.nodes
    },
    getAccentColor: (state) => {
      const color = state.animeData.data.Media.coverImage.color
      return color !== null ? shadeColor(color, -10) : '#0195ff'
    },
    getBackground: (state) => {
      const background = state.animeData.data.Media.bannerImage
      return background !== null ? background : '/images/404-no-wallpaper.jpg'
    },
    getAnimeId: (state) => {
      return state.animeData.data.Media.id
    }
  },
  actions: {
    async fetchAnimeData(searchQuery, logHistory = true) {
      this.cardsLoading = true
      this.bodyLoading = true
      try {
        let response = await fetch('https://graphql.anilist.co/', {
          method: 'POST',
          body: prepareAnimeData(searchQuery),
          headers: headersList
        })
        let main_data = await response.json()
        // Filter out null recommendations
        main_data.data.Media.recommendations.nodes =
          main_data.data.Media.recommendations.nodes.filter(
            (item) => item.mediaRecommendation !== null
          )
        this.animeData = main_data
        localStorage.setItem('searchQuery', searchQuery)
        if (logHistory) {
          this.addToHistory()
        }
        this.bookMarkStore.isShowStarred(main_data.data.Media.id).then((value) => {
          this.isStarred = value
        })
      } catch (error) {
        toast.error('Error fetching anime data')
      }
      setTimeout(() => {
        this.cardsLoading = false
        this.bodyLoading = false
      }, 1000)
    },

    async fetchSurprise(genre) {
      this.cardsLoading = true
      try {
        const countRes = await fetch('https://graphql.anilist.co/', {
          method: 'POST',
          body: surpriseMePageCount(genre),
          headers: headersList
        })

        if (!countRes.ok) {
          throw new Error('Unable to fetch genre data from AniList.')
        }

        const countData = await countRes.json()
        if (countData.errors?.length) {
          throw new Error(countData.errors[0].message)
        }

        const lastPage = countData?.data?.Page?.pageInfo?.lastPage ?? 0
        if (!lastPage || lastPage < 1) {
          toast.warning(`No anime found for genre "${genre}". Try another genre.`)
          return
        }

        const maxPage = Math.min(lastPage, 150)
        let newNodes = []
        let attempt = 0
        const maxAttempts = 4

        while (attempt < maxAttempts && newNodes.length === 0) {
          const randomPage = randomIntFromInterval(1, maxPage)
          const animeRes = await fetch('https://graphql.anilist.co/', {
            method: 'POST',
            body: surpriseMeAtPage(genre, randomPage),
            headers: headersList
          })

          if (!animeRes.ok) {
            throw new Error('Unable to fetch surprise anime from AniList.')
          }

          const animeData = await animeRes.json()
          if (animeData.errors?.length) {
            throw new Error(animeData.errors[0].message)
          }

          const media = animeData?.data?.Page?.media ?? []
          newNodes = media.length ? generateNewNodes(animeData) : []
          attempt += 1
        }

        if (newNodes.length === 0) {
          toast.warning(
            `Could not find results for "${genre}" after ${maxAttempts} tries. Please try another genre.`
          )
          return
        }

        this.animeData.data.Media.recommendations.nodes = newNodes
      } catch (error) {
        toast.error(error.message || 'There was an issue fetching surprise shows')
      } finally {
        setTimeout(() => {
          this.cardsLoading = false
        }, 1000)
      }
    },

    async fetchFromRecommended(title) {
      this.bodyLoading = true
      try {
        let response = await fetch('https://graphql.anilist.co/', {
          method: 'POST',
          body: prepareAnimeData(title),
          headers: headersList
        })
        this.animeData.data.Media.trailer = null
        let main_data = await response.json()
        main_data.data.Media.recommendations = null
        if (main_data.data.Media.bannerImage === null) {
          main_data.data.Media.bannerImage = '/images/404-no-wallpaper.jpg'
        }
        this.animeData.data.Media = {
          ...omitNull(this.animeData.data.Media),
          ...omitNull(main_data.data.Media)
        }
        this.bookMarkStore.isShowStarred(main_data.data.Media.id).then((value) => {
          this.isStarred = value
        })
      } catch (error) {
        toast.error('Error fetching anime data')
      }
      setTimeout(() => {
        this.bodyLoading = false
      }, 1000)
      localStorage.setItem('searchQuery', title)
    },

    async shareAnimeMain() {
      const animeTitle = this.animeData.data.Media.title.english
        ? this.animeData.data.Media.title.english
        : this.animeData.data.Media.title.romaji
      const formattedTitle = animeTitle.replace(/[^\w\s]/g, '').replace(/\s+/g, '-')
      const animeUrl = router.currentRoute.value.fullPath
      shareAnime(animeTitle, animeUrl, formattedTitle)
      mixpanel.track('Shared Anime', { title: animeTitle })
    },

    async shareAnimeCard(animeTitle, animeUrl, formattedTitle) {
      shareAnime(animeTitle, animeUrl, formattedTitle)
      mixpanel.track('Shared Anime Bookmark', { title: animeTitle })
    },

    async addToHistory() {
      const animeTitle = this.animeData.data.Media.title.english
        ? this.animeData.data.Media.title.english
        : this.animeData.data.Media.title.romaji
      this.searchHistory.push(animeTitle)
      if (this.searchHistory.length > 10) {
        this.searchHistory.shift()
      }
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
    },

    async clearHistory() {
      this.clearHistoryLoading = true
      this.searchHistory = []
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory))
      setTimeout(() => {
        this.clearHistoryLoading = false
      }, 1000)
    },

    async reduceWidth(reduce) {
      this.toggleAbout = reduce
      this.aboutWidth = this.toggleAbout ? '170%' : '20%'
    },

    async fetchCurrentSeason() {
      this.cardsLoading = true
      try {
        let response = await fetch('https://graphql.anilist.co/', {
          method: 'POST',
          body: currentSeason(),
          headers: headersList
        })
        const currentSeasonList = await response.json()
        this.animeData.data.Media.recommendations.nodes = generateNewNodes(currentSeasonList)
      } catch (error) {
        toast.error('There was an issue fetching the current season list')
      }
      this.cardsLoading = false
    },

    async toggleStarredStatus(showId, showName, isStarred) {
      try {
        const result = await this.bookMarkStore.starAnime(showId, showName, isStarred)
        this.$state.isStarred = result
      } catch (error) {
        toast.error('There was an issue updating the bookmark')
      }
    },

    async initializeIsStarred(showId) {
      const starred = await this.bookMarkStore.isShowStarred(showId.value)
      this.$state.isStarred = starred
    },

    showReleaseNotes() {
      this.showNewFeatures = true
    }
  }
})
