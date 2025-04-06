import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '', // or './' for relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})