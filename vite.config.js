import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: 'https://hareshkarnan.github.io/image-compress/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})