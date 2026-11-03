import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'remote_react',
      filename: 'remoteEntry.js',
      dts: false,
      // Expose a framework-agnostic mount() contract rather than a React component,
      // so ANY host (Vue, Angular, vanilla) can consume it.
      exposes: {
        './mount': './src/mount.jsx',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
    }),
  ],
  server: {
    port: 8081,
    origin: 'http://localhost:8081', // so assets resolve when loaded from the host
    cors: true,
  },
  preview: { port: 8081, cors: true },
  build: {
    target: 'chrome89', // allows top-level await used by federation runtime
  },
})
