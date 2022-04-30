import React from 'react'
import "./Header.css";

const Header = () => {
  return (
    <section className='home-section'>
      <nav>
        <div className="sidebar-button">
          <i className='bx bx-menu sidebarBtn'></i>
          <span className="dashboard">Dashboard</span>
        </div>
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <i className='bx bx-search'></i>
        </div>

        <div className="dropdown">
          <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
            {/* {user.email} */}
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><a className="dropdown-item" href="#">Logout</a></li>
            <li><a className="dropdown-item" href="#">Help</a></li>
          </ul>
        </div>
      </nav>
    </section>
  )
}

export default Header;