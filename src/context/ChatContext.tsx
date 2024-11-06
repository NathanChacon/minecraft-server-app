import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { observeChats, sendMessage } from '../api/services/chat';
import { getUserById } from '../api/services/user';

interface ChatContextType {
  chatRooms: any[];
  activeChat: any | null;
  setActiveChat: (chat: any | null) => void;
  onSendMessage: (message: string) => Promise<void>;
  notifications: { [key: string]: boolean };
  isOpen:  boolean;
  setIsOpen: any;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false)

  const [notifications, setNotifications] = useState<{ [key: string]: boolean }>({});

  const handleChatData = async (rooms: any[], snapshot: any) => {
    
    const formattedRooms = await Promise.all(
      rooms.map(async (room) => {
        const usersData = await Promise.all(
          room.participants.map(async (userId: string) => {
            const userData = await getUserById(userId);
            return {
              userId,
              profileImg: userData?.profileImg,
              userName: userData?.name || userData?.defaultName,
            };
          })
        );
  
        return {
          ...room,
          participants: usersData,
        };
      })
    );
  
   
    setChatRooms(formattedRooms);
  
  
    snapshot.docChanges().forEach((change: any) => {
      if (change.type === 'modified' && change.doc.id !== activeChat?.id) {
        setNotifications((prev) => ({ ...prev, [change.doc.id]: true }));
      }
    });
  };


  useEffect(() => {
    if (!user) return;

    const unsubscribe = observeChats(user.uid, handleChatData);


    return () => unsubscribe();
  }, [user, activeChat]);

  const onSendMessage = async (message: string) => {
    if (!activeChat || !user) return;
    await sendMessage(user.uid, activeChat.id, message);
  };

  return (
    <ChatContext.Provider value={{ chatRooms, activeChat, setActiveChat, onSendMessage, notifications, isOpen, setIsOpen }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatProvider');
  return context;
};