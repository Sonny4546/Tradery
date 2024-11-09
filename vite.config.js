import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Tradery/",
  resolve: {
    alias: {
      'react': 'https://cdn.skypack.dev/react@17',
      'react-dom': 'https://cdn.skypack.dev/react-dom@17'
    }
  },
});

