// src/api/user.ts
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, QueryConstraint} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
import { db, storage } from "../config/firebase"; // Firestore instance
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Initialize Firebase Auth and Google provider
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();


interface IUser {
  uid: string;
  defaultName: string | null; 
  email: string | null;
  name: string; 
  bio: string | null;
  discordId: string | null;
  serverIp: string | null;
  isUserVisible: boolean | null;
  profileImg: string,
  gameModes: Array<string> | null;
  availableDays: Array<string> | null;
  subscription: {} | null;
}


export const saveUser = async (credential: UserCredential): Promise<any> => { // Change Promise<void> to Promise<any> for returning user data
  try {
    // Reference to the 'users' collection with the user's UID as the document ID
    const userRef = doc(db, "users", credential.user.uid);
    
    // Save the user data
    await setDoc(userRef, {
      uid: credential.user.uid,
      defaultName: credential.user.displayName,
      email: credential.user.email,
    });

    // Return the user data after saving
    return {
      uid: credential.user.uid,
      defaultName: credential.user.displayName,
      email: credential.user.email,
    };
  } catch (error) {
    console.error("Error saving user: ", error);
    // Optionally, you can throw the error again to be handled by the caller
    throw error;
  }
};

export const signUpWithGoogle = async (): Promise<UserCredential> => {
    return signInWithPopup(auth, googleProvider);
};


export const getUserById = async (uid: string): Promise<IUser | null> => {
      // Reference to the user document in the 'users' collection
      const userRef = doc(db, "users", uid);
      
      // Fetch the user document
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return {
          uid: userSnapshot.data()?.uid,
          defaultName: userSnapshot.data()?.defaultName,
          email: userSnapshot.data()?.email,
          name: userSnapshot.data()?.name,
          bio: userSnapshot.data()?.bio,
          profileImg: userSnapshot.data()?.profileImg,
          discordId: userSnapshot.data()?.discordId,
          serverIp: userSnapshot.data()?.serverIp,
          isUserVisible: userSnapshot.data()?.isUserVisible,
          gameModes: userSnapshot.data()?.gameModes,
          availableDays: userSnapshot.data()?.availableDays,
          subscription: userSnapshot.data()?.subscription,
        } as IUser; // Return the user data as IUser type
      } else {
        return null;
      }
  };

  export const updateUserData = async (uid: string, data: any): Promise<void> => {
      const userRef = doc(db, "users", uid);
      return updateDoc(userRef, data);
  };


  export const uploadUserImage = async (userId: string, file: File): Promise<string> => {

  const fileName = `avatar.${file.type.split('/')[1]}`;
  const imageRef = ref(storage, `userImages/${userId}/${fileName}`);


  await uploadBytes(imageRef, file);


  const imageUrl = await getDownloadURL(imageRef);


  await setDoc(doc(db, 'users', userId), { profileImg: imageUrl }, { merge: true });

  return imageUrl;
  };


  export const deleteUserImage = async (userId: string): Promise<void> => {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        const userData = userDocSnapshot.data();
        const imagePath = userData?.profileImg;
  
        if (imagePath) {
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef);
          await updateDoc(userDocRef, { profileImg: null });
        }

  };

  export const getImageByUserId = async (userId: string): Promise<string> => {
   
    const imageRef = ref(storage, `userImages/${userId}/avatar.jpg`); 
  
    try {
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error getting image URL:", error);
      throw error; 
    }
  };


export const getVisibleUsers = async (): Promise<IUser[]> => {
  const usersRef = collection(db, "users");


  const baseFilter = [where("isUserVisible", "==", true)];


  const usersQuery = query(usersRef, ...baseFilter);


  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map((doc) => doc.data() as IUser);
};