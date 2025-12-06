// src/admin/reports/AddStock.jsx
import React, { useState } from "react";
import axios from "axios";
export default function AddStock({ onAdded }) {
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/admin/stock", { item_name, quantity }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMsg("Stock added!");
    setItemName(""); setQuantity("");
    onAdded && onAdded();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={item_name} onChange={e => setItemName(e.target.value)} placeholder="Item Name" required />
      <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" placeholder="Quantity" required />
      <button type="submit">Add Stock</button>
      {msg && <div style={{color:'green'}}>{msg}</div>}
    </form>
  );
}
