// src/components/AddClassButton.tsx
import React from "react";
import AddButton from "./AddButton";

interface AddClassButtonProps {
  onClick: () => void;
}

const AddClassButton: React.FC<AddClassButtonProps> = ({ onClick }) => {
  return (
    <AddButton
      onClick={onClick}
      hoverText="Add a new class" // Hover text specific to adding a class
    />
  );
};

export default AddClassButton;
