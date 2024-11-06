import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/ChatContext"
import { loadMessages } from "../../api/services/chat";

import "./style.css"
import { useUser } from "../../context/UserContext";
const ChatSideBar = () => {
    const {user} = useUser()
   const {chatRooms, setIsOpen, isOpen} = useChatContext()
   const [messages, setMessages] = useState<any>([])
   const sidebarRef = useRef<HTMLDivElement | null>(null);
   const [activeChat, setActiveChat] = useState<any>(null)
 

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

  const openChat = (chat: any) => {
    console.log("test", chat)
    const targetUser = chat.participants.find(({userId}: any) => userId !== user?.uid)
    console.log(targetUser)
    setActiveChat({
        ...chat,
        targetUser
    });
    if (chat) {
      const unsubscribe = loadMessages(chat.id, (messages) => { 
        console.log("test", messages) 
        setMessages(messages)
    })
      return () => unsubscribe();
    }
  };

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
                        {activeChat?.targetUser?.userName}
                    </header>
                    <div className="chat-item__body"></div>
                    <div className="chat-item__form" >
                        <input type="text" placeholder="Digite sua mensagem"/>
                        <button>Enviar</button>
                    </div>
                    
                </div>}
            </div>

        </section>
  
    )
}


export default ChatSideBar