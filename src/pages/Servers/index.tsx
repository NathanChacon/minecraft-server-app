import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";
import Button from "../../components/Button";
import './style.css'
import { getUserById } from "../../api/services/user";
import { useUser } from "../../context/UserContext";
const Servers = () => {
  const [loading, setLoading] = useState(false);
  const [userCurrentSubscription, setUserCurrentSubscription] = useState<any>(null)
  const {user} = useUser()
  console.log("test", userCurrentSubscription)
  const handleUserData = async () => {
    const userData = await getUserById(user?.uid || "")

    setUserCurrentSubscription(userData?.subscription)
  }


  useEffect( () => {
    if(user){
      handleUserData()
    }
   
  }, [user])

  const handlePublishServer = async () => {
    setLoading(true);
    const user = getAuth().currentUser;
    console.log("works", user)
    if (!user) {
      alert("You must be logged in to publish a server.");
      setLoading(false);
      return;
    }

    const functions = getFunctions();
    const createPaymentLink = httpsCallable(functions, 'createStripeSession');

    console.log("test", createPaymentLink)

    try {
      const result:any = await createPaymentLink({ userId: user.uid, email: user.email });
      const paymentLink = result.data.paymentLink;

      window.location.href = paymentLink;
    } catch (error) {
      console.error('Error creating payment link:', error);
      alert("There was an error processing the payment link.");
    }
    setLoading(false);
  };

  const handleCancelInvoice = async () => {

    setLoading(true);
    const user = getAuth().currentUser;

    if (!user) {
      alert("You must be logged in to publish a server.");
      setLoading(false);
      return;
    }

    const functions = getFunctions();
    const handleCancelSubscription = httpsCallable(functions, 'handleCancelSubscription');

    try{
      console.log(userCurrentSubscription)
      await handleCancelSubscription({subscriptionId: userCurrentSubscription.subscriptionId})

      console.log("success deleting subscription")
    }
    catch(error){   
      console.log(error)
    }

  }

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
            <Button onClick={handlePublishServer}>PUBLICAR SERVIDOR</Button>
          </div>
          
        </div>

        <div className="servers__about-right">
        </div>

      </section>
        <Button onClick={handlePublishServer}>Criar assinatura</Button>
        <Button onClick={handleCancelInvoice}>Deletar assinatura</Button>
    </section>
 
)
};

export default Servers;
