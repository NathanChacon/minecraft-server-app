import './style.css'
import homeImg from '../../assets/homeImg.png'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate()
    return (
        <section className="home">
            <div className='home__left-content'>
                <header className="home__header">
                    <h1>Encontre Amigos para Jogar Minecraft no Brasil</h1>
                </header>

                <p className="home__text">Você está em busca de novos amigos para explorar o mundo do Minecraft? Aqui no nosso site, reunimos jogadores brasileiros apaixonados pelo game, prontos para compartilhar aventuras, construir mundos incríveis e enfrentar desafios. Nossa comunidade é o lugar ideal para você se conectar com outros jogadores e encontrar aquela parceria perfeita para seus jogos. </p>
                <p className="home__text">Na nossa página de jogadores, você pode ver perfis detalhados com nome, bio, contato no Discord e, se disponível, o IP do servidor que cada pessoa usa. Assim, fica fácil encontrar outros minecrafters com interesses em comum, combinar jogatinas e até participar de servidores novos. Conecte-se, chame seu novo amigo e comece a explorar o Minecraft como nunca antes!</p>
                <div className='home__button-container'>
                    <button className='home__button' onClick={() => {navigate('/players')}}>ACHAR COMPANHEIROS</button>
                </div>

            </div>

            <div className='home__right-content'>
                <img src={homeImg} className='home__img'/>
            </div>
        </section>
    )
}

export default Home