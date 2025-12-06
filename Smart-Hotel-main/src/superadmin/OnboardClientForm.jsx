import React, { useState } from "react";
import SuperAdminLayout from "./SuperAdminLayout";

export default function OnboardClientForm() {
  const [client, setClient] = useState({
    name: "",
    domain: "",
    email: "",
  });

  const handleInputChange = (e) =>
    setClient({ ...client, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    console.log("Client onboarded:", client);
  };

  return (
    <SuperAdminLayout>
      <h2>Onboard New Client</h2>
      <form className="onboard-form">
        <input
          type="text"
          name="name"
          placeholder="Organization Name"
          value={client.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="domain"
          placeholder="Domain Prefix"
          value={client.domain}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Contact Email"
          value={client.email}
          onChange={handleInputChange}
        />
        <button type="button" className="btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </SuperAdminLayout>
  );
}
