// TermsOfService.js
import React from "react";
import "./LegalPages.css";
import { FaFile } from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="legal-page-wrapper">
      <div className="legal-page-container">
        <div className="legal-page-header">
          <h1 className="legal-page-title">Terms of Service</h1>
          <p className="legal-page-updated">Last Updated: April, 2024</p>
        </div>
        <p className="legal-page-intro">
          Welcome to HealthVista! By using our web application and related
          services (collectively, the "Services"), you agree to be bound by
          these Terms of Service. Please read these terms carefully before using
          our Services.
        </p>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">1. Use of the Services</h2>
          <p className="legal-page-paragraph">
            <strong>Eligibility:</strong> You must be at least 18 years old to
            use our Services. By using our Services, you represent and warrant
            that you are of legal age to form a binding contract.
          </p>
          <p className="legal-page-paragraph">
            <strong>Acceptable Use:</strong> You agree to use our Services only
            for lawful purposes and in a way that does not infringe on the
            rights of others or restrict or inhibit anyone else's use and
            enjoyment of the Services.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">2. User Content</h2>
          <p className="legal-page-paragraph">
            <strong>User Content:</strong> Any content you upload, submit, or
            post to the Services is considered "User Content." You retain
            ownership of your User Content, but you grant us a license to use it
            as described in these Terms.
          </p>
          <p className="legal-page-paragraph">
            <strong>License to User Content:</strong> By submitting User
            Content, you grant us a worldwide, non-exclusive, royalty-free
            license to use, reproduce, distribute, and display the User Content
            in connection with the operation and improvement of the Services.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">3. Intellectual Property</h2>
          <p className="legal-page-paragraph">
            <strong>HealthVista's Intellectual Property:</strong> The Services,
            including all content, features, and functionality, are owned by
            HealthVista and are protected by applicable intellectual property
            laws.
          </p>
          <p className="legal-page-paragraph">
            <strong>Trademarks:</strong> HealthVista, the HealthVista logo, and
            all related names, logos, product and service names, designs, and
            slogans are trademarks of HealthVista or its affiliates.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">4. Termination</h2>
          <p className="legal-page-paragraph">
            <strong>Termination by You:</strong> You may stop using the Services
            at any time by deleting your account or discontinuing use of the
            Services.
          </p>
          <p className="legal-page-paragraph">
            <strong>Termination by HealthVista:</strong> We reserve the right to
            suspend or terminate your access to the Services at any time for any
            reason, including if we reasonably believe you have violated these
            Terms of Service.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">5. Disclaimers</h2>
          <p className="legal-page-paragraph">
            <strong>No Warranties:</strong> The Services are provided "as is"
            and without warranties of any kind, either express or implied.
            HealthVista does not guarantee that the Services will be error-free
            or uninterrupted.
          </p>
          <p className="legal-page-paragraph">
            <strong>Limitation of Liability:</strong> In no event shall
            HealthVista be liable for any indirect, special, incidental, or
            consequential damages related to your use of the Services.
          </p>
        </div>

        <div className="legal-page-section">
          <h2 className="legal-page-section-title">6. Contact Us</h2>
          <div className="contact-information">
            <h3 className="contact-subtitle">Have a question?</h3>
            <a href="mailto:bfv12@txstate.edu" className="contact-description">
              <FaFile className="contact-icon" />
              <span>Contact us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
