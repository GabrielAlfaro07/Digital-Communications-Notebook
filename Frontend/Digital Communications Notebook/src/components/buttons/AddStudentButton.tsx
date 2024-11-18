// src/components/AddStudentButton.tsx
import React from "react";
import Button from "./Button";

interface AddStudentButtonProps {
  onClick: () => void;
}

const AddStudentButton: React.FC<AddStudentButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} hoverText="Add a new student">
    Add Student
  </Button>
);

export default AddStudentButton;
