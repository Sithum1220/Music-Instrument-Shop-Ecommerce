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
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  to = "/login",
  size = 'medium',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
  icon
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

  return (
    <button
      type={type}
      className={`
        bg-gradient-to-r from-purple-600 to-indigo-600 
        text-white font-medium 
        rounded-lg shadow-md 
        hover:shadow-lg hover:shadow-indigo-500/30 
        active:shadow-inner active:from-indigo-700 active:to-purple-700 
        transition-all duration-300 ease-in-out
        flex items-center justify-center gap-2
        ${sizeStyles[size]} ${widthStyle} ${disabledStyle}
      `}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon && <span className="inline-block">{icon}</span>}
      {children}
    </button>
  );
};

export default PrimaryButton;