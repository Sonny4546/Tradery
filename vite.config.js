import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Tradery/",
  build: {
    rollupOptions: {
      external: ["react", "react-router", "react-router-dom", "react-redux"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
