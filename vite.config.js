import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://egesiapres.github.io/subEditor-app/",
  plugins: [nodePolyfills(), react()],
});
