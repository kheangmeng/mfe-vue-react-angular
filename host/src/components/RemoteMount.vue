<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  loader: { type: Function, required: true }, // () => import('remote/mount')
  appProps: { type: Object, default: () => ({}) },
})

const el = ref(null)
const loading = ref(true)
const error = ref(null)
let instance = null
let disposed = false

onMounted(async () => {
  try {
    const mod = await props.loader()
    const inst = await mod.mount(el.value, { ...props.appProps }) // sync or async
    if (disposed) inst?.unmount?.() // component left the page while loading
    else instance = inst
  } catch (e) {
    console.error('Failed to load remote', e)
    error.value = e
  } finally {
    loading.value = false
  }
})

watch(() => props.appProps, (p) => instance?.update?.({ ...p }), { deep: true })
onBeforeUnmount(() => {
  disposed = true
  instance?.unmount?.()
})
</script>

<template>
  <div>
    <p v-if="loading">Loading remote…</p>
    <p v-if="error" style="color: #b91c1c">
      ⚠️ Remote unavailable: {{ error.message }}
    </p>
    <div ref="el" />
  </div>
</template>
