import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import "./Checklist.css";

const initialData = [
  { id: "01", point: "Washing", type: "Laundry" },
  { id: "02", point: "Dry-Cleaning", type: "Laundry" },
  { id: "03", point: "Towels", type: "Laundry" },
  { id: "04", point: "Ironing", type: "Laundry" },
  { id: "05", point: "Floor Cleaning", type: "House Keeper" },
  { id: "06", point: "Sanitize the toilet", type: "House Keeper" },
  { id: "07", point: "Dustbins and replace", type: "House Keeper" },
  { id: "08", point: "Wipe down countertops", type: "House Keeper" },
];

const pageSizes = [5, 10, 25, 50];

export default function Checklist() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add" or "edit"
  const [form, setForm] = useState({ id: "", point: "", type: "" });

  // Filtered and paginated data
  const filtered = data.filter(
    row =>
      row.point.toLowerCase().includes(search.toLowerCase()) ||
      row.type.toLowerCase().includes(search.toLowerCase()) ||
      row.id.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / entries);
  const paginated = filtered.slice((page - 1) * entries, page * entries);

  // Modal handlers
  const openAddModal = () => {
    setModalType("add");
    setForm({ id: "", point: "", type: "" });
    setModalOpen(true);
  };
  const openEditModal = row => {
    setModalType("edit");
    setForm(row);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  // Add/Edit logic
  const handleFormChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = () => {
    if (!form.point || !form.type) return;
    if (modalType === "add") {
      const newId = (data.length + 1).toString().padStart(2, "0");
      setData([...data, { ...form, id: newId }]);
    } else {
      setData(data.map(item => (item.id === form.id ? form : item)));
    }
    setModalOpen(false);
  };

  // Delete logic
  const handleDelete = row => {
    if (window.confirm("Delete this checklist item?")) {
      setData(data.filter(item => item.id !== row.id));
    }
  };

  return (
    <div className="checklist-page">
      <div className="checklist-header">
        <h2>Housekeeping Checklist</h2>
        <button className="add-btn" onClick={openAddModal}>
          <FiPlus /> Add Checklist
        </button>
      </div>
      <div className="checklist-controls">
        <div>
          Show{" "}
          <select value={entries} onChange={e => { setEntries(Number(e.target.value)); setPage(1); }}>
            {pageSizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>{" "}
          entries
        </div>
        <div>
          Search:{" "}
          <input
            className="checklist-search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="checklist-table-container">
        <table className="checklist-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Check Point</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#aaa" }}>No entries found.</td>
              </tr>
            ) : paginated.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.point}</td>
                <td>{row.type}</td>
                <td>
                  <button className="checklist-action-btn edit" title="Edit" onClick={() => openEditModal(row)}>
                    <FiEdit />
                  </button>
                  <button className="checklist-action-btn delete" title="Delete" onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="checklist-footer">
        <div>
          Showing {(filtered.length === 0 ? 0 : (page - 1) * entries + 1)} to {Math.min(page * entries, filtered.length)} of {filtered.length} entries
        </div>
        <div className="checklist-pagination">
          <button
            className="checklist-pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            className="checklist-pagination-btn"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="checklist-modal-overlay">
          <div className="checklist-modal">
            <div className="modal-header">
              <h3>{modalType === "add" ? "Add Checklist" : "Edit Checklist"}</h3>
              <button className="close-btn" onClick={closeModal}><FiX /></button>
            </div>
            <div className="modal-form">
              <div className="form-group">
                <label>Check Point</label>
                <input
                  type="text"
                  name="point"
                  value={form.point}
                  onChange={handleFormChange}
                  placeholder="Enter check point"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={form.type} onChange={handleFormChange}>
                  <option value="">Choose...</option>
                  <option value="Laundry">Laundry</option>
                  <option value="House Keeper">House Keeper</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn close-btn" onClick={closeModal}>Close</button>
              <button className="btn update-btn" onClick={handleFormSubmit}>
                {modalType === "add" ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
