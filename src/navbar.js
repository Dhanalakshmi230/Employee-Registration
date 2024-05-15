import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import Logo from "../src/assets/employeesimg.png"
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      {/* Image placed here */}
      <img src={Logo} alt="Logo" className="logo" />

      {/* Mobile menu toggle button */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
        <div className="menu-icon"></div>
      </div>

      {/* Navigation links */}
      <div className={`links ${menuOpen ? "open" : ""}`}>
        <Link to="/form" onClick={() => setMenuOpen(false)}><b>Employee Form</b></Link>
        <Link to="/list" onClick={() => setMenuOpen(false)}><b>Employee List</b></Link>
       
      </div>
    </div>
  );
}
