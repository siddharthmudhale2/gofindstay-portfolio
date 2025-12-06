import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backgroundImg from "../assets/img/slider-1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { BaseURL } from "../BaseURL";

const Admin = () => {
  const [role, setRole] = useState("admin"); // default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const response = await axios.post(`${BaseURL}/user/login`, {
        email,
        password,
      });

      const fetchedRole = response.data.urole?.toLowerCase();
      setIsLoading(false);

      if (fetchedRole !== role) {
        toast.error(`Incorrect role. You selected '${role}', but you're logged in as '${fetchedRole}'.`);
        return;
      }

      toast.success(response.data.message || "Login successful!");
      Cookies.set("token", response.data.token, { expires: 1 });

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "superadmin") {
        localStorage.setItem("superAdminToken", response.data.token);
        localStorage.setItem("userRole", "superadmin");
        navigate("/superadmin/dashboard");
      } else {
        toast.error("Unknown role. Please contact support.");
        Cookies.remove("token");
      }
    } catch (error) {
      setIsLoading(false);
      Cookies.remove("token");
      toast.error(
        error.response?.data?.message || "Failed to login. Please try again."
      );
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
        <div
          style={{ fontSize: "25px", fontWeight: "600", textAlign: "center" }}
        >
          Log In
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

        {/* Role Dropdown */}
        <div style={{ margin: "15px 0" }}>
          <label
            style={{
              display: "block",
              fontWeight: "500",
              marginBottom: "5px",
            }}
          >
            Login as:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              height: "40px",
              width: "100%",
              fontSize: "16px",
              borderRadius: "5px",
              padding: "5px 10px",
              border: "1px solid #ccc",
            }}
          >
            <option value="admin">Admin</option>
            <option value="superadmin">SuperAdmin</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                height: "45px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "5px",
                paddingLeft: "15px",
                border: "1px solid #ccc",
                borderBottomWidth: "2px",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "500",
                marginBottom: "5px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                height: "45px",
                width: "100%",
                fontSize: "16px",
                borderRadius: "5px",
                paddingLeft: "15px",
                border: "1px solid #ccc",
                borderBottomWidth: "2px",
                transition: "all 0.3s ease",
              }}
            />
          </div>

          <div style={{ height: "45px", marginTop: "20px" }}>
            <input
              type="submit"
              value="Sign In"
              disabled={isLoading}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "5px",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "0.3s ease",
                background: "linear-gradient(135deg, #e4cc51, #86591a)",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link
              to="/admin/login"
              style={{ color: "#9b59b6", textDecoration: "none" }}
            >
              Request Access
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
