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
      console.log(state.bookmarks, "Order");
      return state.bookmarks;
    },
    getBookmarkedDetials: (state) => {
      return state.bookmarked_details;
    },
  },
  actions: {
    getSavedShows() {
      return new Promise((resolve, reject) => {
        const shows = [];
        localforage
          .iterate((value, key) => {
            shows.push({ key, value });
          })
          .then(() => {
            this.$state.bookmarks = shows;
            resolve(shows);
          })
          .catch((err) => {
            toast.error(
              "There was an issue fetching your bookmarks! Report this issue via email"
            );
            reject(err);
          });
      });
    },

    starAnime(showId, showName, isStarred, watched = false) {
      return new Promise((resolve, reject) => {
        localforage.getItem(showId, function (err, value) {
          if (err) {
            toast.error("Something went wrong!", {
              duration: 500,
            });
            reject(err);
          } else {
            if (value && !isStarred) {
              // Show already exists in LocalForge and needs to be removed
              localforage
                .removeItem(showId)
                .then(() => {
                  toast.success("Show removed successfully!", {
                    duration: 1000,
                  });
                  resolve(false);
                })
                .catch((err) => {
                  toast.error("Something went wrong!", {
                    duration: 500,
                  });
                  reject(err);
                });
            } else if (!value && isStarred) {
              // Show does not exist in LocalForge and needs to be added
              localforage
                .setItem(showId, [
                  {
                    title: showName,
                    watched: watched,
                    latestEpisode: 0,
                    previousEpisode: 0,
                  },
                ])
                .then(() => {
                  toast.success("Show starred successfully!", {
                    duration: 500,
                  });
                  resolve(true);
                })
                .catch((err) => {
                  toast.error("Something went wrong!", {
                    duration: 500,
                  });
                  reject(err);
                });
            } else {
              toast.error("Something went wrong!", {
                duration: 500,
              });
              // Show is already starred or unstarred, nothing to do
              resolve(false);
            }
          }
        });
      });
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
      if (
        savedShows.length < 1 ||
        this.bookmarked_details.length == this.bookmarks.length
      ) {
        this.bookmarksloading = false;
        return;
      }
      savedShows.filter((show) => {
        showIDs.push(parseInt(show.key));
      });
      let response = await fetch("https://graphql.anilist.co/?id", {
        method: "POST",
        body: fetchDataFromBookmarks(showIDs),
        headers: headersList,
      });

      let data = await response.json();
      this.bookmarked_details = data?.data.Page.media || [];

      let latestEpisodes = [];

      this.bookmarked_details.forEach((show) => {
        latestEpisodes.push({
          showId: show.id.toString(),
          latestEpisode: show.airingSchedule.nodes[0]?.episode,
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

    async updateLatestEpisode(showId, episode) {
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
        latestEpisodes.map((episode) =>
          this.updateLatestEpisode(episode.showId, episode.latestEpisode)
        )
      );
      this.getSavedShows();
    },
  },
});
