import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaFileInvoice } from "react-icons/fa";

// Helper to format date for input[type="date"]
function toDateInputValue(dateStr) {
  if (!dateStr) return "";
  return dateStr.split("T")[0];
}

// Modal for modifying booking
const ModifyBookingModal = ({ booking, onClose, onSave }) => {
  const roomTypes = ["Single Room", "Double Room", "Suite Room", "Deluxe Room"];
  const [formData, setFormData] = useState({
    checkin_date: toDateInputValue(booking.checkin_date),
    checkout_date: toDateInputValue(booking.checkout_date),
    room_type: booking.room_type,
    adults: booking.adults,
    children: booking.children,
    rooms: booking.rooms,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...booking,
      ...formData,
      booking_id: booking.booking_id
    });
  };

  return (
    <div className="modal-overlay" style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.3)", display: "flex",
      alignItems: "center", justifyContent: "center", zIndex: 9999
    }}>
      <div className="modify-booking-modal" style={{
        background: "#fff", padding: 32, borderRadius: 8, minWidth: 350, maxWidth: 400, width: "100%",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)"
      }}>
        <h3>Modify Booking #{booking.booking_id}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Check-in Date:</label>
            <input
              type="date"
              name="checkin_date"
              value={formData.checkin_date}
              onChange={e => setFormData({ ...formData, checkin_date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-out Date:</label>
            <input
              type="date"
              name="checkout_date"
              value={formData.checkout_date}
              min={formData.checkin_date}
              onChange={e => setFormData({ ...formData, checkout_date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Room Type:</label>
            <select
              name="room_type"
              value={formData.room_type}
              onChange={e => setFormData({ ...formData, room_type: e.target.value })}
              required
            >
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Adults:</label>
            <input
              type="number"
              name="adults"
              min="1"
              value={formData.adults}
              onChange={e => setFormData({ ...formData, adults: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Children:</label>
            <input
              type="number"
              name="children"
              min="0"
              value={formData.children}
              onChange={e => setFormData({ ...formData, children: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Rooms:</label>
            <input
              type="number"
              name="rooms"
              min="1"
              value={formData.rooms}
              onChange={e => setFormData({ ...formData, rooms: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" style={{ background: "#2980b9", color: "#fff" }}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function RoomList() {
  const [bookings, setBookings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("checkin_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [editBooking, setEditBooking] = useState(null);
  const [message, setMessage] = useState("");
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/bookinglist")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setBookings([]));
  }, []);

  useEffect(() => {
    let data = bookings;
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (b) =>
          (b.guest_name && b.guest_name.toLowerCase().includes(q)) ||
          (b.room_type && b.room_type.toLowerCase().includes(q)) ||
          (getBookingStatus(b).toLowerCase().includes(q))
      );
    }
    data = [...data].sort((a, b) => {
      if (sortKey === "checkin_date" || sortKey === "checkout_date") {
        return sortOrder === "asc"
          ? new Date(a[sortKey]) - new Date(b[sortKey])
          : new Date(b[sortKey]) - new Date(a[sortKey]);
      }
      if (sortKey === "room_type") {
        return sortOrder === "asc"
          ? a.room_type.localeCompare(b.room_type)
          : b.room_type.localeCompare(a.room_type);
      }
      return 0;
    });
    setFiltered(data);
    setPage(1);
  }, [bookings, search, sortKey, sortOrder]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = async (booking_id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    setDeleteId(booking_id);
    try {
      await axios.delete(`/api/bookinglist/${booking_id}`);
      setBookings((prev) => prev.filter((b) => b.booking_id !== booking_id));
      setMessage("Booking deleted.");
    } catch {
      setMessage("Failed to delete booking.");
    }
    setDeleteId(null);
  };

  const handleEdit = (booking) => setEditBooking(booking);

  const handleEditSave = async (updatedBooking) => {
    try {
      // Only send the fields the backend expects
      const payload = {
        checkin_date: updatedBooking.checkin_date,
        checkout_date: updatedBooking.checkout_date,
        room_type: updatedBooking.room_type,
        adults: Number(updatedBooking.adults),
        children: Number(updatedBooking.children),
        rooms: Number(updatedBooking.rooms)
      };
      const res = await axios.put(`/api/bookinglist/${updatedBooking.booking_id}`, payload);
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === updatedBooking.booking_id ? res.data : b
        )
      );
      setMessage("Booking updated.");
      setEditBooking(null);
    } catch (err) {
      setMessage("Failed to modify booking.");
    }
  };

  const handleInvoice = async (booking_id) => {
    setInvoiceId(booking_id);
    try {
      const res = await axios.get(`/api/bookinglist/${booking_id}/invoice`, {
        responseType: "blob",
      });
      if (res.data.type !== "application/pdf" && res.headers["content-type"] !== "application/pdf") {
        setMessage("Invoice not available or invalid.");
        setInvoiceId(null);
        return;
      }
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      window.open(url, "_blank");
      setMessage("Invoice opened.");
    } catch {
      setMessage("Failed to generate invoice.");
    }
    setInvoiceId(null);
  };

  function getBookingStatus(b) {
    const today = new Date().toISOString().split("T")[0];
    if (today < b.checkin_date) return "Upcoming";
    if (today > b.checkout_date) return "Completed";
    return "Ongoing";
  }

  return (
    <div>
      <h2>Booking List</h2>
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Search by guest, room, status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem", width: "250px" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Sort by: </label>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
          <option value="checkin_date">Check-in Date</option>
          <option value="checkout_date">Check-out Date</option>
          <option value="room_type">Room Type</option>
        </select>
        <button
          onClick={() => setSortOrder((o) => (o === "asc" ? "desc" : "asc"))}
          style={{ marginLeft: "10px" }}
        >
          {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>
      {message && (
        <div style={{ color: message.includes("deleted") ? "red" : "green" }}>
          {message}
        </div>
      )}
      {loading ? (
        <div>Loading bookings...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="booking-table" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room Type</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    No bookings found.
                  </td>
                </tr>
              ) : (
                paged.map((b) => (
                  <tr key={b.booking_id}>
                    <td>{b.booking_id}</td>
                    <td>{b.guest_name}</td>
                    <td>{b.room_type}</td>
                    <td>{toDateInputValue(b.checkin_date)}</td>
                    <td>{toDateInputValue(b.checkout_date)}</td>
                    <td>{getBookingStatus(b)}</td>
                    <td>{b.price}</td>
                    <td>
                      <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <span
                          title="Edit/Modify"
                          style={{ cursor: "pointer", color: "#2980b9" }}
                          onClick={() => handleEdit(b)}
                        >
                          <FaEdit />
                        </span>
                        <span
                          title="Delete"
                          style={{ cursor: "pointer", color: "#e74c3c" }}
                          onClick={() => handleDelete(b.booking_id)}
                        >
                          {deleteId === b.booking_id ? "..." : <FaTrash />}
                        </span>
                        <span
                          title="Generate Invoice"
                          style={{ cursor: "pointer", color: "#27ae60" }}
                          onClick={() => handleInvoice(b.booking_id)}
                        >
                          {invoiceId === b.booking_id ? "..." : <FaFileInvoice />}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls: right-aligned */}
      <div style={{
        margin: "1rem 0",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        justifyContent: "flex-end"
      }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next
        </button>
      </div>

      {/* Modify Booking Modal */}
      {editBooking && (
        <ModifyBookingModal
          booking={editBooking}
          onClose={() => setEditBooking(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
