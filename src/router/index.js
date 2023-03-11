import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import NotFound from "../views/NotFound.vue";
import { useAnimeData } from "../stores/anime_data";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      beforeEnter: (to, from, next) => {
        useAnimeData().reduceWidth(true);
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
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/not-found",
      component: NotFound,
    },
  ],
});

export default router;
