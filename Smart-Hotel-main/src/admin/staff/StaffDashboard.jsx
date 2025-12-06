import { useState, useEffect } from "react";
import slider1 from "../../assets/img/slider-1.jpg";
import profile from "../../assets/img/profile.jpeg";
import { BaseURL } from "../../BaseURL";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("Rooms");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({});

  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [guests, setGuests] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await axios.get(
          `${BaseURL}/dashboard/bookings/all`
        );
        setBookings(bookingsResponse.data.data);

        const roomsResponse = await axios.get(`${BaseURL}/dashboard/rooms/all`);
        setRooms(roomsResponse.data.data);

        const guestsResponse = await axios.get(
          `${BaseURL}/dashboard/guests/all`
        );
        setGuests(guestsResponse.data.data);

        const staffResponse = await axios.get(`${BaseURL}/dashboard/staff/all`);
        setStaffMembers(staffResponse.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [isSubmitting]);

  const tabs = ["Rooms", "Bookings", "Guests", "Logout"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to open modal with specific type and data
  const openModal = (type, data = {}) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setModalData({});
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent another submission while already submitting
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {};

    // Get all form values
    const formElements = e.target.elements;
    for (let i = 0; i < formElements.length; i++) {
      const element = formElements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }

    try {
      let response;
      // Determine which endpoint to hit based on modalType
      switch (modalType) {
        case "room":
          if (modalData.id) {
            // Update existing room
            response = await axios.put(
              `${BaseURL}/dashboard/rooms/${modalData.id}`,
              formData
            );
          } else {
            // Add new room
            response = await axios.post(
              `${BaseURL}/dashboard/rooms/add`,
              formData
            );
          }
          break;

        case "booking":
          if (modalData.id) {
            // Update existing booking
            response = await axios.put(
              `${BaseURL}/dashboard/bookings/${modalData.id}`,
              formData
            );
          } else {
            // Add new booking
            response = await axios.post(
              `${BaseURL}/dashboard/bookings/add`,
              formData
            );
          }
          break;

        case "guest":
          // Ensure the user role is set for guests
          formData.urole = "guest";
          if (modalData.id) {
            // Update existing guest
            response = await axios.put(
              `${BaseURL}/dashboard/users/${modalData.id}`,
              formData
            );
          } else {
            // Add new guest
            response = await axios.post(
              `${BaseURL}/dashboard/users/add`,
              formData
            );
          }
          break;

        case "staff":
          // Ensure the user role is set for staff
          formData.urole = "staff";
          if (modalData.id) {
            // Update existing staff member
            response = await axios.put(
              `${BaseURL}/dashboard/users/${modalData.id}`,
              formData
            );
          } else {
            // Add new staff member
            response = await axios.post(
              `${BaseURL}/dashboard/users/add`,
              formData
            );
          }
          break;

        default:
          break;
      }

      toast.success(
        `${modalData.id ? "Updated" : "Added"} ${modalType} successfully!`
      );
      closeModal();

      // Optionally, update local state based on response if needed
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle deletion
  const handleDelete = (type, id) => {
    switch (type) {
      case "room":
        setRooms(rooms.filter((room) => room.id !== id));
        break;
      case "booking":
        setBookings(bookings.filter((booking) => booking.id !== id));
        break;
      case "guest":
        setGuests(guests.filter((guest) => guest.id !== id));
        break;
      case "staff":
        setStaffMembers(staffMembers.filter((staff) => staff.id !== id));
        break;
      default:
        break;
    }
    alert(`Deleted ${type} with ID: ${id}`);
  };

  // Modal component
  const Modal = () => {
    if (!showModal) return null;

    let formFields = [];

    switch (modalType) {
      case "room":
        formFields = [
          {
            name: "id",
            label: "Room ID",
            type: "number",
            value: modalData.id || "",
          },
          {
            name: "type",
            label: "Room Type",
            type: "text",
            value: modalData.type || "",
          },
          {
            name: "available",
            label: "Availability",
            type: "text",
            value: modalData.available || "Yes",
          },
        ];
        break;
      case "booking":
        formFields = [
          {
            name: "id",
            label: "Booking ID",
            type: "number",
            value: modalData.id || "",
          },
          {
            name: "name",
            label: "Guest Name",
            type: "text",
            value: modalData.name || "",
          },
          {
            name: "checkIn",
            label: "Check-in Date",
            type: "date",
            value: modalData.checkIn || "",
          },
          {
            name: "checkOut",
            label: "Check-out Date",
            type: "date",
            value: modalData.checkOut || "",
          },
          {
            name: "type",
            label: "Room Type",
            type: "text",
            value: modalData.type || "",
          },
        ];
        break;
      case "guest":
        formFields = [
          {
            name: "id",
            label: "Guest ID",
            type: "number",
            value: modalData.id || "",
          },
          {
            name: "roomId",
            label: "Room ID",
            type: "number",
            value: modalData.roomId || "",
          },
          {
            name: "name",
            label: "Name",
            type: "text",
            value: modalData.name || "",
          },
          {
            name: "preferences",
            label: "Preferences",
            type: "text",
            value: modalData.preferences || "",
          },
        ];
        break;
      case "staff":
        formFields = [
          {
            name: "id",
            label: "Staff ID",
            type: "number",
            value: modalData.id || "",
            readOnly: !!modalData.id,
          },
          {
            name: "uname",
            label: "Name",
            type: "text",
            value: modalData.uname || "",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            value: modalData.email || "",
          },
          {
            name: "phone_number",
            label: "Phone Number",
            type: "text",
            value: modalData.phone_number || "",
          },
          {
            name: "dob",
            label: "Date of Birth",
            type: "date",
            value: modalData.dob || "",
          },
        ];
        break;
      default:
        break;
    }

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 10,
            width: "400px",
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h3>
            {modalData.id ? `Update ${modalType}` : `Add New ${modalType}`}
          </h3>
          <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
              <div key={field.name} style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5 }}>
                  {field.label}:
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  defaultValue={field.value}
                  readOnly={field.readOnly}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: 5,
                    border: "1px solid #ddd",
                    backgroundColor: field.readOnly ? "#f0f0f0" : "white",
                  }}
                  required
                />
              </div>
            ))}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 20,
              }}
            >
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: 5,
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Rooms":
        return (
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3>Rooms Management</h3>
                <p>
                  Manage hotel rooms, availability, and maintenance schedules
                  here.
                </p>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 20,
              }}
            >
              <thead>
                <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Room ID
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Type
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Availability
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: 10 }}>{room.id}</td>
                    <td style={{ padding: 10 }}>{room.rtype}</td>
                    <td style={{ padding: 10 }}>{room.rstatus}</td>
                    <td style={{ padding: 10 }}>
                      <button
                        onClick={() => handleDelete("room", room.id)}
                        style={{
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: 5,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Bookings":
        return (
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3>Bookings Management</h3>
                <p>
                  View and manage all current and upcoming guest reservations.
                </p>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 20,
              }}
            >
              <thead>
                <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    User ID
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Booking Statys
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Check-in Date
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Check-out Date
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Price
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td style={{ padding: 10 }}>{booking.guestid}</td>
                    <td style={{ padding: 10 }}>{booking.bstatus}</td>
                    <td style={{ padding: 10 }}>{booking.checkin_date}</td>
                    <td style={{ padding: 10 }}>{booking.checkout_date}</td>
                    <td style={{ padding: 10 }}>{booking.price}</td>
                    <td style={{ padding: 10 }}>
                      <button
                        onClick={() => handleDelete("booking", booking.id)}
                        style={{
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: 5,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "Guests":
        return (
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3>Guest Information</h3>
                <p>Access guest profiles, preferences, and history.</p>
              </div>
            </div>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 20,
              }}
            >
              <thead>
                <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Guest ID
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Guest Name
                  </th>

                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Guest Email
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Customer Since
                  </th>
                  <th style={{ padding: 10, borderBottom: "2px solid #ddd" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: 10 }}>{guest.id}</td>
                    <td style={{ padding: 10 }}>{guest.uname}</td>
                    <td style={{ padding: 10 }}>{guest.email}</td>
                    <td style={{ padding: 10 }}>{guest.created_at}</td>
                    <td style={{ padding: 10 }}>
                      <button
                        onClick={() => openModal("guest", guest)}
                        style={{
                          background: "#007bff",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: 5,
                          cursor: "pointer",
                          marginRight: 5,
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete("guest", guest.id)}
                        style={{
                          background: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: 5,
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Logout":
        return (
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 10,
              marginTop: 20,
            }}
          >
            <h3>Logging Out</h3>
            <p>Are you sure you want to log out?</p>
            <button
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "8px 15px",
                borderRadius: 5,
                cursor: "pointer",
                marginTop: 10,
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Confirm Logout
            </button>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: `url(${slider1}) no-repeat center center fixed`,
        backgroundSize: "cover",
        fontFamily: "Poppins, sans-serif",
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {isSubmitting && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        style={{
          width: 250,
          background: "#f5f5f6",
          color: "#0c0c0c",
          height: "100vh",
          padding: 20,
          position: "fixed",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>Hotel Admin</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tabs.map((tab, index) => (
            <li
              key={index}
              style={{
                padding: "15px 10px",
                background: activeTab === tab ? "#e0e0e0" : "transparent",
                borderRadius: 5,
                marginBottom: 5,
                cursor: "pointer",
              }}
              onClick={() => handleTabClick(tab)}
            >
              <div
                style={{
                  color: "#111",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <i
                  className={`fas fa-${tab.toLowerCase().replace(" ", "-")}`}
                  style={{ width: 30 }}
                ></i>{" "}
                {tab}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Main Content */}
      <div
        style={{ marginLeft: 250, padding: 20, width: "calc(100% - 250px)" }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "white",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <h2>{activeTab}</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={profile || "/placeholder.svg"}
              alt="Admin"
              style={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                marginRight: 10,
              }}
            />
            <span>Admin</span>
          </div>
        </header>

        {renderTabContent()}
      </div>

      {/* Modal for updates and additions */}
      <Modal />
      <ToastContainer />
    </div>
  );
};

export default StaffDashboard;
