import React, { useState } from 'react'

const formatCurrency = (v) => {
  try { return v.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }) }
  catch(e){ return `₹${v}` }
}

export default function ProductList({ products = [], onAdd, categories = [], onFilter }){
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  function applyFilter(){
    const params = {};
    if (search) params.q = search;
    if (category && category !== 'All') params.category = category;
    onFilter(params);
  }

  return (
    <section className="products">
      <div className="controls">
        <input placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {(categories||[]).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button onClick={applyFilter}>Filter</button>
      </div>
      <div className="grid">
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="card-body">
              <h4>{p.name}</h4>
              <p className="price">{formatCurrency(p.price)}</p>
              <button onClick={()=>onAdd(p.id)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
