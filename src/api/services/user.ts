// src/api/user.ts
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
import { db, storage } from "../config/firebase"; // Firestore instance
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

// Initialize Firebase Auth and Google provider
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

/**
 * Type definition for user data.
 */
interface IUser {
  uid: string;
  defaultName: string | null; // User name can be null if not provided
  email: string | null;
  name: string; 
  bio: string | null;
  discordId: string | null;
  serverIp: string | null;
  isUserVisible: boolean | null;  // Email can be null if not provided
}


export const saveUser = async (credential: UserCredential): Promise<void> => {
  try {
    // Reference to the 'users' collection with the user's UID as the document ID
    const userRef = doc(db, "users", credential.user.uid);
    
    // Save the user data
    await setDoc(userRef, {
      uid: credential.user.uid,
      defaultName: credential.user.displayName,
      email: credential.user.email,
    });

    console.log("User saved successfully!");
  } catch (error) {
    console.error("Error saving user: ", error);
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
          discordId: userSnapshot.data()?.discordId,
          serverIp: userSnapshot.data()?.serverIp,
          isUserVisible: userSnapshot.data()?.isUserVisible
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
    // Create a reference to the user's image in the storage
    const imageRef = ref(storage, `userImages/${userId}/avatar.jpg`); // Adjust the file name as needed
  
    try {
      // Get the download URL of the image
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.error("Error getting image URL:", error);
      throw error; // Rethrow the error for handling in the calling function
    }
  };


  // src/services/UserService.ts

// Function to fetch all users with `isUserVisible` set to true
export const getVisibleUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = [];
  
    const usersRef = collection(db, "users");

    // Create a query to find users where `isUserVisible` is true
    const visibleUsersQuery = query(usersRef, where("isUserVisible", "==", true));

    // Execute the query
    const querySnapshot = await getDocs(visibleUsersQuery);
    
    return querySnapshot.docs.map((doc) =>  doc.data() as IUser)
    // Loop through the results and push to the users array
};