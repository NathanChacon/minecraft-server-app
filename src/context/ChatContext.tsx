import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { observeChats, sendMessage } from '../api/services/chat';
import { getUserById } from '../api/services/user';

interface ChatContextType {
  chatRooms: any[];
  activeChat: any | null;
  setActiveChat: (chat: any | null) => void;
  onSendMessage: (message: string) => Promise<void>;
  isOpen:  boolean;
  setIsOpen: any;
  roomsNotifications: any;
  setRoomsNotifications: any
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false)
  const [roomsNotifications, setRoomsNotifications] = useState<any>(null)


  const handleChatData = async (rooms: any[]) => {
    const formattedRooms = await Promise.all(
      rooms.map(async (room) => {
        const usersData = await Promise.all(
          room.participants.map(async (userId: string) => {
            const userData = await getUserById(userId);
            return userData
          })
        );
        const targetUser = usersData.find(({uid}: any) => uid !== user?.uid)
        return {
          ...room,
          participants: usersData,
          targetUser
        };
      })
    );
  
   
    setChatRooms(formattedRooms);

  };

  const handleNotifications = () => {
    const newNotificationsMap = roomsNotifications ? { ...roomsNotifications } : {};
  
    chatRooms.forEach(({ id, lastMessage }: any) => {
      const isFromCurrentUser = user?.uid === lastMessage?.senderId
      const isVisualized = isFromCurrentUser || lastMessage?.visualized === true;
  
      newNotificationsMap[id] = {
        lastMessage,
        hasNotification: !isVisualized,
      };
    });
  
    setRoomsNotifications((prevMap: any) => ({
      ...prevMap,
      ...newNotificationsMap,
    }));
  };

  useEffect(() => {
    handleNotifications()
  }, [chatRooms])

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
    <ChatContext.Provider value={{ chatRooms, activeChat, setActiveChat, onSendMessage, isOpen, setIsOpen, roomsNotifications, setRoomsNotifications}}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChatContext must be used within a ChatProvider');
  return context;
};