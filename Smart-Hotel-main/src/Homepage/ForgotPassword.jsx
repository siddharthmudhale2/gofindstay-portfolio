// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImg from "../assets/img/slider-1.jpg"; // Optional: Use background

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${BaseURL}/auth/forgot-password`, { email });

      toast.success(res.data.message || "Reset link sent to email!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <ToastContainer />
      <div className="auth-card">
        <h2 className="auth-title">Forgot Password</h2>
        <div className="title-underline"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <div className="auth-footer">
          <a href="/signin" className="auth-link">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
