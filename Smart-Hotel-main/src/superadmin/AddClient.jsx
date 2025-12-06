import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import { useNavigate, useParams } from "react-router-dom";
import "./addClient.css";
import SuperAdminLayout from "./SuperAdminLayout";

export default function AddClientForm() {
  const navigate = useNavigate();
  const { organisation_id } = useParams();
  const isEdit = !!organisation_id;

  const [formData, setFormData] = useState({
    organisation_id: "",  // ✅ manually entered
    name: "",
    location: "",
    admin_name: "",
    admin_email: "",
    admin_phone: "",
    dob: "",
    secondary_email: "",
    alternate_phone: "",
    nationality: "",
    bank_account_no: "",
    bank_ifsc: "",
    bank_name: "",
    photo: null,
    admin_photo_url: "",
  });

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`${BaseURL}/superadmin/organizations/${organisation_id}`)
        .then((res) => {
          const org = res.data;
          setFormData((prev) => ({
            ...prev,
            ...org,
            organisation_id: org.organisation_id,
            photo: null,
          }));
        })
        .catch((err) => console.error("Failed to load org:", err));
    }
  }, [organisation_id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "admin_photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      for (let key in formData) {
        if (["photo", "admin_photo_url"].includes(key)) continue;
        form.append(key, formData[key]);
      }

      if (formData.photo) {
        form.append("admin_photo", formData.photo);
      }

      if (isEdit) {
        await axios.put(`${BaseURL}/superadmin/clients/update/${organisation_id}`, form);
        alert("Client updated successfully!");
      } else {
        await axios.post(`${BaseURL}/superadmin/clients/add`, form);
        alert("Client added successfully!");
      }

      navigate("/superadmin/clients");
    } catch (err) {
      console.error("Form submit failed:", err);
      alert("Error saving client.");
    }
  };

  return (
    <SuperAdminLayout>
      <div className="add-client-form">
        <h2>{isEdit ? "Edit Client & Admin" : "Add New Client & Admin"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            {!isEdit && (
              <div className="form-group">
                <label>Organization ID</label>
                <input
                  type="text"
                  name="organisation_id"
                  value={formData.organisation_id}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {isEdit && (
              <div className="form-group">
                <label>Organization ID</label>
                <input
                  type="text"
                  name="organisation_id"
                  value={formData.organisation_id}
                  disabled
                />
              </div>
            )}

            <div className="form-group">
              <label>Hotel/Organization Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Admin Name</label>
              <input type="text" name="admin_name" value={formData.admin_name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" name="admin_email" value={formData.admin_email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Admin Phone</label>
              <input type="text" name="admin_phone" value={formData.admin_phone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Secondary Email</label>
              <input type="email" name="secondary_email" value={formData.secondary_email || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Alternate Phone</label>
              <input type="text" name="alternate_phone" value={formData.alternate_phone || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Nationality</label>
              <input type="text" name="nationality" value={formData.nationality || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Profile Photo</label>
              <input type="file" name="admin_photo" onChange={handleChange} />
              {isEdit && formData.admin_photo_url && (
                <img
                  src={BaseURL + formData.admin_photo_url}
                  alt="Admin"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", marginTop: "5px" }}
                />
              )}
            </div>
          </div>

          <h4 style={{ marginTop: "20px", color: "#333" }}>Bank Details</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Account Number</label>
              <input type="text" name="bank_account_no" value={formData.bank_account_no || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>IFSC Code</label>
              <input type="text" name="bank_ifsc" value={formData.bank_ifsc || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" name="bank_name" value={formData.bank_name || ""} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate("/superadmin/clients")}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">{isEdit ? "Save Changes" : "Submit"}</button>
          </div>
        </form>
      </div>
    </SuperAdminLayout>
  );
}
