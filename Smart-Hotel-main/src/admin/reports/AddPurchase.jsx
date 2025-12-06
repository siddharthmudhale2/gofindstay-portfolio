// src/admin/reports/AddPurchase.jsx
import React, { useState } from "react";
import axios from "axios";
export default function AddPurchase({ onAdded }) {
  const [item_name, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/admin/purchases", { item_name, quantity, price }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMsg("Purchase added!");
    setItemName(""); setQuantity(""); setPrice("");
    onAdded && onAdded();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input value={item_name} onChange={e => setItemName(e.target.value)} placeholder="Item Name" required />
      <input value={quantity} onChange={e => setQuantity(e.target.value)} type="number" placeholder="Quantity" required />
      <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Price" required />
      <button type="submit">Add Purchase</button>
      {msg && <div style={{color:'green'}}>{msg}</div>}
    </form>
  );
}
