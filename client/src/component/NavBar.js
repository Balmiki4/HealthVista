import React from 'react'

import './Navbar.css'
const NavBar = () => {
    return (
<nav class="navbar navbar-expand-lg navbar-light bg-white ">
  <div class="container-fluid d-flex justify-content-between m-0 w-100"> 
    <a class="navbar-brand m-0" href="#"><h1><strong>Health</strong><strong className='vista'>Vista</strong></h1></a>
    <ul class="navbar-nav m-0">
      <li class="nav-item">
        <a class="nav-link " aria-current="page" href="#">Medical Dashboard</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="trackersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Trackers
        </a>
        <ul class="dropdown-menu" aria-labelledby="trackersDropdown">
          <li><a class="dropdown-item" href="#">Tracker 1</a></li>
          <li><a class="dropdown-item" href="#">Tracker 2</a></li>
          <li><a class="dropdown-item" href="#">Tracker 3</a></li>
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Wellness Hub</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Vista</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Blog</a>
      </li>
    </ul>
    <div className='logins'>
      <button class="btn btn-outline-success me-2">Signup</button>
      <button class="btn btn-secondary">Sign In</button>
    </div>
  </div>
</nav>

    )
}

export default NavBar