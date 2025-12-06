import React, { useState, useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";

const Order = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [hasCurrentBooking, setHasCurrentBooking] = useState(false);
  const [loading, setLoading] = useState(true);

  // Card style and hover effect functions
  const cardStyle = {
    background: "#f9f9f9",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "left",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  };

  useEffect(() => {
    console.log(currentBooking);
  }, [currentBooking]);

  // Fetch user details and bookings
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        console.log("Yes 2");

        // Get user info (assumes authentication token is sent automatically via cookies or headers)
        const userRes = await axios.get(`${BaseURL}/user/verify`, {
          withCredentials: true,
        });
        const user = userRes.data.user; // e.g. { id: 123, ... }

        // Fetch all bookings
        const bookingsRes = await axios.get(
          `${BaseURL}/dashboard/bookings/all`,
          { withCredentials: true }
        );
        const allBookings = bookingsRes.data.data; // Array of booking objects

        // Filter bookings to only those belonging to the current user (guest)
        const userBookings = allBookings.filter(
          (booking) => booking.guest_id === user.id
        );

        // Separate current and previous bookings based on checkout_date
        const today = new Date();
        // A booking is considered current if its checkout date is today or in the future and its status is "confirmed"
        const current = userBookings.find(
          (booking) =>
            new Date(booking.checkout_date) >= today &&
            booking.bstatus === "pending"
        );
        const previous = userBookings.filter(
          (booking) => new Date(booking.checkout_date) < today
        );

        setCurrentBooking(current || null);
        setHasCurrentBooking(!!current);
        setPreviousBookings(previous);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, []);

  // Popup functions
  const handleShowPopup = (bookingId) => {
    let booking;
    if (bookingId === "current") {
      booking = currentBooking;
    } else {
      booking = previousBookings.find(
        (b) => b.id.toString() === bookingId.toString()
      );
    }
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const handleHidePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  // Handle cancel booking (update local state for demonstration)
  const handleCancelBooking = () => {
    // In a real scenario, call a cancellation API endpoint here.
    setCurrentBooking(null);
    setHasCurrentBooking(false);
    handleHidePopup();
  };

  // Handle Escape key to close popup
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleHidePopup();
      }
    };

    if (showPopup) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPopup]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #86591a, #e4cc51)",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        margin: 0,
      }}
    >
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <>
          {/* Current Bookings Section */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "150px",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#333" }}>
              Current Bookings
            </h2>
            {hasCurrentBooking && currentBooking ? (
              <div
                style={cardStyle}
                onClick={() => handleShowPopup("current")}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <p style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}>
                  <strong>Booking ID:</strong> {currentBooking.id}
                </p>
                <p style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}>
                  <strong>Room Type:</strong> {currentBooking.roomType || "N/A"}
                </p>
                <p style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}>
                  <strong>Check-in:</strong>{" "}
                  {new Date(currentBooking.checkin_date).toLocaleDateString()}
                </p>
                <p style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}>
                  <strong>Check-out:</strong>{" "}
                  {new Date(currentBooking.checkout_date).toLocaleDateString()}
                </p>
                <p style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}>
                  <strong>Total Price:</strong> ₹{currentBooking.price}
                </p>
              </div>
            ) : (
              <p style={{ fontSize: "16px", color: "#444" }}>
                No current bookings
              </p>
            )}
          </div>

          {/* Previous Bookings Section */}
          <div
            style={{
              background: "#fff",
              padding: "25px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              width: "100%",
              maxWidth: "1200px",
              textAlign: "center",
            }}
          >
            <h2 style={{ marginBottom: "15px", color: "#333" }}>
              Previous Bookings
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
                width: "100%",
              }}
            >
              {previousBookings.length > 0 ? (
                previousBookings.map((booking) => (
                  <div
                    key={booking.id}
                    style={cardStyle}
                    onClick={() => handleShowPopup(booking.id)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#444",
                        margin: "6px 0",
                      }}
                    >
                      <strong>Booking ID:</strong> {booking.id}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#444",
                        margin: "6px 0",
                      }}
                    >
                      <strong>Room Type:</strong> {booking.roomType || "N/A"}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#444",
                        margin: "6px 0",
                      }}
                    >
                      <strong>Check-in:</strong>{" "}
                      {new Date(booking.checkin_date).toLocaleDateString()}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#444",
                        margin: "6px 0",
                      }}
                    >
                      <strong>Check-out:</strong>{" "}
                      {new Date(booking.checkout_date).toLocaleDateString()}
                    </p>
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#444",
                        margin: "6px 0",
                      }}
                    >
                      <strong>Total Price:</strong> ₹{booking.price}
                    </p>
                  </div>
                ))
              ) : (
                <p>No previous bookings found.</p>
              )}
            </div>
          </div>

          {/* Popup Box */}
          {showPopup && selectedBooking && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "#fff",
                  padding: "25px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  width: "90%",
                  maxWidth: "400px",
                  textAlign: "left",
                  zIndex: 1000,
                }}
              >
                <h2 style={{ marginBottom: "15px", color: "#333" }}>
                  Booking Details
                </h2>
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    textAlign: "left",
                    marginBottom: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ color: "#444", marginBottom: "8px" }}>
                    Room Information
                  </h3>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Booking ID:</strong> {selectedBooking.id}
                  </p>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Room Type:</strong>{" "}
                    {selectedBooking.roomType || "N/A"}
                  </p>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Check-in:</strong>{" "}
                    {new Date(
                      selectedBooking.checkin_date
                    ).toLocaleDateString()}
                  </p>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Check-out:</strong>{" "}
                    {new Date(
                      selectedBooking.checkout_date
                    ).toLocaleDateString()}
                  </p>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          selectedBooking.bstatus === "confirmed"
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedBooking.bstatus}
                    </span>
                  </p>
                </div>
                <div
                  style={{
                    background: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "8px",
                    textAlign: "left",
                    marginBottom: "10px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 style={{ color: "#444", marginBottom: "8px" }}>
                    Pricing Details
                  </h3>
                  <p
                    style={{ fontSize: "16px", color: "#444", margin: "6px 0" }}
                  >
                    <strong>Total Price:</strong> ₹{selectedBooking.price}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <button
                    onClick={handleHidePopup}
                    style={{
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      cursor: "pointer",
                      background: "#3498db",
                      color: "white",
                    }}
                  >
                    Close
                  </button>
                  {selectedBooking.id === currentBooking?.id && (
                    <button
                      onClick={handleCancelBooking}
                      style={{
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        fontSize: "14px",
                        cursor: "pointer",
                        background: "#e74c3c",
                        color: "white",
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
              {/* Overlay */}
              <div
                onClick={handleHidePopup}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
