<template>
  <header class="nav">
    <strong>🧩 MFE Shell (Vue host)</strong>
    <router-link to="/">Home</router-link>
    <router-link to="/products">Products (React)</router-link>
    <router-link to="/cart">Cart (Vue)</router-link>
    <router-link to="/checkout">Checkout (Angular)</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style>
body { font-family: system-ui, sans-serif; margin: 0; }
.nav { display: flex; gap: 16px; padding: 12px 20px; background: #1f2937; color: #fff; align-items: center; }
.nav a { color: #93c5fd; text-decoration: none; }
.nav a.router-link-active { color: #fff; text-decoration: underline; }
main { padding: 20px; }
</style>
