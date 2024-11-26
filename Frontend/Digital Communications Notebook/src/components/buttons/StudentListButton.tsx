// src/components/AddStudentButton.tsx
import React from "react";
import Button from "./Button";

interface StudentListButtonProps {
  onClick: () => void;
}

const StudentListButton: React.FC<StudentListButtonProps> = ({ onClick }) => (
  <Button onClick={onClick} hoverText="Student List">
    Student List
  </Button>
);

export default StudentListButton;
