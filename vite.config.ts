import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": "./src/shared",
      "@assets": "./src/assets",
      "@pages": "./src/pages",
      "@modules": "./src/modules",
      "@public": "./public",
    },
  },
});
