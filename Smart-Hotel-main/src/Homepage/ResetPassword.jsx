import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImg from "../assets/img/slider-1.jpg";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Debug log to confirm token
  useEffect(() => {
    console.log("✅ Reset token from URL:", token);
  }, [token]);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Reset token is missing or invalid.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
  setIsSubmitting(true);
  const res = await axios({
    method: "post",
    url: `${BaseURL}/auth/reset-password`, // ✅ fixed path
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      token,
      newPassword,
    },
  });

      toast.success(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      console.error("❌ Reset error:", err.response || err.message);
      toast.error(err.response?.data?.message || "Reset failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
        <div className="auth-card">
          <h2 className="auth-title">Reset Password</h2>
          <div className="title-underline"></div>
          <p style={{ color: "red", textAlign: "center" }}>
            ❌ Invalid or expired reset token.
          </p>
          <div className="auth-footer">
            <a href="/forgot-password" className="auth-link">Request New Link</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Reset Password</h2>
        <div className="title-underline"></div>

        <form onSubmit={handleReset}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-footer">
          <a href="/signin" className="auth-link">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
