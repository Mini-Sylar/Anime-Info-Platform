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
            console.error(err);
            reject(err);
          });
      });
    },

    starAnime(showId, showName, isStarred) {
      return new Promise((resolve, reject) => {
        localforage.getItem(showId, function (err, value) {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (value && !isStarred) {
              // Show already exists in LocalForge and needs to be removed
              localforage
                .removeItem(showId)
                .then(() => {
                  toast.success("Show unstarred successfully!", {
                    duration: 1000,
                  });
                  resolve(false);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            } else if (!value && isStarred) {
              // Show does not exist in LocalForge and needs to be added
              localforage
                .setItem(showId, showName)
                .then(() => {
                  toast.success("Show starred successfully!", {
                    duration: 1000,
                  });
                  resolve(true);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            } else {
              toast.error("Something went wrong!", {
                duration: 1000,
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
            console.error(err);
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
    async fetchFromBookmarks() {
      this.bookmarksloading = true;
      let showIDs = [];
      this.getBookmarks.filter((show) => {
        showIDs.push(parseInt(show.key));
      });
      let response = await fetch("https://graphql.anilist.co/?id", {
        method: "POST",
        body: fetchDataFromBookmarks(showIDs),
        headers: headersList,
      });

      let data = await response.json();
      this.bookmarked_details = data?.data.Page.media || [];
      setTimeout(() => {
        this.bookmarksloading = false;
      }, 1000);
    },
  },
});
