// src/components/AddStudentButton.tsx
import React from "react";
import AddButton from "./AddButton";

interface AddStudentButtonProps {
  onClick: () => void;
}

const AddStudentButton: React.FC<AddStudentButtonProps> = ({ onClick }) => (
  <AddButton onClick={onClick} hoverText="Add a new student" />
);

export default AddStudentButton;
