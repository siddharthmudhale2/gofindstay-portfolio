import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RoomCheckout() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutId, setCheckoutId] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch eligible bookings for checkout
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/room-checkout")
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(() => setBookings([]));
  }, []);

  // Perform checkout
  const handleCheckout = async (booking_id) => {
    if (!window.confirm("Are you sure you want to checkout this room?")) return;
    setCheckoutId(booking_id);
    try {
      await axios.patch(`/api/room-checkout/${booking_id}/checkout`);
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_id === booking_id ? { ...b, status: "checked-out" } : b
        )
      );
      setMessage("Room checked out successfully.");
    } catch {
      setMessage("Failed to checkout room.");
    }
    setCheckoutId(null);
  };

  return (
    <div>
      <h2>Room Checkout</h2>
      {message && <div style={{ color: "green" }}>{message}</div>}
      {loading ? (
        <div>Loading bookings...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center" }}>
                  No rooms to checkout.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <tr key={b.booking_id}>
                  <td>{b.booking_id}</td>
                  <td>{b.guest_name}</td>
                  <td>{b.room_type}</td>
                  <td>{b.checkin_date}</td>
                  <td>{b.checkout_date}</td>
                  <td>{b.status}</td>
                  <td>{b.price}</td>
                  <td>
                    <button
                      onClick={() => handleCheckout(b.booking_id)}
                      disabled={checkoutId === b.booking_id || b.status === "checked-out"}
                      style={{
                        background: "#2980b9",
                        color: "#fff",
                        border: "none",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "4px",
                        cursor: b.status === "checked-out" ? "not-allowed" : "pointer"
                      }}
                    >
                      {checkoutId === b.booking_id ? "Processing..." : "Checkout"}
                    </button>
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
