import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * `base: '/'` — this site is published at the ROOT of a GitHub Pages *user* site:
 *   https://john69-git.github.io/
 *
 * If you ever publish it from a *project* repo instead (https://john69-git.github.io/some-repo/),
 * change this to `base: '/some-repo/'`. Every image path in the app goes through
 * `asset()` in src/lib/asset.ts, so nothing else needs to change.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    target: 'es2022',
    cssMinify: true,
  },
})
