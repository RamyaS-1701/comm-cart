import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import ProductList from './components/ProductList'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import api from './api'

export default function App(){
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{ fetchProducts(); fetchCart(); }, [])

  async function fetchProducts(params){
    const data = await api.products.list(params || {});
    setProducts(data);
    const cats = Array.from(new Set(data.map(p=>p.category).filter(Boolean)));
    setCategories(['All', ...cats]);
  }

  async function fetchCart(){
    const data = await api.cart.list();
    setCart(data || { items: [], total:0 });
  }

  async function addToCart(productId){ await api.cart.add({ productId, qty: 1 }); fetchCart(); }
  async function removeFromCart(id){ await api.cart.remove(id); fetchCart(); }

  function handleCheckout(){ navigate('/checkout'); }

  return (
    <div className="app">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cart.items.length})</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<ProductList products={products} onAdd={addToCart} categories={categories} onFilter={fetchProducts} />} />
          <Route path="/cart" element={<CartPage items={cart.items} total={cart.total} onRemove={removeFromCart} />} />
          <Route path="/checkout" element={<CheckoutPage cartItems={cart.items} onCheckout={fetchCart} />} />
        </Routes>
      </main>
    </div>
  )
}

