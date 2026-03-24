import adapter from "@sveltejs/adapter-static";
import {vitePreprocess} from "@sveltejs/vite-plugin-svelte";

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
    },
    prerender: {
      handleMissingId: "ignore",
    },
  },
  preprocess: vitePreprocess(),
};

export default config;
