import React from "react";

const RoomGrid = ({ rooms, selectedRooms, onRoomSelection }) => {
  const getStatusColor = (status) => {
    const colors = {
      ready: "#10b981",
      dirty: "#ef4444", 
      occupied: "#f59e0b",
      maintenance: "#8b5cf6"
    };
    return colors[status] || "#6b7280";
  };

  return (
    <div className="room-grid">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`room-card ${selectedRooms.includes(room.id) ? "selected" : ""}`}
          onClick={() => onRoomSelection(room.id)}
        >
          <div className="room-number">Room No. {room.roomNumber}</div>
          <div 
            className="room-status"
            style={{ color: getStatusColor(room.status) }}
          >
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </div>
          {room.assignedTo && (
            <div className="assigned-staff">
              Assigned to: {room.assignedTo}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomGrid;
