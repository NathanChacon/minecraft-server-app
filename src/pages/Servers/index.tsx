import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import Button from "../../components/Button";
import './style.css'
import { getUserById } from "../../api/services/user";
import { useUser } from "../../context/UserContext";
const Servers = () => {
  const {user} = useUser()

  const handleUserData = async () => {
    /*const userData = await getUserById(user?.uid || "")

    setUserCurrentSubscription(userData?.subscription)
    */
  }


  useEffect( () => {
    if(user){
      handleUserData()
    }
   
  }, [user])

  return (
    <section className="servers">
      <section className="servers__about">
        <div className="servers__about-left">
          <header className="servers__about-header">
              <h1 className="servers__about-title">Encontre os Melhores Servidores de Minecraft</h1>
          </header>
          <p className="servers__about-text">
            Descubra uma seleção incrível de servidores para todos os estilos de jogo. Conecte-se com comunidades ativas, explore mundos personalizados e participe de aventuras épicas.
          </p>
          <p className="servers__about-text">
          Tem um servidor? Publique-o agora e alcance novos jogadores, fortalecendo sua comunidade com facilidade!
          </p>
          <div className="servers__about-button-container">
            <Button>PUBLICAR SERVIDOR</Button>
          </div>
          
        </div>

        <div className="servers__about-right">
        </div>

      </section>
    </section>
 
)
};

export default Servers;
