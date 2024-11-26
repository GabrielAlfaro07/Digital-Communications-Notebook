import React from "react";
import Button from "./Button";

interface AddNewStudentButtonProps {
  onClick: () => void;
}

const AddNewStudentButton: React.FC<AddNewStudentButtonProps> = ({
  onClick,
}) => (
  <Button onClick={onClick} hoverText="Add New Student">
    Add Student
  </Button>
);

export default AddNewStudentButton;
