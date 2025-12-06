import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeaturesManagement() {
  const [features, setFeatures] = useState([]);
  const [featureName, setFeatureName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/admin/features", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeatures(Array.isArray(res.data) ? res.data : res.data.features || []);
    } catch (err) {
      toast.error("Failed to fetch features");
    }
    setLoading(false);
  };

  useEffect(() => { fetchFeatures(); }, []);

  const handleAdd = async () => {
    if (!featureName.trim()) {
      toast.warn("Feature name cannot be empty.");
      return;
    }
    if (features.some(f => f.name.toLowerCase() === featureName.trim().toLowerCase())) {
      toast.info("Feature already exists.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/admin/features", { name: featureName.trim() }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Feature added.");
      setFeatureName("");
      fetchFeatures();
    } catch (err) {
      toast.error("Failed to add feature.");
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete feature "${name}"?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/features/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Feature deleted.");
      fetchFeatures();
    } catch (err) {
      toast.error("Failed to delete feature.");
    }
  };

  return (
    <div>
      <h2>Room Features</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          value={featureName}
          onChange={e => setFeatureName(e.target.value)}
          placeholder="New Feature"
          onKeyDown={e => e.key === "Enter" && handleAdd()}
        />
        <button onClick={handleAdd} style={{ marginLeft: 8 }}>Add</button>
      </div>
      {loading && <div>Loading features...</div>}
      <ul>
        {features.map(f => (
          <li key={f.id} style={{ marginBottom: 8 }}>
            {f.name}
            <button
              onClick={() => handleDelete(f.id, f.name)}
              style={{ marginLeft: 12, color: "#fff", background: "#d11a2a", border: "none", borderRadius: 4, cursor: "pointer", padding: "2px 8px" }}
              title={`Delete "${f.name}"`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
