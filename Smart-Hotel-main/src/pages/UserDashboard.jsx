import { useState, useEffect } from "react";
import slider1 from "../assets/img/slider-1.jpg";
import profile from "../assets/img/profile.jpeg";
import { useNavigate } from "react-router-dom";
import './UserDashboard.css';
import Cookies from "js-cookie";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBookings, getFavorites, getProfile } from "../utils/api";
import { MdEdit, MdDelete, MdReceipt } from "react-icons/md";

// --- Wishlist API helpers ---
const BaseURL = "http://localhost:5003/api/v1";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};
const addToFavorites = async (hotelId) => {
  await axios.post(`${BaseURL}/user/favorites/${hotelId}`, {}, { headers: getAuthHeader() });
};
const removeFromFavorites = async (hotelId) => {
  await axios.delete(`${BaseURL}/user/favorites/${hotelId}`, { headers: getAuthHeader() });
};

// Helper for date input value
function toDateInputValue(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Modal for modifying booking
const ModifyBookingModal = ({ booking, onClose, onSave }) => {
  const roomTypes = ["Single Room", "Double Room", "Suite Room", "Deluxe Room"];
  const [formData, setFormData] = useState({
    checkin_date: toDateInputValue(booking.checkin_date),
    checkout_date: toDateInputValue(booking.checkout_date),
    room_type: booking.room_type,
    adults: booking.adults,
    children: booking.children,
    rooms: booking.rooms
  });

  const isCheckinDisabled = new Date(booking.checkin_date) < new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!roomTypes.includes(formData.room_type)) {
      toast.error("Please select a valid room type.");
      return;
    }
    onSave({
      ...formData,
      bookingId: booking.id
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modify-booking-modal">
        <h3>Modify Booking #{booking.id}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Check-in Date:</label>
            <input
              type="date"
              name="checkin_date"
              value={formData.checkin_date}
              onChange={(e) => setFormData({ ...formData, checkin_date: e.target.value })}
              disabled={isCheckinDisabled}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-out Date:</label>
            <input
              type="date"
              name="checkout_date"
              value={formData.checkout_date}
              min={formData.checkin_date}
              onChange={(e) => setFormData({ ...formData, checkout_date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Room Type:</label>
            <select
              name="room_type"
              value={formData.room_type}
              onChange={(e) => setFormData({ ...formData, room_type: e.target.value })}
              required
            >
              <option value="">Select Room Type</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Adults:</label>
            <input
              type="number"
              name="adults"
              min="1"
              value={formData.adults}
              onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Children:</label>
            <input
              type="number"
              name="children"
              min="0"
              value={formData.children}
              onChange={(e) => setFormData({ ...formData, children: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Rooms:</label>
            <input
              type="number"
              name="rooms"
              min="1"
              value={formData.rooms}
              onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("Bookings");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [userProfile, setUserProfile] = useState({
    uname: "",
    email: "",
    phone_number: "",
    password_hash: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const bookingsData = await getBookings();
        setBookings(bookingsData);
        const favoritesData = await getFavorites();
        setFavoriteHotels(favoritesData);
        const profileData = await getProfile();
        setUserProfile(profileData);
      } catch (error) {
        if (error.response?.status === 401) {
          handleLogout();
        }
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [navigate]);

  const tabs = ["Bookings", "Profile", "Logout"];

  const handleTabClick = (tab) => setActiveTab(tab);

  const openModal = (type, data = {}) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData({});
  };

  // Profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateData = {
      uname: formData.get("uname"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      password_hash: formData.get("password_hash"),
    };
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BaseURL}/user/update-profile`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserProfile({ ...userProfile, ...updateData });
      closeModal();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Booking cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BaseURL}/user/cancel-booking`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(bookings.filter((b) => b.id !== bookingId));
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  // Open the modify modal with booking data
  const handleModifyBooking = (booking) => {
    openModal("modify", booking);
  };

  // Submit handler for the modify booking form
  const handleModifyBookingSubmit = async (formData) => {
    const token = localStorage.getItem("token");
    const updateData = {
      bookingId: formData.bookingId,
      checkin_date: formData.checkin_date,
      checkout_date: formData.checkout_date,
      room_type: formData.room_type,
      adults: formData.adults,
      children: formData.children,
      rooms: formData.rooms,
    };
    try {
      const response = await axios.post(
        `${BaseURL}/user/modify-booking`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(bookings.map(booking =>
        booking.id === formData.bookingId ? {
          ...booking,
          ...updateData,
          price: response.data.newPrice
        } : booking
      ));
      toast.success("Booking modified successfully!");
      closeModal();
    } catch (error) {
      console.error("Error modifying booking:", error);
      toast.error(error.response?.data?.message || "Failed to modify booking.");
    }
  };

  const handleDownloadInvoice = (bookingId) => {
    window.open(`${BaseURL}/user/invoice/${bookingId}`, "_blank");
  };

  // // Wishlist logic
  // const handleWishlistToggle = async (hotelId) => {
  //   try {
  //     const isFavorite = favoriteHotels.some(hotel => hotel.hotel_id === hotelId || hotel.id === hotelId);
  //     if (isFavorite) {
  //       await removeFromFavorites(hotelId);
  //       setFavoriteHotels(favoriteHotels.filter(hotel => (hotel.hotel_id || hotel.id) !== hotelId));
  //       toast.info("Removed from wishlist");
  //     } else {
  //       await addToFavorites(hotelId);
  //       const updatedFavorites = await getFavorites();
  //       setFavoriteHotels(updatedFavorites);
  //       toast.success("Added to wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Error toggling wishlist:", error);
  //     toast.error("Error updating wishlist.");
  //   }
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Cookies.remove("token");
    navigate("/login");
    window.location.reload();
  };

  function getStatus(checkin, checkout) {
    const today = new Date();
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    if (checkinDate > today) return "Upcoming";
    if (checkoutDate < today) return "Completed";
    return "Ongoing";
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Bookings":
        return (
          <div>
            <h2>Your Bookings</h2>
            <p>View and manage your current and past reservations.</p>
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Hotel</th>
                  <th>Room</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8">No bookings found.</td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.hotel_name ?? "-"}</td>
                      <td>{booking.room_type ?? "-"}</td>
                      <td>{booking.checkin_date ? toDateInputValue(booking.checkin_date) : "-"}</td>
                      <td>{booking.checkout_date ? toDateInputValue(booking.checkout_date) : "-"}</td>
                      <td>{booking.price ?? "-"}</td>
                      <td>
                        {booking.status ??
                          getStatus(booking.checkin_date, booking.checkout_date)}
                      </td>
                      <td className="action-icons">
                        <span
                          className="action-icon"
                          title="Edit"
                          onClick={() => handleModifyBooking(booking)}
                          tabIndex={0}
                          role="button"
                          aria-label="Edit Booking"
                        >
                          <MdEdit size={22} />
                        </span>
                        <span
                          className="action-icon"
                          title="Cancel"
                          onClick={() => handleCancelBooking(booking.id)}
                          tabIndex={0}
                          role="button"
                          aria-label="Cancel Booking"
                        >
                          <MdDelete size={22} color="#dc3545" />
                        </span>
                        <span
                          className="action-icon"
                          title="Invoice"
                          onClick={() => handleDownloadInvoice(booking.id)}
                          tabIndex={0}
                          role="button"
                          aria-label="Download Invoice"
                        >
                          <MdReceipt size={22} color="#007bff" />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        );
      // case "Wishlist":
      //   return (
      //     <div>
      //       <h2>Your Wishlist</h2>
      //       <p>Your favorite hotels and accommodations.</p>
      //       <table>
      //         <thead>
      //           <tr>
      //             <th>Hotel ID</th>
      //             <th>Hotel Name</th>
      //             <th>Location</th>
      //             <th>Actions</th>
      //           </tr>
      //         </thead>
      //         <tbody>
      //           {favoriteHotels.length === 0 ? (
      //             <tr>
      //               <td colSpan="4">No favorite hotels found.</td>
      //             </tr>
      //           ) : (
      //             favoriteHotels.map((hotel) => (
      //               <tr key={hotel.hotel_id}>
      //                 <td>{hotel.hotel_id}</td>
      //                 <td>{hotel.name || "-"}</td>
      //                 <td>{hotel.location || "-"}</td>
      //                 <td>
      //                   <button onClick={() => handleWishlistToggle(hotel.hotel_id)}>
      //                     Remove
      //                   </button>
      //                 </td>
      //               </tr>
      //             ))
      //           )}
      //         </tbody>
      //       </table>
      //     </div>
      //   );
      case "Profile":
        return (
          <div>
            <h2>Your Profile</h2>
            <p>Update your personal information and password.</p>
            <img
              src={profile}
              alt="Profile"
              style={{ width: "100px", borderRadius: "50%" }}
            />
            <div>
              <p>
                <strong>Name:</strong> {userProfile.uname}
              </p>
              <p>
                <strong>Email:</strong> {userProfile.email}
              </p>
              <p>
                <strong>Phone:</strong> {userProfile.phone_number}
              </p>
              <button onClick={() => openModal("editProfile", userProfile)}>
                Edit Profile
              </button>
            </div>
          </div>
        );
      case "Logout":
        return (
          <div>
            <h2>Logout</h2>
            <p>Are you sure you want to log out?</p>
            <button onClick={handleLogout}>Yes, Logout</button>
            <button onClick={() => setActiveTab("Bookings")}>Cancel</button>
          </div>
        );
      default:
        return null;
    }
  };

  // Modal rendering logic
  const renderModal = () => {
    if (!showModal) return null;
    if (modalType === "editProfile") {
      return (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleProfileUpdate}>
              <label>
                Name:
                <input
                  name="uname"
                  defaultValue={modalData.uname}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  name="email"
                  type="email"
                  defaultValue={modalData.email}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  name="phone_number"
                  defaultValue={modalData.phone_number}
                  required
                />
              </label>
              <label>
                Password:
                <input
                  name="password_hash"
                  type="password"
                  placeholder="New password"
                />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={closeModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      );
    }
    if (modalType === "modify") {
      return (
        <ModifyBookingModal 
          booking={modalData}
          onClose={closeModal}
          onSave={handleModifyBookingSubmit}
        />
      );
    }
  };

  return (
    <div className="user-dashboard">
      <div className="sidebar">
        <img src={slider1} alt="Dashboard" style={{ width: "100%" }} />
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <div className="main-content">{renderTabContent()}</div>
      {renderModal()}
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
