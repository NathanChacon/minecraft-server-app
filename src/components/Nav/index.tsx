import { useState, useRef, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../../assets/logo.png';
import { useUser } from '../../context/UserContext';
import { useChatContext } from '../../context/ChatContext';
import NotificationCircle from '../NotificationCircle';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPerfilOpen, setIsPerfilOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const { setIsOpen: setIsChatOpen } = useChatContext();

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { roomsNotifications } = useChatContext();

  const hasNotification =
    roomsNotifications &&
    Object.values(roomsNotifications)?.some((room: any) => room?.hasNotification === true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const togglePerfilDropdown = () => {
    setIsPerfilOpen(!isPerfilOpen);
  };

  const handleClickMessages = () => {
    setIsOpen(false);
    setIsChatOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickingOnSidebar = sidebarRef?.current?.contains(event.target as Node);
      const isClickingOnBurguer = dropdownRef?.current?.contains(event.target as Node);

      if (sidebarRef.current && !isClickingOnSidebar && !isClickingOnBurguer) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <nav className="navbar">
      <div className="navbar__brand" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="navbar__logo" />
      </div>
      <div ref={dropdownRef} className="navbar__burger" onClick={toggleSidebar}>
        {isOpen ? '✖' : '☰'}
      </div>

      {/* Desktop Nav Menu */}
      <div className="navbar__dropdown">
        <Link to="/" className="navbar__item">HOME</Link>
        <Link to="/players" className="navbar__item">JOGADORES</Link>
        <Link to="/servers" className="navbar__item">SERVIDORES</Link>
        <Link to="/subscriptions" className="navbar__item">PLANOS</Link>
        <Link to="/help" className="navbar__item">AJUDA</Link>
        {user ? (
          <Fragment>
            <button
              onClick={handleClickMessages}
              className="navbar__item navbar__perfil-item--button navbar__perfil-item--notification"
            >
              MENSAGENS {hasNotification && <NotificationCircle />}
            </button>
            <div className="navbar__perfil" onClick={togglePerfilDropdown}>
              PERFIL
              {isPerfilOpen && (
                <div className="navbar__perfil-dropdown">
                  <Link to="/my-server" className="navbar__item">Meu Servidor</Link>
                  <Link to="/edit-profile" className="navbar__item">Editar</Link>
                  <button onClick={logout} className="navbar__item navbar__perfil-item--button">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </Fragment>
        ) : (
          <Link to="/login" className="navbar__item">ENTRAR</Link>
        )}
      </div>


      <div className={`sidebar ${isOpen ? 'open' : ''}`} ref={sidebarRef}>
        <Link to="/" className="sidebar__item">HOME</Link>
        <Link to="/players" className="sidebar__item">JOGADORES</Link>
        <Link to="/servers" className="sidebar__item">SERVIDORES</Link>
        <Link to="/subscriptions" className="sidebar__item">PLANOS</Link>
        <Link to="/help" className="sidebar__item">AJUDA</Link>
        {user ? (
          <Fragment>
            <button
              onClick={handleClickMessages}
              className="sidebar__item sidebar__item--button"
            >
              MENSAGENS {hasNotification && <NotificationCircle />}
            </button>
            <div className="sidebar__perfil">
              <div className="sidebar__perfil-toggle">PERFIL</div>
              <Link to="/my-server" className="sidebar__perfil-item">Meu Servidor</Link>
              <Link to="/edit-profile" className="sidebar__perfil-item">Editar</Link>
              <button onClick={logout} className="sidebar__perfil-item sidebar__perfil-item--button">
                Sair
              </button>
            </div>
          </Fragment>
        ) : (
          <Link to="/login" className="sidebar__item">ENTRAR</Link>
        )}
      </div>
    </nav>
  );
}

export default Nav;