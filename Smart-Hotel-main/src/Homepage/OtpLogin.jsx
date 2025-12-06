import React, { useState } from "react";
import axios from "axios";
import "./OtpLogin.css";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/v1/auth/send-otp", { email });
      setOtpSent(true);
      setMessage("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    if (!otp) {
      setError("OTP is required");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/verify-otp", {
        email,
        otp: otp.toString().trim(), // ✅ ensure OTP sent as string
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setMessage("Logged in successfully!");
      setTimeout(() => (window.location.href = "/"), 1000);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-title">OTP Login</h2>
      <div className="otp-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="otp-input"
          required
        />
        {!otpSent && (
          <button onClick={handleSendOtp} className="otp-button" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        )}

        {otpSent && (
          <>
            <div className="otp-divider">Enter OTP</div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
              required
            />
            <button onClick={handleVerifyOtp} className="otp-button" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {error && <p className="otp-message" style={{ color: "red" }}>{error}</p>}
        {message && <p className="otp-message">{message}</p>}
      </div>
    </div>
  );
};

export default OtpLogin;
