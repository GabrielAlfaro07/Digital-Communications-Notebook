// src/components/AddStudentButton.tsx
import React from "react";
import Button from "./Button";

interface AddAssignmentButtonProps {
  onClick: () => void;
}

const AddAssignmentButton: React.FC<AddAssignmentButtonProps> = ({
  onClick,
}) => (
  <Button onClick={onClick} hoverText="Add a new assignment">
    Add Assignment
  </Button>
);

export default AddAssignmentButton;
