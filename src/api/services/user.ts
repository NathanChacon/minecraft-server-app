// src/api/user.ts
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, User, UserCredential } from "firebase/auth";
import { db } from "../config/firebase"; // Firestore instance

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
  name: string;      // Email can be null if not provided
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
          name: userSnapshot.data()?.name
        } as IUser; // Return the user data as IUser type
      } else {
        return null;
      }
  };