import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiShoppingCart,
} from "react-icons/fi";
import "./AdminDashboardMain.css"; // ✅ updated stylesheet

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalAmount: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [todaysBookings, setTodaysBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchAll = async () => {
      try {
        const [statsRes, monthlyRes, todayRes] = await Promise.all([
          axios.get(`${BaseURL}/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BaseURL}/admin/monthly-bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BaseURL}/admin/todays-bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const statsData = statsRes.data;
        setStats({
          totalBookings: statsData.totalBookings || 0,
          totalRevenue: statsData.totalRevenue || 0,
          totalUsers: statsData.totalUsers || 0,
          totalAmount: statsData.totalRevenue || 0,
        });

        setMonthlyData(monthlyRes.data || []);
        setTodaysBookings(todayRes.data || []);
      } catch (err) {
        console.error("Dashboard API error:", err);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-cards">
        <div className="admin-card">
          <FiShoppingCart className="admin-card-icon" />
          <div>
            <h5>Today Bookings</h5>
            <p>{stats.totalBookings}</p>
          </div>
        </div>
        <div className="admin-card">
          <FiDollarSign className="admin-card-icon" />
          <div>
            <h5>Total Amount</h5>
            <p>{stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>
        <div className="admin-card">
          <FiUsers className="admin-card-icon" />
          <div>
            <h5>Total Customers</h5>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
        <div className="admin-card">
          <FiTrendingUp className="admin-card-icon" />
          <div>
            <h5>Total Revenue</h5>
            <p>{stats.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>📈 Monthly Booking Trends</h3>
        <div className="admin-chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalBookings"
                stroke="#b83260"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="admin-section">
        <h3>📋 Today's Bookings</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {todaysBookings.length > 0 ? (
                todaysBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.guest_name}</td>
                    <td>{b.room_type}</td>
                    <td>{b.checkin_date}</td>
                    <td>{b.checkout_date}</td>
                    <td>{b.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No bookings today.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
