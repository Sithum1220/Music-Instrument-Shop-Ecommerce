import React from "react";
import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  children: React.ReactNode;
  to?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  to = "/login",
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon,
  variant = 'filled'
}: PrimaryButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  // Size variations
  const sizeStyles = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-6 text-base",
    large: "py-4 px-8 text-lg"
  };

  // Width style
  const widthStyle = fullWidth ? "w-full" : "";
  
  // Disabled style
  const disabledStyle = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  // Variant styles 
  const variantStyles = {
    filled: `relative bg-gray-900 text-white before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#3B1D8F] before:via-[#D946EF] before:to-[#FB7185] before:opacity-80 hover:before:opacity-100 before:transition-opacity before:duration-300 overflow-hidden`,
    outline: `relative bg-transparent border border-gray-700 hover:border-[#D946EF] text-gray-100 hover:text-white hover:shadow-[#D946EF]/20 hover:shadow-lg`,
    ghost: `relative bg-transparent text-gray-200 hover:text-white hover:bg-gray-800/30 backdrop-blur-sm`
  };

  return (
    <div className={`relative group ${fullWidth ? 'w-full' : 'inline-block'}`}>
      {/* Glow effect for filled variant */}
      {variant === 'filled' && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
      )}
      
      <button
        type={type}
        className={`
          ${variantStyles[variant]}
          relative z-10
          rounded-md font-medium 
          transition-all duration-300 ease-in-out
          flex items-center justify-center gap-2
          ${sizeStyles[size]} ${widthStyle} ${disabledStyle}
        `}
        onClick={handleClick}
        disabled={disabled}
      >
        {/* Overlay for content positioning above gradient background */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {icon && <span className="inline-block">{icon}</span>}
          {children}
        </span>
        
        {/* Animated highlight effect for ghost and outline variants */}
        {variant !== 'filled' && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#3B1D8F]/0 via-[#D946EF]/10 to-[#FB7185]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"></span>
        )}
      </button>
      
      {/* Animated underline effect for ghost variant */}
      {variant === 'ghost' && (
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
      )}
    </div>
  );
};

export default PrimaryButton;