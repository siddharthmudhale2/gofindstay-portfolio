// File: /src/superadmin/SuperAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminLayout from "./SuperAdminLayout";
import {
  FiUsers, FiDollarSign, FiShoppingCart, FiTrendingUp
} from "react-icons/fi";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import "./superadmin.css";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BaseURL}/superadmin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(({ data }) => {
      setStats(data?.summary || {});
      setChartData(Array.isArray(data?.monthly) ? data.monthly : []);
      setTopClients(data?.topClients || []);
    }).catch(err => {
      console.error("Stats fetch error:", err);
      setStats({});
      setChartData([]);
    });
  }, []);

  const summaryCards = [
    { title: "Total Clients", value: stats?.totalClients || 0, icon: <FiUsers /> },
    { title: "Total Revenue", value: `₹${stats?.totalRevenue || 0}`, icon: <FiDollarSign /> },
    { title: "New Bookings", value: stats?.newBookings || 0, icon: <FiShoppingCart /> },
    { title: "Growth", value: `${stats?.monthlyGrowth || 0}%`, icon: <FiTrendingUp /> },
  ];

  return (
    <SuperAdminLayout>
      <h2 className="sa-section-title">Overview</h2>

      <div className="stats-grid">
        {summaryCards.map((c, i) => (
          <div key={i} className="stat-card">
            <div className="icon-box">{c.icon}</div>
            <div>
              <p className="stat-value">{c.value}</p>
              <p className="stat-title">{c.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chart-section">
        <h3>Monthly Trends</h3>
        <div className="chart-box">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: "#888", textAlign: "center" }}>No chart data available</p>
          )}
        </div>
      </div>

      <div className="sa-section">
        <h3>Top Paying Clients</h3>
        <div className="top-clients-box">
          <table className="top-client-table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Total Bookings</th>
                <th>Total Revenue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {topClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-profile">
                      <img
                        src={client.avatar ? `${BaseURL}${client.avatar}` : `https://i.pravatar.cc/40?u=${client.id}`}
                        alt={client.name}
                      />
                      <div>
                        <strong>{client.name}</strong>
                        <p>{client.role}</p>
                      </div>
                    </div>
                  </td>
                  <td>{client.bookings}</td>
                  <td>₹{client.revenue.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/superadmin/client/${client.id}`)}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
