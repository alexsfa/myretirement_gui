import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      vueDevTools(),
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: {
        host: env.VITE_DEV_HOST || 'localhost', 
        protocol: 'ws',
        port: 5173,
      },
    },
  }
})


