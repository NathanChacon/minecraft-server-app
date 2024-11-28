import React from 'react';
import './style.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  buttonType?: 'default' | 'cta';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, buttonType = 'default', ...props }) => {
  return (
    <button
      className={`custom-button ${buttonType === 'cta' ? 'custom-button--cta' : ''}`}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? <span className="spinner"></span> : children}
    </button>
  );
};

export default Button;