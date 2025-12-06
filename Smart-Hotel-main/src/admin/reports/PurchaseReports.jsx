// src/admin/reports/PurchaseReports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToCSV } from "../../utils/exportToCSV";
import AddPurchase from "./AddPurchase";

export default function PurchaseReports() {
  const [reports, setReports] = useState([]);
  const fetchReports = () => {
    const token = localStorage.getItem("token");
    axios.get("/api/admin/purchases", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReports(res.data));
  };
  useEffect(() => { fetchReports(); }, []);
  return (
    <div>
      <h2>Purchase Reports</h2>
      <AddPurchase onAdded={fetchReports} />
      <button onClick={() => exportToCSV(reports, "purchase_reports.csv")}>
        Export CSV
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Item</th><th>Quantity</th><th>Price</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.item_name}</td>
              <td>{r.quantity}</td>
              <td>{r.price}</td>
              <td>{r.purchased_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
