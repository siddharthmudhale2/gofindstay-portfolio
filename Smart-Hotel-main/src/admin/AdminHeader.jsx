import React, { useState, useEffect } from "react";
import {
  FiBell,
  FiGlobe,
  FiMoon,
  FiSun,
  FiRefreshCw,
  FiLogOut,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

export default function AdminHeader() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    document.body.setAttribute("dir", rtlLanguages.includes(language) ? "rtl" : "ltr");
    localStorage.setItem("language", language);
  }, [language]);

  const toggleTheme = () => setDarkMode((prev) => !prev);
  const resetSettings = () => {
    setDarkMode(false);
    setLanguage("en");
    localStorage.removeItem("theme");
    localStorage.removeItem("language");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <>
      <header className="admin-header">
        <div className="left-section">
          <input className="admin-search" placeholder="Search..." />
        </div>

        <div className="right-section">
          <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>

          <div className="language-selector" title="Change Language">
            <FiGlobe />
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
              <option value="fr">FR</option>
              <option value="es">ES</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <button className="icon-btn" onClick={resetSettings} title="Reset to Default">
            <FiRefreshCw />
          </button>

          <FiBell className="icon-btn" title="Notifications" />

          <div className="profile-box">
            <img src="https://i.pravatar.cc/40?img=5" alt="profile" className="profile-img" />
            <div className="profile-name">Admin</div>
          </div>

          <button
            className="icon-btn"
            title="Logout"
            onClick={() => setShowLogoutConfirm(true)}
            style={{ color: "crimson" }}
          >
            <FiLogOut />
          </button>
        </div>
      </header>

      {showLogoutConfirm && (
        <div className="logout-confirm-overlay">
          <div className="logout-confirm-box">
            <h4>Are you sure you want to logout?</h4>
            <div className="logout-buttons">
              <button onClick={handleLogout} className="btn btn-yes">Yes</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="btn btn-no">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
