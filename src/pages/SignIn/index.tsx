import useSignIn from "./hooks/useSignIn"
import './style.css'
import googeLogo from '../../assets/googleLogo.png'
import signInBg from '../../assets/signInBg.jpg';
import { Helmet } from 'react-helmet';
const SignIn = () => {
    const {onLogin} = useSignIn()

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex" />
                <title>Sign In</title>
            </Helmet>

            <section className="signIn" style={{
                backgroundImage: `url(${signInBg})`,
            }}>
                <button className="signIn__google-btn" onClick={onLogin}>
                    <img src={googeLogo}/>
                    Continuar com Google
                </button>
            </section>
        </>
    )
}


export default SignIn