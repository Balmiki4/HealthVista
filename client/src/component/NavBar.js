import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div class="container-fluid d-flex justify-content-between m-0 w-100">
        <Link class="navbar-brand m-0" to="/">
          <h1>
            <strong>Health</strong>
            <strong className="vista">Vista</strong>
          </h1>
        </Link>
        <ul class="navbar-nav m-0">
          <li class="nav-item">
            <a class="nav-link" href="/Vista">
              Vista
            </a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle bg-dark"
              href="#"
              id="trackersDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Trackers
            </a>
            <ul
              class="dropdown-menu bg-dark"
              aria-labelledby="trackersDropdown"
            >
              <li>
                <a class="dropdown-item" href="/medication">
                  Medication Tracker
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/Nutrition">
                  Nutrition Tracker
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/map">
                  Hospital Tracker
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle bg-dark"
              href="#"
              id="trackersDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Wellness Hub
            </a>
            <ul
              class="dropdown-menu bg-dark"
              aria-labelledby="trackersDropdown"
            >
              <li>
                <a class="dropdown-item" href="/Article">
                  Health Articles
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="/wellnesspage">
                  Exercise Videos
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/insurancepage">
              Insurance Recommender
            </a>
          </li>
        </ul>
        <div className="logins">
          <Link to="/signup">
            <button class="btn btn-outline-light me-2">Sign Up</button>
          </Link>
          <Link to="/login">
            <button class="btn btn-dark">Sign In</button>
          </Link>
          <Link to="/profileSettings">
            <button class="btn btn-dark">Profile</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
