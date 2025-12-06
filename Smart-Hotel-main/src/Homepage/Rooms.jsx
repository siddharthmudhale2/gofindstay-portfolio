// ⬇️ TOP SECTION: imports & setup (unchanged except axios added)
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";



import BookingConfirmationModal from "./BookingConfirmationModal";

import Roomsbg from "../assets/img/rooms-bg.jpg";
import Rooms1 from "../assets/img/room/rooms-1.jpg";
import Rooms2 from "../assets/img/room/rooms-2.jpg";
import Rooms3 from "../assets/img/room/rooms-3.jpg";
import Rooms4 from "../assets/img/room/rooms-4.jpg";
import Rooms5 from "../assets/img/room/rooms-5.jpg";

const BaseURL = "http://localhost:5003/api/v1";
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};



// ⬇️ Image carousel
const ThumbnailCarousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    setAutoplay(false);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setAutoplay(false);
  };

  return (
    <div className="thumbnail-carousel" style={{ position: "relative" }}>
      <div style={{ position: "relative", height: "300px", borderRadius: "8px", overflow: "hidden", marginBottom: "10px" }}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentImageIndex ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              zIndex: index === currentImageIndex ? 1 : 0,
            }}
          >
            <img src={image} alt={`Room ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
        <button onClick={prevSlide} style={{ position: "absolute", top: "50%", left: "15px", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", zIndex: 2 }}>&#10094;</button>
        <button onClick={nextSlide} style={{ position: "absolute", top: "50%", right: "15px", transform: "translateY(-50%)", backgroundColor: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%", width: "40px", height: "40px", cursor: "pointer", zIndex: 2 }}>&#10095;</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", overflow: "auto" }}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => selectImage(index)}
            style={{
              width: "70px",
              height: "50px",
              borderRadius: "4px",
              overflow: "hidden",
              cursor: "pointer",
              border: index === currentImageIndex ? "2px solid #ff5a5f" : "2px solid transparent",
              opacity: index === currentImageIndex ? 1 : 0.7,
            }}
          >
            <img src={image} alt={`Thumb ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ⬇️ Main component
const Rooms = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({ type: "", price: 0 });
  const [favoriteRooms, setFavoriteRooms] = useState([]);

  const openBookingModal = (roomType, roomPrice) => {
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please login to Book!");
      return;
    }
    setSelectedRoom({ type: roomType, price: roomPrice });
    setIsModalOpen(true);
  };

  const handleWishlistToggle = async (roomId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Login to use wishlist!");
        return;
      }

      const alreadyFav = favoriteRooms.includes(roomId);
      if (alreadyFav) {
        await axios.delete(`${BaseURL}/user/favorites/${roomId}`, { headers: getAuthHeader() });
        setFavoriteRooms(favoriteRooms.filter((id) => id !== roomId));
        toast.info("Removed from wishlist");
      } else {
        await axios.post(`${BaseURL}/user/favorites/${roomId}`, {}, { headers: getAuthHeader() });
        setFavoriteRooms([...favoriteRooms, roomId]);
        toast.success("Added to wishlist");
      }
    } catch (err) {
      toast.error("Error updating wishlist");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    axios
      .get(`${BaseURL}/user/favorites`, { headers: getAuthHeader() })
      .then((res) => {
        const ids = res.data.favorites.map((f) => f.hotel_id || f.id);
        setFavoriteRooms(ids);
      })
      .catch(() => {});
  }, []);

  const roomData = [
    {
      id: 1,
      type: "Single Room",
      price: 1000,
      images: [Rooms1, Rooms2],
      description: "Our standard rooms are designed for maximum comfort and relaxation...",
      features: ["Smart TV with Streaming", "High-Speed Wi-Fi", "Air Conditioning", "Free Parking"],
    },
    {
      id: 2,
      type: "Double Room",
      price: 1500,
      images: [Rooms3, Rooms2],
      description: "Our double rooms are perfect for couples or friends traveling together...",
      features: ["Smart TV", "High Wi-fii", "AC", "Parking", "Pool"],
    },
    {
      id: 3,
      type: "Suite Room",
      price: 2000,
      images: [Rooms4, Rooms2],
      description: "Experience luxury and space in our elegantly designed suites...",
      features: ["Smart TV", "High Wi-fii", "AC", "Parking", "Pool"],
    },
    {
      id: 4,
      type: "Deluxe Room",
      price: 3000,
      images: [Rooms5, Rooms2],
      description: "Our deluxe rooms offer an upgraded experience with extra space and enhanced amenities...",
      features: ["Smart TV", "High Wi-fii", "AC", "Parking", "Pool"],
    },
  ];

  return (
    <div>
      <ToastContainer />
      <section className="hero-section set-bg" style={{ backgroundImage: `url(${Roomsbg})` }}>
        <div className="hero-text">
          <div className="container">
            <h1>Rooms</h1>
          </div>
        </div>
      </section>

      <section className="room-section spad">
        <div className="container">
          {roomData.map((room) => (
            <div key={room.id} id={`${room.type.toLowerCase().replace(" ", "-")}`} className="rooms-page-item">
              <div className="row">
                <div className="col-lg-6">
                  <div style={{ position: "relative" }}>
                    <ThumbnailCarousel images={room.images} />
                    <button
                      onClick={() => handleWishlistToggle(room.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(255,255,255,0.95)",
                        border: "none",
                        borderRadius: "50%",
                        width: "42px",
                        height: "42px",
                        fontSize: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                        color: favoriteRooms.includes(room.id) ? "red" : "#999",
                        zIndex: 10,
                      }}
                      title={favoriteRooms.includes(room.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      {favoriteRooms.includes(room.id) ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="room-text">
                    <div className="room-title">
                      <h2>{room.type}</h2>
                      <div className="room-price">
                        <span>From</span>
                        <h2>₹{room.price}</h2>
                        <sub>/night</sub>
                      </div>
                    </div>
                    <div className="room-desc">
                      <p>{room.description}</p>
                    </div>
                    <div className="room-features">
                      {room.features.map((feature, index) => (
                        <div className="room-info" key={index}>
                          <i className="flaticon-019-television"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => openBookingModal(room.type, room.price)} className="primary-btn">
                      Book Now <i className="lnr lnr-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Success={() => toast.success("Booking Successful!")}
        roomType={selectedRoom.type}
        roomPrice={selectedRoom.price}
      />
    </div>
  );
};

export default Rooms;
