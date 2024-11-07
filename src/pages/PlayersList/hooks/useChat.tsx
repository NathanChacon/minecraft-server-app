import { getOrCreateChatRoom } from "../../../api/services/chat"
import { useChatContext } from "../../../context/ChatContext"
import { useUser } from "../../../context/UserContext"
const useChat = () => {
    const {setIsOpen} = useChatContext()
    const {user} = useUser()
    const handleStartChat = async (targetUserId:string) => {
       const chatRoom =  await getOrCreateChatRoom(user?.uid || "", targetUserId)
        setIsOpen(true)
    }
    
    return {
        handleStartChat
    }
}


export default useChat
