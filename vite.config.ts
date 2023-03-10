import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

const root = resolve(__dirname, "client");
const outDir = resolve(__dirname, "server/views");
const publicDir = resolve(__dirname, "client/public");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root,
  publicDir,
  clearScreen: false,
  server: {
    strictPort: true,
    host: "0.0.0.0",
  },
  // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`
  // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` AND `TAURI_DEBUG`
  // env variables
  envPrefix: ["VITE_", "TAURI_"],
  build: {
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
