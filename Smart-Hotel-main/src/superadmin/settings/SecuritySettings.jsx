// File: /src/superadmin/settings/SecuritySettings.jsx
import React from "react";
import SuperAdminLayout from "../SuperAdminLayout";
import "../settings.css";

export default function SecuritySettings() {
  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <h2>Security Settings</h2>
        <form className="settings-form">
          <div className="form-group">
            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" />
          </div>
          <button className="btn-save" type="submit">Change Password</button>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
