import React, { useState } from "react";
import axios from "axios";

export default function StaffLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/staff-auth/login", form);
      localStorage.setItem("staffToken", res.data.token);
      window.location.href = "/staff/dashboard";
    } catch (err) {
        if (err.response?.data?.reason === "NO_PASSWORD") {
        window.location.href = `/staff/set-password?email=${encodeURIComponent(form.email)}`;
        } else {
        setError(err.response?.data?.error || "Login failed");
        }
    }
    };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "auto", marginTop: 80 }}>
      <h2>Staff Login</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
}
