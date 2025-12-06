// File: /src/superadmin/settings/MembersSettings.jsx
import React from "react";
import SuperAdminLayout from "../SuperAdminLayout";
import "../settings.css";

export default function MembersSettings() {
  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <h2>Platform Members</h2>
        <form className="settings-form">
          <div className="form-group">
            <label>Invite Admin by Email</label>
            <input type="email" placeholder="admin@example.com" />
          </div>
          <div className="form-group">
            <label>Select Role</label>
            <select>
              <option>Admin</option>
              <option>Staff</option>
            </select>
          </div>
          <button className="btn-save" type="submit">Send Invite</button>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
