import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: "src/assets/*.svg" })],
  server: {
    proxy: {
      '^/preview$': {
        target: 'http://localhost:5173',
        rewrite: (path) => '/preview/index.html'
      },
    }
  }
})
