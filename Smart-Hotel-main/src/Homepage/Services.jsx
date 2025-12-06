import React from "react";

import img8 from "../assets/img/services/services-8.jpg";
import img7 from "../assets/img/services/services-7.jpg";
import img6 from "../assets/img/services/services-6.jpg";
import img5 from "../assets/img/services/services-5.jpg";
import img4 from "../assets/img/services/services-4.jpg";
import img3 from "../assets/img/services/services-3.jpg";
import img2 from "../assets/img/services/services-2.jpg";
import img1 from "../assets/img/services/services-1.jpg";
import bg_img from "../assets/img/slider-1.jpg";
const ServiceItem = ({ image, text }) => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={image}
        alt={text}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
          display: "block",
        }}
        loading="lazy"
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    { image: img1, text: "Outdoor Pool" },
    { image: img2, text: "Restaurant" },
    { image: img3, text: "SPA & Wellness" },
    { image: img4, text: "Coffee Shop" },
    { image: img5, text: "Executive Conference Room" },
    { image: img6, text: "Events Conference Venue" },
    { image: img7, text: "Weddings" },
    { image: img8, text: "Gym" },
  ];

  return (
    <section
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      {/* Services Header */}
      <section
        className="hero-section set-bg"
        style={{ backgroundImage: `url(${bg_img})` }}
      >
        <div className="hero-text" style={{ paddingLeft: "0px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>Services</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          marginTop: "80px",
          marginBottom: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              style={{ width: "calc(25% - 20px)", minWidth: "250px" }}
            >
              <ServiceItem image={service.image} text={service.text} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
