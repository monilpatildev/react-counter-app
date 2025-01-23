import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@components": "/src/components",
      "@context": "/src/context",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@store": "/src/store",
    },
  },
});
