import {sveltekit} from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import {defineConfig} from "vitest/config";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    conditions: ["browser"],
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.test.ts"],
    setupFiles: ["src/lib/tests/setup.ts"],
  },
});
