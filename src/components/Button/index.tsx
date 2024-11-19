import React from 'react';
import './style.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean; // New prop for loading state
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => {
  return (
    <button className="custom-button" {...props} disabled={isLoading || props.disabled}>
      {isLoading ? <span className="spinner"></span> : children}
    </button>
  );
};

export default Button;