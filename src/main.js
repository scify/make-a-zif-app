import { createApp } from "vue";
import App from "./App.vue";
// Map API v1.0.0 functions.
// import * as mapApiFunctions from "./js/mapApiFunctions.js";

// Import all of Bootstrap's JS.
import * as bootstrap from "bootstrap";

// Note: Make-a-ZIF App's CSS is included on App.vue for convenience and
// therefore none of the files on ./scss should be imported from this script.
const app = createApp(App);
app.mount("#app");
