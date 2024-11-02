import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.svg';
import { useUser } from '../../context/UserContext';

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const [isPerfilOpen, setIsPerfilOpen] = useState(false); // State to manage "Perfil" dropdown visibility
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePerfilDropdown = () => {
    setIsPerfilOpen(!isPerfilOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand" onClick={() => { navigate('/') }}>
        <img src={logo} alt="Logo" className="navbar__logo" />
      </div>
      <div className="navbar__burger" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* Desktop Nav Menu */}
      <div className="navbar__dropdown">
        <Link to="/" className="navbar__item">HOME</Link>
        <Link to="/players" className="navbar__item">JOGADORES</Link>
        <Link to="/help" className="navbar__item">AJUDA</Link>

        {user ? (
          <div className="navbar__perfil" onClick={togglePerfilDropdown}>
            PERFIL
            {isPerfilOpen && (
              <div className="navbar__perfil-dropdown">
                <Link to="/edit-profile" className="navbar__item">Editar</Link>
                <button onClick={logout} className="navbar__item navbar__perfil-item--button">Sair</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="navbar__item">ENTRAR</Link>
        )}
      </div>

      {/* Sidebar for Mobile */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="sidebar__item">HOME</Link>
        <Link to="/players" className="sidebar__item">JOGADORES</Link>
        <Link to="/help" className="sidebar__item">AJUDA</Link>

        {user ? (
          <div className="sidebar__perfil">
            <div className="sidebar__perfil-toggle">PERFIL</div>
            <Link to="/edit-profile" className="sidebar__perfil-item">Editar</Link>
            <button onClick={logout} className="sidebar__perfil-item sidebar__perfil-item--button">Sair</button>
          </div>
        ) : (
          <Link to="/login" className="sidebar__item">ENTRAR</Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;