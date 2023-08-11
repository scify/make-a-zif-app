import { createApp } from "vue";
import App from "./App.vue";
import FloatingVue from "floating-vue";
import { VTooltip, VClosePopper } from "floating-vue";

FloatingVue.options.distance = 12;

// Note: Make-a-ZIF App's CSS is included on App.vue for convenience and
// therefore none of the files on ./scss should be imported from this script.
// Import all of Bootstrap's JS. It remains unknown if this is optimal or not.
import * as bootstrap from "bootstrap";

const app = createApp(App);
app.directive("tooltip", VTooltip);
app.directive("close-popper", VClosePopper);
app.mount("#app");
