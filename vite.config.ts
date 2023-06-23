import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { WatcherOptions } from "rollup";

const watch: WatcherOptions = {};

const root = resolve(__dirname, "client");
const outDir = resolve(__dirname, "server/views");
const publicDir = resolve(__dirname, "client/public");

export default defineConfig({
  mode: "development", // production
  plugins: [react()],
  root,
  publicDir,
  clearScreen: false,
  server: {
    strictPort: true,
    host: "0.0.0.0",
  },
  envPrefix: ["VITE_", "TAURI_"],
  resolve: {
    alias: {
      "@": root,
    },
  },
  build: {
    // watch,
    outDir,
    emptyOutDir: true,
    target: ["es2021", "chrome100", "safari13"],
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        chess: resolve(root, "games/Chess/index.html"),
      },
    },
  },
});
