
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardianProps {
  children: ReactNode;
}

const AuthGuardian: React.FC<AuthGuardianProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user"); // Check if user is in localStorage

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthGuardian;