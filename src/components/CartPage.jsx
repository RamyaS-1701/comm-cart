import React from 'react'

const formatCurrency = (v) => {
  try { return v.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) }
  catch(e){ return `₹${v}` }
}

export default function CartPage({ items = [], total = 0, onRemove }){
  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      <ul>
        {items.map(it => (
          <li key={it.id} className="cart-item">
            <div>
              <strong>{it.name}</strong>
              <div>{it.qty} × {formatCurrency(it.price)}</div>
            </div>
            <div>
              <button onClick={()=>onRemove(it.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">Total: {formatCurrency(total)}</div>
    </section>
  )
}
