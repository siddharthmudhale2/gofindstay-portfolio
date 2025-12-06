import React, { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";

const AssignmentModal = ({ staff, selectedRooms, rooms, onAssign, onClose }) => {
  const [selectedStaffId, setSelectedStaffId] = useState("");

  const handleAssign = () => {
    if (selectedStaffId && selectedRooms.length > 0) {
      onAssign(selectedStaffId, selectedRooms);
    }
  };

  const selectedRoomDetails = rooms.filter(room => selectedRooms.includes(room.id));

  return (
    <div className="modal-overlay">
      <div className="assignment-modal">
        <div className="modal-header">
          <h3>Assign Rooms to Staff</h3>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-content">
          <div className="selected-rooms-summary">
            <h4>Selected Rooms ({selectedRooms.length})</h4>
            <div className="room-list">
              {selectedRoomDetails.map(room => (
                <span key={room.id} className="room-tag">
                  {room.roomNumber}
                </span>
              ))}
            </div>
          </div>

          <div className="staff-selection">
            <h4>Select Staff Member</h4>
            <div className="staff-options">
              {staff.filter(s => s.isAvailable).map(member => (
                <div
                  key={member.id}
                  className={`staff-option ${selectedStaffId === member.id ? "selected" : ""}`}
                  onClick={() => setSelectedStaffId(member.id)}
                >
                  <div className="staff-details">
                    <span className="staff-name">{member.name}</span>
                    <span className="current-load">
                      Current Load: {member.assignedRooms || 0} rooms
                    </span>
                  </div>
                  {selectedStaffId === member.id && <FiCheck />}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="assign-btn"
            onClick={handleAssign}
            disabled={!selectedStaffId}
          >
            Assign Rooms
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentModal;
