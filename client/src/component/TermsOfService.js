import React from "react";
import "./LegalPages.css";

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="text-center mb-4">Terms of Service</h1>
            <p>Last Updated: April, 2024</p>
            <p>
              By using the HealthVista mobile application (the "App") and
              related services, you agree to be bound by these Terms of Service.
            </p>
            <h2>Use of Services</h2>
            <p>
              - <strong>License:</strong> We grant you a limited, non-exclusive,
              non-transferable license to use the App for your personal use.
            </p>
            <p>
              - <strong>Prohibited Activities:</strong> You agree not to engage
              in any illegal or unauthorized activities while using the App,
              including but not limited to:
            </p>
            <ul>
              <li>Violating any laws or regulations</li>
              <li>Impersonating any person or entity</li>
              <li>Interfering with the operation of the App</li>
            </ul>
            <p>
              - <strong>Intellectual Property:</strong> All content and
              materials available through the App are the property of
              HealthVista or its licensors and are protected by copyright,
              trademark, and other intellectual property laws.
            </p>
            <h2>Disclaimer of Warranties</h2>
            <p>
              THE APP AND RELATED SERVICES ARE PROVIDED ON AN "AS IS" AND "AS
              AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED. WE DO NOT WARRANT THAT THE APP WILL BE ERROR-FREE OR
              UNINTERRUPTED.
            </p>
            <h2>Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL HEALTHVISTA BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING
              OUT OF OR IN CONNECTION WITH YOUR USE OF THE APP OR RELATED
              SERVICES.
            </p>
            <h2>Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of United States of America.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms of
              Service, please contact us at{" "}
              <a href="mailto:bfv12@txstate.edu">bfv12@txstate.edu</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
