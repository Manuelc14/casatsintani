import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import prefetch from "@astrojs/prefetch";

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), prefetch()],
});
