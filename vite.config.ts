import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs correct base when served from /<repo>/
export default defineConfig({
  plugins: [react()],
  base: '/candena-master-landing/',
})
