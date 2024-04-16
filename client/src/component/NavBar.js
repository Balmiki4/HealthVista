import "./Navbar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  const user_id = sessionStorage.getItem('user_id');  
  const isLoggedIn = !!user_id;


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid d-flex justify-content-between m-0 w-100">
        <Link className="navbar-brand m-0" to="/">
          <h1>
            <strong>Health</strong>
            <strong className="vista">Vista</strong>
          </h1>
        </Link>

        {isLoggedIn && (
          <ul className="navbar-nav m-0">
            <li className="nav-item">
              <a className="nav-link" href="/Vista">
                Vista
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle bg-dark"
                href="#"
                id="trackersDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Trackers
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="trackersDropdown">
                <li>
                  <a className="dropdown-item" href="/medication">
                    Medication Tracker
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/Nutrition">
                    Nutrition Tracker
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/map">
                    Hospital Tracker
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle bg-dark"
                href="#"
                id="trackersDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Wellness Hub
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="trackersDropdown">
                <li>
                  <a className="dropdown-item" href="/Article">
                    Health Articles
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/wellnesspage">
                    Exercise Videos
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/insurancepage">
                Insurance Recommender
              </a>
            </li>
          </ul>
          
        )}
        {isLoggedIn && (
          <ul className="navbar-nav m-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle bg-dark "
                href="#"
                id="trackersDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                username
              </a>
              <ul className="dropdown-menu bg-dark" aria-labelledby="trackersDropdown" style={{marginLeft: -37 , paddingRight:0}}>
                <li>
                  <a className="dropdown-item">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" >
                    logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        )} 
        {!isLoggedIn && (
          <div className="logins">
            <Link to="/signup">
              <button className="btn btn-outline-light me-2">Sign Up</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-dark">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;