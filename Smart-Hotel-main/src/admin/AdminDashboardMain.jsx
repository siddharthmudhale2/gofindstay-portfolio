import React from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import "./AdminDashboardMain.css";

export default function AdminDashboardMain() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <AdminHeader />
        <Dashboard />
      </div>
    </div>
  );
}
