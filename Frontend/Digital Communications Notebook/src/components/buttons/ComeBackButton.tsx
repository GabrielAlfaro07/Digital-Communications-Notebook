// src/components/AddButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
interface AddButtonProps {
  onClick: () => void;
  hoverText?: string;
  className?: string;
}
 
const ComeBackButton: React.FC<AddButtonProps> = ({hoverText, className }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleClick}
      title={hoverText}
      className={`${className}`}
      //texto a presentar en pantalla
    >
        Back 
    </button>
  );
};

export default ComeBackButton;
