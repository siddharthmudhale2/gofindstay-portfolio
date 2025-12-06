// File: /src/superadmin/settings/InvoiceSettings.jsx
import React from "react";
import SuperAdminLayout from "../SuperAdminLayout";
import "../settings.css";

export default function InvoiceSettings() {
  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <h2>Invoice Settings</h2>
        <form className="settings-form">
          <div className="form-group">
            <label>Invoice Prefix</label>
            <input type="text" placeholder="INV-" />
          </div>
          <div className="form-group">
            <label>Invoice Footer Note</label>
            <textarea placeholder="Thank you for booking with us!" />
          </div>
          <div className="form-group">
            <label>Include GST Number?</label>
            <select>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <button className="btn-save" type="submit">Update</button>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
