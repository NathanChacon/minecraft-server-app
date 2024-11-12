import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot, orderBy, doc, updateDoc} from 'firebase/firestore';

export const getOrCreateChatRoom = async (userId1: string, userId2: string) => {
    const chatRoomsRef = collection(db, 'chatRooms');
  
    const existingRoomsQuery = query(
      chatRoomsRef,
      where('participants', 'array-contains', userId1)
    );
  
    const existingRoomsSnapshot = await getDocs(existingRoomsQuery);
  
    const existingRoom = existingRoomsSnapshot.docs.find(doc => {
      const participants = doc.data().participants;
      return participants.includes(userId2);
    });
  
    if (existingRoom) {
      return existingRoom;
    }
  
    const newChatRoom = await addDoc(chatRoomsRef, {
      participants: [userId1, userId2],
      createdAt: serverTimestamp(),
    });
  
    return newChatRoom;
  };



export const observeChats = (userId:string, callback: (rooms: Array<any>, snapshot: any) => void) => {
  const chatRoomsRef = collection(db, "chatRooms");
  const q = query(chatRoomsRef, where("participants", "array-contains", userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    
    callback(rooms, snapshot);
  });

  
  return unsubscribe;
};

export const saveLastMessage = async (roomId: string, messageData: any) => {
  const chatRoomRef = doc(db, 'chatRooms', roomId);
  
  await updateDoc(chatRoomRef, {
    lastMessage: {
      text: messageData.message,
      senderId: messageData.senderId,
      createdAt: messageData.createdAt,
      visualized: false
    }
  });
};


export const sendMessage = async (senderId:string, chatId:string, message:string) => {
    if (!chatId || !senderId || !message) {
      throw new Error('Invalid parameters: senderId, chatId, and message are required.');
    }

    const messageData = {
      senderId,
      message,
      createdAt: serverTimestamp(),
    }
  
    const messagesRef = collection(db, 'chatRooms', chatId, 'messages');

    await addDoc(messagesRef, {
      ...messageData
    });

    await saveLastMessage(chatId, messageData)
};

export const loadMessages = (chatRoomId: string, onMessagesUpdate: (messages: any[]) => void) => {
    const messagesRef = collection(db, 'chatRooms', chatRoomId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      onMessagesUpdate(messages);
    });
  
    return unsubscribe;
  };



  export const markLastMessageAsVisualized = async (chatRoomId:string) => {  
    const chatRoomRef = doc(db, "chatRooms", chatRoomId);
    await updateDoc(chatRoomRef, {
        "lastMessage.visualized": true
      });
  };