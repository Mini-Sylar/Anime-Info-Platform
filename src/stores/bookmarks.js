import { defineStore } from "pinia";
import localforage from "localforage";

export const useBookmarks = defineStore("bookmarks", {
  state: () => ({
    bookmarks: [],
  }),
  getters: {
    getBookmarks: (state) => {
      return state.bookmarks;
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
                  console.log("show removed successfully");
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
                  console.log("Show Starred Successfully");
                  resolve(true);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            } else {
              console.log("Not Starred");
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
  },
});
