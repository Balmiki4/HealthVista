// Privacy.js
import React from "react";
import "./LegalPages.css";
import { FaEnvelope } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="legal-page-wrapper">
      <div className="legal-page-container">
        <div className="legal-page-header">
          <h1 className="legal-page-title">Privacy Policy</h1>
          <p className="legal-page-updated">Last Updated: April, 2024</p>
        </div>
        <p className="legal-page-intro">
          Thank you for choosing HealthVista! This Privacy Policy explains how
          we collect, use, and disclose information about you when you use our
          mobile application and related services (collectively, the
          "Services").
        </p>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Information We Collect</h2>
          <ul className="legal-page-list">
            <li>
              <strong>Personal Information:</strong> We collect personal
              information you provide directly to us, such as your name, email
              address, and health-related information.
            </li>
            <li>
              <strong>Usage Information:</strong> We automatically collect usage
              information about how you interact with our Services, such as the
              pages you visit and the features you use.
            </li>
            <li>
              <strong>Device Information:</strong> We may collect information
              about your mobile device, including the hardware model, operating
              system, and unique device identifiers.
            </li>
          </ul>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">
            How We Use Your Information
          </h2>
          <p className="legal-page-paragraph">
            <strong>Provide and Improve Services:</strong> We use the
            information we collect to provide and improve our Services,
            personalize your experience, and understand how users interact with
            our app.
          </p>
          <p className="legal-page-paragraph">
            <strong>Communicate with You:</strong> We may use your information
            to communicate with you, such as sending you updates and
            notifications about your account or the Services.
          </p>
          <p className="legal-page-paragraph">
            <strong>Legal Compliance:</strong> We may use your information to
            comply with applicable laws, regulations, and legal processes.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Information Sharing</h2>
          <p className="legal-page-paragraph">
            <strong>Third-Party Service Providers:</strong> We may share your
            information with third-party service providers who perform services
            on our behalf, such as hosting, analytics, and customer support.
          </p>
          <p className="legal-page-paragraph">
            <strong>Legal Compliance:</strong> We may disclose your information
            in response to legal requests, court orders, or to comply with
            applicable laws and regulations.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Your Choices</h2>
          <p className="legal-page-paragraph">
            <strong>Account Information:</strong> You may update or correct your
            account information at any time by logging into your account
            settings.
          </p>
          <p className="legal-page-paragraph">
            <strong>Opt-Out:</strong> You may opt-out of receiving promotional
            emails from us by following the instructions provided in the email.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Data Retention</h2>
          <p className="legal-page-paragraph">
            <strong>Duration of Data Storage:</strong> We will retain your
            personal information for as long as necessary to provide the
            Services and fulfill the purposes outlined in this Privacy Policy,
            unless a longer retention period is required or permitted by law.
          </p>
          <p className="legal-page-paragraph">
            <strong>Deletion of Information:</strong> You may request the
            deletion of your personal information at any time by contacting us.
            We will comply with your request, subject to certain exceptions
            provided by law.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Security</h2>
          <p className="legal-page-paragraph">
            <strong>Measures to Protect Data:</strong> We implement appropriate
            technical and organizational measures to protect the personal
            information we collect against unauthorized access, use, or
            disclosure.
          </p>
          <p className="legal-page-paragraph">
            <strong>Limitation of Liability:</strong> While we strive to
            safeguard your information, we cannot guarantee the absolute
            security of your data. You acknowledge and agree that you use our
            Services at your own risk.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">Contact Us</h2>
          <div className="contact-information">
            <h3 className="contact-subtitle">Write us by mail</h3>
            <a href="mailto:bfv12@txstate.edu" className="contact-description">
              <FaEnvelope className="contact-icon" />
              <span>bfv12@txstate.edu</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
