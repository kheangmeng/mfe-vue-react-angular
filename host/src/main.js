import './index.css';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import Dashboard from './components/Dashboard.vue'
import RemoteMount from './components/RemoteMount.vue'
import { h } from 'vue'

// Dynamic imports are resolved by Module Federation AT RUNTIME
const ReactProducts = {
  render: () =>
    h(RemoteMount, {
      loader: () => import('remote_react/mount'),
      appProps: { user: 'Alice' },
    }),
}
const VueCart = {
  render: () =>
    h(RemoteMount, {
      loader: () => import('remote_vue/mount'),
      appProps: { user: 'Alice' },
    }),
}

const AngularCheckout = {
  render: () =>
    h(RemoteMount, {
      loader: () => import('remote_angular/mount'),
      appProps: { user: 'Alice' },
    }),
}

const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/mfe-vue-react-angular/' : '/'),
  routes: [
    { path: '/', component: Home },
    { path: '/products', component: ReactProducts },
    { path: '/cart', component: VueCart },
    { path: '/checkout', component: AngularCheckout },
    { path: '/dashboard', component: Dashboard },
  ],
})

createApp(App).use(router).mount('#app')
