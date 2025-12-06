import React, { useState } from "react";
import axios from "axios";

export default function AddTransaction({ onAdded }) {
  const [form, setForm] = useState({
    user_id: "",
    type: "booking",
    amount: "",
    method: "",
    status: "success",
    description: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/admin/transactions", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMsg("Transaction added!");
    setForm({
      user_id: "",
      type: "booking",
      amount: "",
      method: "",
      status: "success",
      description: ""
    });
    onAdded && onAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
      <input
        name="user_id"
        value={form.user_id}
        onChange={handleChange}
        placeholder="User ID"
        required
        style={{ width: 90 }}
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="booking">Booking</option>
        <option value="purchase">Purchase</option>
        <option value="wallet">Wallet</option>
        <option value="refund">Refund</option>
        <option value="other">Other</option>
      </select>
      <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" required style={{ width: 90 }}/>
      <input name="method" value={form.method} onChange={handleChange} placeholder="Method" required style={{ width: 90 }}/>
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
        <option value="pending">Pending</option>
      </select>
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" style={{ width: 120 }}/>
      <button type="submit">Add Transaction</button>
      {msg && <span style={{ color: "green", marginLeft: 8 }}>{msg}</span>}
    </form>
  );
}
