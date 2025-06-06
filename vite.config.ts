// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Загружаем переменные окружения
  const env = loadEnv(mode, process.cwd(), '')

  // Динамически определяем base URL
  const base = env.VITE_BASE_URL || '/'
  // base: process.env.CI && '/react-diploma/',

  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
    },
    css: {
      devSourcemap: true,
    },
    // Для локальной разработки с проксированием API
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:7070',
          changeOrigin: true,
        }
      }
    }
  }
})