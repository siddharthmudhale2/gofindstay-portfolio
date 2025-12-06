import React, { useState } from "react";
import axios from "axios";

import contactBg from "../assets/img/contact-bg.jpg";
import placeholderCopy from "../assets/img/placeholder-copy.png";
import phoneCopy from "../assets/img/phone-copy.png";
import envelop from "../assets/img/envelop.png";
import clockCopy from "../assets/img/clock-copy.png";
import edit from "../assets/img/edit.png";
import envelopCopy from "../assets/img/envelop-copy.png";
import speechCopy from "../assets/img/speech-copy.png";
import Header from "./Header";
import Footer from "./Footer";
import { BaseURL } from "../BaseURL";

const Contact = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullname || !email || !phone || !message) {
      alert("Please fill out all fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${BaseURL}/contact/submit`, {
        fullname,
        email,
        phone,
        message,
      });

      alert("Your feedback has been submitted successfully.");

      // Clear the form by resetting state
      setFullname("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again later.");
    } finally {
      // Hide preloader
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <div id="preloader">
          <div className="loader"></div>
        </div>
      )}

      <section
        className="hero-section set-bg"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="hero-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h1>Contact</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      {/* Contact Section Begin */}
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-left">
                <div className="contact-information">
                  <h2>Contact Information</h2>
                  <ul>
                    <li>
                      <img src={placeholderCopy} alt="Address Icon" />
                      <span>BMS College of Engineering</span>
                    </li>
                    <li>
                      <img src={phoneCopy} alt="Phone Icon" />
                      <span>+91 97-212-5679</span>
                    </li>
                    <li>
                      <img src={envelop} alt="Email Icon" />
                      <span>contact@gofindstay.in</span>
                    </li>
                    <li>
                      <img src={clockCopy} alt="Clock Icon" />
                      <span>Everyday: 06:00 AM-10:00 PM</span>
                    </li>
                  </ul>
                </div>
                <div className="social-links">
                  <h2>Follow us on:</h2>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-pinterest"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube-play"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form">
                <h5>Write us ...</h5>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12">
                      <p>From</p>
                      <div className="input-group">
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                        />
                        <img src={edit} alt="Edit Icon" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-group">
                        <input
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <img src={envelopCopy} alt="Envelope Icon" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-group phone-num">
                        <input
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <img src={phoneCopy} alt="Phone Icon" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="message">
                        <p>Message</p>
                        <div className="textarea">
                          <textarea
                            placeholder="Hi ..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          ></textarea>
                          <img src={speechCopy} alt="Speech Icon" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button type="submit">
                        Send <i className="lnr lnr-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section End */}

      {/* Map Section Begin */}
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14575.402255999753!2d77.571341!3d12.934329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15389e395f35%3A0x547ed5d29ed66e1d!2sBull%20Temple%20Rd%2C%20Basavanagudi%2C%20Bengaluru%2C%20Karnataka%20560019%2C%20India!5e0!3m2!1sen!2sus!4v1674786225569!5m2!1sen!2sus"
          height="560"
          style={{ border: 0 }}
          allowFullScreen=""
          title="Google Map of Hotel Location"
        ></iframe>
      </div>
      {/* Map Section End */}
    </>
  );
};

export default Contact;
