import './style.css'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import { Helmet } from 'react-helmet'
const Home = () => {
    const navigate = useNavigate()
    return (
        <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <section className="home primary-bg">
                <div className='home__left-content'>
                    <header className="home__header">
                        <h1>Encontre Amigos para Jogar Minecraft no Brasil</h1>
                    </header>

                    <p className="home__text">
                        Quer encontrar novos amigos para explorar o mundo de Minecraft? Nossa comunidade conecta jogadores brasileiros para compartilhar aventuras, construir mundos e enfrentar desafios juntos!
                    </p>

                    <p className="home__text">
                        Na página de jogadores, você vê perfis com nome, bio, Discord e IP de servidor, facilitando encontrar parceiros com interesses em comum. Conecte-se agora e inicie suas aventuras no Minecraft!
                    </p>
                    <div className='home__button-container'>
                        <Button buttonType='cta' onClick={() => {navigate('/players')}}>ACHAR COMPANHEIROS</Button>
                    </div>
                </div>
                    

                <div className='home__right-content'>
                </div>

            </section>
        </>

    )
}

export default Home