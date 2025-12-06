import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import SuperAdminLayout from "./SuperAdminLayout";
import "./superadmin.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function ClientProfile() {
  const { organisation_id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios
      .get(`${BaseURL}/superadmin/organizations/${organisation_id}`)
      .then((res) => setClient(res.data))
      .catch((err) => console.error("Failed to fetch client details", err));
  }, [organisation_id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${BaseURL}/superadmin/clients/${organisation_id}`);
      alert("Client account deleted successfully.");
      navigate("/superadmin/clients");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete client.");
    }
  };

  if (!client) return <SuperAdminLayout><div>Loading...</div></SuperAdminLayout>;

  return (
    <SuperAdminLayout>
      <div className="client-profile-container">
        <h2 className="section-title">Client Profile</h2>

        <div className="profile-header">
          <img
            src={
              client.admin_photo_url
                ? `${BaseURL}${client.admin_photo_url}`
                : `https://i.pravatar.cc/150?u=${client.organisation_id}`
            }
            alt="Profile"
            className="profile-avatar-lg"
          />
          <div className="profile-info-main">
            <h3>{client.admin_name}</h3>
            <p className="client-subtitle">Admin | Org ID: {client.organisation_id}</p>
            <p>{client.name}, {client.location}</p>
            <div className="info-box">
              <p><strong>Phone:</strong> {client.admin_phone}</p>
              <p><strong>Email:</strong> {client.admin_email}</p>
            </div>
            <div className="button-group">
              <button
                className="btn-edit"
                onClick={() => navigate(`/superadmin/edit-client/${client.organisation_id}`)}
              >
                <FiEdit /> Edit
              </button>
              <button className="btn-delete" onClick={() => setShowConfirm(true)}>
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        </div>

        {showConfirm && (
          <div className="overlay">
            <div className="modal-box">
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this client account?</p>
              <div className="popup-buttons">
                <button onClick={handleDelete} className="btn-confirm-delete">Yes, Delete</button>
                <button onClick={() => setShowConfirm(false)} className="btn-cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div className="profile-sections">
          <div className="profile-card">
            <div className="profile-card-header">
              <h4>Personal Information</h4>
            </div>
            <div className="info-row"><strong>Secondary Email:</strong> {client.secondary_email || "-"}</div>
            <div className="info-row"><strong>Alternate Phone:</strong> {client.alt_phone || "-"}</div>
            <div className="info-row"><strong>Nationality:</strong> {client.nationality || "-"}</div>
            <div className="info-row"><strong>Date of Birth:</strong> {client.dob ? client.dob.split("T")[0] : "-"}</div>
          </div>

          <div className="profile-card">
            <div className="profile-card-header">
              <h4>Bank Information</h4>
            </div>
            <div className="info-row"><strong>Bank Name:</strong> {client.bank_name || "-"}</div>
            <div className="info-row"><strong>Account No:</strong> {client.bank_account_no || "-"}</div>
            <div className="info-row"><strong>IFSC Code:</strong> {client.bank_ifsc || "-"}</div>
          </div>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
