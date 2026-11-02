import { createApplication } from '@angular/platform-browser'
import {
  createComponent,
} from '@angular/core'
import { AppComponent } from './app.component'

/**
 * Same mount contract as the React and Vue remotes:
 *   mount(el, props) -> { update(props), unmount() }
 * Angular bootstrapping is async, so mount() returns a Promise of that object.
 */
export async function mount(el: HTMLElement, props: Record<string, unknown> = {}) {
  // Zoneless: no zone.js, so Angular doesn't monkey-patch globals
  // (setTimeout, Promise, addEventListener...) shared with the other MFEs.
  const appRef = await createApplication({
    providers: [],
  })

  const host = document.createElement('div')
  el.appendChild(host)

  const cmp = createComponent(AppComponent, {
    environmentInjector: appRef.injector,
    hostElement: host,
  })

  const apply = (p: Record<string, unknown>) =>
    Object.entries(p).forEach(([k, v]) => cmp.setInput(k, v))

  apply(props)
  appRef.attachView(cmp.hostView)

  return {
    update: apply,
    unmount: () => {
      appRef.destroy() // destroys attached components + their listeners
      host.remove()
    },
  }
}
