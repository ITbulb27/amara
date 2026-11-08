import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/amara-api': {
          target: env.VITE_XAMPP_URL || 'http://127.0.0.1',
          changeOrigin: true,
        },
      },
    },
  }
})
