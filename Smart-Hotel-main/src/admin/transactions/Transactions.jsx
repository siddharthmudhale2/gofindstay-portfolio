import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import { exportToCSV } from "../../utils/exportToCSV";
import { FiTrash2 } from "react-icons/fi"; // Modern Feather Trash icon

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({ type: "", status: "" });

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const params = {};
    if (filters.type) params.type = filters.type;
    if (filters.status) params.status = filters.status;
    const res = await axios.get("/api/admin/transactions", {
      headers: { Authorization: `Bearer ${token}` },
      params
    });
    setTransactions(res.data);
  };

  useEffect(() => { fetchTransactions(); }, [filters]);

  // Delete transaction
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`/api/admin/transactions/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTransactions();
  };

  return (
    <div>
      <h2>Transactions</h2>
      <AddTransaction onAdded={fetchTransactions} />
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
          <option value="">All Types</option>
          <option value="booking">Booking</option>
          <option value="purchase">Purchase</option>
          <option value="wallet">Wallet</option>
          <option value="refund">Refund</option>
          <option value="other">Other</option>
        </select>
        <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="pending">Pending</option>
        </select>
        <button onClick={() => exportToCSV(transactions, "transactions.csv")}>Export CSV</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.user_id}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.method}</td>
              <td>{t.status}</td>
              <td>{t.description}</td>
              <td>{new Date(t.created_at).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleDelete(t.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d11a2a",
                    fontSize: 20
                  }}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
