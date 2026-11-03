<script setup>
import { ref, computed, onMounted, onBeforeUnmount, version } from 'vue'

defineProps({ user: { type: String, default: 'guest' } })

const items = ref([])
const total = computed(() => items.value.reduce((s, i) => s + i.price, 0))

const onAdd = (e) => items.value.push(e.detail)
const clear = () => (items.value = [])

onMounted(() => {
  window.addEventListener('mfe:cart-add', onAdd)
  window.addEventListener('mfe:checkout', clear) // emitted by the Angular remote
})
onBeforeUnmount(() => {
  window.removeEventListener('mfe:cart-add', onAdd)
  window.removeEventListener('mfe:checkout', clear)
})
</script>

<template>
  <section class="cart">
    <h2 class="text-xl font-bold">🟢 Cart (Vue {{ version }})</h2>
    <p>Owner: <strong>{{ user }}</strong></p>
    <p v-if="!items.length">Cart is empty. Add something from the React app!</p>
    <ul v-else>
      <li v-for="(item, i) in items" :key="i">{{ item.name }} — ${{ item.price }}</li>
    </ul>
    <p><strong>Total: ${{ total }}</strong>
      <button v-if="items.length" @click="clear">Clear</button>
    </p>
  </section>
</template>

<style scoped>
.cart { border: 2px solid #42b883; border-radius: 8px; padding: 16px; }
</style>
