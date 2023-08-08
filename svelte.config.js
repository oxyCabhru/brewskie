import adapter from "@sveltejs/adapter-node";
import * as child_process from 'child_process';
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess()],

  kit: {
    adapter: adapter(),
    csrf: false,
  },

};

export default config;