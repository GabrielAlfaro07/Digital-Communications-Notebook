// src/components/AddStudentButton.tsx
import React from "react";
import AddButton from "./AddButton";

interface AddAssignmentButtonProps {
  onClick: () => void;
}

const AddAssignmentButton: React.FC<AddAssignmentButtonProps> = ({
  onClick,
}) => <AddButton onClick={onClick} hoverText="Add a new assignment" />;

export default AddAssignmentButton;
