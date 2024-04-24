import React from "react";
import { Link } from "react-router-dom";
import facebook from "../img/icons/facebook.svg";
import twitter from "../img/icons/twitterx.svg";
import instagram from "../img/icons/instagram.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
        <div className="row align-items-center">
        <div className="row mt-2">
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

          <div className="pri col-12 d-flex justify-content-center legal-info mb-100 ">
            <Link to="/Privacy" className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
              Privacy Policy
            </Link>
            <div className="footer-separator"></div>
            <Link to="/TermsOfService" className="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
              Terms of Service
            </Link>
          </div>
        </div>
    </footer>
  );
};

export default Footer;
