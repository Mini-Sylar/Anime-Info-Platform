import { defineStore } from "pinia";
import localforage from "localforage";
import { useToast } from "vue-toastification";
import { fetchDataFromBookmarks } from "../js/BookMarkQuery";
import { headersList } from "../js/AnimeQuery";

let toast = useToast();

export const useBookmarks = defineStore("bookmarks", {
  state: () => ({
    bookmarks: [],
    bookmarked_details: [],
    bookmarksloading: false,
  }),
  getters: {
    getBookmarks: (state) => {
      return state.bookmarks;
    },
    getBookmarkedDetials: (state) => {
      return state.bookmarked_details;
    },
  },
  actions: {
    async getSavedShows() {
      const bookmarkedShows = [];
      const keys = await localforage.keys();
      for (const key of keys) {
        const data = await localforage.getItem(key);
        if (data && data.length > 0) {
          const bookmarkedShow = {
            id: key,
            title: data[0].title,
            watched: data[0].watched,
            latestEpisode: data[0].latestEpisode,
            previousEpisode: data[0].previousEpisode,
            timestamp: data[0].timestamp,
          };
          bookmarkedShows.push(bookmarkedShow);
        }
      }
      bookmarkedShows.sort((a, b) => b.timestamp - a.timestamp);
      return bookmarkedShows;
    },

    async starAnime(showId, showName, isStarred, watched = false) {
      const timestamp = Date.now();
      const showData = {
        title: showName,
        watched: watched,
        latestEpisode: 0,
        previousEpisode: 0,
        timestamp: timestamp, // add timestamp field
      };
      try {
        if (isStarred) {
          await localforage.setItem(showId, [showData]);
          console.log("Show starred successfully!");
        } else {
          await localforage.removeItem(showId);
          console.log("Show removed successfully!");
        }
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    isShowStarred(showId) {
      // convert showId to string
      showId = showId.toString();
      return new Promise((resolve, reject) => {
        localforage.getItem(showId, function (err, value) {
          if (err) {
            toast.error("Something went wrong!", {
              duration: 500,
            });
            reject(err);
          } else {
            if (value) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      });
    },
    async fetchFromBookmarks(savedShows) {
      this.bookmarksloading = true;
      let showIDs = [];
      // if (
      //   savedShows.length < 1 ||
      //   this.bookmarked_details.length == this.bookmarks.length
      // ) {
      //   this.bookmarksloading = false;
      //   return;
      // }
      savedShows.filter((show) => {
        const id = parseInt(show.id);
        if (!isNaN(id)) {
          showIDs.push(id);
        }
      });
      let response = await fetch("https://graphql.anilist.co/", {
        method: "POST",
        body: fetchDataFromBookmarks(showIDs),
        headers: headersList,
      });

      let data = await response.json();

      this.bookmarked_details =
        data?.data.Page.media.sort((a, b) => {
          const aIndex = showIDs.indexOf(a.id);
          const bIndex = showIDs.indexOf(b.id);
          return aIndex - bIndex;
        }) || [];
      let latestEpisodes = [];

      this.bookmarked_details.forEach((show) => {
        latestEpisodes.push({
          showId: show.id.toString(),
          latestEpisode: show.airingSchedule.nodes[0]?.episode || show.episodes,
          timestamp: savedShows.find((s) => s.id == show.id).timestamp,
        });
      });

      // Update all latest episodes
      this.updateAllLatestEpisodes(latestEpisodes);
      setTimeout(() => {
        this.bookmarksloading = false;
      }, 1000);
    },

    async toggleWatched(showId) {
      try {
        const value = await localforage.getItem(showId);
        if (value) {
          const updatedValue = {
            ...value[0],
            watched: !value[0].watched,
          };
          await localforage.setItem(showId, [updatedValue]);
          toast.success("Episode watched status toggled!", {
            duration: 500,
          });
          return true;
        } else {
          return false;
        }
      } catch (err) {
        toast.error("Something went wrong!", {
          duration: 500,
        });
        throw err;
      }
    },

    async updateLatestEpisode(showId, episode, timestamp) {
      return new Promise((resolve, reject) => {
        localforage.getItem(showId, function (err, value) {
          if (err) {
            toast.error("Something went wrong!", {
              duration: 500,
            });
            reject(err);
          } else {
            if (value) {
              localforage
                .setItem(showId, [
                  {
                    title: value[0].title,
                    watched: value[0].watched,
                    latestEpisode: episode,
                    previousEpisode: value[0].latestEpisode,
                    timestamp: timestamp,
                  },
                ])
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  toast.error("Something went wrong!", {
                    duration: 500,
                  });
                  reject(err);
                });
            } else {
              resolve(false);
            }
          }
        });
      });
    },

    async updateAllLatestEpisodes(latestEpisodes) {
      await Promise.all(
        latestEpisodes.map((episode) => {
          return this.updateLatestEpisode(
            episode.showId,
            episode.latestEpisode,
            episode.timestamp
          );
        })
      );
      this.getSavedShows();
    },
  },
});
