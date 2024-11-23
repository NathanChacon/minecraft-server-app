import React from 'react';
import './style.css'
import defaultImg from '../../assets/defaultServerImg.webp'
interface ServerCardProps {
  server: {
    imageUrl: string;
    title: string;
    description: string;
    ip: string;
    isVisible: boolean;
  };
  action?:{
    label: string,
    onClick: () => any
  } 
  showStatus?: boolean;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, action, showStatus = true,}) => {
  return (
    <div className="server-card">
      <img className="server-card__img" src={server?.imageUrl || defaultImg} alt={server.title} />
      <ul className="server-card__body">
        <li className="server-card__item">
          <p>Nome:</p> <p>{server?.title}</p>
        </li>
        <li className="server-card__item server-card__item--col">
          <p>Sobre:</p> <p className='server-card__item-description'>{server?.description}</p>
        </li>
        <li className="server-card__item">
          <p>Ip:</p> <p>{server?.ip}</p>
        </li>
        {showStatus && (
          <li className="server-card__item">
            <p>Status:</p> <p>{server?.isVisible ? 'Visível' : 'Invisível'}</p>
          </li>
        )}
      </ul>
      {
        action && (
          <div className="server-card__actions">
          <button className="server-card__edit-btn" onClick={action?.onClick}>
            {action?.label}
          </button>
        </div>
        )
      }

    </div>
  );
};

export default ServerCard;