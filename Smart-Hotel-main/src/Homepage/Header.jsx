import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/img/logo.png";
import Cookies from "js-cookie";
import { FiFilter, FiSearch } from "react-icons/fi";
import "./Header.css";

const Header = ({ isLoggedIn, username, profileImage }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsProfileDropdownOpen(false);
    navigate("/login");
    window.location.reload();
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const profileElement = document.getElementById("user-profile-container");
      if (profileElement && !profileElement.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header-section other-page">
      <div className="container-fluid">
        <div className="inner-header d-flex align-items-center justify-content-between">
          {/* Mobile Toggle */}
          <div className="d-block d-md-none mobile-toggle">
            <button onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" style={{ maxHeight: "60px" }} />
            </Link>
          </div>

          {/* Main Menu */}
          <nav className="main-menu d-none d-md-block">
            <ul className="d-flex flex-row align-items-center">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/aboutus">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/rooms">Rooms</Link></li>
              <li>
                <a href="#">Facilities</a>
                <ul className="drop-menu">
                  <li><a href="/rooms#single-room">Single Room</a></li>
                  <li><a href="/rooms#double-room">Double Room</a></li>
                  <li><a href="/rooms#suite-room">Suite Room</a></li>
                  <li><a href="/rooms#deluxe-room">Deluxe Room</a></li>
                </ul>
              </li>
                {/* <li className="filter-menu">
                <span className="filter-icon"><FiFilter style={{ verticalAlign: "middle" }} /></span>
                <ul className="drop-menu">
                  <li><Link to="/filter/rooms?filter=price">Price</Link></li>
                  <li><Link to="/filter/rooms?filter=roomType">Room Type</Link></li>
                  <li><Link to="/filter/rooms?filter=amenities">Amenities</Link></li>
                  <li><Link to="/filter/rooms?filter=availability">Availability</Link></li>
                  <li><Link to="/filter/rooms?filter=location">Location</Link></li>
                  <li><Link to="/filter/rooms?filter=ratings">Ratings</Link></li>
                </ul>
              </li> */}
              <li><Link to="/contact">Contact</Link></li>
              {/* Show "My Bookings" only when logged in */}
              {isLoggedIn && (
                <li>
                  {isLoggedIn && <Link to="/user-dashboard">My Dashboard</Link>}

                  
                </li>
                
              )}
            </ul>
          </nav>

          {/* 🔍 Search Bar */}
          <form className="header-search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FiSearch />
            </button>
          </form>

          {/* Login / Profile */}
          {isLoggedIn ? (
            <div className="user-profile" id="user-profile-container">
              <div onClick={toggleProfileDropdown} className="cursor-pointer flex items-center gap-2">
                <img src={profileImage} alt="User" />
                <span>{username}</span>
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown z-50">
                  <ul>
                    <li><Link to="/wallet" onClick={() => setIsProfileDropdownOpen(false)}>My Wallet</Link></li>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="login-single-button">
  <button className="dropdown-btn" onClick={() => navigate("/signin")}>
    Login
  </button>
</div>

          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu active">
          <ul>
            <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/aboutus" onClick={() => setIsMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link></li>
            <li><Link to="/rooms" onClick={() => setIsMobileMenuOpen(false)}>Rooms</Link></li>
            <li>
              <div
                style={{ color: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                onClick={(e) => {
                  const submenu = e.currentTarget.nextElementSibling;
                  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
                }}
              >
                Facilities <span>▼</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "none", backgroundColor: "rgba(255,255,255,0.1)" }}>
                <li><a href="/rooms#single-room" onClick={() => setIsMobileMenuOpen(false)}>Single Room</a></li>
                <li><a href="/rooms#double-room" onClick={() => setIsMobileMenuOpen(false)}>Double Room</a></li>
                <li><a href="/rooms#suite-room" onClick={() => setIsMobileMenuOpen(false)}>Suite Room</a></li>
                <li><a href="/rooms#deluxe-room" onClick={() => setIsMobileMenuOpen(false)}>Deluxe Room</a></li>
              </ul>
            </li>
            {/* Filter Dropdown in Mobile */}
            <li>
              <div
                style={{ color: "white", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                onClick={(e) => {
                  const submenu = e.currentTarget.nextElementSibling;
                  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
                }}
              >
                <span><FiFilter style={{ marginRight: "8px" }} /> Filter</span> <span>▼</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "none", backgroundColor: "rgba(255,255,255,0.1)" }}>
                <li><Link to="/filter/rooms?filter=price" onClick={() => setIsMobileMenuOpen(false)}>Price</Link></li>
                <li><Link to="/filter/rooms?filter=roomType" onClick={() => setIsMobileMenuOpen(false)}>Room Type</Link></li>
                <li><Link to="/filter/rooms?filter=amenities" onClick={() => setIsMobileMenuOpen(false)}>Amenities</Link></li>
                <li><Link to="/filter/rooms?filter=availability" onClick={() => setIsMobileMenuOpen(false)}>Availability</Link></li>
                <li><Link to="/filter/rooms?filter=location" onClick={() => setIsMobileMenuOpen(false)}>Location</Link></li>
                <li><Link to="/filter/rooms?filter=ratings" onClick={() => setIsMobileMenuOpen(false)}>Ratings</Link></li>
              </ul>
            </li>
            <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link></li>
            {/* Show "My Bookings" only when logged in */}
            {isLoggedIn && (
              <li><Link to="/user-dashboard" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</Link></li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
