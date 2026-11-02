// Type shims for federated modules (optional if you use TS)
declare module 'remote_react/mount' {
  export function mount(el: HTMLElement, props?: Record<string, unknown>): {
    update(props: Record<string, unknown>): void
    unmount(): void
  }
}
declare module 'remote_vue/mount' {
  export function mount(el: HTMLElement, props?: Record<string, unknown>): {
    update(props: Record<string, unknown>): void
    unmount(): void
  }
}
declare module 'remote_angular/mount' {
  export function mount(el: HTMLElement, props?: Record<string, unknown>): Promise<{
    update(props: Record<string, unknown>): void
    unmount(): void
  }>
}
