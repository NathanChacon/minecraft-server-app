import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.svg';

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State to manage main menu visibility
  const [perfilDropdownOpen, setPerfilDropdownOpen] = useState(false); // State to manage profile dropdown

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const togglePerfilDropdown = () => {
    setPerfilDropdownOpen(!perfilDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__burger" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <div className={`navbar__dropdown ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="navbar__item">HOME</Link>
        <Link to="/players" className="navbar__item">JOGADORES</Link>
        <Link to="/help" className="navbar__item">DUVIDAS</Link>
        <Link to="/login" className="navbar__item">ENTRAR</Link>
        
        {/* Perfil dropdown */}
        <div className="navbar__item navbar__perfil" onClick={togglePerfilDropdown}>
          PERFIL
          <div className={`navbar__perfil-dropdown ${perfilDropdownOpen ? 'open' : ''}`}>
            <Link to="/edit-profile" className="navbar__perfil-item">Editar</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;