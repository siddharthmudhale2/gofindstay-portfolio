// File: /src/superadmin/ClientManagement.jsx
import React, { useEffect, useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import "./superadmin.css";

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BaseURL}/superadmin/organizations`)
      .then((res) => setClients(res.data))
      .catch((err) => console.error("Failed to load clients", err));
  }, []);

  return (
    <SuperAdminLayout>
  <div className="client-header-container">
    <h2 className="client-header-title">Client Organizations</h2>
    <button
      className="btn-add-client"
      onClick={() => navigate("/superadmin/add-client")}
    >
      + Add New Client
    </button>
  </div>

      <div className="client-card-grid">
        {clients.map((client) => (
          <div key={client.organisation_id} className="client-card">
            <img
              src={
                client.admin_photo_url
                  ? `${BaseURL}${client.admin_photo_url}`
                  : `https://i.pravatar.cc/150?u=${client.organisation_id}`
              }
              alt="profile"
              className="client-avatar"
            />
            <div className="client-details">
              <h3>{client.name}</h3>
              <p className="client-role">{client.admin_name}</p>
              <p>{client.location}</p>
              <button
                className="btn-view"
                onClick={() =>
                  navigate(`/superadmin/client/${client.organisation_id}`)
                }
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </SuperAdminLayout>
  );
}
