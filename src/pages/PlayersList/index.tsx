import React from 'react';
import './style.css'
import minecraftPotion from '../../assets/minecraftPotion.png';
import minecraftServer from '../../assets/minecraftServer.png';
import discord from '../../assets/discord.png'

const PlayersList: React.FC = () => {
  const players = [
    {
      name:"Nathan mine",
      version: "v1.5.5",
      mods: "test mod 1, test mod 2, test mod 3",
      serverIp: "123.333.222.44",
      discordServerInvite:"TEST",
      discordProfileId: "21323" 
    },
    {
      name:"Nathan mine",
      version: "v1.5.5",
      serverIp: "123.333.222.44",
      mods: "test mod 1, test mod 2, test mod 3",
      discordServerInvite:"TEST",
      discordProfileId: "21323" 
    }
  ];

  return (
    <section className='players'>
      <ul className='players__list'>
        {players.map((player, index) => (
          <li className='players__card' key={index}>
            <header className='players__card-header'>
              <img src={minecraftPotion} className='players__card-img'/>
              <h3 className='players__card-name'>
                {player.name}
              </h3>
            </header>
            <ul className='players__card-options'>
              <li className='players__card-option'>
                <img src={minecraftServer} className='players__card-option-img'/>
                <p className='players__card-option-text'>IP:</p>
                <p className='players__card-option-value'>{player.serverIp}</p>
              </li>

              <li className='players__card-option'>
                <img src={discord} className='players__card-option-img'/>
                <p className='players__card-option-text'>DISCORD:</p>
                <p className='players__card-option-value'>{player.discordServerInvite} | {player.discordProfileId}</p>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlayersList;