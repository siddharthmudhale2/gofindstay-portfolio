import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import RoomFilterSidebar from "./RoomFilterSidebar"; // Adjust path if needed
import "./RoomListingPage.css";

// Sample room data (replace with your actual data or fetch from API)
const roomData = [
  { id: 1, name: "Deluxe Room", price: 3000, roomType: "Deluxe", amenities: ["WiFi", "TV", "AC"], availability: true, location: "Bangalore", rating: 4.2 },
  { id: 2, name: "Single Room", price: 1000, roomType: "Single", amenities: ["WiFi,AC,TV"], availability: false, location: "Mysore", rating: 3.8 },
  { id: 3, name: "Suite Room", price: 2000, roomType: "Suite", amenities: ["WiFi", "TV", "AC", "Mini Bar"], availability: true, location: "Bangalore", rating: 4.8 },
  { id: 4, name: "Double Room", price: 1500, roomType: "Double", amenities: ["WiFi", "TV"], availability: true, location: "Hubli", rating: 4.0 },
];

const defaultFilters = {
  price: { min: "", max: "" },
  roomType: [],
  amenities: [],
  location: [],
  rating: 0,
  availability: "",
};

const RoomListingPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const navigate = useNavigate();

  const filteredRooms = useMemo(() => {
    return roomData.filter((room) => {
      if (filters.price.min && room.price < Number(filters.price.min)) return false;
      if (filters.price.max && room.price > Number(filters.price.max)) return false;
      if (filters.roomType.length && !filters.roomType.includes(room.roomType)) return false;
      if (filters.amenities.length && !filters.amenities.every(a => room.amenities.includes(a))) return false;
      if (filters.location.length && !filters.location.includes(room.location)) return false;
      if (filters.rating && room.rating < filters.rating) return false;
      if (filters.availability !== "" && String(room.availability) !== filters.availability) return false;
      return true;
    });
  }, [filters]);

  // Go to booking page with room id
  const handleBookNow = (roomId) => {
    navigate(`/booking/${roomId}`);
  };

  return (
    <div className="room-listing-root">
      <div className="hotel-heading">
        <h1>HOTEL</h1>
      </div>
      <div className="filter-rooms-heading">
        <h2>Filter Rooms</h2>
      </div>
      <div className="room-listing-content">
        <RoomFilterSidebar filters={filters} setFilters={setFilters} />
        <main className="room-cards-main">
          {filteredRooms.length === 0 ? (
            <p className="no-rooms">No rooms match your filters.</p>
          ) : (
            <div className="room-cards-list">
              {filteredRooms.map((room) => (
                <div className="room-card" key={room.id}>
                  <h3>{room.name}</h3>
                  <div className="room-price">
                    ₹{room.price} <span>/ night</span>
                  </div>
                  <div>Type: <b>{room.roomType}</b></div>
                  <div>Location: <b>{room.location}</b></div>
                  <div>
                    Amenities: <span className="room-amenities">{room.amenities.join(", ")}</span>
                  </div>
                  <div>
                    Rating: <span className="room-rating">⭐ {room.rating}</span>
                  </div>
                  <div>
                    Availability:{" "}
                    <span className={room.availability ? "avail-yes" : "avail-no"}>
                      {room.availability ? "Available" : "Unavailable"}
                    </span>
                  </div>
                  <button
                    className="book-now-btn"
                    onClick={() => handleBookNow(room.id)}
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default RoomListingPage;
