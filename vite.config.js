import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

export default defineConfig({
  server: {
    port: 5173
  },
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
        compressionLevel: 8,
      },
      jpg: {
        quality: 82,
        progressive: true,
      },
      jpeg: {
        quality: 82,
        progressive: true,
      },
      webp: {
        lossless: false,
        quality: 82,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
        }
      }
    }
  }
})
