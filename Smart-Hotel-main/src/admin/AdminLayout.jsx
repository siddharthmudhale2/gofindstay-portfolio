// src/admin/AdminLayout.jsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <div style={{ flex: 1, padding: "24px", background: "#f6f6f6" }}>
        <Outlet />
      </div>
    </div>
  );
}
