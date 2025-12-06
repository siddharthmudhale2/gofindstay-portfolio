import React, { useState, useEffect } from "react";
import Room1 from "../assets/img/room-slider/room-1.jpg";
import Room2 from "../assets/img/room-slider/room-2.jpg";
import Room3 from "../assets/img/room-slider/room-3.jpg";
import RoomFooter1 from "../assets/img/room-footer-pic/room-1.jpg";
import RoomFooter2 from "../assets/img/room-footer-pic/room-2.jpg";
import RoomFooter3 from "../assets/img/room-footer-pic/room-3.jpg";
import RoomFooter4 from "../assets/img/room-footer-pic/room-4.jpg";
import Slider from "../assets/img/slider-1.jpg";
import SurveyPopup from "./Survey";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Homepage = ({ isLoggedIn }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("Eg. Master suite");
  const [showSurvey, setShowSurvey] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const lastShown = localStorage.getItem("surveyLastShown");
      const today = new Date().toDateString();

      if (lastShown !== today) {
        setShowSurvey(true);
        localStorage.setItem("surveyLastShown", today);
      }
    }
  }, [isLoggedIn]);

  const slides = [
    { image: Room1, alt: "Room 1" },
    { image: Room2, alt: "Room 2" },
    { image: Room3, alt: "Room 3" },
  ];

  const roomOptions = [
    "Eg. Master suite",
    "Double Room",
    "Single Room",
    "Special Room",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Function to increment count
  const incrementCount = (setter, value) => {
    setter(value + 1);
  };

  // Function to decrement count
  const decrementCount = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  // Function to toggle select dropdown
  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  // Function to select room option
  const selectRoomOption = (option) => {
    setSelectedRoom(option);
    setIsSelectOpen(false);
  };

  // Function to handle check-in date change
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    // If check-out date is before check-in date, reset it
    if (checkOutDate && date > checkOutDate) {
      setCheckOutDate(null);
    }
  };

  // Function to handle check-out date change
  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const Success = () => {
    toast.success("Survey Submitted!");
  };

  const handleCheck = (e) => {
    if (checkInDate && checkOutDate) {
      toast.success("Rooms are Available!");
    } else {
      toast.error("Please select appropriate Date Range");
    }
  };

  return (
    <>
      <ToastContainer />
      {showSurvey && <SurveyPopup Success={Success} />}
      <div className="hero-slider">
        <div className="slider-item">
          <div
            className="single-slider-item set-bg"
            style={{ backgroundImage: `url(${Slider})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>
                    We hope you'll enjoy <br />
                    your stay.
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero Slider End */}

      {/* Room Availability Section Begin */}
      <section className="room-availability spad">
        <div className="container">
          <div className="room-check">
            <div className="row">
              <div className="col-lg-6">
                <div className="room-item">
                  {/* Basic Carousel */}
                  <div
                    className="carousel-container"
                    style={{
                      position: "relative",
                      height: "400px",
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                  >
                    {slides.map((slide, index) => (
                      <div
                        key={index}
                        className="carousel-slide"
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          opacity: currentSlide === index ? 1 : 0,
                          transition: "opacity 0.5s ease-in-out",
                        }}
                      >
                        <img
                          src={slide.image}
                          alt={slide.alt}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background:
                              "linear-gradient(transparent, rgba(0,0,0,0.7))",
                            color: "white",
                            padding: "20px",
                            textAlign: "center",
                          }}
                        >
                          <h3 style={{ margin: 0 }}>{slide.alt}</h3>
                        </div>
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevSlide}
                      className="carousel-arrow carousel-prev"
                      style={{
                        position: "absolute",
                        left: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15 4L7 12L15 20"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextSlide}
                      className="carousel-arrow carousel-next"
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 4L17 12L9 20"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Dots Indicators */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        gap: "10px",
                        zIndex: 2,
                      }}
                    >
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            background:
                              currentSlide === index
                                ? "white"
                                : "rgba(255,255,255,0.5)",
                            border: "none",
                            cursor: "pointer",
                          }}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="room-text">
                    <div className="room-title">
                      <h2>Single Room</h2>
                      <div className="room-price">
                        <span>From</span>
                        <h2>₹1000</h2>
                      </div>
                    </div>
                    <div className="room-features">
                      <div className="room-info">
                        <i className="flaticon-019-television"></i>
                        <span>Smart TV</span>
                      </div>
                      <div className="room-info">
                        <i className="flaticon-029-wifi"></i>
                        <span>High Wi-fii</span>
                      </div>
                      <div className="room-info">
                        <i className="flaticon-003-air-conditioner"></i>
                        <span>AC</span>
                      </div>
                      <div className="room-info">
                        <i className="flaticon-036-parking"></i>
                        <span>Parking</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="check-form">
                  <h2>Check Availability</h2>
                  <form action="#">
                    {/* Integrated Date Picker Section */}
                    <div
                      className="datepicker"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="row">
                        {/* Check-in Date Picker */}
                        <div className="col-md-6">
                          <div className="date-select">
                            <p>From</p>
                            <div className="date-picker-container">
                              <DatePicker
                                selected={checkInDate}
                                onChange={handleCheckInChange}
                                selectsStart
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                placeholderText="Check-in Date"
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                minDate={new Date()}
                                monthsShown={1}
                                showPopperArrow={false}
                              />
                              <i className="calendar-icon">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    stroke="#888888"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M3 10H21"
                                    stroke="#888888"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M8 2L8 6"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M16 2L16 6"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </i>
                            </div>
                          </div>
                        </div>

                        {/* Check-out Date Picker */}
                        <div className="col-md-6">
                          <div className="date-select to">
                            <p>To</p>
                            <div className="date-picker-container">
                              <DatePicker
                                selected={checkOutDate}
                                onChange={handleCheckOutChange}
                                selectsEnd
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={checkInDate || new Date()}
                                placeholderText="Check-out Date"
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                monthsShown={1}
                                disabled={!checkInDate}
                                showPopperArrow={false}
                              />
                              <i className="calendar-icon">
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    stroke="#888888"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M3 10H21"
                                    stroke="#888888"
                                    strokeWidth="2"
                                  />
                                  <path
                                    d="M8 2L8 6"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M16 2L16 6"
                                    stroke="#888888"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guest Counters */}
                    <div
                      className="room-quantity"
                      style={{ marginBottom: "20px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "15px",
                        }}
                      >
                        {/* Adults Counter */}
                        <div style={{ width: "30%" }}>
                          <p style={{ marginBottom: "10px" }}>Adults</p>
                          <div style={{ display: "flex" }}>
                            <button
                              type="button"
                              onClick={() =>
                                decrementCount(setAdultsCount, adultsCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              −
                            </button>
                            <div
                              style={{
                                width: "40px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTop: "1px solid #ddd",
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              {adultsCount}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                incrementCount(setAdultsCount, adultsCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Children Counter */}
                        <div style={{ width: "30%" }}>
                          <p style={{ marginBottom: "10px" }}>Children</p>
                          <div style={{ display: "flex" }}>
                            <button
                              type="button"
                              onClick={() =>
                                decrementCount(setChildrenCount, childrenCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              −
                            </button>
                            <div
                              style={{
                                width: "40px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTop: "1px solid #ddd",
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              {childrenCount}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                incrementCount(setChildrenCount, childrenCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Rooms Counter */}
                        <div style={{ width: "30%" }}>
                          <p style={{ marginBottom: "10px" }}>Rooms</p>
                          <div style={{ display: "flex" }}>
                            <button
                              type="button"
                              onClick={() =>
                                decrementCount(setRoomsCount, roomsCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              −
                            </button>
                            <div
                              style={{
                                width: "40px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderTop: "1px solid #ddd",
                                borderBottom: "1px solid #ddd",
                              }}
                            >
                              {roomsCount}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                incrementCount(setRoomsCount, roomsCount)
                              }
                              style={{
                                width: "30px",
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "1px solid #ddd",
                                background: "white",
                                cursor: "pointer",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room Selector Dropdown */}
                    <div className="room-selector">
                      <p>Room</p>
                      <div style={{ position: "relative" }}>
                        <div
                          onClick={toggleSelect}
                          style={{
                            padding: "10px 15px",
                            border: "1px solid #ebebeb",
                            borderRadius: "4px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "#fff",
                          }}
                        >
                          <span>{selectedRoom}</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              transform: isSelectOpen
                                ? "rotate(180deg)"
                                : "rotate(0)",
                              transition: "transform 0.3s ease",
                            }}
                          >
                            <path
                              d="M7 10L12 15L17 10"
                              stroke="#333"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        {isSelectOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "calc(100% + 5px)",
                              left: 0,
                              right: 0,
                              background: "#fff",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                              borderRadius: "4px",
                              zIndex: 10,
                              maxHeight: "200px",
                              overflowY: "auto",
                            }}
                          >
                            {roomOptions.map((option, index) => (
                              <div
                                key={index}
                                onClick={() => selectRoomOption(option)}
                                style={{
                                  padding: "10px 15px",
                                  cursor: "pointer",
                                  background:
                                    selectedRoom === option
                                      ? "#f8f3eb"
                                      : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#f8f3eb";
                                }}
                                onMouseLeave={(e) => {
                                  if (selectedRoom !== option) {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }
                                }}
                              >
                                {option}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      style={{ marginTop: "30px" }}
                      type="button"
                      onClick={handleCheck}
                    >
                      CHECK Availability <i className="lnr lnr-arrow-right"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* About Room Section */}
          <div className="about-room">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                <h2>
                  "Customers may forget what you said but they will never forget
                  how you made them feel".
                </h2>
              </div>
            </div>
            <div className="about-para">
              <div className="row">
                <div className="col-lg-6">
                  <p>
                    Welcome to our hotel, where luxury meets comfort. We offer a
                    variety of room options, from cozy single rooms to spacious
                    suites, designed to meet the needs of every traveler.
                    Whether you're here for business or leisure, we promise a
                    memorable stay.
                  </p>
                  <p>
                    Our rooms are equipped with modern amenities including
                    high-speed Wi-Fi, air conditioning, smart TVs, and more to
                    ensure that your stay is as comfortable and convenient as
                    possible. Enjoy a relaxing stay with room service,
                    housekeeping, and access to our exclusive hotel facilities
                    such as the wellness center, pool, and on-site restaurant.
                  </p>
                  <p>
                    Book your stay today and experience the perfect blend of
                    comfort, convenience, and luxury. Don't miss out on our
                    special offers and discounts available exclusively through
                    our online booking system.
                  </p>
                </div>
                <div className="col-lg-6">
                  <p>
                    Need assistance with your booking or have special requests?
                    Our dedicated customer service team is available 24/7 to
                    ensure your experience with us is seamless and stress-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="follow-instagram">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Follow us on Instagram @</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Images */}
      <div className="footer-room-pic">
        <div className="container-fluid">
          <div className="row">
            <img src={RoomFooter1} alt="" />
            <img src={RoomFooter2} alt="" />
            <img src={RoomFooter3} alt="" />
            <img src={RoomFooter4} alt="" />
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>
        {`
          .carousel-slide {
            backface-visibility: hidden;
          }
          
          .carousel-arrow:hover {
            background: rgba(0,0,0,0.7) !important;
          }
          
          .quantity-btn {
            outline: none;
          }
          
          .quantity-btn:hover {
            background: #f0f0f0;
          }
          
          /* Date Picker Styles */
          .date-picker-container {
            position: relative;
          }
          
          .date-picker-container .form-control {
            width: 100%;
            padding: 10px 35px 10px 15px;
            border: 1px solid #ebebeb;
            border-radius: 4px;
            font-size: 14px;
            height: 45px;
          }
          
          .calendar-icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
          }
          
          .react-datepicker {
            font-family: inherit;
            border: 1px solid #ebebeb;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          
          .react-datepicker__header {
            background-color: #f8f3eb;
            border-bottom: 1px solid #ebebeb;
          }
          
          .react-datepicker__day--selected,
          .react-datepicker__day--in-selecting-range,
          .react-datepicker__day--in-range {
            background-color: #dfa974;
            color: white;
          }
          
          .react-datepicker__day:hover {
            background-color: #f8f3eb;
          }
          
          .react-datepicker__day--keyboard-selected {
            background-color: #dfa974;
            color: white;
          }
          
          .react-datepicker__triangle {
            display: none;
          }
          
          .react-datepicker-wrapper,
          .react-datepicker__input-container {
            display: block;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default Homepage;
