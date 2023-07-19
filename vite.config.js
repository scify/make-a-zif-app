import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Adding an alias for Bootstrap:
      "~bootstrap": path.resolve("node_modules/bootstrap"),
      "~p5": path.resolve("node_modules/p5"),
    },
  },
  server: {
    https: {
      key: "localhost.key",
      cert: "localhost.crt",
    },
  },
});
