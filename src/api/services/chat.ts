import { db } from '../config/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

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
    
    // Call the callback function to update the component's state
    callback(rooms, snapshot);
  });

  // Return the unsubscribe function so it can be cleaned up in the component
  return unsubscribe;
};


export const sendMessage = async (senderId:string, chatId:string, message:string) => {
    if (!chatId || !senderId || !message) {
      throw new Error('Invalid parameters: senderId, chatId, and message are required.');
    }
  
    const messagesRef = collection(db, 'chatRooms', chatId, 'messages');
    await addDoc(messagesRef, {
      senderId,
      message,
      createdAt: serverTimestamp(),
    });
};