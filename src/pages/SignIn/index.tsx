import useSignIn from "./hooks/useSignIn"
const SignIn = () => {
    const {onLogin} = useSignIn()

    return (
        <button onClick={onLogin}>Login with google</button>
    )
}


export default SignIn