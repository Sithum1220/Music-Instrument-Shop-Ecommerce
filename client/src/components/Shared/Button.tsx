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
  const baseStyles = "font-medium rounded-full transition-all duration-300 flex items-center justify-center relative";
  
  // Size variations
  const sizeStyles = {
    small: "py-1.5 px-4 text-sm",
    medium: "py-2.5 px-6 text-base",
    large: "py-3 px-8 text-lg"
  };
  
  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const buttonContent = (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${widthStyle} ${disabledStyle} ${
        variant === 'primary' ? 'text-white' : 
        variant === 'secondary' ? 'text-[#D946EF]' : 
        'text-white border-2 border-[#D946EF] hover:border-[#FB7185]'
      } ${variant === 'primary' ? 'relative z-10' : 
          variant === 'secondary' ? 'bg-gray-900/90 hover:bg-gray-800 active:bg-gray-700' : 
          'bg-transparent hover:bg-gray-900/30 backdrop-blur-sm'
      }`}
    >
      {/* Overlay for content positioning above gradient background for primary variant */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Animated highlight effect for secondary and outline variants */}
      {variant !== 'primary' && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/10 to-[#FB7185]/0 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
      )}
    </button>
  );

  // For primary variant, we need a wrapper to create the gradient glow effect
  if (variant === 'primary') {
    return (
      <div className={`relative group ${fullWidth ? 'w-full' : 'inline-block'}`}>
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-full blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
        
        {/* Button with gradient background */}
        <div className="relative bg-gray-900 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
          {buttonContent}
        </div>
      </div>
    );
  }
  
  return buttonContent;
};

export default Button;