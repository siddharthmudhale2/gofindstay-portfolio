// File: /src/pages/HotelRooms.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../BaseURL";
import "./HotelRooms.css";

const HotelRooms = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BaseURL}/superadmin/organizations`)
      .then((res) => {
        const hotelList = res.data.map((org) => ({
          organisation_id: org.organisation_id,
          name: org.hotel_name || org.name || "Unknown Hotel",
          location: org.location || "Unknown Location",
          image: org.admin_photo_url || "https://via.placeholder.com/400x250?text=Hotel+Image",
        }));
        setHotels(hotelList);
      })
      .catch((err) => console.error("Hotel fetch error:", err));
  }, []);

  return (
    <div className="hotel-cards-container">
      <h2 className="text-center">Explore Our Hotels</h2>
      <div className="hotel-card-grid">
        {hotels.map((hotel) => (
          <div
            className="hotel-card"
            key={hotel.organisation_id}
            onClick={() => navigate(`/rooms/${hotel.organisation_id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="hotel-img-container">
              <img
                src={hotel.image}
                alt="hotel"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/400x250?text=Hotel")
                }
              />
              <div className="featured-badge">Featured</div>
            </div>
            <div className="hotel-info">
              <h3>{hotel.name}</h3>
              <div className="hotel-location">
                <i className="fas fa-map-marker-alt"></i> {hotel.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hotels.length === 0 && (
        <p className="text-center mt-5">No hotels found for this client.</p>
      )}
    </div>
  );
};

export default HotelRooms;
