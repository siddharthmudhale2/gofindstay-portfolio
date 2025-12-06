import React, { useState } from "react";
import "./RoomFilterSidebar.css"; // We'll add some styles below

const amenitiesList = ["WiFi", "TV", "AC", "Mini Bar"];
const roomTypes = ["Single", "Double", "Suite", "Deluxe"];
const locations = ["Bangalore", "Mysore", "Hubli"];

const RoomFilterSidebar = ({ filters, setFilters }) => {
  // Collapsible sections
  const [openSections, setOpenSections] = useState({
    price: true,
    roomType: true,
    amenities: true,
    location: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handlers
  const handleCheckbox = (category, value) => {
    setFilters((prev) => {
      const arr = prev[category];
      return {
        ...prev,
        [category]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: { ...prev.price, [e.target.name]: e.target.value },
    }));
  };

  const handleRatingChange = (e) => {
    setFilters((prev) => ({ ...prev, rating: Number(e.target.value) }));
  };

  const handleAvailabilityChange = (e) => {
    setFilters((prev) => ({ ...prev, availability: e.target.value }));
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filter Rooms</h3>

      {/* Price */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("price")}>
          Price {openSections.price ? "▲" : "▼"}
        </div>
        {openSections.price && (
          <div className="filter-body">
            <input
              type="number"
              name="min"
              placeholder="Min"
              value={filters.price.min}
              onChange={handlePriceChange}
              style={{ width: 70, marginRight: 8 }}
            />
            <input
              type="number"
              name="max"
              placeholder="Max"
              value={filters.price.max}
              onChange={handlePriceChange}
              style={{ width: 70 }}
            />
          </div>
        )}
      </div>

      {/* Room Type */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("roomType")}>
          Room Type {openSections.roomType ? "▲" : "▼"}
        </div>
        {openSections.roomType && (
          <div className="filter-body">
            {roomTypes.map((type) => (
              <label key={type} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.roomType.includes(type)}
                  onChange={() => handleCheckbox("roomType", type)}
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("amenities")}>
          Amenities {openSections.amenities ? "▲" : "▼"}
        </div>
        {openSections.amenities && (
          <div className="filter-body">
            {amenitiesList.map((amenity) => (
              <label key={amenity} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => handleCheckbox("amenities", amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("location")}>
          Location {openSections.location ? "▲" : "▼"}
        </div>
        {openSections.location && (
          <div className="filter-body">
            {locations.map((loc) => (
              <label key={loc} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.location.includes(loc)}
                  onChange={() => handleCheckbox("location", loc)}
                />
                {loc}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("rating")}>
          Minimum Rating {openSections.rating ? "▲" : "▼"}
        </div>
        {openSections.rating && (
          <div className="filter-body">
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={filters.rating}
              onChange={handleRatingChange}
              style={{ width: "100%" }}
            />
            <span>{filters.rating} ⭐</span>
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="filter-section">
        <div className="filter-header" onClick={() => toggleSection("availability")}>
          Availability {openSections.availability ? "▲" : "▼"}
        </div>
        {openSections.availability && (
          <div className="filter-body">
            <select
              value={filters.availability}
              onChange={handleAvailabilityChange}
              style={{ width: "100%" }}
            >
              <option value="">All</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RoomFilterSidebar;
