import { Link } from 'react-router-dom';
import './style.css'
const Help = () => {
    return (
        <section className='help'>
            <header className='help__header'>
                <h1 className='help__title'>Central de Ajuda</h1>
            </header>
            <article>
            <p className='help__text'>
                Bem-vindo à Central de Ajuda! Esta página foi criada para responder às principais perguntas sobre como usar nosso site e se conectar com outros jogadores. Precisa de ajuda para tornar seu perfil visível, preencher informações de contato, ou ajustar preferências? Você está no lugar certo!
            </p>
            <p className='help__text'>
                Para que outros jogadores possam encontrar seu perfil, clique em <strong>"Perfil"</strong> no menu de navegação e, em seguida, selecione <strong>"Editar Perfil"</strong>. Lá, você poderá ativar a opção <strong>"Ficar Visível"</strong>. Atenção: essa opção só estará disponível se você adicionar um meio de contato, como seu Discord ou o IP do seu servidor. Caso prefira, você também pode acessar diretamente a página de edição de perfil clicando <Link to="/edit-profile">aqui</Link> para configurar suas informações.
            </p>
            </article>
        </section>
    )
}


export default Help