import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      // Security headers for development
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Security: Don't expose source maps in production
        sourcemap: false,
      }
    }
  },
  define: {
    // Security: Remove console logs in production
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
  }
})
