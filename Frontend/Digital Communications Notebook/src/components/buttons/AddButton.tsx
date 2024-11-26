// src/components/AddButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddButtonProps {
  onClick: () => void;
  hoverText?: string;
  className?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, hoverText, className }) => {
  return (
    <button
      onClick={onClick}
      title={hoverText}
      className={`${className}`}
      //texto a presentar en pantalla
    >
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  );
};

export default AddButton;
