import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import mixpanel from "mixpanel-browser";

mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN);

mixpanel.identify();
mixpanel.people.set();

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
app.mount("#app");
