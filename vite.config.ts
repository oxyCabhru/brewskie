import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import * as child from "child_process";
const VITE_COMMIT_HASH = child.execSync('git rev-parse HEAD');

export default defineConfig({
  plugins: [sveltekit()],
  define: { 
    "commit": [...VITE_COMMIT_HASH]
   },
  css: {
    preprocessorOptions: {
    },
  },
});
