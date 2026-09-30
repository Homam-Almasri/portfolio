import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages serves the site under /portfolio/; the dev server serves it at the root.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/portfolio/' : '/',
}))
