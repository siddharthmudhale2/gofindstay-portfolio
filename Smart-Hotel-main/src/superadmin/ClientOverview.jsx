import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import { useParams } from "react-router-dom";
import "./superadmin.css";

export default function ClientOverview() {
  const { organisation_id } = useParams();
  const [overview, setOverview] = useState(null);

  useEffect(() => {
    axios
      .get(`${BaseURL}/superadmin/organizations/${organisation_id}/overview`)
      .then((res) => setOverview(res.data))
      .catch((err) => console.error("Failed to fetch overview", err));
  }, [organisation_id]);

  if (!overview) return <div>Loading...</div>;

  return (
    <div className="overview-container">
      <h2 className="section-title">Overview - {overview.name}</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-box">💵</div>
          <div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">₹{overview.total_revenue}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box">📦</div>
          <div>
            <div className="stat-title">Bookings</div>
            <div className="stat-value">{overview.booking_count}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box">👤</div>
          <div>
            <div className="stat-title">Clients</div>
            <div className="stat-value">{overview.user_count}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-box">📈</div>
          <div>
            <div className="stat-title">Growth</div>
            <div className="stat-value">{overview.growth_percentage}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
