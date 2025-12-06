// File: /src/superadmin/settings/PaymentSettings.jsx
import React from "react";
import SuperAdminLayout from "../SuperAdminLayout";
import "../settings.css";

export default function PaymentSettings() {
  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <h2>Payment Settings</h2>
        <form className="settings-form">
          <div className="form-group">
            <label>Default UPI ID</label>
            <input type="text" placeholder="hotel@upi" />
          </div>
          <div className="form-group">
            <label>Payment Gateway</label>
            <select>
              <option>Razorpay</option>
              <option>Stripe</option>
              <option>Paytm</option>
            </select>
          </div>
          <div className="form-group">
            <label>Transaction Fee (%)</label>
            <input type="number" placeholder="2" />
          </div>
          <button className="btn-save" type="submit">Save Settings</button>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
