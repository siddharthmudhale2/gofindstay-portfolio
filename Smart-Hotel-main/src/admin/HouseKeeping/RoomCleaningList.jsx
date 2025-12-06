import React, { useState } from "react";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import "./RoomCleaningList.css";

const cleaningData = [
  { id: "01", emp: "Jone", room: "B-1202", date: "22/01/2024", status: "Under Process" },
  { id: "02", emp: "Meeta", room: "C-1202", date: "21/01/2024", status: "Under Process" },
  { id: "03", emp: "Joshef", room: "D-1202", date: "22/01/2024", status: "Under Process" },
  { id: "04", emp: "Roj", room: "E-1202", date: "19/01/2024", status: "Under Process" },
  { id: "05", emp: "Jone", room: "H-1101", date: "18/01/2024", status: "Under Process" },
  { id: "06", emp: "Risha", room: "G-1108", date: "18/01/2024", status: "Under Process" },
  { id: "07", emp: "Roma", room: "K-1308", date: "05/03/2024", status: "Under Process" },
  { id: "08", emp: "Lina", room: "L-1408", date: "08/03/2024", status: "Under Process" },
  { id: "09", emp: "Micky", room: "L-1405", date: "08/03/2024", status: "Under Process" },
];

const houseKeepers = ["Jone", "Meeta", "Joshef", "Roj", "Risha", "Roma", "Lina", "Micky"];
const pageSizes = [5, 10, 25, 50];

export default function RoomCleaningList() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [formData, setFormData] = useState({
    roomNo: "",
    assignTo: "",
    date: "",
    status: "Under Process"
  });

  // Filtered and paginated data
  const filtered = cleaningData.filter(row =>
    row.emp.toLowerCase().includes(search.toLowerCase()) ||
    row.room.toLowerCase().includes(search.toLowerCase()) ||
    row.date.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / entries);
  const paginated = filtered.slice((page - 1) * entries, page * entries);

  // Open edit modal and populate data
  const handleEdit = (row) => {
    setCurrentEdit(row);
    setFormData({
      roomNo: row.room,
      assignTo: row.emp,
      date: row.date.split('/').reverse().join('-'), // Convert to YYYY-MM-DD
      status: row.status
    });
    setEditModalOpen(true);
  };

  // Handle delete action
  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ID: ${row.id}?`)) {
      alert(`Deleted ID: ${row.id}`);
      // Implement actual delete logic here
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated data
  const handleUpdate = () => {
    console.log("Updated Data:", formData);
    // Here you would typically make an API call to update the record
    setEditModalOpen(false);
  };

  return (
    <div className="room-cleaning-list-page">
      <h2>Room Cleaning List</h2>
      <div className="rcl-controls">
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
            className="rcl-search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by Emp, Room, Date..."
          />
        </div>
      </div>
      <div className="rcl-table-container">
        <table className="rcl-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Emp Name</th>
              <th>Room Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#aaa" }}>No entries found.</td>
              </tr>
            ) : paginated.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.emp}</td>
                <td>{row.room}</td>
                <td>{row.date}</td>
                <td>
                  <span className="rcl-status">{row.status}</span>
                </td>
                <td>
                  <button className="rcl-action-btn edit" title="Edit" onClick={() => handleEdit(row)}>
                    <FiEdit />
                  </button>
                  <button className="rcl-action-btn delete" title="Delete" onClick={() => handleDelete(row)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rcl-footer">
        <div>
          Showing {(filtered.length === 0 ? 0 : (page - 1) * entries + 1)} to {Math.min(page * entries, filtered.length)} of {filtered.length} entries
        </div>
        <div className="rcl-pagination">
          <button
            className="rcl-pagination-btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            className="rcl-pagination-btn"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">
              <h3>Edit Room Cleaning</h3>
              <button className="close-btn" onClick={() => setEditModalOpen(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label>Room No</label>
                <input 
                  type="text" 
                  name="roomNo"
                  value={formData.roomNo} 
                  readOnly
                />
              </div>
              
              <div className="form-group">
                <label>Assign To</label>
                <select 
                  name="assignTo"
                  value={formData.assignTo} 
                  onChange={handleChange}
                >
                  {houseKeepers.map(keeper => (
                    <option key={keeper} value={keeper}>{keeper}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date} 
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="status"
                  value={formData.status} 
                  onChange={handleChange}
                >
                  <option value="Under Process">Under Process</option>
                  <option value="Ready">Ready</option>
                </select>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn close-btn" onClick={() => setEditModalOpen(false)}>
                Close
              </button>
              <button className="btn update-btn" onClick={handleUpdate}>
                Update Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
