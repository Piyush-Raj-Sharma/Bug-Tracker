import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    // This ensures refreshing routes like /dashboard doesn't throw 404
    historyApiFallback: true
  }
})
