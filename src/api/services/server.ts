import { db, storage } from '../config/firebase';
import { addDoc, collection, updateDoc, getDocs, where, query, getDoc, doc} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUserById } from './user';
import isValidSubscription from '../../utils/subscription';

export const saveServer = async (
  payload: { ip: string; title: string; description: string; imageFile?: File | null, userId:string, isVisible:boolean}
): Promise<any> => {
  try {
    // Reference to the "servers" collection where we'll add the new server document
    const serversCollectionRef = collection(db, "servers");

    // Create the server data object
    const serverData:any = {
      ip: payload.ip,
      title: payload.title,
      description: payload.description,
      userId: payload.userId,  // Link to the user creating the server
      createdAt: new Date(),
      isVisible: payload.isVisible,
      imageUrl: null
    }

    // Save the server data to Firestore using addDoc, Firestore will auto-generate the ID
    const serverRef = await addDoc(serversCollectionRef, serverData);

    // Now, get the server ID (auto-generated by Firestore)
    const serverId = serverRef.id;

    // If there's an image file, upload it to Firebase Storage
    if (payload.imageFile) {
      const fileName = `server-banner-${serverId}.${payload.imageFile.type.split('/')[1]}`;
      const imageRef = ref(storage, `serversImg/${serverId}/${fileName}`);
      
      // Upload the banner image to Firebase Storage
      await uploadBytes(imageRef, payload.imageFile);

      // Get the image URL after uploading
      const imageUrl = await getDownloadURL(imageRef);

      await updateDoc(serverRef, { imageUrl });


      serverData.imageUrl = imageUrl;
    }

    return { ...serverData};
  } catch (error) {
    console.error("Error saving server: ", error);
    throw error; // Propagate the error to the caller
  }
};


export const editServer = async (
  serverId: string,
  payload: { ip: string; title: string; description: string; imageFile?: File | null; isVisible: boolean }
): Promise<any> => {
  try {
    // Reference to the server document in Firestore
    const serverRef = doc(db, "servers", serverId);

    // Create the updated server data object
    const updatedData: any = {
      ip: payload.ip,
      title: payload.title,
      description: payload.description,
      isVisible: payload.isVisible,
      updatedAt: new Date(), // Optionally track when the document was last updated
    };

    // If there's a new image file, upload it to Firebase Storage
    if (payload.imageFile) {
      const fileName = `server-banner-${serverId}.${payload.imageFile.type.split('/')[1]}`;
      const imageRef = ref(storage, `serversImg/${serverId}/${fileName}`);
      
      // Upload the banner image to Firebase Storage
      await uploadBytes(imageRef, payload.imageFile);

      // Get the image URL after uploading
      const imageUrl = await getDownloadURL(imageRef);

      // Add the image URL to the updated data
      updatedData.imageUrl = imageUrl;
    }

    // Update the server document with the new data
    await updateDoc(serverRef, updatedData);

    return { id: serverId, ...updatedData };
  } catch (error) {
    console.error("Error editing server: ", error);
    throw error; // Propagate the error to the caller
  }
};

export const getServersByUserId = async (userId: string): Promise<any[]> => {
    try {
      // Reference to the "servers" collection
      const serversCollectionRef = collection(db, "servers");
  
      // Create a query to filter servers by userId
      const q = query(serversCollectionRef, where("userId", "==", userId));
  
      // Fetch the documents matching the query
      const querySnapshot = await getDocs(q);
  
      // Create an array to store the server data
      const servers: any[] = [];
  
      // Loop through the documents and extract the data
      querySnapshot.forEach((doc) => {
        servers.push({ id: doc.id, ...doc.data() });
      });
  
      // Return the list of servers
      return servers;
    } catch (error) {
      console.error("Error fetching servers by userId: ", error);
      throw error; // Propagate the error to the caller
    }
  };

  export const getServerById = async (serverId: string): Promise<any> => {
    try {
      // Reference to the "servers" collection

      const docRef = doc(db, "servers", serverId);
  
      // Get the server document by ID using the serverId
      const serverDoc = await getDoc(docRef);
  
      // If the document exists, return its data
      if (serverDoc.exists()) {
        return { id: serverDoc.id, ...serverDoc.data() };
      } else {
        // If the document doesn't exist, return null or handle it based on your needs
        console.error("Server not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching server by ID: ", error);
      throw error; // Propagate the error to the caller
    }
  };

  export const getVisibleServers = async (): Promise<any[]> => {
    try {
      const serversCollectionRef = collection(db, "servers");
      const q = query(serversCollectionRef, where("isVisible", "==", true));
      const querySnapshot = await getDocs(q);
  
      const visibleServers: any[] = [];
  
      // Loop through servers and validate user subscription
      for (const doc of querySnapshot.docs) {
        const server:any = { id: doc.id, ...doc.data() };
  
        // Fetch the user data for this server
        const userData = await getUserById(server?.userId || "");
        if (userData && isValidSubscription(userData.subscription)) {
          visibleServers.push(server);
        }
      }
  
      return visibleServers;
    } catch (error) {
      console.error("Error fetching visible servers: ", error);
      throw error;
    }
  };