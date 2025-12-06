// File: /src/superadmin/settings/GeneralSettings.jsx
import React from "react";
import SuperAdminLayout from "../SuperAdminLayout";
import "../settings.css";

export default function GeneralSettings() {
  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <h2>General Settings</h2>
        <form className="settings-form">
          <div className="form-group">
            <label>System Name</label>
            <input type="text" placeholder="Smart Hotel Management" />
          </div>
          <div className="form-group">
            <label>System Description</label>
            <textarea placeholder="Platform for smart hotel operations." />
          </div>
          <div className="form-group">
            <label>Time Zone</label>
            <select>
              <option>Asia/Kolkata</option>
              <option>GMT</option>
              <option>UTC</option>
            </select>
          </div>
          <button className="btn-save" type="submit">Save Changes</button>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
