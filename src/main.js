import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/css/main.css";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// Import All Icons
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
// Add to library
library.add(fas, far, fab);

// Import Star Rating
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
