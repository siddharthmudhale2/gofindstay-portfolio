import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../assets/img/slider-1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { BaseURL } from "../BaseURL";
import { auth, provider, signInWithPopup } from "../firebase";
import "./signin.css";

const Signin = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const endpoint = isSuperAdmin ? "/user/login/superadmin" : "/user/login";

      const response = await axios.post(`${BaseURL}${endpoint}`, { email, password });
      const user = response.data.user;
      const role = user?.urole?.toLowerCase();


      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      Cookies.set("token", token, { expires: 1 });

      if (role === "superadmin") {
        localStorage.setItem("isAuthenticated", "true");
        toast.success("SuperAdmin logged in successfully!");
        setTimeout(() => navigate("/superadmin"), 1000);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true");
        toast.success("Login successful!");
        setTimeout(() => {
          setIsLoggedIn(true);
          if (role === "admin") navigate("/admin/dashboard");
          else if (role === "staff") navigate("/staff/dashboard");
          else navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(`${BaseURL}/user/google-auth`, {
        email: user.email,
        uname: user.displayName,
      });

      const userData = res.data.user;
      const role = userData.urole?.toLowerCase();
      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");
      Cookies.set("token", token, { expires: 1 });

      toast.success("Logged in with Google!");
      setIsLoggedIn(true);

      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "staff") navigate("/staff/dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      toast.error(err?.response?.data?.message || "Google login failed.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Poppins, sans-serif",
        margin: 0,
      }}
    >
      {isLoading && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: "25px 30px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div style={{ fontSize: "25px", fontWeight: "600", textAlign: "center" }}>
          {isSuperAdmin ? "SuperAdmin Login" : "Sign In"}
          <div
            style={{
              height: "3px",
              width: "100px",
              margin: "5px auto",
              borderRadius: "5px",
              background: "linear-gradient(135deg, #000000, #9b59b6)",
            }}
          ></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <Link to="/forgot-password" style={{ color: "#3498db", fontSize: "14px" }}>
              Forgot Password?
            </Link>
          </div>

          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <button
              type="button"
              onClick={() => setIsSuperAdmin((prev) => !prev)}
              style={{
                fontSize: "13px",
                color: "#6c757d",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              {isSuperAdmin ? "🔁 Switch to User/Admin Login" : "👑 Login as SuperAdmin"}
            </button>
          </div>

          <div style={{ height: "45px", marginTop: "20px" }}>
            <input
              type="submit"
              value="Sign In"
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "5px",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "500",
                cursor: "pointer",
                background: "linear-gradient(135deg, #e4cc51, #86591a)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>

          {!isSuperAdmin && (
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#9b59b6", textDecoration: "none" }}>
                Register now
              </Link>
            </div>
          )}
        </form>

        {!isSuperAdmin && (
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={handleGoogleLogin} className="google-button" style={{ width: "50%" }}>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="google-icon"
              />
              Google
            </button>

            <button
              onClick={() => navigate("/otp-login")}
              className="google-button"
              style={{
                width: "50%",
                backgroundColor: "#f8f8f8",
                border: "1px solid #dadce0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              OTP Login
            </button>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

const inputStyle = {
  height: "45px",
  width: "100%",
  fontSize: "16px",
  borderRadius: "5px",
  paddingLeft: "15px",
  border: "1px solid #ccc",
  borderBottomWidth: "2px",
  transition: "all 0.3s ease",
};

export default Signin;
