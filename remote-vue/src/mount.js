import './style.css'
import { createApp, reactive, h } from 'vue'
import App from './App.vue'

/**
 * Same mount contract as the React remote:
 *   mount(el, props) -> { update(props), unmount() }
 */
export function mount(el, props = {}) {
  const state = reactive({ ...props })
  const app = createApp({ render: () => h(App, state) })
  app.mount(el)
  return {
    update: (p) => Object.assign(state, p),
    unmount: () => app.unmount(),
  }
}
