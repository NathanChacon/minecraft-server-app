import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './style.css'; // Import the CSS file for styling
import logo from '../../assets/logo.svg'; // Update this with the actual path to your logo image

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the dropdown menu
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="Logo" className="navbar__logo" /> {/* Logo image */}
        MyApp
      </div>
      <div className="navbar__burger" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'} {/* Burger icon or close icon */}
      </div>
      <div className={`navbar__dropdown ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="navbar__item">HOME</Link>
        <Link to="/jogadores" className="navbar__item">JOGADORES</Link>
        <Link to="/duvidas" className="navbar__item">DUVIDAS</Link>
        <Link to="/entrar" className="navbar__item">ENTRAR</Link>
      </div>
    </nav>
  );
}

export default Nav;