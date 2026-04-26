// @ts-check
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  vite: {
    resolve: {
      noExternal: ["@lucide/astro", "lucide-astro"],
    },
  },
});
