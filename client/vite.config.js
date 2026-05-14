import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { browserslistToTargets } from "lightningcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: "lightningcss",
  },
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
});
