import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const roomData = [
  { id: 1, name: "Deluxe Room", price: 150, roomType: "Deluxe", amenities: ["WiFi", "TV", "AC"], availability: true, location: "Bangalore", rating: 4.2 },
  { id: 2, name: "Single Room", price: 80, roomType: "Single", amenities: ["WiFi"], availability: false, location: "Mysore", rating: 3.8 },
  { id: 3, name: "Suite Room", price: 250, roomType: "Suite", amenities: ["WiFi", "TV", "AC", "Mini Bar"], availability: true, location: "Bangalore", rating: 4.8 },
  { id: 4, name: "Double Room", price: 120, roomType: "Double", amenities: ["WiFi", "TV"], availability: true, location: "Hubli", rating: 4.0 },
];

const RoomDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = roomData.find(r => r.id === parseInt(id));

  if (!room) return <p style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>Room not found</p>;

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px" }}>{room.name}</h2>
      <p><strong>Price:</strong> ₹{room.price}</p>
      <p><strong>Type:</strong> {room.roomType}</p>
      <p><strong>Location:</strong> {room.location}</p>
      <p><strong>Rating:</strong> ⭐ {room.rating}</p>
      <p><strong>Status:</strong> {room.availability ? "Available" : "Unavailable"}</p>
      <p><strong>Amenities:</strong> {room.amenities.join(", ")}</p>

      <button
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
        onClick={() => navigate(-1)}
      >
        Book Now
      </button>
    </div>
  );
};

export default RoomDetailPage;
