// Homepage/PrivacyPolicy.js
import React from "react";
import './PrivacyPolicy.css'; // Import the CSS file

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-header">
        <h2>Privacy Policy</h2>
        <p>Your privacy is important to us. This document explains how we collect and use your personal data.</p>
      </div>

      <div className="privacy-policy-content">
        <section className="privacy-policy-section">
          <h3 className="section-title">1. Information We Collect</h3>
          <p>
            We collect various types of information to provide better services to our customers. The types of information we collect include:
          </p>
          <ul>
            <li>Contact Information: Name, email, phone number</li>
            <li>Booking Information: Dates of stay, room type, payment details</li>
            <li>Preferences: Requests for specific accommodations, services, or amenities</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">2. How We Use Your Information</h3>
          <p>
            The information we collect is used for the following purposes:
          </p>
          <ul>
            <li>To process your booking and provide you with services</li>
            <li>To improve the user experience on our website and customize content</li>
            <li>To send promotional emails or updates (you can opt-out at any time)</li>
            <li>To contact you in case of booking modifications or cancellations</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">3. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and other tracking technologies to enhance your experience on our site. Cookies are small files stored on your device that help us recognize you and personalize your experience.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">4. Data Security</h3>
          <p>
            We take reasonable steps to ensure that your personal data is protected from unauthorized access, alteration, or disclosure. However, no security system is 100% secure, and we cannot guarantee the absolute security of your data.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">5. Sharing Your Information</h3>
          <p>
            We do not sell or share your personal information with third parties, except in the following cases:
          </p>
          <ul>
            <li>To third-party service providers who help us deliver our services (e.g., payment processors, booking partners, etc.)</li>
            <li>If required by law, such as responding to legal requests or protecting our rights</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">6. Your Rights</h3>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data (subject to certain legal limitations)</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">7. Children’s Privacy</h3>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">8. Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. Any changes will be posted on this page, and the “Last Updated” date will be revised accordingly.
          </p>
        </section>

        <section className="privacy-policy-section">
          <h3 className="section-title">9. Contact Us</h3>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@[hotelname].com
            <br />
            Phone: +91 603-535-4592
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
