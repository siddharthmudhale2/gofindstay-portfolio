import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AssignRoom.css";

export default function AssignRoom() {
  // State variables
  const [houseKeepers, setHouseKeepers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedKeeper, setSelectedKeeper] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [assigningRoomId, setAssigningRoomId] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingKeepers, setLoadingKeepers] = useState(true);

  // Fetch housekeepers and rooms on mount
  useEffect(() => {
    // Fetch housekeepers with role 'Housekeeper'
    axios
      .get("/api/staff?role=Housekeeper")
      .then((res) => {
        const data = res.data;
        // Adjust based on your API response structure
        setHouseKeepers(Array.isArray(data) ? data : data.housekeepers || []);
      })
      .catch(() => setHouseKeepers([]))
      .finally(() => setLoadingKeepers(false));

    // Fetch rooms
    axios
      .get("/api/rooms")
      .then((res) => {
        const data = res.data;
        setRooms(Array.isArray(data) ? data : data.rooms || []);
      })
      .catch(() => setRooms([]))
      .finally(() => setLoadingRooms(false));
  }, []);

  // Filter rooms based on selected filters
  const filteredRooms = Array.isArray(rooms)
    ? rooms.filter((room) => {
        const typeMatch =
          !selectedRoomType || room.type.toLowerCase() === selectedRoomType;
        const statusMatch =
          !selectedStatus ||
          room.status.toLowerCase().replace(" ", "-") === selectedStatus;
        return typeMatch && statusMatch;
      })
    : [];

  // Assign housekeeper to room
  const handleAssign = async (roomId) => {
    if (!selectedKeeper) {
      setMessage("Please select a housekeeper before assigning.");
      return;
    }
    setAssigningRoomId(roomId);
    setMessage("");
    try {
      await axios.post("/api/housekeeping/assign-room", {
        room_id: roomId,
        staff_id: selectedKeeper,
        assigned_date: new Date().toISOString().slice(0, 10), // today
      });
      setMessage("Room assigned successfully!");
      // Optionally, refresh rooms or assignments here
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Failed to assign room. Please try again."
      );
    } finally {
      setAssigningRoomId(null);
    }
  };

  // Room type and status options
  const roomTypes = [
    { value: "", label: "All Types" },
    { value: "single", label: "Single Room" },
    { value: "double", label: "Double Room" },
    { value: "deluxe", label: "Deluxe Room" },
    { value: "suite", label: "Suite Room" },
  ];
  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "available", label: "Available" },
    { value: "assigned", label: "Assigned" },
    { value: "cleaning", label: "Cleaning" },
    { value: "dirty", label: "Dirty" },
    { value: "maintenance", label: "Maintenance" },
    { value: "ready", label: "Ready" },
    { value: "booked", label: "Booked" },
  ];

  return (
    <div className="assign-housekeeping-page">
      <div className="page-header">
        <h1>Assign House Keeping</h1>
      </div>

      <div className="filters-row">
        <div className="filter-item">
          <label>House Keeper</label>
          <select
            value={selectedKeeper}
            onChange={(e) => setSelectedKeeper(e.target.value)}
            disabled={loadingKeepers}
          >
            <option value="">Choose...</option>
            {houseKeepers.map((keeper) => (
              <option key={keeper.staff_id} value={keeper.staff_id}>
                {keeper.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Room Type</label>
          <select
            value={selectedRoomType}
            onChange={(e) => setSelectedRoomType(e.target.value)}
          >
            {roomTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div
          style={{
            margin: "1rem 0",
            color: message.toLowerCase().includes("success") ? "green" : "red",
          }}
        >
          {message}
        </div>
      )}

      {loadingRooms ? (
        <div>Loading rooms...</div>
      ) : filteredRooms.length === 0 ? (
        <div style={{ padding: "2rem", color: "#888" }}>
          No rooms found for the selected filters.
        </div>
      ) : (
        <div className="rooms-grid">
          {filteredRooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-number">Room No. {room.room_number}</div>
              <div className="room-type">Type: {room.type}</div>
              <div className={`room-status ${room.status.toLowerCase()}`}>
                Status: {room.status}
              </div>
              <button
                className="assign-btn"
                onClick={() => handleAssign(room.id)}
                disabled={assigningRoomId === room.id}
              >
                {assigningRoomId === room.id ? "Assigning..." : "Assign"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
