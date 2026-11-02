import React from 'react'
import './refresh-preamble.js'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/**
 * Mount contract shared by every remote:
 *   mount(el, props) -> { update(props), unmount() }
 */
export function mount(el, props = {}) {
  const root = createRoot(el)
  const render = (p) => root.render(<App {...p} />)
  render(props)
  return {
    update: render,
    unmount: () => root.unmount(),
  }
}
