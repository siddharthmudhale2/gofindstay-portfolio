import React from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminHeader from "./SuperAdminHeader";
import "./superadmin.css";

const SuperAdminLayout = ({ children }) => {
  return (
    <div className="sa-container">
      <SuperAdminSidebar />
      <div className="sa-main">
        <SuperAdminHeader />
        <div className="sa-content">{children}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
