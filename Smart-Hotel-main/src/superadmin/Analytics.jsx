// File: /src/superadmin/Analytics.jsx
import React, { useEffect, useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from "recharts";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import "./superadmin.css";

const COLORS = ["#4f46e5", "#16a34a", "#dc2626", "#facc15", "#6366f1"];

export default function Analytics() {
  const [bookingsTrend, setBookingsTrend] = useState([]);
  const [revenueBar, setRevenueBar] = useState([]);
  const [paymentDistribution, setPaymentDistribution] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${BaseURL}/superadmin/analytics`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setBookingsTrend(res.data.bookingsTrend || []);
      setRevenueBar(res.data.revenueBar || []);
      setPaymentDistribution(res.data.paymentDistribution || []);
    }).catch(err => {
      console.error("Failed to fetch analytics data:", err);
    });
  }, []);

  return (
    <SuperAdminLayout>
      <div className="sa-section">
        <h2 className="sa-section-title">Analytics Overview</h2>

        {/* Booking Trend */}
        <div className="chart-box">
          <h4>Monthly Booking Trends</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#4f46e5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Hotel */}
        <div className="chart-box" style={{ marginTop: "2rem" }}>
          <h4>Top Hotel Revenue</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueBar}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hotel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#16a34a" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Distribution */}
        <div className="chart-box" style={{ marginTop: "2rem" }}>
          <h4>Payment Method Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {paymentDistribution.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SuperAdminLayout>
  );
}
