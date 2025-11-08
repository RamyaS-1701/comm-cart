import React, { useState } from 'react'
import api from '../api'

const formatCurrency = (v) => {
  try { return v.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) }
  catch(e){ return `₹${v}` }
}

export default function CheckoutPage({ cartItems = [], onCheckout }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [receipt, setReceipt] = useState(null)

  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.checkout({ name, email, cartItems });
      setReceipt(res.receipt);
      if (onCheckout) onCheckout();
    }catch(err){ alert(err?.response?.data?.error || err.message) }
  }

  return (
    <section className="checkout">
      <h2>Checkout</h2>
      <form onSubmit={submit}>
        <label>Name<input value={name} onChange={e=>setName(e.target.value)} required /></label>
        <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
        <button type="submit">Place Order (mock)</button>
      </form>

      {receipt && (
        <div className="receipt">
          <h3>Receipt</h3>
          <div>Total: {formatCurrency(receipt.total)}</div>
          <div>Date: {receipt.timestamp}</div>
          <pre>{JSON.stringify(receipt, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}
