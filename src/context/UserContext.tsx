// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface IUser {
  uid: string;
  defaultName: string | null;
  email: string | null;
  imageUrl?: string | null;
}

interface UserContextType {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);


  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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