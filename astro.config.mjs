import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://gaurav-g-alva.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
