import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomStatus() {
  const [roomStatus, setRoomStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [message, setMessage] = useState("");

  const fetchStatus = async () => {
    if (!checkin || !checkout) {
      setMessage("Please select check-in and check-out dates.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.get("/api/room-status", {
        params: {
          checkin_date: checkin,
          checkout_date: checkout,
        },
      });
      setRoomStatus(res.data);
    } catch {
      setRoomStatus([]);
      setMessage("Failed to fetch room status.");
    }
    setLoading(false);
  };

  useEffect(() => {
    // Optionally, fetch for today's date by default
    // fetchStatus();
  }, []);

  return (
    <div>
      <h2>Room Type Status</h2>
      <div style={{ margin: "1rem 0" }}>
        <label>Check-in: </label>
        <input
          type="date"
          value={checkin}
          onChange={e => setCheckin(e.target.value)}
        />
        <label style={{ marginLeft: 16 }}>Check-out: </label>
        <input
          type="date"
          value={checkout}
          onChange={e => setCheckout(e.target.value)}
        />
        <button onClick={fetchStatus} style={{ marginLeft: 16 }}>
          Check Availability
        </button>
      </div>
      {message && <div style={{ color: "red", marginBottom: 8 }}>{message}</div>}
      {loading ? (
        <div>Loading room status...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Total Rooms</th>
              <th>Booked</th>
              <th>Available</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {roomStatus.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No data found.
                </td>
              </tr>
            ) : (
              roomStatus.map((room) => (
                <tr key={room.room_type}>
                  <td>{room.room_type}</td>
                  <td>{room.total_rooms}</td>
                  <td>{room.booked}</td>
                  <td>{room.available}</td>
                  <td>{room.price}</td>
                  <td>
                    <span
                      style={{
                        background: room.status === "Available" ? "#2ecc40" : "#e74c3c",
                        color: "#fff",
                        padding: "0.2rem 0.7rem",
                        borderRadius: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {room.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
