import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import mixpanel from "mixpanel-browser";
import localforage from "localforage";
import { createHead } from "@unhead/vue";

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);

mixpanel.identify();
mixpanel.people.set();

// initialize local forge
localforage.config({
  driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
  name: "AnimeInfoDB",
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: "User_Saved_Info", // Should be alphanumeric, with underscores.
  description: "Contains user info on anime",
});

const app = createApp(App);
const mixpanelPlugin = {
  install: (app) => {
    app.config.globalProperties.$mixpanel = mixpanel;
  },
};
app.use(router);
app.use(createPinia());
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.use(mixpanelPlugin);
const head = createHead();
app.use(head);
app.mount("#app");
