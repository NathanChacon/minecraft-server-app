import {auth, googleAuthProvider} from '../config'
import {signInWithPopup} from 'firebase/auth'

const useSignIn = () => {
    const onLogin = () => {
        signInWithPopup(auth, googleAuthProvider)
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
        })
    }


    return {
        onLogin
    }
}



export default useSignIn