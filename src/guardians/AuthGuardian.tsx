
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AuthGuardianProps {
  element: JSX.Element;
}

const AuthGuardian: React.FC<AuthGuardianProps> = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("user"); // Check if user is in localStorage

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default AuthGuardian;