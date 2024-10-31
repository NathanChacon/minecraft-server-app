import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.svg';
import { useUser } from '../../context/UserContext';
function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State to manage main menu visibility
  const { user, logout } = useUser();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
        
        {user ? (
          <>
            <div className="navbar__perfil" onClick={toggleMenu}>
              PERFIL
              <div className="navbar__perfil-dropdown">
                <Link to="/edit-profile" className="navbar__perfil-item">Editar</Link>
                <button onClick={logout} className="navbar__perfil-item navbar__perfil-item--button">Sair</button>
              </div>
            </div>
          </>
        ) : (
          <Link to="/login" className="navbar__item">ENTRAR</Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;