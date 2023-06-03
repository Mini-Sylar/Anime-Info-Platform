import { defineStore } from "pinia";
import localforage from "localforage";
import { useToast } from "vue-toastification";
import { fetchDataFromBookmarks } from "../js/BookMarkQuery";
import { headersList } from "../js/AnimeQuery";

let toast = useToast();

export const useBookmarks = defineStore("bookmarks", {
  state: () => ({
    bookmarks: [],
    bookmarksloading: false,
  }),
  getters: {
    getBookmarks: (state) => {
      return state.bookmarks;
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
            showDetails: {},
          };
          bookmarkedShows.push(bookmarkedShow);
        }
      }
      bookmarkedShows.sort((a, b) => b.timestamp - a.timestamp);
      this.bookmarks = bookmarkedShows;
      console.log(this.bookmarks);
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
          toast.info("Show starred successfully!", {});
          return true
        } else {
          await localforage.removeItem(showId);
          toast.info("Show removed successfully!", {});
          return false
        }
      } catch (err) {
        toast.error("Something went wrong!");

        return false;
      } finally {
        await this.getSavedShows();
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
      // if (this.bookmarks.length == savedShows.length) {
      //   this.bookmarksloading = false;
      //   return;
      // }
      let showIDs = [];
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
      let showDetails =
        data?.data.Page.media.sort((a, b) => {
          const aIndex = showIDs.indexOf(a.id);
          const bIndex = showIDs.indexOf(b.id);
          return aIndex - bIndex;
        }) || [];
      showDetails = showDetails.map((show) => {
        return {
          ...show,
          airingSchedule: {
            ...show.airingSchedule,
            nodes: {
              ...show.airingSchedule.nodes,
              0: {
                ...show.airingSchedule.nodes[0],
                episode: show.airingSchedule.nodes[0]?.episode - 1 || 0,
              },
            },
          },
        };
      });
      let latestEpisodes = [];

      this.bookmarks.forEach((show, index) => {
        show.showDetails = showDetails[index];
      });

      showDetails.forEach((show) => {
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
          toast.success("Episode watched status toggled!");
          this.getSavedShows();
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
                    watched:
                      episode == value[0].latestEpisode
                        ? value[0].watched
                        : false,
                    latestEpisode: episode,
                    previousEpisode: value[0].latestEpisode,
                    timestamp: timestamp,
                  },
                ])
                .then(() => {
                  resolve(true);
                })
                .catch((err) => {
                  toast.error("Something went wrong!");
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
    },
    async exportBookmarks() {
      const savedShows = await this.getSavedShows();
      if (savedShows.length == 0) {
        toast.error("No shows to export!", {});
        return;
      }
      const jsonStr = JSON.stringify(savedShows, null, 2); // 2 is for indentation level
      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      let dateNow = new Date();
      let formattedDate = dateNow.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
      });
      a.download = `bookmarked-shows-${formattedDate}-Anime-Info-Platform.json`;
      a.click();
      URL.revokeObjectURL(url);
      a.href = "";
      a.download = null;
    },
    async importBookmarks(shows) {
      const fileContent = await shows.text();
      const savedShows = JSON.parse(fileContent);
      savedShows.forEach(async (show) => {
        await localforage.setItem(show.id, [
          {
            title: show.title,
            watched: show.watched,
            latestEpisode: show.latestEpisode,
            previousEpisode: show.previousEpisode,
            timestamp: show.timestamp,
          },
        ]);
      });
      await this.fetchFromBookmarks(savedShows);
      this.getSavedShows();
      toast.info("Bookmarks imported successfully!", {});
    },
    async clearAllBookmarks() {
      await localforage.clear();
      toast.info("All bookmarks cleared!", {});
      this.bookmarks = [];
    },
  },
});
