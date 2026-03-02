import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/final-fisica/',
  plugins: [react()],
  build: {
    outDir: 'docs',
    chunkSizeWarningLimit: 600,
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: 'all',
  },
})
