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
import TagList from './components/TagsList';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import mineQuestionMarkImg from '../../assets/mineQuestionMark.svg'

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
      <h1 className='players__header-title'>Jogadores Disponíveis para Aventura</h1>
      <p className='players__header-subtitle'>Aqui você encontra uma lista de jogadores brasileiros que também estão em busca de companheiros de aventura no Minecraft! Explore os perfis, leia as bios e escolha com quem gostaria de jogar. Se encontrar alguém com interesses parecidos, não hesite em entrar em contato!</p>
      <p className="players__header-subtitle"> Para aparecer na lista de jogadores e ser encontrado por outros minecrafters, basta ir até o seu perfil e selecionar a opção <strong>"Ficar Visível"</strong>. Assim, você se tornará visível para outros usuários e poderá começar a fazer novas amizades no jogo!</p>
      <Button onClick={() => {navigate("/edit-profile")}}>FICAR VISÍVEL</Button>
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
          availableDays = []
      }) => {

        const selectedOre = userOres && ores.find(({value}) => value === userOres)

        const formattedGameModes = gameModes?.map((gameMode: any) => {
            return localGameModes.find(({value}) => value === gameMode)
        })

        const formattedAvailableDays = availableDays?.map((day: any) => {
          return daysOfWeek.find(({value}) => value === day)
      })
        return (
          <li className='players__card' key={uid}>
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

          <div>
            <h4>Modos de jogo</h4>
            <TagList tags={formattedGameModes?.map((mode:any) => mode?.label || "n/a") || [] } maxVisible={3} />
          </div>

          <div>
            <h4>Dias disponível</h4>
            <TagList tags={formattedAvailableDays?.map((day:any) => day?.label || "n/a") || [] } maxVisible={3} />
          </div>

          <div>
            <h4>Minério Favorito</h4>
            {
              selectedOre ? <img  className='players__card-ore players__card-ore--bounce' src={selectedOre.img}></img> : <img  className='players__card-ore' src={mineQuestionMarkImg}/>
            }
          </div>
          

          <div className='players__card-button-container'>
            {user?.uid !== uid && <Button onClick={() => {
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