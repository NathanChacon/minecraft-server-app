import useSignIn from "./hooks/useSignIn"
import './style.css'
import googeLogo from '../../assets/googleLogo.png'
const SignIn = () => {
    const {onLogin} = useSignIn()

    return (
        <section className="signIn">
            <button className="signIn__google-btn" onClick={onLogin}>
                <img src={googeLogo}/>
                Continuar com Google
            </button>
        </section>
        
    )
}


export default SignIn