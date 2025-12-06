import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/logo.png";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-logo">
              <Link to="/">
                <img src={Logo} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="row pb-50">
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h5>Location</h5>
              <div className="widget-text">
                <i className="lnr lnr-map-marker"></i>
                <p>
                  Bull temple road
                  <br />
                  Banglore
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h5>Reception</h5>
              <div className="widget-text">
                <i className="lnr lnr-phone-handset"></i>
                <p>+91 603-535-4592</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h5>Shuttle Service</h5>
              <div className="widget-text">
                <i className="lnr lnr-phone-handset"></i>
                <p>+91 603-535-4592</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6">
            <div className="single-footer-widget">
              <h5>Restaurant</h5>
              <div className="widget-text">
                <i className="lnr lnr-phone-handset"></i>
                <p>+91 603-535-4592</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="copyright-text">
            Copyright &copy;{new Date().getFullYear()} All rights reserved |
          </div>
          <div className="privacy-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <a href="#">Photo Requests</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
