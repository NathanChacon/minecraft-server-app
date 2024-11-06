import { getOrCreateChatRoom } from "../../../api/services/chat"
import { useUser } from "../../../context/UserContext"
const useChat = () => {
    const {user} = useUser()
    const handleStartChat = async (targetUserId:string) => {
       const chatRoom =  await getOrCreateChatRoom(user?.uid || "", targetUserId)

       console.log("test", chatRoom)
    }
    
    return {
        handleStartChat
    }
}


export default useChat
