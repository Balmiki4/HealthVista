import React from "react";
import "./LegalPages.css";

const Privacy = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mb-4">Privacy Policy</h1>
            <p>Last Updated: April, 2024</p>
            <p>
              Thank you for choosing HealthVista! This Privacy Policy explains
              how we collect, use, and disclose information about you when you
              use our mobile application and related services (collectively, the
              "Services").
            </p>
            <h2>Information We Collect</h2>
            <p>
              Personal Information: We collect personal information you provide
              directly to us, such as your name, email address, and
              health-related information.
            </p>
            <p>
              Usage Information: We automatically collect usage information
              about how you interact with our Services, such as the pages you
              visit and the features you use.
            </p>
            <p>
              Device Information: We may collect information about your mobile
              device, including the hardware model, operating system, and unique
              device identifiers.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              Provide and Improve Services: We use the information we collect to
              provide and improve our Services, personalize your experience, and
              understand how users interact with our app.
            </p>
            <p>
              Communicate with You: We may use your information to communicate
              with you, such as sending you updates and notifications about your
              account or the Services.
            </p>
            <p>
              Legal Compliance: We may use your information to comply with
              applicable laws, regulations, and legal processes.
            </p>
            <h2>Information Sharing</h2>
            <p>
              Third-Party Service Providers: We may share your information with
              third-party service providers who perform services on our behalf,
              such as hosting, analytics, and customer support.
            </p>
            <p>
              Legal Compliance: We may disclose your information in response to
              legal requests, court orders, or to comply with applicable laws
              and regulations.
            </p>
            <h2>Your Choices</h2>
            <p>
              Account Information: You may update or correct your account
              information at any time by logging into your account settings.
            </p>
            <p>
              Opt-Out: You may opt-out of receiving promotional emails from us
              by following the instructions provided in the email.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy or
              practices, please contact us at{" "}
              <a href="mailto:bfv12@txstate.edu">bfv12@txstate.edu</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
