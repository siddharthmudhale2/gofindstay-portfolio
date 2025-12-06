// src/pages/RoomBooking.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RoomBooking = () => {
  const [bookingData, setBookingData] = useState({ /* form fields */ });
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5003/api/bookings",
        bookingData,
        { withCredentials: true } // <-- Add this line
      );
      const id = res.data.bookingId;
      navigate(`/booking-success/${id}`);
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };


  return (
    <div className="room-booking-page">
      {/* Booking form UI here */}
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default RoomBooking;
