import { UserCredential } from 'firebase/auth'
import {signUpWithGoogle, saveUser, getUserById} from '../../../api/services/user'

const useSignIn = () => {

    const handleSaveUser = async (credential: UserCredential) => {
        console.log("test", credential)
        try{
            const user = await getUserById(credential.user.uid)

            if(user){
                // go to so
                console.log("user already on database", user)
            }
            else{
                console.log("saving user")
                saveUser(credential)
            }

        }
        catch(error){
            console.log("error login", error)
        }
    }


    const onLogin = () => {
        signUpWithGoogle()
        .then((credential) => {
            handleSaveUser(credential)
        })
        .catch((error) => {
            //show a pop-up error
            console.log("error auth", error)
        })
    }


    return {
        onLogin
    }
}



export default useSignIn