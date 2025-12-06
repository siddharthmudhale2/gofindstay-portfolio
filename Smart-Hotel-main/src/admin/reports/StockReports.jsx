// src/admin/reports/StockReports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToCSV } from "../../utils/exportToCSV";
import AddStock from "./AddStock";

export default function StockReports() {
  const [reports, setReports] = useState([]);
  const fetchReports = () => {
    const token = localStorage.getItem("token");
    axios.get("/api/admin/stock", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReports(res.data));
  };
  useEffect(() => { fetchReports(); }, []);
  return (
    <div>
      <h2>Stock Reports</h2>
      <AddStock onAdded={fetchReports} />
      <button onClick={() => exportToCSV(reports, "stock_reports.csv")}>
        Export CSV
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Item</th><th>Quantity</th><th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.item_name}</td>
              <td>{r.quantity}</td>
              <td>{new Date(r.last_updated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
