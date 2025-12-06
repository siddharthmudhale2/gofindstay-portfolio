import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiLayers,
  FiClipboard,
  FiTruck,
  FiBarChart2,
  FiFileText,
  FiSettings,
  FiUsers
} from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">GoFindStay</div>

      {/* HOTELS Section */}
      <div className="admin-menu-section">HOTELS</div>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          `admin-menu-item ${isActive ? "active" : ""}`
        }
      >
        <FiHome />
        Dashboard
      </NavLink>

      {/* Transactions */}
      <div className="admin-menu-section">Transactions</div>

      <NavLink
        to="/admin/transactions"
        className={({ isActive }) =>
          `admin-menu-item${isActive ? " active" : ""}`
        }
      >
        <FiBarChart2 style={{ marginRight: 8 }} />
        Transactions
      </NavLink>


      {/* Staff Management Section */}
      <div>
        <div className="admin-menu-section">Staff Management</div>
        <NavLink
          to="/admin/staff/list"
          className={({ isActive }) => `admin-menu-group${isActive ? " active" : ""}`}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <FiUsers style={{ marginRight: 6 }} />
          <span>Staff</span>
        </NavLink>
      </div>

      {/* Room Book */}
      <div className="admin-menu-section">Room Book</div>

      <div
        className={`admin-menu-group ${openMenus.roomBook ? "active" : ""}`}
        onClick={() => toggleMenu("roomBook")}
      >
        <FiLayers />
        Room Book
      </div>
      {openMenus.roomBook && (
        <div className="admin-submenu">
          <NavLink to="/admin/rooms-management" className="admin-menu-item">Room Management</NavLink>
          <NavLink to="/admin/room-types" className="admin-menu-item">Room Types</NavLink>
          {/* <NavLink to="/admin/features" className="admin-menu-item">Room Features</NavLink> */}

          <NavLink to="/admin/booking/list" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Booking List</NavLink>
          {/* <NavLink to="/admin/booking/checkout" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room Checkout</NavLink> */}
          <NavLink to="/admin/booking/status" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room Status</NavLink>
        </div>
      )}

      {/* Room Facilities */}
      {/* <div
        className={`admin-menu-group ${openMenus.facilities ? "active" : ""}`}
        onClick={() => toggleMenu("facilities")}
      >
        <FiClipboard />
        Room Facilities
      </div>
      {openMenus.facilities && (
        <div className="admin-submenu">
          <NavLink to="/admin/facilities" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Facilities List</NavLink>
          <NavLink to="/admin/details" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Facilities Details</NavLink>
          <NavLink to="/admin/size" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room Size</NavLink>
        </div>
      )} */}

      {/* House Keeping */}
      {/* <div
        className={`admin-menu-group ${openMenus.houseKeeping ? "active" : ""}`}
        onClick={() => toggleMenu("houseKeeping")}
      >
        <AiOutlineUser />
        House Keeping
      </div>
      {openMenus.houseKeeping && (
        <div className="admin-submenu">
          <NavLink to="/admin/assign" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Assign Room</NavLink>
          <NavLink to="/admin/cleaning" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room Cleaning</NavLink>
          <NavLink to="/admin/checklist" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Checklist</NavLink>
          <NavLink to="/admin/report" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Cleaning Report</NavLink>
        </div>
      )} */}

      {/* Cab Facility */}
      {/* <div
        className={`admin-menu-group ${openMenus.cabFacility ? "active" : ""}`}
        onClick={() => toggleMenu("cabFacility")}
      >
        <FiTruck />
        Cab Facility
      </div>
      {openMenus.cabFacility && (
        <div className="admin-submenu">
          <NavLink to="/admin/cablist" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Cab List</NavLink>
          <NavLink to="/admin/cabbooking" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Cab Booking</NavLink>
        </div>
      )} */}

      {/* Reports */}
      <div className="admin-menu-section">Reports</div>

      <div
        className={`admin-menu-group ${openMenus.reports ? "active" : ""}`}
        onClick={() => toggleMenu("reports")}
      >
        <FiFileText />
        Reports
      </div>
      {openMenus.reports && (
        <div className="admin-submenu">
          <NavLink to="/admin/booking-reports" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Booking Reports</NavLink>
          <NavLink to="/admin/purchase-reports" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Purchase Reports</NavLink>
          {/* <NavLink to="/admin/stock-reports" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Stock Reports</NavLink> */}
        </div>
      )}

      {/* Room Settings */}
      {/* <div className="admin-menu-section">Room Settings</div>

      <div
        className={`admin-menu-group ${openMenus.roomSettings ? "active" : ""}`}
        onClick={() => toggleMenu("roomSettings")}
      >
        <FiSettings />
        Room Settings
      </div>
      {openMenus.roomSettings && (
        <div className="admin-submenu">
          <NavLink to="/admin/bed-list" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Bed List</NavLink>
          <NavLink to="/admin/booking-type" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Booking Type List</NavLink>
          <NavLink to="/admin/booking-commission" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Booking Commission</NavLink>
          <NavLink to="/admin/complementary" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Complementary List</NavLink>
          <NavLink to="/admin/floor-plan" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Floor Plan List</NavLink>
          <NavLink to="/admin/room-list" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room List</NavLink>
          <NavLink to="/admin/room-images" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Room Images</NavLink>
          <NavLink to="/admin/promocodes" className={({ isActive }) => `admin-subitem ${isActive ? "active" : ""}`}>Promocode List</NavLink>
        </div>
      )} */}
    </aside>
  );
}
