import React, { useEffect, useState } from "react";
import axios from "axios";
import SuperAdminLayout from "./SuperAdminLayout";
import { BaseURL } from "../BaseURL";
import "./superadmin.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${BaseURL}/superadmin/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Failed to load transactions:", err));
  }, []);

  return (
    <SuperAdminLayout>
      <div className="sa-section">
        <h2 className="sa-section-title">Client Transactions</h2>
        <div className="top-clients-box">
          <table className="top-client-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Organisation ID</th>
                <th>Location</th>
                <th>Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.organisation_id}>
                  <td>
                    <div className="client-profile">
                      <img
                        src={tx.admin_photo_url ? `${BaseURL}${tx.admin_photo_url}` : `https://i.pravatar.cc/40?u=${tx.organisation_id}`}
                        alt="admin"
                      />
                      <div>
                        <strong>{tx.name}</strong>
                        <p>{tx.admin_name}</p>
                      </div>
                    </div>
                  </td>
                  <td>{tx.organisation_id}</td>
                  <td>{tx.location}</td>
                  <td>₹{tx.amount_due}</td>
                  <td>
                    <span className={`status-pill ${tx.status === "Completed" ? "available" : "absent"}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
