import { UserCredential } from 'firebase/auth'
import {signUpWithGoogle, saveUser, getUserById} from '../../../api/services/user'
import { useUser } from '../../../context/UserContext';

const useSignIn = () => {
    const { setUser } = useUser();

    const handleSaveUser = async (credential: UserCredential) => {
        try{
            const user = await getUserById(credential.user.uid)

            if(user){
                console.log("user already on database", user)
            }
            else{
                console.log("saving user")
                saveUser(credential)
            }

            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
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
            console.log("error auth", error)
        })
    }


    return {
        onLogin
    }
}



export default useSignIn