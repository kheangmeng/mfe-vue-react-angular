import React, { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Mechanical Keyboard', price: 89 },
  { id: 2, name: 'USB-C Dock', price: 129 },
  { id: 3, name: '4K Monitor', price: 399 },
]

export default function App({ user = 'guest' }) {
  const [added, setAdded] = useState([])

  const addToCart = (product) => {
    setAdded((a) => [...a, product.id])
    // Cross-MFE communication: a framework-agnostic browser event
    window.dispatchEvent(new CustomEvent('mfe:cart-add', { detail: product }))
  }

  return (
    <section style={{ border: '2px solid #61dafb', borderRadius: 8, padding: 16 }}>
      <h2 className="text-xl font-bold">⚛️ Products (React {React.version})</h2>
      <p>Browsing as <strong>{user}</strong></p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {PRODUCTS.map((p) => (
          <li key={p.id} style={{ margin: '8px 0' }}>
            {p.name} — ${p.price}{' '}
            <button onClick={() => addToCart(p)}>
              Add to cart {added.includes(p.id) ? '✓' : ''}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
