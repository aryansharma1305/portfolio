import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the build works both at a repo subpath (GitHub Pages)
  // and at a domain root (Vercel / custom domain).
  base: './',
  plugins: [react(), tailwindcss()],
})
