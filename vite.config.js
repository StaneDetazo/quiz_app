import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // permettre les requêtes du backend
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8090', // URL du backend
        changeOrigin: true,
        secure: false,
      },
      '/question': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      },
      '/quiz': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
