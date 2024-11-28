import React, { useEffect, useState } from 'react';
import './style.css'
import discord from '../../assets/discord.png'
import { getVisibleUsers } from '../../api/services/user';
import { ReactComponent as CopyIcon } from '../../assets/copyIcon.svg'
import PlayerProfileImage from './components/PlayerProfileImage';
import useFilter from './hooks/useFilter';
import useChat from './hooks/useChat';
import Button from '../../components/Button';
import { useUser } from "../../context/UserContext"
import FilterSidebar from './components/FilterSidebar';
import { gameModes as localGameModes, daysOfWeek, ores} from '../../constants';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import mineQuestionMarkImg from '../../assets/questionMark.svg'
import TagsHeader from './components/TagsHeader';


  const PlayerActivityStatus = ({ isActive, lastTimeActive }: any) => {

    const getFormattedLastSeen = (timestamp: { seconds: number, nanoseconds: number }) => {
      const { seconds, nanoseconds } = timestamp;
      
      const timestampMs = (seconds * 1000) + (nanoseconds / 1000000); 
      

      const lastSeenDate = new Date(timestampMs);
      
   
      const currentDate = new Date();
      
     
      const diffTime = currentDate.getTime() - lastSeenDate.getTime(); 
      
      
      const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));
      
      
      if (diffDays < 1) {
        return `Visto por último hoje`;
      } else if (diffDays <= 10) {
        return `Visto por último há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
      } else {
        return `Visto por último há mais de 10 dias`;
      }
    };

  const getLastActiveMessage = () => {
    if (!lastTimeActive) return "Offline";
    return getFormattedLastSeen(lastTimeActive)
  };

  return (
    <section className='player-status-container'>
      <div
        className={`player-status ${isActive ? "player-status--online" : "player-status--offline"}`}
        aria-label={isActive ? "Usuário online" : getLastActiveMessage()}
      >
        {isActive ? <span>Online</span> : <span>{getLastActiveMessage()}</span>}
      </div>
    </section>

  );
};

const PlayersList: React.FC = () => {
  const {user} = useUser()
  const [users, setUsers] = useState<Array<any>>([])
  const navigate = useNavigate()
  const {handleOnFilter, filteredUsers} = useFilter({users, setUsers})
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const {handleStartChat} = useChat()
  
  const formattedUsers = filteredUsers?.length > 0 ? filteredUsers : users
  const [copyMessageCardId, setCopyMessageCardId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, userId: string) => {

    try{
      if(navigator?.clipboard?.writeText){
        await navigator.clipboard.writeText(text);
        setCopyMessageCardId(userId);
        setTimeout(() => setCopyMessageCardId(null), 2000)
      }
      else{
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopyMessageCardId(userId);
        setTimeout(() => setCopyMessageCardId(null), 2000);
      }

    }
    catch(error){
      console.error("Copy to clipboard failed:", error);
    }
  };

  const handleUsers = async () => {
    const visibleUsers = await getVisibleUsers()
    setUsers(visibleUsers)
  }


  useEffect(() => {
    handleUsers()
  }, [])


  return (
    <>
      <Helmet>
        <title>Jogadores</title>
      </Helmet>

    <section className='players primary-bg'>
      <header className='players__header'>
          <h1 className='players__header-title'>Jogadores para Aventura</h1>
          <p className='players__header-subtitle'>
            Encontre jogadores no Minecraft! Explore perfis e entre em contato com quem combina com você.
          </p>
          <p className="players__header-subtitle">
            Para aparecer na lista, ative <strong>"Ficar Visível"</strong> no seu perfil.
          </p>
          <Button buttonType='cta' onClick={() => {navigate("/edit-profile")}}>FICAR VISÍVEL</Button>
      </header>
    <div className='players__filters'>
      <Button onClick={() => {
        setIsFiltersOpen((value) => !value)
      }}>Ver Filtros</Button>
    </div>
    <ul className='players__list'>
      {formattedUsers.map(({
          uid,
          defaultName,
          name,
          profileImg,
          bio,
          discordId,
          ores: userOres,
          gameModes = [],
          availableDays = [],
          activity,
      }) => {

        const isUserActive = activity?.isActive
        const lastTimeActive = activity?.lastTimeActive

        const selectedOre = userOres && ores.find(({value}) => value === userOres)

        const formattedGameModes = gameModes?.map((gameMode: any) => {
            return localGameModes.find(({value}) => value === gameMode)
        })

        const formattedAvailableDays = availableDays?.map((day: any) => {
          return daysOfWeek.find(({value}) => value === day)
      })

        return (
          <li className='players__card' key={uid}>
           <PlayerActivityStatus isActive={isUserActive} lastTimeActive={lastTimeActive}/>
          <header className='players__card-header'>
              <PlayerProfileImage profileImg={profileImg}  name={name || defaultName}/>
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
              <img src={discord} className='players__card-option-img'/>
              <p className='players__card-option-text'>Discord: </p>
              <p className='players__card-option-value'>
                {discordId || "Discord não disponível"}
                {discordId && (
                  <CopyIcon 
                    onClick={() => copyToClipboard(discordId, uid)} 
                    className='players__card-option-icon'
                  />
                )}
              </p>
            </li>
          </ul>
        <div className='players__card-more-info'>
        <div className="players__card-info">
          <TagsHeader label="Modos de jogo" tags={formattedGameModes}/>
        </div>

        <div className="players__card-info">
          <TagsHeader label="Dias disponível" tags={formattedAvailableDays}/>
        </div>

            <div className='players__card-info players__card-info--ore'>
              <h4>Minério Favorito</h4>
              <span>
              {
                selectedOre ? <img  className='players__card-ore players__card-ore--bounce' src={selectedOre.img}></img> : <img  className='players__card-ore' src={mineQuestionMarkImg}/>
              }
              </span>

            </div>
        </div>

          

          <div className='players__card-button-container'>
            {user?.uid !== uid && <Button buttonType='cta' onClick={() => {
              if(user && user?.uid){
                handleStartChat(uid)
              }
              else{
                navigate("/login")
              }
              
              }}>CONVERSAR</Button>}
          </div>
          {copyMessageCardId === uid && <span className="players__copy-message">Copiado!</span>}
        </li>
      )
      })
      }

    </ul>
    <FilterSidebar onFilter={(filters:any) => {handleOnFilter(filters)}} setIsOpen={setIsFiltersOpen} isOpen={isFiltersOpen}/>
  </section>
    </>

);
};
export default PlayersList;