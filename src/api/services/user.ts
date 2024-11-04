// src/api/user.ts
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs, QueryConstraint} from "firebase/firestore";
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
  isUserVisible: boolean | null;
  profileImg: string,
  gameModes: Array<string> | null;  // Email can be null if not provided
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
          gameModes: userSnapshot.data()?.gameModes
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
export const getVisibleUsers = async (additionalFilters: QueryConstraint[] = []): Promise<IUser[]> => {
  const usersRef = collection(db, "users");

  // Add the required `isUserVisible` filter
  const baseFilter = [where("isUserVisible", "==", true)];

  // Merge `isUserVisible` filter with any additional filters provided
  const usersQuery = query(usersRef, ...baseFilter, ...additionalFilters);

  // Execute the query and return the results as an array of IUser
  const querySnapshot = await getDocs(usersQuery);
  return querySnapshot.docs.map((doc) => doc.data() as IUser);
};