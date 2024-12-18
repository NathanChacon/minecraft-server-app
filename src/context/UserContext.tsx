// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { setIsUserActive } from '../api/services/user';

interface IUser {
  uid: string;
  defaultName: string | null;
  name: string | null;
  bio: string | null;
  email: string | null;
  imageUrl?: string | null;
  profileImg?: string | null;
  discordId: string | null;
  serverIp: string | null;
  isUserVisible: boolean | null | undefined;
}

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  logout: () => void; // Added logout method
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate(); // Initialize the navigate function

        // Mark user as inactive on unmount
    const handleUserInactive = async () => {
        const userStorage = localStorage.getItem("user")
        const parsedUser = userStorage && JSON.parse(userStorage)
        const uid = parsedUser?.uid || user?.uid 
          if (uid) {
            try {
              await setIsUserActive(uid, false);
              console.log("User marked as inactive");
            } catch (error) {
              console.error("Error marking user as inactive:", error);
            }
          }
    };


   useEffect(() => {
      if(user && user?.uid){
        setIsUserActive(user.uid, true)
      }

      const mutation = (event: any) => {
        handleUserInactive()
      }

      window.addEventListener("beforeunload", mutation);

      return () => {
        window.removeEventListener("beforeunload", mutation);
        handleUserInactive()
       } 
   }, [user])


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser);
    }

  }, []);

  const logout = () => {
    setUser(null); // Clear the user from context
    localStorage.removeItem("user"); // Remove user data from local storage

    navigate('/'); // Redirect to home page after logout
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}> {/* Provide the logout function */}
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};