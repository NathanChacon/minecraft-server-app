import { Fragment, useEffect, useState } from "react";
import Button from "../../components/Button";
import './style.css';
import { getUserById } from "../../api/services/user";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import isValidSubscription from "../../utils/subscription";
import { getVisibleServers } from "../../api/services/server";
import ServerCard from "../../components/ServerCard";
import { Helmet } from "react-helmet";
import diamond from '../../assets/diamond_img.webp'
const Servers = () => {
  const { user } = useUser();
  const [userSubscriptionData, setUserSubscriptionData] = useState<any>(null);
  const [servers, setServers] = useState<any>([])
  const navigate = useNavigate();

  const handleUserSubscriptionData = async () => {
    const userData = await getUserById(user?.uid || "");
    setUserSubscriptionData(userData?.subscription);
  };

  const handleServers = async () => {
    const servers =  await getVisibleServers()
    setServers(servers)
  }

  useEffect(() => {
    if (user) {
      handleUserSubscriptionData();
    }
  }, [user]);


  useEffect(() => {
    handleServers()
  }, [])

  const handleOnClickPublishServer = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isValidSubscription(userSubscriptionData)) {
      navigate("/my-server")
    } else {
      navigate('/subscriptions');
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>Servidores</title>
      </Helmet>
      <section className="servers primary-bg">
        <section className="servers__about-container">
          <div className="servers__about">
            <div className="servers__about-left">
              <header className="servers__about-header">
                <h1 className="servers__about-title">
                  Encontre os Melhores Servidores de Minecraft
                </h1>
              </header>
              <p className="servers__about-text">
                Descubra uma seleção incrível de servidores para todos os estilos de jogo. Conecte-se com comunidades ativas,
                explore mundos personalizados e participe de aventuras épicas.
              </p>
              <p className="servers__about-text">
                Tem um servidor? Publique-o agora e alcance novos jogadores, fortalecendo sua comunidade com facilidade!
              </p>
              <div className="servers__about-button-container">
                <Button buttonType="cta" onClick={handleOnClickPublishServer}>PUBLICAR SERVIDOR</Button>
              </div>
            </div>
            <div className="servers__about-right">
              <div className="servers__about-overlay">
                <h2>Conecte-se. Explore. Jogue.</h2>
                <p>Uma experiência Minecraft personalizada, à espera de você.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="servers-list-container">
          {servers?.length > 0 ? (
            <ul className="servers-list">
              {servers.map((server: any) => (
                <li key={server.id} className="servers-list__item">
                  <ServerCard server={server} showStatus={false} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="servers-list__empty">
              <img className="servers-list__empty-icon" src={diamond}/>
              <p>Nenhum servidor publicado ainda. Seja o primeiro a publicar e alcance novos jogadores!</p>
            </div>
          )}
        </section>
      </section>
    </Fragment>

  );
};

export default Servers;
