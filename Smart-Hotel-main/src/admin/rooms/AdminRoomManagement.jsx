import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminRoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [modal, setModal] = useState({ open: false, data: null });
  const [features, setFeatures] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all rooms
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/rooms", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRooms(Array.isArray(res.data) ? res.data : res.data.rooms || []);
    } catch (err) {
      toast.error("Failed to fetch rooms");
    }
    setLoading(false);
  };

  // Fetch all possible features
  const fetchFeatures = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/features", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeatures(Array.isArray(res.data) ? res.data : res.data.features || []);
    } catch (err) {
      toast.error("Failed to fetch features");
    }
  };

  // Fetch all room types
  const fetchRoomTypes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/room-types", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoomTypes(Array.isArray(res.data) ? res.data : res.data.room_types || []);
    } catch (err) {
      toast.error("Failed to fetch room types");
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchFeatures();
    fetchRoomTypes();
  }, []);

  // Delete room
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Room deleted.");
      fetchRooms();
    } catch (err) {
      toast.error("Failed to delete room.");
    }
  };

  // Edit room
  const handleEdit = async (room) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/admin/rooms/${room.id}/features`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const featureIds = Array.isArray(res.data) ? res.data.map(f => f.id) : [];
      setModal({ open: true, data: { ...room, features: featureIds } });
    } catch (err) {
      toast.error("Failed to fetch room features.");
    }
  };

  // Save room (add or update)
  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (data.id) {
        await axios.put(`/api/admin/rooms/${data.id}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Room updated.");
      } else {
        await axios.post("/api/admin/rooms", data, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Room added.");
      }
      setModal({ open: false, data: null });
      fetchRooms();
    } catch (err) {
      toast.error("Failed to save room.");
    }
  };

  return (
    <div>
      <h2>Room Management</h2>
      <button onClick={() => setModal({ open: true, data: null })}>Add Room</button>
      {loading && <div>Loading rooms...</div>}
      <table>
        <thead>
          <tr>
            <th>Room #</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Description</th>
            <th>Image</th>
            <th>Features</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.room_number}</td>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td>{room.status}</td>
              <td>{room.description}</td>
              <td>
                {room.image_url && (
                  <img src={room.image_url} alt="room" style={{ width: 50, borderRadius: 4 }} />
                )}
              </td>
              <td>
                <RoomFeatures roomId={room.id} />
              </td>
              <td>
                <button onClick={() => handleEdit(room)}>Edit</button>
                <button onClick={() => handleDelete(room.id)} style={{ color: "red" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal.open && (
        <RoomModal
          room={modal.data}
          onClose={() => setModal({ open: false, data: null })}
          onSave={handleSave}
          features={features}
          roomTypes={roomTypes}
        />
      )}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

// Show features for a room
function RoomFeatures({ roomId }) {
  const [features, setFeatures] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`/api/admin/rooms/${roomId}/features`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setFeatures(res.data));
  }, [roomId]);
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {features.map(f => <li key={f.id}>{f.name}</li>)}
    </ul>
  );
}

// Modal for add/edit room
function RoomModal({ room, onClose, onSave, features, roomTypes }) {
  const [form, setForm] = useState(
    room
      ? { ...room, features: Array.isArray(room.features) ? room.features : [] }
      : {
          room_number: "",
          type: "",
          price: "",
          status: "Available",
          description: "",
          image_url: "",
          features: []
        }
  );
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFeatureToggle = (featureId) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.room_number || !form.type || !form.price) {
      setError("Room number, type, and price are required.");
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
          background: "#fff", padding: 32, borderRadius: 8, minWidth: 320, maxWidth: 400, width: "100%",
          display: "flex", flexDirection: "column", gap: 12
        }}
      >
        <h3>{room && room.id ? "Edit Room" : "Add Room"}</h3>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <input name="room_number" placeholder="Room Number" value={form.room_number} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          {roomTypes.map(rt => (
            <option key={rt.id || rt.type} value={rt.type}>{rt.type}</option>
          ))}
        </select>
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} required type="number" />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />
        <div>
          <label>Features:</label>
          {features.map(f => (
            <label key={f.id} style={{ marginRight: 8 }}>
              <input
                type="checkbox"
                checked={Array.isArray(form.features) && form.features.includes(f.id)}
                onChange={() => handleFeatureToggle(f.id)}
              /> {f.name}
            </label>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">{room && room.id ? "Save" : "Add"}</button>
        </div>
      </form>
    </div>
  );
}
