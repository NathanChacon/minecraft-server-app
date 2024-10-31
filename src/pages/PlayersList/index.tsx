import React, { useEffect, useState } from 'react';
import './style.css'
import minecraftPotion from '../../assets/minecraftPotion.png';
import minecraftServer from '../../assets/minecraftServer.png';
import discord from '../../assets/discord.png'
import { getVisibleUsers } from '../../api/services/user';
import { ReactComponent as CopyIcon } from '../../assets/copyIcon.svg'

const PlayersList: React.FC = () => {
  const [users, setUsers] = useState<Array<any>>([])

  const [copyMessage, setCopyMessage] = useState('');

  // Function to copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Copiado!');
      setTimeout(() => setCopyMessage(''), 2000); // Clears message after 2 seconds
    });
  };

  const handleUsers = async () => {
    const visibleUsers = await getVisibleUsers()
    setUsers(visibleUsers)
  }


  useEffect(() => {
    handleUsers()
  }, [])


  return (
    <section className='players'>
    <header className='players__header'>
      <h1 className='players__header-title'>Jogadores Disponíveis para Aventura</h1>
      <h4 className='players__header-subtitle'>Aqui você encontra uma lista de jogadores brasileiros que também estão em busca de companheiros de aventura no Minecraft! Explore os perfis, leia as bios e escolha com quem gostaria de jogar. Se encontrar alguém com interesses parecidos, não hesite em entrar em contato!</h4>
    </header>
    <ul className='players__list'>
      {users.map(({
          uid,
          defaultName,
          name,
          profileImg,
          bio,
          discordId,
          serverIp,
      }) => (
        <li className='players__card' key={uid}>
          <header className='players__card-header'>
              <img src={profileImg} className='players__card-img'/>
              <div className=''>
              <h3 className='players__card-name'>
                {name || defaultName}
              </h3>
              <h4 className='players__card-bio'>
              {bio || ""}
            </h4>
            </div>
          </header>
          
          <ul className='players__card-options'>
            {/* Minecraft Server IP Field */}
            <li className='players__card-option'>
              <img src={minecraftServer} className='players__card-option-img'/>
              <p className='players__card-option-text'>IP Minecraft: </p>
              <p className='players__card-option-value'>
                {serverIp || "IP do servidor não disponível"}
                {serverIp && (
                  <CopyIcon 
                    onClick={() => copyToClipboard(serverIp)} 
                    className='players__card-option-icon'
                  />
                )}
              </p>
            </li>

            {/* Discord ID Field */}
            <li className='players__card-option'>
              <img src={discord} className='players__card-option-img'/>
              <p className='players__card-option-text'>Discord: </p>
              <p className='players__card-option-value'>
                {discordId || "Discord não disponível"}
                {discordId && (
                  <CopyIcon 
                    onClick={() => copyToClipboard(discordId)} 
                    className='players__card-option-icon'
                  />
                )}
              </p>
            </li>
          </ul>
          {copyMessage && <span className="players__copy-message">{copyMessage}</span>}
        </li>
      ))}
    </ul>
  </section>
);
};
export default PlayersList;