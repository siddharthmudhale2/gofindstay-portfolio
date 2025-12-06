import React, { useState } from "react";
import axios from "axios";

export default function SetPassword() {
  // Get email from URL query string
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!password || password !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/api/staff-auth/set-password", { email, password });
      setMsg("Password set! You can now log in.");
      setTimeout(() => window.location.href = "/staff/login", 2000);
    } catch (err) {
      setMsg(err.response?.data?.error || "Failed to set password");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "auto", marginTop: 80 }}>
      <h2>Set Your Password</h2>
      {msg && <div style={{ color: msg.includes("now") ? "green" : "red" }}>{msg}</div>}
      <input type="hidden" value={email} />
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ marginBottom: 8, width: "100%", padding: 8 }}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirm}
        onChange={e => setConfirm(e.target.value)}
        required
        style={{ marginBottom: 8, width: "100%", padding: 8 }}
      />
      <button type="submit" style={{ width: "100%", padding: 8 }}>Set Password</button>
    </form>
  );
}
