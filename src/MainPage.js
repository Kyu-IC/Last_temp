import React from 'react';
import './main.css'; // Ensure the CSS is updated

function MainPage() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">NotAFacebook</a>  {/* Logo link */}
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />  {/* Search bar */}
          <i className="fa fa-search search-icon"></i> {/* Magnifying glass icon */}
        </div>

        <ul className="navbar-links">
          <li><a href="/sign-in">Sign In</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default MainPage;
