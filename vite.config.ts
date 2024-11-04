import { fileURLToPath, URL } from 'node:url'
import envCompatible from 'vite-plugin-env-compatible';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    envCompatible(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/_variables";',
      }
    }
  }
})
