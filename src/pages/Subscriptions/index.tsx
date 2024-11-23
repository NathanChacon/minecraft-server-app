import { useEffect, useState } from 'react';
import Button from '../../components/Button'
import { useUser } from '../../context/UserContext';
import './style.css'
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../api/services/user';
const Subscriptions = () => {
    const {user} = useUser()
    const navigate = useNavigate();
    const [userSubscriptionData, setUserSubscriptionData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const showSubscribeButton = !userSubscriptionData || userSubscriptionData?.status === "canceled"

    const handleUserSubscriptionData = async () => {
        const userData = await getUserById(user?.uid || "")
        setUserSubscriptionData(userData?.subscription)
    }


    useEffect(() => {
        if(user){
            handleUserSubscriptionData()
        }
       
    }, [user])



    const handleCreateCheckoutSession = async () => {
        if (!user) {
            navigate("/login")
            return
        }

        setIsLoading(true)
    
        const functions = getFunctions();
        const createPaymentLink = httpsCallable(functions, 'createStripeSession');
    
    
        try {
          const result:any = await createPaymentLink({ userId: user.uid, email: user.email });
          const paymentLink = result.data.paymentLink;
    
          window.location.href = paymentLink;
          setIsLoading(false)
        } catch (error) {
          setIsLoading(false)
          console.error('Error creating payment link:', error);
        }
      };

      const handleCancelSubscription = async () => {    
        if (!user) {
          return;
        }

        setIsLoading(true)
    
        const functions = getFunctions();
        const handleCancelSubscription = httpsCallable(functions, 'handleCancelSubscription');
    
        try{
          await handleCancelSubscription({subscriptionId: userSubscriptionData.id})

          setUserSubscriptionData(null)
          setIsLoading(false)
        }
        catch(error){   
        setIsLoading(false)
          console.log(error)
        }
      }


    return (
        <section className="subscriptions">
            <div className='subscriptions__card'>
                <header className='subscriptions__card-header'>
                    <h1 className='subscriptions__card-title'>Plano Básico</h1>
                    <h2 className='subscriptions__card-subtitle'>
                        <span className='subscriptions__card-subtitle--highlight'>R$ 20</span><p>/mensal</p>
                    </h2>
                </header>
                <div className='subscriptions__card-btn-container'>
                    {
                        showSubscribeButton ? <Button isLoading={isLoading} onClick={handleCreateCheckoutSession}>Assinar</Button> : <Button isLoading={isLoading} onClick={handleCancelSubscription }>Cancelar Assinatura</Button>
                    }
                    
                </div>
                <div className='subscriptions__card-body'>
                    <p className='subscriptions__card-body-text'>Por apenas R$20/mês, você garante que o seu servidor de Minecraft seja listado em nossa página exclusiva. Tenha mais visibilidade, atraia novos jogadores e expanda sua comunidade!</p>
                    <ul className='subscriptions__card-body-list'>
                        <li>✅ Seu servidor em evidência 24/7</li>
                        <li>✅ Acesso rápido para novos jogadores</li>
                        <li>✅ Um investimento acessível para crescer!</li>
                    </ul>    
                </div>
            </div>

            <footer className="subscriptions__footer">
            <p>
                Problemas ou dúvidas? Entre em contato com 
                <a href="mailto:suporte@mineconexao.online" className="subscriptions__footer-link"> suporte@mineconexao.online</a>.
            </p>
        </footer>
        </section>
    )
}

export default Subscriptions