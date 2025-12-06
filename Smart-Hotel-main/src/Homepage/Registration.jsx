import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import slider1 from "../assets/img/slider-1.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { BaseURL } from "../BaseURL";
import SignupBonusPopup from "./SignupBonusPopup";


import { auth, provider, signInWithPopup } from "../firebase"; // adjust path if needed


const Registration = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBonusPopup, setShowBonusPopup] = useState(false);

  const validateForm = () => {
    if (!fullName || !email || !phone || !password) {
      toast.error("Please fill all the fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const response = await axios.post(`${BaseURL}/user/google-auth`, {
      email: user.email,
      uname: user.displayName,
    });

    localStorage.setItem("token", response.data.token);
    Cookies.set("token", response.data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(response.data.user));

    toast.success("Logged in with Google!");
    setIsLoggedIn(true);
    navigate("/");
  } catch (err) {
    console.error("Google login failed:", err);
    toast.error(err?.response?.data?.message || "Google login failed.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        uname: fullName,
        email,
        password,
        phone_number: phone,
        urole: "guest",
      };

      const response = await axios.post(`${BaseURL}/user/signup`, payload);

      if (response.status === 201) {
        setIsLoading(false);
        toast.success(
          response.data.message ||
            "User registered successfully. Redirecting..."
        );
        Cookies.set("token", response.data.token, { expires: 1 });
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setShowBonusPopup(true);
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate("/");
        }, 3500); // show popup before navigating

      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Server error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="registration-container"
      style={{ backgroundImage: `url(${slider1})` }}
    >
      <div className="registration-card">
        <div className="registration-header">
          Sign Up
          <div className="registration-header-divider"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="registration-form">
            <div className="registration-input-group">
              <label className="registration-label">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="registration-input"
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="registration-input"
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-label">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="registration-input"
              />
            </div>

            <div className="registration-input-group">
              <label className="registration-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="registration-input"
              />
            </div>
          </div>

          <button
            type="submit"
            className="registration-button"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
                <button onClick={handleGoogleLogin} className="google-button" type="button">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="google-icon"
                  />
                  Sign in with Google
                </button>


          <div style={{ marginTop: "15px", textAlign: "center" }}>
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{ color: "#9b59b6", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </div>
        </form>
        

        {isLoading && (
          <div id="preloader">
            <div className="loader"></div>
          </div>
        )}
      </div>
      {showBonusPopup && (
        <SignupBonusPopup onClose={() => setShowBonusPopup(false)} />
      )}

      <ToastContainer />
      
    </div>
  );
};

export default Registration;
