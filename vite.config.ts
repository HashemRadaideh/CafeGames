import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // prevent vite from obscufing rust errors
  clearScreen: false,
  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` AND `TAURI_DEBUG`
  // env variables
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: ["es2021", "chrome100", "safari13"],
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
  plugins: [react()],
});
