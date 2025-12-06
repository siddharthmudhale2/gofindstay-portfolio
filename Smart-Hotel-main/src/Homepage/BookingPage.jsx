// src/Homepage/BookingPage.jsx
import React, { useState } from "react";
import BookingForm from "./BookingForm";
import BookingConfirmationModal from "./BookingConfirmationModal";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [bookingId, setBookingId] = useState(null);
  const navigate = useNavigate();

  const handleBookingSuccess = (id) => {
    setBookingId(id);
  };

  const handleCloseModal = () => {
    setBookingId(null);
    // Optionally redirect to another page
    navigate("/"); // or to a bookings list, etc.
  };

  return (
    <div>
      <BookingForm onBookingSuccess={handleBookingSuccess} />
      <BookingConfirmationModal bookingId={bookingId} onClose={handleCloseModal} />
    </div>
  );
};

export default BookingPage;
