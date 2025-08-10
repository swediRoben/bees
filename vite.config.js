import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/bees/", // le nom exact de ton repo GitHub
  build: {
    rollupOptions: {
      input: 'index.html', // chemin relatif, sans slash au début
    }
  },
})
