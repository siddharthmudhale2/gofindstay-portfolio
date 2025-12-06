import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

export default function StaffList() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, data: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/staff");
      setStaff(res.data);
    } catch {
      setStaff([]);
    }
    setLoading(false);
  };

  const handleDelete = async (staff_id) => {
    if (!window.confirm("Delete this staff member?")) return;
    await axios.delete(`/api/staff/${staff_id}`);
    setStaff((prev) => prev.filter((s) => s.staff_id !== staff_id));
    setMessage("Staff deleted.");
  };

  const handleSave = async (data) => {
    try {
      if (data.staff_id) {
        // Edit
        await axios.put(`/api/staff/${data.staff_id}`, data);
        setStaff((prev) => prev.map((s) => s.staff_id === data.staff_id ? data : s));
        setMessage("Staff updated.");
      } else {
        // Add
        await axios.post("/api/staff", data);
        fetchStaff();
        setMessage("Staff added.");
      }
      setModal({ open: false, data: null });
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to save staff.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Staff Management</h2>
        <button
          onClick={() => setModal({ open: true, data: null })}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#1976d2", color: "#fff", border: "none",
            borderRadius: 5, padding: "8px 16px", cursor: "pointer"
          }}
        >
          <FaUserPlus /> Add Staff
        </button>
      </div>
      {message && <div style={{ color: "green", marginBottom: 8 }}>{message}</div>}
      {loading ? (
        <div>Loading staff...</div>
      ) : (
        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.staff_id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.role}</td>
                <td>{s.status}</td>
                <td style={{ textAlign: "center" }}>
                  <span
                    title="Edit"
                    style={{ cursor: "pointer", color: "#1976d2", marginRight: 10, fontSize: "1.1em" }}
                    onClick={() => setModal({ open: true, data: s })}
                  >
                    <FaEdit />
                  </span>
                  <span
                    title="Delete"
                    style={{ cursor: "pointer", color: "#e74c3c", fontSize: "1.1em" }}
                    onClick={() => handleDelete(s.staff_id)}
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {modal.open && (
        <StaffModal
          staff={modal.data}
          onClose={() => setModal({ open: false, data: null })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// Modal for Add/Edit Staff
function StaffModal({ staff, onClose, onSave }) {
  const [form, setForm] = useState(
    staff || { name: "", email: "", phone: "", role: "", status: "active" }
  );
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) {
      setError("Name, Email, and Role are required.");
      return;
    }
    setError("");
    onSave(form);
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 8,
          minWidth: 320,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }}
      >
        <h3 style={{ margin: 0 }}>{staff ? "Edit Staff" : "Add Staff"}</h3>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label>Phone:</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label>Role:</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="">Select Role</option>
            <option>Housekeeping</option>
            <option>Reception</option>
            <option>Manager</option>
            <option>Other</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label>Status:</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ padding: "8px 16px" }}>Cancel</button>
          <button type="submit" style={{ background: "#1976d2", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 5 }}>
            {staff ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
