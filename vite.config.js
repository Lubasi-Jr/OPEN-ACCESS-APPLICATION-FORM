import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(), envCompatible()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  /* server: {
    host: "10.7.0.78",
    port: 8003,
  }, */
});

//VITE_APP_API_BASE_URL=https://10.7.0.78:8000
