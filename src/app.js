import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';
const client = axios.create({ baseURL: API_BASE, headers: { 'Content-Type': 'application/json' } });

export default {
  products: { list: (params) => client.get('/products', { params }).then(r => r.data), get: (id) => client.get(`/products/${id}`).then(r=>r.data) },
  cart: { list: () => client.get('/cart').then(r=>r.data), add: (payload) => client.post('/cart', payload).then(r=>r.data), remove: (id) => client.delete(`/cart/${id}`).then(r=>r.data) },
  checkout: (payload) => client.post('/checkout', payload).then(r=>r.data)
}
