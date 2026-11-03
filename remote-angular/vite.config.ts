import { defineConfig } from 'vite'
import angular from '@analogjs/vite-plugin-angular'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    // Compiles Angular inside plain Vite (the Angular CLI can't host Vite plugins)
    angular({ tsconfig: './tsconfig.app.json' }),
    tailwindcss(),
    federation({
      name: 'remote_angular',
      filename: 'remoteEntry.js',
      dts: false,
      exposes: {
        './mount': './src/mount.ts',
      },
      // Angular is only used by this remote, so it is bundled privately (not shared).
    }),
  ],
  server: {
    port: 8083,
    origin: 'http://localhost:8083',
    cors: true,
  },
  preview: { port: 8083, cors: true },
  build: { target: 'chrome89' },
})
