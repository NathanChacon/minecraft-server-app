import React, { useEffect, useState } from 'react';
import './style.css'
import minecraftPotion from '../../assets/minecraftPotion.png';
import minecraftServer from '../../assets/minecraftServer.png';
import discord from '../../assets/discord.png'
import { getVisibleUsers } from '../../api/services/user';
import { ReactComponent as CopyIcon } from '../../assets/copyIcon.svg'

const PlayersList: React.FC = () => {
  const [users, setUsers] = useState<Array<any>>([])

  const handleUsers = async () => {
    const visibleUsers = await getVisibleUsers()
    setUsers(visibleUsers)
  }


  useEffect(() => {
    handleUsers()
  }, [])


  return (
    <section className='players'>
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
              <li className='players__card-option'>
                <img src={minecraftServer} className='players__card-option-img'/>
                <p className='players__card-option-text'>ip minecraft: </p>
                <p className='players__card-option-value'>{serverIp}</p>
              </li>

              <li className='players__card-option'>
                <img src={discord} className='players__card-option-img'/>
                <p className='players__card-option-text'>discord: </p>
                <p className='players__card-option-value-discord'>
                  {discordId}

                  <CopyIcon className='players__card-option-icon'/>
                </p>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PlayersList;