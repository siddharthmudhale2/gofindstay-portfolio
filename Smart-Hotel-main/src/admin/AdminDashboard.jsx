import React from "react";
//import Sidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import Dashboard from "./Dashboard";
import "./AdminDashboardMain.css";

export default function AdminDashboard() {
  return (
    <div className="admin-container">
      {/* <Sidebar /> */}
      <div className="admin-main">
        <AdminHeader />
        <Dashboard />
      </div>
    </div>
  );
}
