# Micro Frontends with Vue + React + Angular — Vite Module Federation (runtime integration)

| App          | Framework | Port | Role                                  |
|--------------|-----------|------|---------------------------------------|
| host         | Vue 3     | 8080 | Shell, router, loads remotes at runtime |
| remote-react | React 18  | 8081 | Exposes `./mount`                     |
| remote-vue   | Vue 3     | 8082 | Exposes `./mount`                     |
| remote-angular | Angular 19 | 8083 | Exposes `./mount`                  |

## Run (dev)
    npm install
    npm run dev

## Run (production-like)
    npm run build
    npm run preview
