import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/ChatContext"
import { loadMessages, sendMessage } from "../../api/services/chat";
import "./style.css"
import { useUser } from "../../context/UserContext";
import UserDefaultImage from "../UserDefaultImage";


const Message = ({senderId, text, user}:any) => {

  return (
    <li>

    </li>
  ) 
}

const ChatSideBar = () => {
    const {user} = useUser()
   const {chatRooms, setIsOpen, isOpen} = useChatContext()
   const [messages, setMessages] = useState<any>([])
   const [message, setMessage] = useState<string>("");
   const sidebarRef = useRef<HTMLDivElement | null>(null);
   const [activeChat, setActiveChat] = useState<any>(null)
 
    const targetUserChat = activeChat?.targetUser

    console.log(targetUserChat)

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isClickingOnSidebar = sidebarRef?.current?.contains(event.target as Node)
      if (!isClickingOnSidebar) {
           setIsOpen(false);
      }
      
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const handleSendMessage = async () => {
    if (!message) return;
    await sendMessage(user?.uid || "", activeChat.id, message);
    setMessage(""); 
  }

  const openChat = (chat: any) => {
    setActiveChat(chat);
    if (chat) {
      const unsubscribe = loadMessages(chat.id, (messages) => { 
        setMessages(messages)
    })
      return () => unsubscribe();
    }
  };
  console.log("test 444", messages)
    return (
        <section className="chat-container">
            <div className={`chat-sidebar ${isOpen ? 'chat-sidebar--active' : ''}`} ref={sidebarRef}>
                <ul className="chat-sidebar__list">
                    {chatRooms.map((room) => {
                        return <li onClick={() => {openChat(room)}} className="chat-sidebar__item">test</li>
                    })}
                </ul>
            </div>

            <div className="chats">
                {activeChat && 
                <div className="chat-item">
                    <header className="chat-item__header">
                    {
                        targetUserChat?.profileImg ? <img src={targetUserChat?.profileImg} className="chat-item__header-image" /> : <UserDefaultImage name={targetUserChat?.userName || targetUserChat?.defaultName || "?"}/>
                      }
                        <h5>{targetUserChat?.userName}</h5>
                    </header>
                    <div className="chat-item__body">
                    {messages.map((msg: any) => (
                                <div key={msg.id} className="chat-message">
                                    <p>{msg.message}</p>
                                </div>
                      ))}
                    </div>
                    <div className="chat-item__form" >
                        <input  
                          type="text"
                          placeholder="Digite sua mensagem"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Enviar</button>
                    </div>
                    
                </div>}
            </div>

        </section>
  
    )
}


export default ChatSideBar