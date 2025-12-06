import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomTypesManagement() {
  const [types, setTypes] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const [msg, setMsg] = useState("");

const fetchTypes = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/admin/room-types", {
    headers: { Authorization: `Bearer ${token}` }
  });
  console.log("Room types response:", res.data); // Add this line
  setTypes(Array.isArray(res.data) ? res.data : res.data.room_types || []);
};


  useEffect(() => { fetchTypes(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room type?")) return;
    const token = localStorage.getItem("token");
    await axios.delete(`/api/admin/room-types/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setMsg("Room type deleted.");
    fetchTypes();
  };

  const handleSave = async (data) => {
    const token = localStorage.getItem("token");
    if (data.id) {
      await axios.put(`/api/admin/room-types/${data.id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg("Room type updated.");
    } else {
      await axios.post("/api/admin/room-types", data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMsg("Room type added.");
    }
    setModal({ open: false, data: null });
    fetchTypes();
  };

  return (
    <div>
      <h2>Room Types</h2>
      <button onClick={() => setModal({ open: true, data: null })}>Add Room Type</button>
      {msg && <div style={{ color: "green" }}>{msg}</div>}
      <table>
        <thead>
          <tr>
            <th>Type</th><th>Total</th><th>Price</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map(t => (
            <tr key={t.id}>
              <td>{t.type}</td>
              <td>{t.total_rooms}</td>
              <td>{t.price}</td>
              <td>{t.description}</td>
              <td>
                <button onClick={() => setModal({ open: true, data: t })}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal.open && (
        <RoomTypeModal
          typeData={modal.data}
          onClose={() => setModal({ open: false, data: null })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function RoomTypeModal({ typeData, onClose, onSave }) {
  const [form, setForm] = useState(typeData || { type: "", total_rooms: "", price: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.type || !form.price) {
      setError("Type and price required.");
      return;
    }
    setError("");
    onSave(form);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 400, width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        <h3>{typeData ? "Edit Room Type" : "Add Room Type"}</h3>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
        <input name="total_rooms" placeholder="Total Rooms" value={form.total_rooms} onChange={handleChange} type="number" />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">{typeData ? "Save" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
