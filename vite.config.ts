import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // pour que l'appli se lance dans le port 3000 et plus 5173
    open: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), tailwindcss()],
})
