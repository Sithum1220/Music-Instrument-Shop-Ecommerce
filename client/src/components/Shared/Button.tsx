import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  to = "/login", 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  // Base styles
  const baseStyles = "font-medium rounded-full transition-all duration-300 flex items-center justify-center";
  
  // Size variations
  const sizeStyles = {
    small: "py-1.5 px-4 text-sm",
    medium: "py-2.5 px-6 text-base",
    large: "py-3 px-8 text-lg"
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 active:from-indigo-600 active:to-purple-600",
    secondary: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:bg-indigo-300",
    outline: "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100"
  };
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;