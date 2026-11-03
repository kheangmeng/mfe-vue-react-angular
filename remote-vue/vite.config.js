import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'remote_vue',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './mount': './src/mount.js',
      },
      // Share Vue with the host so only ONE copy of Vue runs on the page
      shared: {
        vue: { singleton: true, requiredVersion: '^3.5.0' },
      },
    }),
  ],
  server: {
    port: 8082,
    origin: 'http://localhost:8082',
    cors: true,
  },
  preview: { port: 8082, cors: true },
  build: { target: 'chrome89' },
})
