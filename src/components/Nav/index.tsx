import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.svg';
const Nav: React.FC = () => {
  return (
    <nav className="nav">
      <div className="nav__content">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        {/* Navigation Links */}
        <ul className="nav__links">
          <li className='nav__link'>
            <Link to="/">Home</Link>
          </li>
          <li className='nav__link'>
            <Link to="/servers">Servidores</Link>
          </li>
          <li className='nav__link'>
            <Link to="/login">Entrar</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
