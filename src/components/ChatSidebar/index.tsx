import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/ChatContext"
import { loadMessages, sendMessage } from "../../api/services/chat";
import "./style.css"
import { useUser } from "../../context/UserContext";
import UserDefaultImage from "../UserDefaultImage";
import Button from "../Button";


const Message = ({targetUserChat, text, user, senderId}:any) => {
 
  const isTargetUser = senderId === targetUserChat.uid

  const userSendindMessage = isTargetUser ? targetUserChat : user

  return (
    <li className="chat-item__message">

        <div className="chat-item__message-header">
          {
            userSendindMessage?.profileImg ? <img src={userSendindMessage?.profileImg} className="chat-item__message-image" /> : <UserDefaultImage name={userSendindMessage?.userName || userSendindMessage?.defaultName || "?"}/>
          }
           <p className="chat-item__message-user-name">{userSendindMessage.name || userSendindMessage.defaultName}</p>
        </div>
       

          
          <p className="chat-item__message-text">{text}</p>
    
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
   const [isActiveChatHidden, setIsActiveChatHidden] = useState<boolean>(false)
   const messagesEndRef = useRef<HTMLDivElement | null>(null); 
  const targetUserChat = activeChat?.targetUser


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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message) return;
    await sendMessage(user?.uid || "", activeChat.id, message);
    setMessage(""); 
  }

  const openChat = (chat: any) => {
    setIsOpen(false)
    setActiveChat(chat);
    setIsActiveChatHidden(false)

    if (chat) {
      const unsubscribe = loadMessages(chat.id, (messages) => { 
        setMessages(messages)
    })
      return () => unsubscribe();
    }
  };

  const onToggleActiveChat = () => {
    setIsActiveChatHidden((value) => !value)
  }

  const handleOnCloseActiveChat = () => {
    setActiveChat(null)
    setMessages([])
  }

    return (
        <section className="chat-container">
            <div className={`chat-sidebar ${isOpen ? 'chat-sidebar--active' : ''}`} ref={sidebarRef}>
                <ul className="chat-sidebar__list">
                    {chatRooms.map((room) => {
                      const targetUserRoom = room.participants.find(({uid}:any) =>  uid !== user?.uid)
                        return <li onClick={() => {openChat(room)}} className="chat-sidebar__item" key={room.id}>
                                {
                                  targetUserRoom?.profileImg ? <img src={targetUserRoom?.profileImg} className="chat-sidebar__item-image" /> : <UserDefaultImage name={targetUserRoom?.name || targetUserRoom?.defaultName || "?"}/>
                                }
                                <p className="chat-sidebar__item-title">{targetUserRoom?.name || targetUserRoom?.defaultName}</p>
                              </li>
                    })}
                </ul>
            </div>

            <div className="chats">
                {activeChat && 
                <div className={`chat-item ${isActiveChatHidden ? 'chat-item--hidden' : ''}`}>
                    <header className="chat-item__header" onClick={onToggleActiveChat}>
                      <div className="chat-item__header-left">
                        {
                          targetUserChat?.profileImg ? <img src={targetUserChat?.profileImg} className="chat-item__header-image" /> : <UserDefaultImage name={targetUserChat?.name || targetUserChat?.defaultName || "?"}/>
                        }
                        <h5 className="chat-item__header-title">{targetUserChat?.name || targetUserChat?.defaultName}</h5>
                      </div>

                        <span onClick={(e) => {
                          e.stopPropagation()
                          handleOnCloseActiveChat()
                          }} className="chat-item__header-close">{'✖'}</span>
                    </header>
                    <ul className="chat-item__body">
                      {messages.map((msg: any) => (
                          <Message key={msg.id} text={msg.message} user={user} targetUserChat={targetUserChat} senderId={msg.senderId}/>
                      ))}
                      <div ref={messagesEndRef} />
                    </ul>
                    <div className="chat-item__form" >
                        <input  
                          type="text"
                          placeholder="Digite sua mensagem"
                          value={message}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage();
                            }
                          }}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button onClick={handleSendMessage}>Enviar</Button>
                    </div>
                    
                </div>}
            </div>

        </section>
  
    )
}


export default ChatSideBar