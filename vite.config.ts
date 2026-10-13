import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base: './'` makes the build work from any folder or sub-path
// (e.g. GitHub Pages at username.github.io/repo-name/).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
