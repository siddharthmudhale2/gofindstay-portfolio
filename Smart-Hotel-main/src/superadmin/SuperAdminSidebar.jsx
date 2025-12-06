// File: /src/superadmin/SuperAdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../superadmin/superadmin.css";

export default function SuperAdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sa-sidebar" style={{ background: "#fef5f7", color: "#333" }}>
      <div className="logo">GoFindStay</div>


      <div className="sa-menu-section">DASHBOARD</div>
      <Link
        to="/superadmin"
        className={`sa-menu-item ${isActive("/superadmin") ? "active" : ""}`}
      >
        Overview
      </Link>

      <div className="sa-menu-section">MANAGE</div>
      <Link
        to="/superadmin/clients"
        className={`sa-menu-item ${isActive("/superadmin/clients") ? "active" : ""}`}
      >
        Clients
      </Link>
      <Link
        to="/superadmin/analytics"
        className={`sa-menu-item ${isActive("/superadmin/analytics") ? "active" : ""}`}
      >
        Analytics
      </Link>
      <Link
        to="/superadmin/settings"
        className={`sa-menu-item ${isActive("/superadmin/settings") ? "active" : ""}`}
      >
        Platform Settings
      </Link>

        <Link
  to="/superadmin/transactions"
  className={`sa-menu-item ${isActive("/superadmin/transactions") ? "active" : ""}`}
>
  Transactions
</Link>
    </aside>
  );
}
