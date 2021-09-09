import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      // "url-prefix": "the url to proxy the fetch"
      "/api": "http://localhost:8000" //server address
    }
  }
})
