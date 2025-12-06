import React from "react";
// Correct way to import images in React
import Logo from "../assets/img/logo.png";
import Placeholder from "../assets/img/placeholder.png";
import Phone from "../assets/img/phone.png";
import AboutUsBg from "../assets/img/about-us-bg.jpg";
import VideoBg from "../assets/img/video-bg.jpg";
import Header from "./Header";

const AboutUs = () => {
  return (
    <div>
      {/* Header Section */}

      {/* Hero Section */}
      <section
        className="hero-section bg-cover bg-center"
        style={{ backgroundImage: `url(${AboutUsBg})` }}
      >
        <div className="hero-text py-20">
          <h1 className="text-white text-4xl">About</h1>
        </div>
      </section>

      {/* About Section */}
      <div className="about-us-room py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-xl italic">
            "At our hotel, it's not just about the stay; it's about the
            unforgettable moments we create together. You'll always remember how
            we made you feel."
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <p>
              At our hotel, we pride ourselves on delivering luxury, comfort,
              and convenience. Our elegantly designed rooms come with modern
              amenities, ensuring a comfortable stay. Whether you're here for
              business or leisure, we cater to every need, from high-speed
              internet to our fitness center and pool area.
            </p>
            <p>
              We offer a personalized experience to each guest. Our team ensures
              your stay is enjoyable. Enjoy fine dining, a relaxing spa, or
              explore the city's attractions with ease. At our hotel, we make
              every moment memorable.
            </p>
          </div>
        </div>
      </div>

      {/* Video Tour Section */}
      <section
        className="video-tour bg-cover bg-center py-20"
        style={{ backgroundImage: `url(${VideoBg})` }}
      >
        <div className="text-center">
          <h2 className="text-white text-3xl">Video Hotel Tour</h2>
          <div className="mt-4">
            <a
              href="https://youtu.be/UJEUwEJ6gH4?si=51W6JAlKfMaNATwr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-play text-white text-5xl"></i>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
