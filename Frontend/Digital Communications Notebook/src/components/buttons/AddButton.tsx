// src/components/AddButton.tsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddButtonProps {
  onClick: () => void;
  hoverText?: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, hoverText }) => {
  return (
    <button
      onClick={onClick}
      title={hoverText}
      className="hover:bg-neutral-300 text-white py-3 px-4 rounded-full transition duration-300 ease-in-out"
    >
      <FontAwesomeIcon icon={faPlus} size="lg" />
    </button>
  );
};

export default AddButton;
