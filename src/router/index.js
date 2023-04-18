import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import { useAnimeData } from "../stores/anime_data";
import mixpanel from "mixpanel-browser";
import BookmarkView from "../views/BookmarkView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/bookmarks",
      name: "bookmark",
      component: BookmarkView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      beforeEnter: (to, from, next) => {
        useAnimeData().reduceWidth(true);
        mixpanel.track("About Page");
        next();
      },
      meta: {
        transition: "slide-right",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: AboutView,
      beforeEnter: (to, from, next) => {
        useAnimeData().reduceWidth(false);
        mixpanel.track("Contact Page");
        next();
      },
    },
    {
      path: "/not-found",
      name: "404",
      component: NotFound,
    },
    {
      path: "/:search",
      name: "anime",
      component: HomeView,
      beforeEnter(to, from) {
        mixpanel.track("Used share link", {
          title: to.params.search,
        });
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
      component: NotFound,
      beforeEnter() {
        mixpanel.track("404 Page");
      },
    },
  ],
});

export default router;
