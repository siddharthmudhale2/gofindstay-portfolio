// SignupBonusPopup.jsx
import React from "react";
import "./Popup.css";

const SignupBonusPopup = ({ onClose }) => {
  return (
    <div className="signup-bonus-popup">
      <div className="popup-content">
        <h2>🎉 Welcome to GoFindStay!</h2>
        <p>You’ve earned <strong>100 Loyalty Points</strong> as a signup bonus!</p>
        <button onClick={onClose}>Awesome!</button>
      </div>
    </div>
  );
};

export default SignupBonusPopup;
