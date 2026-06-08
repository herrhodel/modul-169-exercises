import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Wenn dein Backend in Docker unter dem Service-Namen `backend` läuft,
 * kannst du im Dev-Server bereits ein Proxy setzen.
 * Das funktioniert nur lokal (nicht im finalen nginx-build).
 */

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      // Leitet /api auf dein FastAPI-Backend weiter (lokal einfacher)
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist", // default
  },
});
