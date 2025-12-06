// File: /src/superadmin/PlatformSettings.jsx
import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import "./settings.css";

export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <SuperAdminLayout>
      <div className="settings-container">
        <div className="tabs">
          <button className={activeTab === "general" ? "active" : ""} onClick={() => setActiveTab("general")}>General</button>
          <button className={activeTab === "payment" ? "active" : ""} onClick={() => setActiveTab("payment")}>Payment</button>
          <button className={activeTab === "invoice" ? "active" : ""} onClick={() => setActiveTab("invoice")}>Invoice</button>
          <button className={activeTab === "members" ? "active" : ""} onClick={() => setActiveTab("members")}>Members</button>
          <button className={activeTab === "security" ? "active" : ""} onClick={() => setActiveTab("security")}>Security</button>
        </div>

        <div className="tab-panel">
          {activeTab === "general" && (
            <div className="settings-form">
              <h3>General Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>System Name</label>
                  <input type="text" placeholder="Smart Hotel System" />
                </div>
                <div className="form-group">
                  <label>System Version</label>
                  <input type="text" placeholder="v1.0.0" />
                </div>
                <div className="form-group">
                  <label>Maintenance Mode</label>
                  <select>
                    <option value="false">Off</option>
                    <option value="true">On</option>
                  </select>
                </div>
              </div>
              <button className="btn-save">Save</button>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="settings-form">
              <h3>Payment Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>UPI ID</label>
                  <input type="text" placeholder="example@upi" />
                </div>
                <div className="form-group">
                  <label>Payment Gateway</label>
                  <input type="text" placeholder="Stripe / Razorpay" />
                </div>
              </div>
              <button className="btn-save">Save</button>
            </div>
          )}

          {activeTab === "invoice" && (
            <div className="settings-form">
              <h3>Invoice Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Invoice Prefix</label>
                  <input type="text" placeholder="INV-" />
                </div>
                <div className="form-group full">
                  <label>Invoice Footer</label>
                  <textarea placeholder="Thank you for staying with us!" />
                </div>
              </div>
              <button className="btn-save">Save</button>
            </div>
          )}

          {activeTab === "members" && (
            <div className="settings-form">
              <h3>Manage Members</h3>
              <div className="form-grid">
                <div className="form-group full">
                  <label>Invite Member by Email</label>
                  <input type="email" placeholder="user@example.com" />
                </div>
              </div>
              <button className="btn-save">Send Invite</button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-form">
              <h3>Security Settings</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" />
                </div>
              </div>
              <button className="btn-save">Update Password</button>
            </div>
          )}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
