if (import.meta.env.DEV && typeof window !== 'undefined' && !window.$RefreshReg$) {
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
}
