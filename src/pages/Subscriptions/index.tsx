import Button from '../../components/Button'
import { useUser } from '../../context/UserContext';
import './style.css'
import { getFunctions, httpsCallable } from "firebase/functions";
import { useNavigate } from 'react-router-dom';
const Subscriptions = () => {
    const {user} = useUser()
    const navigate = useNavigate();

    const handleCreateCheckoutSession = async () => {
        if (!user) {
            navigate("/login")
            return
        }
    
        const functions = getFunctions();
        const createPaymentLink = httpsCallable(functions, 'createStripeSession');
    
    
        try {
          const result:any = await createPaymentLink({ userId: user.uid, email: user.email });
          const paymentLink = result.data.paymentLink;
    
          window.location.href = paymentLink;
        } catch (error) {
          console.error('Error creating payment link:', error);
        }
      };


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
                    <Button onClick={handleCreateCheckoutSession}>Assinar</Button>
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
        </section>
    )
}

export default Subscriptions