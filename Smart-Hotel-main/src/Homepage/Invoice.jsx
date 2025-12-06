import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
  
  const location = useLocation();
  const bookingId = location.state?.bookingId;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (!bookingId) return;
    axios
      .get(`http://localhost:5000/api/invoice/${bookingId}`)
      .then(res => setInvoice(res.data))
      .catch(console.error);
  }, [bookingId]);

  if (!invoice) return <p>Loading invoice…</p>;

  return (
    <div className="invoice">
      <h2>Invoice for Booking #{invoice.id}</h2>
      <p><strong>User:</strong> {invoice.userName} ({invoice.email})</p>
      <p><strong>Hotel:</strong> {invoice.hotelName} – {invoice.location}</p>
      <p><strong>Date:</strong> {new Date(invoice.date).toLocaleString()}</p>
      <p><strong>Amount Paid:</strong> ₹{invoice.amount}</p>
      {/* you can add a Print button or PDF download here */}
    </div>
  );
};

export default Invoice;
