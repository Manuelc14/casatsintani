// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  vite: { plugins: [tailwind()] },
  integrations: [react(), prefetch()],
});
