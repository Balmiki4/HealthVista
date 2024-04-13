import facebook from "./img/icons/facebook.svg";
import twitter from "./img/icons/twitterx.svg";
import instagram from "./img/icons/instagram.svg";

const Footer = () => {
  return (
    <footer class="footer navbar-dark bg-dark mt-0 ">
      <div>
        <div class="col-md-12 text-center">
          <p class="footer__copyright">HealthVISTA &#169; 2024</p>
        </div>
      </div>
      <div className="footer-container">
        <div className="social-icons">
          <a
            href="https://www.facebook.com/profile.php?id=61557977626802"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebook} alt="Facebook" />
          </a>
          <a
            href="https://twitter.com/HealthVistas"
            target="_blank"
            rel="noreferrer"
          >
            <img src={twitter} alt="Twitter" />
          </a>
          <a
            href="https://www.instagram.com/health_vista/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagram} alt="Instagram" />
          </a>
        </div>
        <div className="legal-info">
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-service.html">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
