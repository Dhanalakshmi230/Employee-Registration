import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import Logo from "../src/assets/employeesimg.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar shadow p-3 mb-3 bg-body rounded">
    <div className="navbar-logo-title">
        <img src={Logo} alt="Logo" className="logo" />
        <h4><b>Employee Management Portal</b></h4>
      </div>
      {/* Mobile menu toggle button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>

      {/* Navigation links */}
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <NavLink 
          to="/" 
          exact 
          activeClassName="active" 
          onClick={() => setMenuOpen(false)}
        >
          <b>Create Employee</b>
        </NavLink>
        <NavLink 
          to="/list" 
          activeClassName="active" 
          onClick={() => setMenuOpen(false)}
        >
          <b>View Employee</b>
        </NavLink>
      </div>
    </div>
  );
}
