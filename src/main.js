import { createApp } from "vue";
import App from "./App.vue";

// Note: Make-a-ZIF App's CSS is included on App.vue for convenience and
// therefore none of the files on ./scss are required.

// Import all of Bootstrap's JS.
import * as bootstrap from "bootstrap";
import * as p5 from "p5";

createApp(App).mount("#app");
