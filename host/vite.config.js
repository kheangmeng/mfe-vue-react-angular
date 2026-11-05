import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/mfe-vue-react-angular/' : '/'
}

// In production, override these with real URLs (e.g. via env vars / CI)
// const REACT_URL = process.env.REMOTE_REACT_URL || 'http://localhost:8081/mfe-vue-react-angular/remoteEntry.js'
// const VUE_URL = process.env.REMOTE_VUE_URL || 'http://localhost:8082/mfe-vue-react-angular/remoteEntry.js'
// const ANGULAR_URL = process.env.REMOTE_ANGULAR_URL || 'http://localhost:8083/mfe-vue-react-angular/remoteEntry.js'

const REACT_URL = process.env.REMOTE_REACT_URL || `http://localhost:8081${getBasePath()}remoteEntry.js`
const VUE_URL = process.env.REMOTE_VUE_URL || `http://localhost:8082${getBasePath()}remoteEntry.js`
const ANGULAR_URL = process.env.REMOTE_ANGULAR_URL || `http://localhost:8083${getBasePath()}remoteEntry.js`

export default defineConfig({
  base: getBasePath(),
  plugins: [
    vue(),
    tailwindcss(),
    federation({
      name: 'host',
      dts: false,
      remotes: {
        remote_react: {
          type: 'module',
          name: 'remote_react',
          entry: REACT_URL,
          entryGlobalName: 'remote_react',
          shareScope: 'default',
        },
        remote_angular: {
          type: 'module',
          name: 'remote_angular',
          entry: ANGULAR_URL,
          entryGlobalName: 'remote_angular',
          shareScope: 'default',
        },
        remote_vue: {
          type: 'module',
          name: 'remote_vue',
          entry: VUE_URL,
          entryGlobalName: 'remote_vue',
          shareScope: 'default',
        },
      },
      shared: {
        vue: { singleton: true, requiredVersion: '^3.5.0' },
      },
    }),
  ],
  server: { port: 8080 },
  build: { target: 'chrome89' },
})
