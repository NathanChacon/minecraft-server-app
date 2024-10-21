import './style.css'
import homeImg from '../../assets/homeImg.png'
const Home = () => {
    return (
        <section className="home">
            <div className='home__left-content'>
                <header className="home__header">
                    <h1>Encontre Servidores e Jogadores de Minecraft</h1>
                </header>

                <p className="home__text">Conecte-se com jogadores de Minecraft e descubra novos servidores prontos para sua próxima aventura! </p>
                <p className="home__text">Navegue por uma lista de servidores com informações essenciais: ID do servidor, nome dos jogadores, presença de mods e links diretos para os grupos de Discord. Ideal para quem quer entrar em partidas rapidamente e encontrar a comunidade perfeita para explorar o mundo do Minecraft.</p>
                <div className='home__button-container'>
                    <button className='home__button'>COMEÇAR</button>
                </div>

            </div>

            <div className='home__right-content'>
                <img src={homeImg} className='home__img'/>
            </div>
        </section>
    )
}

export default Home