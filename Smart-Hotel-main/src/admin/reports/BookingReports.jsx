import React, { useEffect, useState } from "react";
import axios from "axios";
import { exportToCSV } from "../../utils/exportToCSV";

export default function BookingReports() {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/admin/reports/bookings", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setReports(res.data));
  }, []);
  return (
    <div>
      <h2>Booking Reports</h2>
      <button onClick={() => exportToCSV(reports, "booking_reports.csv")}>
        Export CSV
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Guest</th><th>Room #</th><th>Type</th>
            <th>Check-in</th><th>Check-out</th><th>Price</th>
            <th>Payment</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.guest_name}</td>
              <td>{r.room_number}</td>
              <td>{r.room_type}</td>
              <td>{r.checkin_date}</td>
              <td>{r.checkout_date}</td>
              <td>{r.price}</td>
              <td>{r.payment_method}</td>
              <td>{new Date(r.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
