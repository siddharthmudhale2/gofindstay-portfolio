// src/pages/BookingSuccess.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5003/api/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch booking details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Booking Confirmed!</h2>
      <p>Your room has been booked successfully.</p>

      {booking && (
        <div className="card mt-4 p-3">
          <h4>Booking Details:</h4>
          <p><strong>Room Type:</strong> {booking.room_type}</p>
          <p><strong>Check-in:</strong> {booking.checkin_date}</p>
          <p><strong>Check-out:</strong> {booking.checkout_date}</p>
          <p><strong>Total Price:</strong> ₹{booking.price}</p>

          <a
            href={`http://localhost:5003/api/invoice/${bookingId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-3"
          >
            Download Invoice
          </a>
        </div>
      )}
    </div>
  );
};

export default BookingSuccess;
