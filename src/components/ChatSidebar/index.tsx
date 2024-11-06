import { useEffect, useRef } from "react";
import { useChatContext } from "../../context/ChatContext"
import "./style.css"
const ChatSideBar = () => {
   const {chatRooms, setIsOpen, isOpen} = useChatContext()
   const sidebarRef = useRef<HTMLDivElement | null>(null);
   console.log(isOpen)
   
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

    return (
        <div className={`chat-sidebar ${isOpen ? 'chat-sidebar--active' : ''}`} ref={sidebarRef}>
            <ul className="chat-sidebar__list">
                {chatRooms.map(() => {
                    return <li className="chat-sidebar__item">test</li>
                })}
            </ul>
        </div>
    )
}


export default ChatSideBar