import React from "react";
import facebook from "./img/icons/facebook.svg";
import twitter from "./img/icons/twitterx.svg";
import instagram from "./img/icons/instagram.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3 mb-md-0">
            <p className="mb-0 footer__copyright">HealthVISTA &copy; 2024</p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-md-end social-icons">
              <a
                href="https://www.facebook.com/profile.php?id=61557977626802"
                target="_blank"
                rel="noreferrer"
                className="text-white mr-3"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                href="https://twitter.com/HealthVistas"
                target="_blank"
                rel="noreferrer"
                className="text-white mr-3"
              >
                <img src={twitter} alt="Twitter" />
              </a>
              <a
                href="https://www.instagram.com/health_vista/"
                target="_blank"
                rel="noreferrer"
                className="text-white"
              >
                <img src={instagram} alt="Instagram" />
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center legal-info">
            <a href="privacy-policy.html" className="text-white mr-3">
              Privacy Policy
            </a>
            <div className="footer-separator"></div>
            <a href="terms-of-service.html" className="text-white ml-3">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
